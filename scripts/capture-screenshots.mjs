import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { spawn } from "node:child_process";

const port = 4177;
const baseUrl = `http://127.0.0.1:${port}`;
const outputDir = ".artifacts/screenshots";

const server = spawn(
  "npx",
  ["vite", "--host", "127.0.0.1", "--port", String(port), "--strictPort"],
  { detached: process.platform !== "win32", stdio: "ignore" },
);
server.unref();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function stopServer() {
  try {
    if (process.platform === "win32") {
      server.kill("SIGTERM");
      return;
    }
    process.kill(-server.pid, "SIGTERM");
  } catch (error) {
    if (error.code !== "ESRCH") throw error;
  }
}

async function waitForServer() {
  for (let i = 0; i < 40; i += 1) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      await sleep(250);
    }
  }
  throw new Error("Local Vite server did not become ready.");
}

async function warmLazyImages(page) {
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = "auto";
    for (const img of document.querySelectorAll("img[loading='lazy']")) {
      img.loading = "eager";
    }
    const step = Math.max(window.innerHeight * 0.75, 400);
    for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 90));
    }
    await Promise.allSettled(
      [...document.images].map(async (img) => {
        if (!img.complete) {
          await new Promise((resolve) => {
            img.addEventListener("load", resolve, { once: true });
            img.addEventListener("error", resolve, { once: true });
          });
        }
        if (typeof img.decode === "function") {
          await img.decode().catch(() => {});
        }
      }),
    );
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 180));
  });
  await page.waitForLoadState("networkidle");
}

try {
  await mkdir(outputDir, { recursive: true });
  await waitForServer();

  const browser = await chromium.launch();
  for (const target of [
    { name: "desktop", viewport: { width: 1440, height: 1700 } },
    { name: "mobile", viewport: { width: 390, height: 1700 } },
  ]) {
    const page = await browser.newPage({ viewport: target.viewport });
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await warmLazyImages(page);
    await page.screenshot({ fullPage: true, path: `${outputDir}/${target.name}.png` });
    await page.getByRole("button", { name: "EN" }).click();
    await page.evaluate(() => document.fonts.ready);
    await warmLazyImages(page);
    await page.screenshot({ fullPage: true, path: `${outputDir}/${target.name}-en.png` });
    await page.close();
  }
  await browser.close();
  console.log(`Captured screenshots in ${outputDir}.`);
} finally {
  stopServer();
}

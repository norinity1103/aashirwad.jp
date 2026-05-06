import { spawn } from "node:child_process";

const port = 4175;
const baseUrl = `http://127.0.0.1:${port}`;
const server = spawn(
  "npx",
  ["vite", "--host", "127.0.0.1", "--port", String(port), "--strictPort"],
  { detached: process.platform !== "win32", stdio: "ignore" },
);
server.unref();

const paths = [
  { path: "/", types: ["text/html"] },
  { path: "/assets/logo.svg", types: ["image/svg+xml"] },
  { path: "/assets/material-icons.ttf", types: ["font/ttf", "font/sfnt", "application/octet-stream"] },
  { path: "/assets/main_img.jpg", types: ["image/jpeg"] },
  { path: "/assets/access-map.png", types: ["image/png"] },
  { path: "/menu/lunch02.jpg", types: ["image/jpeg"] },
  { path: "/cooks/sub_img01.jpg", types: ["image/jpeg"] },
  { path: "/lunch-japanese.pdf", types: ["application/pdf"] },
  { path: "/dinner-english.pdf", types: ["application/pdf"] },
  { path: "/owner-confirmation.html", types: ["text/html"] },
  { path: "/robots.txt", types: ["text/plain"] },
  { path: "/sitemap.xml", types: ["application/xml", "text/xml"] },
];

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

try {
  await waitForServer();
  for (const item of paths) {
    const response = await fetch(`${baseUrl}${item.path}`, { method: "HEAD" });
    const contentType = response.headers.get("content-type") ?? "";
    if (!response.ok) {
      throw new Error(`${item.path} returned ${response.status}`);
    }
    if (!item.types.some((type) => contentType.includes(type))) {
      throw new Error(`${item.path} returned unexpected content-type: ${contentType}`);
    }
  }
  console.log(`Smoke checked ${paths.length} local routes on ${baseUrl}.`);
} finally {
  stopServer();
}

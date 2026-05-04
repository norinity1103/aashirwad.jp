import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const distDir = "dist";
const htmlPath = join(distDir, "index.html");
const assetsDir = join(distDir, "assets");

function rewriteHtml(content) {
  return content
    .replaceAll('href="/assets/', 'href="./assets/')
    .replaceAll('src="/assets/', 'src="./assets/')
    .replaceAll('href="/lunch-', 'href="./lunch-')
    .replaceAll('href="/dinner-', 'href="./dinner-')
    .replaceAll('src="/menu/', 'src="./menu/')
    .replaceAll('src="/seasonal/', 'src="./seasonal/')
    .replaceAll('src="/cooks/', 'src="./cooks/');
}

function rewriteCss(content) {
  return content
    .replaceAll('url("/assets/', 'url("../assets/')
    .replaceAll("url(/assets/", "url(../assets/");
}

const html = await readFile(htmlPath, "utf8");
await writeFile(htmlPath, rewriteHtml(html));

const assetFiles = await readdir(assetsDir);
await Promise.all(
  assetFiles
    .filter((file) => file.endsWith(".css"))
    .map(async (file) => {
      const path = join(assetsDir, file);
      const css = await readFile(path, "utf8");
      await writeFile(path, rewriteCss(css));
    }),
);

console.log("Prepared dist for GitHub Pages subpath preview.");

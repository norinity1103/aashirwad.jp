import { readFile } from "node:fs/promises";

const html = await readFile("index.html", "utf8");
const js = await readFile("src/main.js", "utf8");
const errors = [];

const textKeys = [...html.matchAll(/data-i18n(?:-html)?="([^"]+)"/g)].map((match) => match[1]);
const attributeKeys = [...html.matchAll(/data-i18n-attr="([^"]+)"/g)].flatMap((match) =>
  match[1]
    .split(";")
    .map((pair) => pair.split(":")[1])
    .filter(Boolean),
);
const htmlKeys = new Set([...textKeys, ...attributeKeys]);

const languageBlocks = [...js.matchAll(/^\s{4}"([^"]+)":/gm)].map((match) => match[1]);
const keyCounts = new Map();
for (const key of languageBlocks) {
  keyCounts.set(key, (keyCounts.get(key) ?? 0) + 1);
}

for (const key of htmlKeys) {
  if (!keyCounts.has(key)) errors.push(`Missing translation key: ${key}`);
}

for (const [key, count] of keyCounts) {
  if (count !== 2 && !key.startsWith("meta.")) {
    errors.push(`Translation key should exist for ja and en: ${key}`);
  }
}

for (const key of keyCounts.keys()) {
  if (!htmlKeys.has(key) && !key.startsWith("meta.")) {
    errors.push(`Unused translation key: ${key}`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${htmlKeys.size} i18n keys across text and attributes.`);

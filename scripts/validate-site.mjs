import { existsSync, readFileSync, statSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { dishes, englishGuide, externalLinks, menuDigest, menuPdfs, restaurant, story } from "../src/site-data.js";

const html = await readFile("index.html", "utf8");
const normalizedHtml = html.replace(/\s+/g, " ");
const normalizedText = html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ");
const errors = [];

function jpegSize(buffer) {
  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) return null;
    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xc3) {
      return {
        width: buffer.readUInt16BE(offset + 7),
        height: buffer.readUInt16BE(offset + 5),
      };
    }
    offset += 2 + length;
  }
  return null;
}

function pngSize(buffer) {
  if (buffer.toString("ascii", 1, 4) !== "PNG") return null;
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

function validateAsset(path, publicHref) {
  if (!existsSync(path) || statSync(path).size === 0) {
    errors.push(`Missing or empty asset: ${publicHref}`);
    return;
  }

  const buffer = readFileSync(path);
  if (path.endsWith(".pdf")) {
    if (statSync(path).size < 10_000) errors.push(`Suspiciously small PDF: ${publicHref}`);
    if (!buffer.subarray(0, 5).equals(Buffer.from("%PDF-"))) {
      errors.push(`Invalid PDF header: ${publicHref}`);
    }
  }

  if (path.endsWith(".png") || path.endsWith(".jpg") || path.endsWith(".jpeg")) {
    const isPng = buffer.toString("ascii", 1, 4) === "PNG";
    const size = isPng ? pngSize(buffer) : jpegSize(buffer);
    if (!size || size.width < 100 || size.height < 100) {
      errors.push(`Suspicious image dimensions: ${publicHref}`);
    }
  }
}

const idPattern = /\sid="([^"]+)"/g;
const ids = new Set([...html.matchAll(idPattern)].map((match) => match[1]));

const hrefPattern = /<a\b[^>]*\shref="([^"]+)"/g;
for (const [, href] of html.matchAll(hrefPattern)) {
  if (href.startsWith("#")) {
    const id = href.slice(1);
    if (id && !ids.has(id)) errors.push(`Missing anchor target: ${href}`);
  }

  if (href.startsWith("/")) {
    const path = `public${href}`;
    validateAsset(path, href);
  }
}

const srcPattern = /<(?:img|script)\b[^>]*\s(?:src)="([^"]+)"/g;
for (const [, src] of html.matchAll(srcPattern)) {
  if (src.startsWith("/")) {
    const path = src.startsWith("/src/") ? src.slice(1) : `public${src}`;
    validateAsset(path, src);
  }
}

const imgTagPattern = /<img\b([^>]*)>/g;
for (const [, attrs] of html.matchAll(imgTagPattern)) {
  const src = attrs.match(/\ssrc="([^"]+)"/)?.[1] ?? "unknown";
  const alt = attrs.match(/\salt="([^"]*)"/)?.[1];
  if (!alt) errors.push(`Missing image alt text: ${src}`);
  if (!attrs.includes('class="hero-logo"') && !src.includes("/assets/logo")) {
    if (!attrs.match(/\swidth="\d+"/)) errors.push(`Missing image width attribute: ${src}`);
    if (!attrs.match(/\sheight="\d+"/)) errors.push(`Missing image height attribute: ${src}`);
    if (!attrs.includes('loading="lazy"')) errors.push(`Missing lazy loading attribute: ${src}`);
    if (!attrs.includes('decoding="async"')) errors.push(`Missing async decoding attribute: ${src}`);
  }
}

const externalLinkPattern = /<a\b([^>]*)\shref="(https?:\/\/[^"]+)"([^>]*)>/g;
for (const [, before, href, after] of html.matchAll(externalLinkPattern)) {
  const attrs = `${before} ${after}`;
  if (!attrs.includes('target="_blank"')) errors.push(`External link missing target blank: ${href}`);
  if (!attrs.includes('rel="noopener"')) errors.push(`External link missing noopener: ${href}`);
}

for (const [label, pattern] of [
  ["description", /<meta\b[^>]*name="description"[^>]*>/],
  ["og:title", /<meta\b[^>]*property="og:title"[^>]*>/],
  ["og:description", /<meta\b[^>]*property="og:description"[^>]*>/],
  ["og:url", /<meta\b[^>]*property="og:url"[^>]*>/],
  ["og:image", /<meta\b[^>]*property="og:image"[^>]*>/],
  ["twitter:card", /<meta\b[^>]*name="twitter:card"[^>]*>/],
  ["theme-color", /<meta\b[^>]*name="theme-color"[^>]*>/],
  ["canonical", /<link\b[^>]*rel="canonical"[^>]*>/],
]) {
  if (!pattern.test(html)) errors.push(`Missing metadata tag: ${label}`);
}

const requiredText = [
  restaurant.name,
  restaurant.phone,
  restaurant.email,
  restaurant.closed,
  restaurant.seats,
  "11:30-14:30",
  "18:00-22:00",
];

validateAsset("public/assets/material-icons.ttf", "/assets/material-icons.ttf");

for (const text of requiredText) {
  if (!html.includes(text)) errors.push(`Missing required text: ${text}`);
}

for (const dish of dishes) {
  for (const value of [dish.title, dish.description, dish.image]) {
    if (!html.includes(value)) errors.push(`Missing dish content: ${value}`);
  }
}

for (const menu of menuPdfs) {
  for (const value of [menu.label, menu.lang, menu.href]) {
    if (!html.includes(value)) errors.push(`Missing menu PDF content: ${value}`);
  }
}

for (const value of [menuDigest.title, menuDigest.sourceNote, ...menuDigest.lunch, ...menuDigest.dinnerHighlights]) {
  if (!normalizedHtml.includes(value.replace(/\s+/g, " "))) {
    errors.push(`Missing menu digest content: ${value}`);
  }
}

for (const category of menuDigest.dinnerCategories) {
  if (!html.includes(category.title)) errors.push(`Missing menu category: ${category.title}`);
  for (const item of category.items) {
    if (!html.includes(item)) errors.push(`Missing menu category item: ${item}`);
  }
}

for (const link of externalLinks) {
  for (const value of [link.label, link.href]) {
    if (!html.includes(value)) errors.push(`Missing external link content: ${value}`);
  }
}

for (const value of Object.values(englishGuide)) {
  if (!normalizedHtml.includes(value.replace(/\s+/g, " "))) {
    errors.push(`Missing English guide content: ${value}`);
  }
}

for (const value of [story.title, story.meaning, ...story.points]) {
  if (!normalizedHtml.includes(value.replace(/\s+/g, " ")) && !normalizedText.includes(value.replace(/\s+/g, " "))) {
    errors.push(`Missing story content: ${value}`);
  }
}

const jsonLdMatch = html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/);
if (!jsonLdMatch) {
  errors.push("Missing JSON-LD script.");
} else {
  try {
    const jsonLd = JSON.parse(jsonLdMatch[1]);
    for (const value of [restaurant.romanName, restaurant.phone, restaurant.email, "Restaurant"]) {
      if (!JSON.stringify(jsonLd).includes(value)) {
        errors.push(`Missing JSON-LD value: ${value}`);
      }
    }
  } catch (error) {
    errors.push(`Invalid JSON-LD: ${error.message}`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

for (const path of ["public/robots.txt", "public/sitemap.xml"]) {
  validateAsset(path, path.replace("public", ""));
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${ids.size} ids, local links, local sources, metadata files, and required text.`);

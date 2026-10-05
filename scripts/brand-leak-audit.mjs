import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const terms = [
  ["mo", "atv"].join(""),
  ["Zor", "ba"].join(""),
  ["Zor", "baTV"].join(""),
  ["Eagle", "Cast"].join(""),
  ["Free", "GoTV"].join(""),
  ["Channel", "Moa"].join(""),
  ["example", "com"].join("."),
];
const ignored = new Set(["node_modules", ".git", ".next", ".qa-screens"]);
const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".md",
  ".mjs",
  ".ts",
  ".tsx",
  ".txt",
  ".xml",
  ".yml",
]);
const hits = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (ignored.has(name)) continue;
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      walk(path);
    } else {
      if (path.endsWith("scripts/brand-leak-audit.mjs")) continue;
      const ext = name.includes(".") ? name.slice(name.lastIndexOf(".")) : "";
      if (!textExtensions.has(ext)) continue;
      const text = readFileSync(path, "utf8");
      for (const term of terms) {
        if (text.toLowerCase().includes(term.toLowerCase())) {
          hits.push(`${path}: ${term}`);
        }
      }
    }
  }
}

walk(process.cwd());

if (hits.length) {
  console.error(hits.join("\n"));
  process.exit(1);
}

console.log("Brand leak audit PASS: 0 forbidden brand/domain references.");

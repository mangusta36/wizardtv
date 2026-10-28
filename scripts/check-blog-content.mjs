import fs from "node:fs";
import Module from "node:module";
import path from "node:path";
import ts from "typescript";

const sourcePath = path.join(process.cwd(), "src/data/blog.ts");
const seoSourcePath = path.join(process.cwd(), "src/data/seo-articles.ts");
const seoSource = fs.readFileSync(seoSourcePath, "utf8");
const seoCompiled = ts.transpileModule(seoSource, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
}).outputText;
const seoModule = new Module(seoSourcePath);
seoModule.paths = Module._nodeModulePaths(process.cwd());
seoModule._compile(seoCompiled, seoSourcePath);
let source = fs.readFileSync(sourcePath, "utf8");
source = source.replace('import { absoluteUrl } from "@/lib/site";', 'const absoluteUrl = (path = "/") => `https://www.wizardtv.vip${path.startsWith("/") ? path : `/${path}`}`;');
source = source.replace('import { seoArticles } from "./seo-articles";', `const seoArticles = ${JSON.stringify(seoModule.exports.seoArticles)};`);

const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
    esModuleInterop: true,
  },
}).outputText;

const mod = new Module(sourcePath);
mod.paths = Module._nodeModulePaths(process.cwd());
mod._compile(compiled, sourcePath);

const { articles } = mod.exports;
const minimumWords = new Map([
  ["best-iptv-subscription-usa-2026", 2000],
  ["best-iptv-for-firestick-2026", 1800],
]);
const visibleText = (article) => [
  article.title,
  article.excerpt,
  ...article.sections.flatMap((section) => [
    section.heading,
    ...section.body,
    ...(section.table ? [section.table.columns.join(" "), ...section.table.rows.map((row) => row.join(" "))] : []),
  ]),
  ...article.faqs.flatMap((faq) => [faq.question, faq.answer]),
].join(" ");

const words = (text) => text.replace(/\[[^\]]+\]\([^)]+\)/g, " ").match(/[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)*/g)?.length ?? 0;
const paragraphs = articles.flatMap((article) =>
  article.sections.flatMap((section) => section.body.map((body) => ({ slug: article.slug, body }))),
);
const duplicates = [];
for (let i = 0; i < paragraphs.length; i += 1) {
  for (let j = i + 1; j < paragraphs.length; j += 1) {
    if (paragraphs[i].body === paragraphs[j].body) duplicates.push([paragraphs[i].slug, paragraphs[j].slug, paragraphs[i].body.slice(0, 80)]);
  }
}

let pass = true;
console.log("Blog content QA");
console.log(`Articles: ${articles.length}/12 ${articles.length === 12 ? "PASS" : "FAIL"}`);
if (articles.length !== 12) pass = false;
for (const article of articles) {
  const count = words(visibleText(article));
  const checks = {
    words: count >= (minimumWords.get(article.slug) ?? 2500),
    toc: article.sections.length >= 4,
    table: article.sections.some((section) => section.table),
    faq: article.faqs.length >= 3,
    hero: Boolean(article.heroImage),
    support: article.supportImages.length >= 2,
    related: article.related.length >= 2,
    sources: article.sources.length >= 1,
  };
  if (Object.values(checks).some((value) => !value)) pass = false;
  console.log(`${checks.words ? "PASS" : "FAIL"} ${count} words | ${article.slug}`);
  for (const [name, ok] of Object.entries(checks)) {
    if (!ok) console.log(`  FAIL ${name}`);
  }
}
console.log(`Duplicate exact paragraphs: ${duplicates.length}`);
if (duplicates.length) {
  pass = false;
  for (const duplicate of duplicates.slice(0, 10)) console.log(`  ${duplicate.join(" | ")}`);
}

process.exit(pass ? 0 : 1);

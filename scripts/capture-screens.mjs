import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import http from "node:http";
import WebSocket from "ws";

const base = process.env.QA_BROWSER_BASE ?? "http://localhost:3000";
const widths = [320, 390, 768, 1024, 1440];
const routes = [
  ["home", "/"],
  ["pricing", "/pricing"],
  ["devices", "/channels"],
  ["faq", "/faq"],
  ["blog", "/blog"],
  ["troubleshooting", "/blog/iptv-buffering-freezing-fixes-2026"],
  ["sports", "/blog/mlb-playoffs-2026-schedule-wizard-tv"],
  ["reseller", "/reseller"],
  ["about", "/about"],
  ["contact", "/contact"],
  ["privacy", "/privacy"],
  ["terms", "/terms"],
  ["refund", "/refund"],
  ["not-found", "/qa-confirmed-missing-page"],
];
const failures = [];
const debugPort = 9223;

mkdirSync(".qa-screens", { recursive: true });

function request(path, method = "GET") {
  return new Promise((resolve, reject) => {
    const req = http.request({ host: "127.0.0.1", port: debugPort, path, method }, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => resolve(data));
    });
    req.on("error", reject);
    req.end();
  });
}

async function waitForDebugPort() {
  for (let index = 0; index < 50; index += 1) {
    try {
      await request("/json/version");
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  throw new Error("Chromium debug port did not open.");
}

function connect(webSocketDebuggerUrl) {
  const ws = new WebSocket(webSocketDebuggerUrl);
  const pending = new Map();
  const waiters = new Map();
  const errors = [];
  let id = 0;

  ws.on("message", (message) => {
    const data = JSON.parse(message);
    if (data.id && pending.has(data.id)) {
      pending.get(data.id)(data);
      pending.delete(data.id);
      return;
    }
    if (data.method === "Runtime.exceptionThrown") {
      errors.push(data.params.exceptionDetails?.text ?? "Uncaught runtime exception");
    }
    if (data.method === "Runtime.consoleAPICalled" && data.params.type === "error") {
      errors.push(data.params.args.map((arg) => arg.value ?? arg.description ?? "console error").join(" "));
    }
    if (data.method === "Log.entryAdded" && data.params.entry.level === "error") {
      errors.push(data.params.entry.text);
    }
    const queue = waiters.get(data.method);
    if (queue?.length) queue.shift()(data.params);
  });

  return {
    open: new Promise((resolve) => ws.on("open", resolve)),
    send(method, params = {}) {
      return new Promise((resolve) => {
        const messageId = ++id;
        pending.set(messageId, resolve);
        ws.send(JSON.stringify({ id: messageId, method, params }));
      });
    },
    waitFor(method, timeout = 10000) {
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error(`${method} timed out`)), timeout);
        const wrapped = (value) => {
          clearTimeout(timer);
          resolve(value);
        };
        const queue = waiters.get(method) ?? [];
        queue.push(wrapped);
        waiters.set(method, queue);
      });
    },
    close() {
      ws.close();
    },
    errors,
  };
}

const browser = spawn("chromium", [
  "--headless=new",
  "--no-sandbox",
  "--disable-gpu",
  `--remote-debugging-port=${debugPort}`,
  "about:blank",
], { stdio: "ignore" });

try {
  await waitForDebugPort();
  for (const [name, path] of routes) {
    for (const width of widths) {
      const target = JSON.parse(await request(`/json/new?${encodeURIComponent(`${base}${path}`)}`, "PUT"));
      const session = connect(target.webSocketDebuggerUrl);
      await session.open;
      await session.send("Page.enable");
      await session.send("Runtime.enable");
      await session.send("Log.enable");
      await session.send("Emulation.setDeviceMetricsOverride", {
        width,
        height: 900,
        deviceScaleFactor: 1,
        mobile: width < 768,
      });
      const loaded = session.waitFor("Page.loadEventFired");
      await session.send("Page.navigate", { url: `${base}${path}` });
      await loaded;

      const audit = await session.send("Runtime.evaluate", {
        expression: `(async () => {
          await document.fonts.ready;
          await new Promise((resolve) => setTimeout(resolve, 250));
          const brokenImages = [...document.images]
            .filter((img) => img.complete && !img.naturalWidth)
            .map((img) => img.currentSrc || img.src);
          const h1Count = document.querySelectorAll("h1").length;
          const overflow = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - window.innerWidth;
          const text = document.body.innerText;
          return { brokenImages, h1Count, overflow, textLength: text.length, title: document.title };
        })()`,
        awaitPromise: true,
        returnByValue: true,
      });
      const result = audit.result.result.value;
      if (result.brokenImages.length) failures.push(`${path} at ${width}px has broken images: ${result.brokenImages.join(", ")}`);
      if (result.h1Count !== 1) failures.push(`${path} at ${width}px has ${result.h1Count} H1 elements`);
      if (result.overflow > 1) failures.push(`${path} at ${width}px overflows by ${result.overflow}px`);
      if (result.textLength < 40) failures.push(`${path} at ${width}px rendered too little text`);

      await session.send("Runtime.evaluate", { expression: "document.activeElement?.blur()" });
      await session.send("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab" });
      await session.send("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab" });
      const keyboardFocus = await session.send("Runtime.evaluate", {
        expression: "document.activeElement?.matches('a, button, input, select, textarea') ?? false",
        returnByValue: true,
      });
      if (!keyboardFocus.result.result.value) failures.push(`${path} at ${width}px did not expose keyboard focus`);

      if (path === "/pricing" && width === 390) {
        const pricing = await session.send("Runtime.evaluate", {
          expression: `(() => {
            const button = [...document.querySelectorAll("button")].find((item) => item.textContent?.trim() === "5 Devices");
            button?.click();
            return Boolean(button);
          })()`,
          returnByValue: true,
        });
        await new Promise((resolve) => setTimeout(resolve, 100));
        const updated = await session.send("Runtime.evaluate", {
          expression: `(() => {
            const order = [...document.querySelectorAll('a')].find((item) => item.textContent?.trim() === "Order Now");
            return document.body.innerText.includes("$122") && order?.href.includes("%24122");
          })()`,
          returnByValue: true,
        });
        if (!pricing.result.result.value || !updated.result.result.value) failures.push("/pricing at 390px did not update the 5-device price and order link");
      }

      if (path === "/faq" && width === 390) {
        const faq = await session.send("Runtime.evaluate", {
          expression: `(() => {
            const buttons = [...document.querySelectorAll('main button[aria-expanded]')];
            buttons[1]?.click();
            return buttons.length > 1;
          })()`,
          returnByValue: true,
        });
        await new Promise((resolve) => setTimeout(resolve, 100));
        const expanded = await session.send("Runtime.evaluate", {
          expression: "document.querySelectorAll('main button[aria-expanded]')[1]?.getAttribute('aria-expanded') === 'true'",
          returnByValue: true,
        });
        if (!faq.result.result.value || !expanded.result.result.value) failures.push("/faq at 390px accordion did not expand");
      }

      if (width < 1024) {
        const menuButton = await session.send("Runtime.evaluate", {
          expression: `(() => {
            const button = document.querySelector('button[aria-label="Toggle navigation"]');
            if (!button) return false;
            button.click();
            return true;
          })()`,
          returnByValue: true,
        });
        await new Promise((resolve) => setTimeout(resolve, 100));
        const menuOpen = await session.send("Runtime.evaluate", {
          expression: `(() => {
            const button = document.querySelector('button[aria-label="Toggle navigation"]');
            return button?.getAttribute("aria-expanded") === "true" && Boolean(document.querySelector("#mobile-menu"));
          })()`,
          returnByValue: true,
        });
        if (!menuButton.result.result.value || !menuOpen.result.result.value) {
          failures.push(`${path} at ${width}px mobile navigation did not open`);
        }
      }

      const screenshot = await session.send("Page.captureScreenshot", { format: "png", fromSurface: true });
      writeFileSync(`.qa-screens/${name}-${width}.png`, Buffer.from(screenshot.result.data, "base64"));
      const unexpectedErrors = path === "/qa-confirmed-missing-page"
        ? session.errors.filter((error) => !error.includes("status of 404"))
        : session.errors;
      if (unexpectedErrors.length) failures.push(`${path} at ${width}px console errors: ${unexpectedErrors.join(" | ")}`);
      session.close();
      await request(`/json/close/${target.id}`);
    }
  }
} finally {
  browser.kill();
}

if (failures.length) {
  console.error(`Browser QA FAIL: ${failures.length} issue(s)`);
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Browser QA PASS: ${routes.length} routes at ${widths.length} widths (${routes.length * widths.length} renders).`);

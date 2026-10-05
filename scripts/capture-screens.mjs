import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import http from "node:http";
import WebSocket from "ws";

const shots = [
  ["home", "/", [390, 768, 1440]],
  ["pricing", "/pricing", [390, 768, 1440]],
  ["devices", "/channels", [390, 1440]],
  ["faq", "/faq", [390, 1440]],
  ["blog", "/blog", [390, 1440]],
  ["reseller", "/reseller", [390, 1440]],
  ["article", "/blog/choose-iptv-plan-devices", [390, 1440]],
];

mkdirSync(".qa-screens", { recursive: true });

for (const [name, path, widths] of shots) {
  for (const width of widths) {
    await capture(name, path, width);
  }
}

console.log("Screenshots captured.");

function request(path, method = "GET") {
  return new Promise((resolve, reject) => {
    const req = http.request({ host: "127.0.0.1", port: 9223, path, method }, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => resolve(data));
    });
    req.on("error", reject);
    req.end();
  });
}

async function waitForDebugPort() {
  for (let index = 0; index < 30; index += 1) {
    try {
      await request("/json/version");
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 150));
    }
  }
  throw new Error("Chromium debug port did not open.");
}

async function capture(name, path, width) {
  const browser = spawn("chromium", [
    "--headless",
    "--no-sandbox",
    "--disable-gpu",
    "--remote-debugging-port=9223",
    "about:blank",
  ]);
  await waitForDebugPort();
  const target = JSON.parse(
    await request(`/json/new?${encodeURIComponent(`http://localhost:3000${path}`)}`, "PUT"),
  );
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  let id = 0;
  const send = (method, params = {}) =>
    new Promise((resolve) => {
      const messageId = ++id;
      ws.send(JSON.stringify({ id: messageId, method, params }));
      ws.on("message", function handler(message) {
        const data = JSON.parse(message);
        if (data.id === messageId) {
          ws.off("message", handler);
          resolve(data);
        }
      });
    });

  await new Promise((resolve) => ws.on("open", resolve));
  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height: 1200,
    deviceScaleFactor: 1,
    mobile: width < 768,
  });
  await send("Page.navigate", { url: `http://localhost:3000${path}` });
  await new Promise((resolve) => setTimeout(resolve, 1200));
  const result = await send("Page.captureScreenshot", { format: "png", fromSurface: true });
  writeFileSync(`.qa-screens/${name}-${width}.png`, Buffer.from(result.result.data, "base64"));
  ws.close();
  browser.kill();
}

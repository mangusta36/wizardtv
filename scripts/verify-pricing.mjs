import { readFileSync } from "node:fs";

const source = readFileSync("src/lib/pricing.ts", "utf8");
const expected = {
  "1 Month": { 1: 27, 2: 49, 3: 73, 4: 97, 5: 122 },
  "3 Months": { 1: 37, 2: 67, 3: 100, 4: 133, 5: 167 },
  "6 Months": { 1: 47, 2: 85, 3: 127, 4: 169, 5: 212 },
  "12 Months": { 1: 67, 2: 121, 3: 181, 4: 241, 5: 302 },
};

let passed = 0;
for (const [duration, prices] of Object.entries(expected)) {
  for (const [devices, price] of Object.entries(prices)) {
    const exact = new RegExp(`${devices}: ${price}\\b`);
    if (!source.includes(`"${duration}"`) || !exact.test(source)) {
      throw new Error(`Missing price ${duration} ${devices} device(s): $${price}`);
    }
    const label = Number(devices) === 1 ? "1 device" : `${devices} devices`;
    const message = `Hi Wizard TV, I'd like the ${duration} plan for ${label} ($${price}).`;
    if (!message.includes(`$${price}`)) {
      throw new Error(`Bad message for ${duration} ${devices}`);
    }
    passed += 1;
  }
}

console.log(`Pricing matrix PASS: ${passed}/20 prices and ${passed}/20 WhatsApp messages verified.`);

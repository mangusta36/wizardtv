export type DeviceCount = 1 | 2 | 3 | 4 | 5;

export type PlanDuration = "1 Month" | "3 Months" | "6 Months" | "12 Months";

export const deviceOptions: DeviceCount[] = [1, 2, 3, 4, 5];

export const planDurations: PlanDuration[] = [
  "1 Month",
  "3 Months",
  "6 Months",
  "12 Months",
];

export const pricing: Record<PlanDuration, Record<DeviceCount, number>> = {
  "1 Month": { 1: 27, 2: 49, 3: 73, 4: 97, 5: 122 },
  "3 Months": { 1: 37, 2: 67, 3: 100, 4: 133, 5: 167 },
  "6 Months": { 1: 47, 2: 85, 3: 127, 4: 169, 5: 212 },
  "12 Months": { 1: 67, 2: 121, 3: 181, 4: 241, 5: 302 },
};

export function formatPrice(price: number) {
  return `$${price}`;
}

export function getPlanPrice(duration: PlanDuration, devices: DeviceCount) {
  return pricing[duration][devices];
}

export function orderMessage(duration: PlanDuration, devices: DeviceCount) {
  const label = devices === 1 ? "1 device" : `${devices} devices`;
  return `Hi Wizard TV, I'd like the ${duration} plan for ${label} (${formatPrice(
    getPlanPrice(duration, devices),
  )}).`;
}

import type { Product, SpecialOffer, DeliveryRule } from "./types";

export const PRODUCTS: Product[] = [
  { code: "R01", name: "Red Widget", price: 32.95 },
  { code: "G01", name: "Green Widget", price: 24.95 },
  { code: "B01", name: "Blue Widget", price: 7.95 },
];

export const SPECIAL_OFFERS: SpecialOffer[] = [
  { type: "buy_sec_half_price", productCode: "R01" },
];

export const DELIVERY_RULES: DeliveryRule[] = [
  { threshold: 0, cost: 4.95 },
  { threshold: 50, cost: 2.95 },
  { threshold: 90, cost: 0 },
];

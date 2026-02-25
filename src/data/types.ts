export type ProductCode = "R01" | "G01" | "B01";

export interface Product {
  code: ProductCode;
  name: string;
  price: number;
}

export interface BasketItem {
  product: Product;
  quantity: number;
}

export interface DeliveryRule {
  threshold: number;
  cost: number;
}

export interface DiscountRule {
  type: "buy_sec_half_price" | "none";
  productCode: ProductCode;
}

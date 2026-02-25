import type {
  Product,
  BasketItem,
  SpecialOffer,
  DeliveryRule,
  ProductCode,
} from "../data/types";

export class Basket {
  private items: BasketItem[] = [];
  private products: Map<ProductCode, Product>;
  private deliveryRules: DeliveryRule[];
  private offers: SpecialOffer[];

  constructor(
    products: Product[],
    deliveryRules: DeliveryRule[],
    offers: SpecialOffer[],
  ) {
    this.products = new Map(products.map((p) => [p.code, p]));
    this.deliveryRules = [...deliveryRules].sort(
      (a, b) => a.threshold - b.threshold,
    );
    this.offers = offers;
  }

  getTotal(): number {
    const subtotalAfterOffers = this.applyOffers();
    const deliveryCost = this.calculateDelivery(subtotalAfterOffers);

    return Math.round((subtotalAfterOffers + deliveryCost) * 100) / 100;
  }

  addItem(productCode: ProductCode): void {
    const product = this.products.get(productCode);
    if (!product) {
      throw new Error(`Product ${productCode} not found`);
    }

    const existingItem = this.items.find(
      (item) => item.product.code === productCode,
    );
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push({ product, quantity: 1 });
    }
  }

  getItems(): BasketItem[] {
    return [...this.items];
  }

  clear() {
    this.items = [];
  }
  
  private calculateDelivery(subtotal: number): number {
    // Sort rules in descending order to find the first matching threshold
    const sortedRules = [...this.deliveryRules].sort(
      (a, b) => b.threshold - a.threshold,
    );

    for (const rule of sortedRules) {
      if (subtotal >= rule.threshold) {
        return rule.cost;
      }
    }

    // Default to highest cost (lowest threshold)
    return this.deliveryRules[0]?.cost || 4.95;
  }

  private applyOffers(): number {
    let total = 0;

    for (const item of this.items) {
      let itemTotal = item.product.price * item.quantity;

      // Check for offers on this product
      for (const offer of this.offers) {
        if (
          offer.type === "buy_sec_half_price" &&
          offer.productCode === item.product.code
        ) {
          const pairs = Math.floor(item.quantity / 2);
          const remainder = item.quantity % 2;
          // For each pair: full price + half price
          itemTotal =
            pairs * (item.product.price + item.product.price / 2) +
            remainder * item.product.price;
        }
      }

      total += itemTotal;
    }

    return Math.round(total * 100) / 100; // Round to 2 decimal places
  }
}

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
    let total = 0;
    return total;
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
}

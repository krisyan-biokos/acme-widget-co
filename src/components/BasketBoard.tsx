import React, { useState } from "react";
import { Basket as BasketLogic } from "../logic/basket";
import type {
  Product,
  ProductCode,
  DeliveryRule,
  SpecialOffer,
  BasketItem,
} from "../data/types";
import { ProductList } from "./ProductList";
import { BasketSummary } from "./BasketSummary";

interface BasketProps {
  products: Product[];
  deliveryRules: DeliveryRule[];
  offers: SpecialOffer[];
}

export const BasketBoard: React.FC<BasketProps> = ({
  products,
  deliveryRules,
  offers,
}) => {
  const [basket] = useState(
    () => new BasketLogic(products, deliveryRules, offers),
  );
  const [items, setItems] = useState<BasketItem[]>([]);
  const [subtotalAfterOffers, setSubtotalAfterOffers] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [total, setTotal] = useState(0);

  // Calculate raw subtotal (before offers)
  const calculateRawSubtotal = (items: BasketItem[]): number => {
    return items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
  };

  // Calculate subtotal after offers
  const calculateSubtotalAfterOffers = (items: BasketItem[]): number => {
    const truncateToTwoDecimals = (value: number): number => {
      return Math.floor(value * 100) / 100;
    };

    return items.reduce((total, item) => {
      const hasOffer = offers.some(
        (offer) =>
          offer.type === "buy_sec_half_price" &&
          offer.productCode === item.product.code,
      );

      // Case 1: No offer applies - simple multiplication
      if (!hasOffer) {
        const standardPrice = item.product.price * item.quantity;
        return total + standardPrice;
      }

      // Case 2: Special offer applies - "buy one get second half price"
      const pairs = Math.floor(item.quantity / 2); // Number of complete pairs
      const remainder = item.quantity % 2; // Remaining single items

      const pairTotal =
        item.product.price + truncateToTwoDecimals(item.product.price / 2);

      const offerTotal = pairs * pairTotal + remainder * item.product.price;

      return total + offerTotal;
    }, 0); // Start with total = 0
  };

  // Calculate delivery cost based on subtotal after offers
  const calculateDeliveryCost = (subtotal: number): number => {
    const sortedRules = [...deliveryRules].sort(
      (a, b) => b.threshold - a.threshold,
    );

    for (const rule of sortedRules) {
      if (subtotal >= rule.threshold) {
        return rule.cost;
      }
    }

    return deliveryRules[0]?.cost || 4.95;
  };

  const updateBasketState = () => {
    const currentItems = basket.getItems();
    setItems(currentItems);

    const subtotalOffers = calculateSubtotalAfterOffers(currentItems);
    setSubtotalAfterOffers(subtotalOffers);

    const delivery = calculateDeliveryCost(subtotalOffers);
    setDeliveryCost(delivery);

    const finalTotal = subtotalOffers + delivery;
    setTotal(Math.round(finalTotal * 100) / 100);
  };

  const handleAddToBasket = (productCode: string) => {
    basket.addItem(productCode as ProductCode);
    updateBasketState();
  };

  const handleClearBasket = () => {
    basket.clear();
    updateBasketState();
  };

  const rawSubtotal = calculateRawSubtotal(items);

  return (
    <div className="basket-container">
      <ProductList products={products} onAddToBasket={handleAddToBasket} />

      <BasketSummary
        items={items}
        subtotal={subtotalAfterOffers}
        rawSubtotal={rawSubtotal}
        deliveryCost={deliveryCost}
        total={total}
      />

      {items.length > 0 && (
        <button onClick={handleClearBasket} className="clear-basket">
          Clear Basket
        </button>
      )}
    </div>
  );
};

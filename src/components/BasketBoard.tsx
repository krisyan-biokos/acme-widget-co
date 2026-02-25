import React, { useState } from "react";
import { Basket as BasketLogic } from "../logic/basket";
import type {
  Product,
  ProductCode,
  DeliveryRule,
  SpecialOffer,
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
  const [items, setItems] = useState(basket.getItems());
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  const calculateSubtotal = (items: ReturnType<typeof basket.getItems>) => {
    return items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
  };

  const updateBasketState = () => {
    const currentItems = basket.getItems();
    setItems(currentItems);
    setTotal(basket.getTotal());
    setSubtotal(calculateSubtotal(currentItems));
  };

  const handleAddToBasket = (productCode: string) => {
    basket.addItem(productCode as ProductCode);
    updateBasketState();
  };

  const handleClearBasket = () => {
    basket.clear();
    updateBasketState();
  };

  // Calculate delivery cost based on subtotal after offers
  const getDeliveryCost = () => {
    if (total === 0) return 0;
    // We can derive delivery cost from total and subtotal
    return Number((total - subtotal).toFixed(2));
  };

  return (
    <div className="basket-container">
      <ProductList products={products} onAddToBasket={handleAddToBasket} />

      <BasketSummary
        items={items}
        subtotal={subtotal}
        deliveryCost={getDeliveryCost()}
        total={total}
        deliveryRules={deliveryRules}
      />

      {items.length > 0 && (
        <button onClick={handleClearBasket} className="clear-basket">
          Clear Basket
        </button>
      )}
    </div>
  );
};

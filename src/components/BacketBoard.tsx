import React from "react";
import type { BasketItem, DeliveryRule } from "../data/types";

interface BacketBoardProps {
  items: BasketItem[];
  subtotal: number;
  deliveryCost: number;
  total: number;
  deliveryRules: DeliveryRule[];
}

export const BacketBoard: React.FC<BacketBoardProps> = ({
  items,
  subtotal,
  deliveryCost,
  total,
}) => {
  const getDeliveryThresholdMessage = (subtotal: number) => {
    if (subtotal >= 90) return "You've qualified for FREE delivery!";
    if (subtotal >= 50)
      return `Add $${(90 - subtotal).toFixed(2)} more for free delivery`;
    return `Add $${(50 - subtotal).toFixed(2)} more for reduced delivery`;
  };

  return (
    <div className="basket-summary">
      <h2>Basket Dashboard</h2>

      {items.length === 0 ? (
        <p className="empty-basket">Your basket is empty</p>
      ) : (
        <>
          <div className="basket-items">
            {items.map((item, index) => (
              <div key={index} className="basket-item">
                <span className="item-name">{item.product.name}</span>
                <span className="item-quantity">x{item.quantity}</span>
                <span className="item-price">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="basket-totals">
            <div className="subtotal">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="delivery">
              <span>Delivery:</span>
              <span>
                {deliveryCost === 0 ? "FREE" : `$${deliveryCost.toFixed(2)}`}
              </span>
            </div>

            <div className="total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="delivery-message">
            {getDeliveryThresholdMessage(subtotal)}
          </div>
        </>
      )}
    </div>
  );
};

import React from "react";
import type { Product } from "../data/types";

interface ProductListProps {
  products: Product[];
  onAddToBasket: (productCode: string) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  onAddToBasket,
}) => {
  return (
    <div className="product-list">
      <h2>Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div
            key={product.code}
            className="product-item"
            style={{
              backgroundColor:
                {
                  R01: "#ffcccc",
                  G01: "#ccffcc",
                  B01: "#ccccff",
                }[product.code] || "",
            }}
          >
            <h3>{product.name}</h3>
            <p className="product-code">Code: {product.code}</p>
            <p className="product-price">Price: £{product.price.toFixed(2)}</p>
            <button onClick={() => onAddToBasket(product.code)}>
              Add to Basket
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

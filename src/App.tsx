import { PRODUCTS, SPECIAL_OFFERS, DELIVERY_RULES } from "./data/baseData";
import { BasketBoard } from "./components/BasketBoard";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Acme Widget Co</h1>
        <p className="tagline">Leading provider of made up widgets</p>
      </header>

      <main>
        <BasketBoard
          products={PRODUCTS}
          deliveryRules={DELIVERY_RULES}
          offers={SPECIAL_OFFERS}
        />
      </main>

      <footer>
        <p>Special Offer: Buy one Red Widget, get the second half price!</p>
      </footer>
    </div>
  );
}

export default App;

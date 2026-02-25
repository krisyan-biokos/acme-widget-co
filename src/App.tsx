import { PRODUCTS } from "./data/baseData";
import { ProductList } from "./components/ProductList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Acme Widget Co</h1>
        <p className="tagline">Leading provider of made up widgets</p>
      </header>

      <main>
        <ProductList
          products={PRODUCTS}
          onAddToBasket={(code) => console.log(`Add ${code} to basket`)}
        />
      </main>

      <footer>
        <p>Special Offer: Buy one Red Widget, get the second half price!</p>
      </footer>
    </div>
  );
}

export default App;

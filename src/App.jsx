import Cart from "./components/CartComponent";
import Header from "./components/Header";
import Meals from "./components/Meals";
import Checkout from "./components/CheckoutComponent";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";

function App() {
  return (
    <UserProgressContextProvider>
    <CartContextProvider>
    <Header />
    <Meals />
    <Cart />
    <Checkout />
    </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;

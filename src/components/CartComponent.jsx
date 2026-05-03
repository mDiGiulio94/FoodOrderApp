import Modal from "./UI/Modal";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../utils/fomratting";
import Buttons from "./UI/Buttons";
import UserProgressContext from "../store/UserProgressContext";
import CartItems from "./CartItems";

export default function Cart() {
  const cartContext = useContext(CartContext);
  const userContext = useContext(UserProgressContext);
  const cartTotal = cartContext.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const handleCloseCart = () => {
    userContext.hideCart();
  };

 const handleGoToCheckout = () => {
    userContext.showCheckout();
  }
  return (
    <Modal className="cart" open={userContext.progress === 'cart'} onClose={ userContext.progress === 'cart' ? handleCloseCart : null}>
      <h2>Cart</h2>
      <ul>
        {cartContext.items.map((item) => (
          <CartItems 
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartContext.addItem(item)}
            onDecrease={() => cartContext.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">Total: {currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Buttons textOnly onClick={handleCloseCart}>Close</Buttons>
        {cartContext.items.length > 0 && (
        <Buttons onClick={handleGoToCheckout} textOnly >Go to checkout</Buttons>
        )}
      </p>
    </Modal>
  );
}

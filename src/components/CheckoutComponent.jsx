import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { useContext } from "react";
import { currencyFormatter } from "../utils/fomratting";
import Buttons from "./UI/Buttons";
import UserProgressContext from "../store/UserProgressContext";
import Input from "./UI/Input";

export default function Checkout(){
const cartContext = useContext(CartContext);
const userContext = useContext(UserProgressContext);

const cartTotal = cartContext.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleClose = () => {
    userContext.hideCheckout();
  }

return <Modal open={userContext.progress === 'checkout'} onClose={handleClose}>
    <form>
        <h2>Checkout</h2>
        <p>TotalAmount:{currencyFormatter.format(cartTotal)}</p>
       <Input id="name" label="Name" type="text" />
       <Input id="email" label="Email" type="email" />
       <Input id="strees" label="Street" type="text" />
       <div className="control-row">
        <Input id="postal-code" label="Postal Code" type="text" />
        <Input id="city" label="City" type="text" />
       </div>
       <p className="modal-actions">
        <Buttons onClick={handleClose} type="button" textOnly>Close</Buttons>
        <Buttons>Submit Order</Buttons>
       </p>
    </form>
</Modal>
}
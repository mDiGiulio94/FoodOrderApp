import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { useContext } from "react";
import { currencyFormatter } from "../utils/fomratting";
import Buttons from "./UI/Buttons";
import UserProgressContext from "../store/UserProgressContext";
import Input from "./UI/Input";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartContext = useContext(CartContext);
  const userContext = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const cartTotal = cartContext.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleClose = () => {
    userContext.hideCheckout();
  };

  const handleFinish = () => {
    userContext.hideCart();
    cartContext.resetCart();
    clearData();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const customerData = Object.fromEntries(formData.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartContext.items,
          customer: customerData,
        },
      }),
    );
  };

  let action = (
    <>
      <Buttons onClick={handleClose} type="button" textOnly>
        Close
      </Buttons>
      <Buttons>Submit Order</Buttons>
    </>
  );

  if (isSending) {
    action = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal open={userContext.progress === "checkout"} onClose={handleFinish}>
        <p>Order submitted successfully!</p>
        <p>We will get back to you with more details via email.</p>
        <p className="modal-actions">
          <Buttons onClick={handleFinish}>Okay</Buttons>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userContext.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>TotalAmount:{currencyFormatter.format(cartTotal)}</p>
        <Input id="name" label="Name" type="text" />
        <Input id="email" label="Email" type="email" />
        <Input id="street" label="Street" type="text" />
        <div className="control-row">
          <Input id="postal-code" label="Postal Code" type="text" />
          <Input id="city" label="City" type="text" />
        </div>
        {error && <Error title="Failed to submit" message={error} />}
        <p className="modal-actions">{action}</p>
      </form>
    </Modal>
  );
}

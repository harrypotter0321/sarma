import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import React, { useContext, useState } from "react";
import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm";

const Cart = (props) => {
  const [showForm, setshowForm] = useState(false);
  const [isSubmitting, setisSubmitting] = useState(false);
  const [submitted, setsubmitted] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `₹ ${cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;

  const cartRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setshowForm(true);
  };

  const submitHandler = async (userData) => {
    setisSubmitting(true);
    await fetch(
      "https://react-food-d6878-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setisSubmitting(false);
    setsubmitted(true);
    console.log(userData);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          name={item.name}
          key={item.id}
          price={item.price}
          amount={item.amount}
          onRemove={cartRemoveHandler.bind(null, item.id)}
          onAdd={cartAddHandler.bind(null, item)}
        ></CartItem>
      ))}
    </ul>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showForm ? (
        <CheckoutForm onConfirm={submitHandler} onCancel={props.onClick} />
      ) : (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onClick}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </>
  );

  const isSubmittingContent = <p>Placing Your Order....</p>;

  const submittedContent = (
    <React.Fragment>
      <p>Succesfully Took Your Order...</p>
      <button className={classes.button} onClick={props.onClick}>
        Close
      </button>
    </React.Fragment>
  );

  return (
    <Modal onShow={props.onClick}>
      {!isSubmitting && !submitted && cartModalContent}
      {isSubmitting && isSubmittingContent}
      {submitted && submittedContent}
    </Modal>
  );
};

export default Cart;

import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import { useContext } from "react";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const price = `₹${props.price.toFixed(2)}`;

  const cartCtx = useContext(CartContext);
  // console.log(cartCtx);

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={classes.meal}>
      <img
        src={props.img}
        width="150px"
        height="100px"
        className={classes.meal_img}
      />
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <MealItemForm id={props.id} onAddToCart={addToCartHandler}></MealItemForm>
    </li>
  );
};

export default MealItem;

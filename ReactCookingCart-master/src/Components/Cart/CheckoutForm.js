import React from "react";
import classes from "./CheckoutForm.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => value.trim() === "";
const isNotSixChars = (value) => value.trim().length !== 6;

export default function CheckoutForm(props) {
  const [formValidity, setformValidity] = useState({
    name: true,
    street: true,
    pin: true,
    city: true,
  });

  const nameInput = useRef();
  const streetInput = useRef();
  const pinInput = useRef();
  const cityInput = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const nameValue = nameInput.current.value;
    const streetValue = streetInput.current.value;
    const pinValue = pinInput.current.value;
    const cityValue = cityInput.current.value;

    const enteredNameIsValid = !isEmpty(nameValue);
    const enteredStreetIsValid = !isEmpty(streetValue);
    const enteredCityIsValid = !isEmpty(cityValue);
    const enteredPinValid = !isNotSixChars(pinValue);

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPinValid;

    setformValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      pin: enteredPinValid,
      city: enteredCityIsValid,
    });

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: nameValue,
      street: streetValue,
      pin: pinValue,
      city: cityValue,
    });
    //submit
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          !formValidity.name && classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInput} />
        {!formValidity.name && <p>Please Enter a Valid Name!</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formValidity.street && classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInput} />
        {!formValidity.street && <p>Please Enter a Valid Street!</p>}
      </div>
      <div
        className={`${classes.control} ${!formValidity.pin && classes.invalid}`}
      >
        <label htmlFor="postal">Pin Code</label>
        <input type="text" id="postal" ref={pinInput} />
        {!formValidity.pin && (
          <p>Please Enter a Valid Pin Code (6 characters long)</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          !formValidity.city && classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInput} />
        {!formValidity.city && <p>Please Enter a Valid City</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
}

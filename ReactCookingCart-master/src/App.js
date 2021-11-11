import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import { useState } from "react";
import CartContextProvider from "./store/CartContextProvider";

function App() {
  const [CartIsShown, setCartIsShown] = useState(false);

  const ShowCartModal = () => {
    setCartIsShown(true);
  };

  const HideCartModal = () => {
    setCartIsShown(false);
  };

  return (
    <CartContextProvider>
      {CartIsShown && <Cart onClick={HideCartModal} />}
      <Header onClick={ShowCartModal}></Header>
      <Meals></Meals>
    </CartContextProvider>
  );
}

export default App;

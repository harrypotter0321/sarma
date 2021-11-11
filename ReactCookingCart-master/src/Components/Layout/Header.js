import HeaderCartButton from "./HeaderCartButton";
import classes from "./Header.module.css";
import mealsImage from "../../assets/meals.jpg";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCartButton onClick={props.onClick}></HeaderCartButton>
      </header>
      {/*prettier-ignore*/}
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="Delicious foods on table"/>
      </div>
    </>
  );
};

export default Header;

import { Fragment } from "react";
import styles from "./ModalButton.module.css";

const Button = (props) => {
  const buttonType = props.type == "primary" ? "submit" : "button";
  const classes =
    styles["button"] + " " + styles[props.type] + " " + styles[props.size] + " " + styles[props.hover]; // r = regular, s = small, xs = extra small

  return (
    <Fragment>
      <button
        className={classes}
        type={buttonType}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.label}
      </button>
    </Fragment>
  );
};

export default Button;

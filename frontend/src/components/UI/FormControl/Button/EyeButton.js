import { Fragment } from "react";
import styles from "./EyeButton.module.css";

const Button = (props) => {
  const buttonType = props.type == "primary" ? "submit" : "button";
  const classes =
    styles["button"] + " " + styles[props.type] + " " + styles[props.size]; // r = regular, s = small, xs = extra small

  return (
    <Fragment>
      <button
        className={classes}
        type={buttonType}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.icon}
      </button>
    </Fragment>
  );
};

export default Button;

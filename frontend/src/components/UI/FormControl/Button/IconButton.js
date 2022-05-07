import { Fragment } from "react";
import styles from "./IconButton.module.css";

const IconButton = (props) => {
  const buttonType = props.type == "primary" ? "submit" : "button";
  const classes =
    styles["button"] + " " + styles[props.type] + " " + styles[props.size];

  return (
    <Fragment>
      <button className={classes} type={buttonType} onClick={props.onClick}>
        {props.svg} {props.label}
      </button>
    </Fragment>
  );
};

export default IconButton;

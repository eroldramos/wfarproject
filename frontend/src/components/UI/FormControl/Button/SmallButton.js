import { Fragment } from "react";
import styles from "./SmallButton.module.css";

const SmallButton = (props) => {
    const buttonType = props.type == "primary" ? "submit" : "button";

    return (
        <Fragment>
            <button className={styles["button"] + " " + styles[props.type]} type={buttonType} onClick={props.onClick}>
                {props.label}
            </button>
        </Fragment>
    );
}

export default SmallButton;
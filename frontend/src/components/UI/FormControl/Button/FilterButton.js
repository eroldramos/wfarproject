import { Fragment } from "react";
import styles from "./FilterButton.module.css";

const FilterButton = (props) => {
    return (
        <Fragment>
            <button className={styles["button"]} type={props.type} onClick={props.onClick}>
                {props.label}
            </button>
        </Fragment>
    );
}

export default FilterButton;
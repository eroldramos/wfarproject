import { Fragment } from "react";
import styles from "./TableCellButton.module.css";

const TableCellButton = (props) => {
    return (
        <Fragment>
            <button className={styles["button"]} type={props.type} onClick={props.onClick}>
                {props.label}
            </button>
        </Fragment>
    );
}

export default TableCellButton;
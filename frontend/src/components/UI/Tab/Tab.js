import styles from "./Tab.module.css";
import { Fragment } from "react";

const Tab = (props) => {

    const items = props.items;

    return (
        <Fragment>
            <ul class={styles["tab"]}>
                {items.map(item => {
                    return (
                    <li key={item.id} 
                        data-id={item.id} 
                        onClick={props.onClick}
                        className={item.id === 1 ? styles["active"] : ""}>
                        {item.label}
                    </li>
                    );
                })}
            </ul>
        </Fragment>
    )
}

export default Tab;
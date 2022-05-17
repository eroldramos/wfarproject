import { Fragment } from "react";
import styles from "./FilterButton.module.css";
import { useNavigate } from "react-router-dom";

const FilterButton = (props) => {

    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate(props.linkTo);
    }

    return (
        <Fragment>
            <button className={styles["button"] + " " + styles["active"]} type={props.type} onClick={onClickHandler}>
                {props.label}
            </button>
        </Fragment>
    );
}

export default FilterButton;
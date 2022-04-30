import { Fragment } from "react";
import MyWFARCard from "./MyWFARCard";
import styles from "./MyWFAR.module.css";

const MyWFAR = (props) => {

    return (
        <div className={styles["my-wfar"]}>
            <MyWFARCard weekTitle="Week 1" weekDate="April 8 - April 14" wfarStatus={3}></MyWFARCard>
        </div>
    )
}

export default MyWFAR;
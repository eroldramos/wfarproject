import { Fragment } from "react";
import MyWFARCard from "./MyWFARCard";
import styles from "./MyWFAR.module.css";

const MyWFAR = (props) => {

    let items = props.items;

    return (
        <div className={styles.myWfar}>

            {items.map(item => {
                return (
                    <MyWFARCard weekTitle={item.weekTitle} weekDate="April 8 - April 14" wfarStatus={item.status} entryNo={item.entryNo} />);
            })}

            
        </div>
    )
}

export default MyWFAR;
import React from "react";
import DropdownField from "../../../UI/FormControl/DropdownField/DropdownField";
import styles from "./WeekFilter.module.css";

const WeekFilter = (props) => {

    console.log("props.selectedWeekNo");
    console.log(props.selectedWeekNo);

    return (
        <div className={styles.weekOptionsContainer}>
            <DropdownField
                id={props.id}
                name={props.name}
                labelName={props.labelName}
                onChange={props.onChange}
                selectedValue={props.selectedWeekNo}
                options={props.weeks}
                size={props.size}
                type={props.type}
            />
        </div>
    );
};

export default WeekFilter;

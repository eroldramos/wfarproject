import React from "react";
import DropdownField from "../../../UI/FormControl/DropdownField/DropdownField";
import styles from "./StatusFilter.module.css";

const StatusFilter = (props) => {
    const WFARSTATUS_FILTER = [ //# 1 - not submitted, 2 - to be checked, 3 - ok, 4 - with revisions
        { label: "All", value: 0 },
        { label: "No Submission", value: 1 },
        { label: "For Checking", value: 2 },
        { label: "Ok", value: 3 },
        { label: "With Revisions", value: 3 },
    ];
    return (
        <div className={styles.StatusOptionsContainer}>
            <DropdownField
                id={props.id}
                name={props.name}
                labelName={props.labelName}
                onChange={props.onChange}
                options={WFARSTATUS_FILTER}
                size={props.size}
                type={props.type}
                selectedValue={props.selectedStatus}
            />
        </div>
    );
};

export default StatusFilter;

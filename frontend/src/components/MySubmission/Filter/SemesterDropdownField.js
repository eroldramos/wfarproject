import { useState, useEffect } from "react";
import DropdownField from "../../UI/FormControl/DropdownField/DropdownField";
import styles from "./SemesterDropdownField.module.css";

const SemesterDropdownField = (props) => {

    let semesters = [];
    props.options.map((semester) => {
        console.log(semester);
        semesters.push({
            value: semester.id,
            label: semester.school_year + " - " + semester.label,
            isSelected: semester.is_active,
        });
    });

    return (
        <div className={styles["filter-component"]}>
            <label>{props.labelName}</label>
            <DropdownField
                id={props.id}
                name={props.name}
                labelName={null}
                onChange={props.onChange}
                options={semesters}
                size={props.size}
                type={props.type}
            />
        </div>
    )
}

export default SemesterDropdownField;
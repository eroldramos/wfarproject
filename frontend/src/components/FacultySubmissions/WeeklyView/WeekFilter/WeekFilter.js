import React from "react";
import WeekOptions from "../../../UI/FormControl/DropdownField/DropdownField";
import styles from "./WeekFilter.module.css";

const weekOptions = (props) => {
  const WEEK_FILTER = [
    { label: "Week 1", id: 1 },
    { label: "Week 2", id: 2 },
    { label: "Week 3", id: 3 },
    { label: "Week 3", id: 3 },
  ];
  return (
    <div className={styles.weekOptionsContainer}>
      <WeekOptions
        id={props.id}
        name={props.name}
        labelName={props.labelName}
        onChange={null}
        options={WEEK_FILTER}
        size={props.size}
        type={props.type}
      />
    </div>
  );
};

export default weekOptions;

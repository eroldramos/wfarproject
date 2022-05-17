import React from "react";
import StatusOptions from "../../../UI/FormControl/DropdownField/DropdownField";
import styles from "./StatusFilter.module.css";

const statusOptions = (props) => {
  const WFARSTATUS_FILTER = [ //# 1 - not submitted, 2 - to be checked, 3 - ok, 4 - with revisions
    { label: "No Submission", id: 1 },
    { label: "For Checking", id: 2 },
    { label: "Ok", id: 3 },
    { label: "With Revisions", id: 3 },
  ];
  return (
    <div className={styles.StatusOptionsContainer}>
      <StatusOptions
        id={props.id}
        name={props.name}
        labelName={props.labelName}
        onChange={null}
        options={WFARSTATUS_FILTER}
        size={props.size}
        type={props.type}
      />
    </div>
  );
};

export default statusOptions;

import React from "react";
import StatusOptions from "../../../UI/FormControl/DropdownField/DropdownField";
import styles from "./StatusFilter.module.css";

const statusOptions = (props) => {
  const SAMPLE_ITEMS = [
    { label: "Overview", id: 1 },
    { label: "sample", id: 2 },
    { label: "sample", id: 3 },
    { label: "sample", id: 3 },
  ];
  return (
    <div className={styles.StatusOptionsContainer}>
      <StatusOptions
        id={props.id}
        name={props.name}
        labelName={props.labelName}
        onChange={null}
        options={SAMPLE_ITEMS}
        size={props.size}
        type={props.type}
      />
    </div>
  );
};

export default statusOptions;

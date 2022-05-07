import React, { Fragment } from "react";
import styles from "./CreateSemester.module.css";

import InputField from "../UI/FormControl/InputField/InputField";
import DateField from "../UI/FormControl/DateField/DateField";
import useValidateInput from "../../hooks/useValidateInput";

const AddWeekRows = (props) => {
  const deleteIcon = (
    <svg
      style={{ cursor: "pointer" }}
      width="30"
      height="30"
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24.9245 13.6667L20.5 18.0912L16.0754 13.6667L13.6666 16.0754L18.0912 20.5L13.6666 24.9246L16.0754 27.3333L20.5 22.9087L24.9245 27.3333L27.3333 24.9246L22.9087 20.5L27.3333 16.0754L24.9245 13.6667ZM20.5 3.41666C11.0529 3.41666 3.41663 11.0529 3.41663 20.5C3.41663 29.9471 11.0529 37.5833 20.5 37.5833C29.947 37.5833 37.5833 29.9471 37.5833 20.5C37.5833 11.0529 29.947 3.41666 20.5 3.41666ZM20.5 34.1667C12.9662 34.1667 6.83329 28.0337 6.83329 20.5C6.83329 12.9662 12.9662 6.83332 20.5 6.83332C28.0337 6.83332 34.1666 12.9662 34.1666 20.5C34.1666 28.0337 28.0337 34.1667 20.5 34.1667Z"
        fill="#AAAAAA"
      />
    </svg>
  );
  return (
    <Fragment>
      <div className={styles["week-rows-container"]}>
        <InputField
          size="rg"
          type="text"
          id="label"
          inputName="label"
          labelName={props.label.length > 0 ? "" : "Label"}
          placeholder="Ex. Week 1"
          onChange={props.onChange}
          onBlur={props.handleLabelTouch}
          value={props.label}
          error={
            props.label.length === 0 && props.labelTouch
              ? "Please enter a week label."
              : null
          }
        />
        <DateField
          size="rg"
          id="startDate"
          inputName="startDate"
          labelName={props.startDate.length > 0 ? "" : "Start Date"}
          onChange={props.onChange}
          onBlur={props.handleStartDateTouch}
          value={props.startDate}
          error={
            props.startDate.length === 0 && props.startDateTouch
              ? "Please select a start date."
              : null
          }
        />
        <DateField
          size="rg"
          id="endDate"
          inputName="endDate"
          labelName={props.endDate.length > 0 ? "" : "End Date"}
          onChange={props.onChange}
          onBlur={props.handleEndDateTouch}
          value={props.endDate}
          error={
            props.endDate.length === 0 && props.endDateTouch
              ? "Please select a end date."
              : null
          }
        />
        <div
          className={styles["delete-icon-container"]}
          onClick={props.onClick}
        >
          {deleteIcon}
        </div>
      </div>
    </Fragment>
  );
};

export default AddWeekRows;

import { Fragment, useState } from "react";
import styles from "./InputField.module.css";

const InputField = (props) => {
  let validationClass = props.error != null ? "invalid" : "";
  const importantClass = props.important === 1 ? "important" : "";
  const label_control = styles["label-control"] + " " + styles[props.noLabel] + " " + styles[props.labelMargin]; // pass no-label-input if ayaw ng label | pass nm for label margin for no margin
  return (
    <div
      className={
        styles["form-control"] +
        " " +
        styles[validationClass] +
        " " +
        styles[props.size] +
        " " +
        styles[props.custom] +
        " " +
        styles[importantClass]
      }
    >
      <label htmlFor={props.id} className={label_control}>{props.labelName}</label>
      <input
        type={props.type}
        id={props.id}
        onChange={props.onChange}
        onBlur={props.onBlur}
        name={props.inputName}
        placeholder={props.placeholder}
        value={props.value}
        pattern={props.pattern}
      />
      <p className="">{props.error}</p>
    </div>
  );
};

export default InputField;

import { Fragment, useState } from "react";
import styles from "./InputField.module.css";

const InputField = (props) => {
  let validationClass = props.error != null ? "invalid" : "";
  const importantClass = props.important === 1 ? "important" : "";

  return (
    <div
      className={
        styles["form-control"] +
        " " +
        styles[validationClass] +
        " " +
        styles[props.size] +
        " " +
        styles[importantClass]
      }
    >
      <label htmlFor={props.id}>{props.labelName}</label>
      <input
        type={props.type}
        id={props.id}
        onChange={props.onChange}
        onBlur={props.onBlur}
        name={props.inputName}
        placeholder={props.placeholder}
        value={props.value}
      />
      <p className="">{props.error}</p>
    </div>
  );
};

export default InputField;

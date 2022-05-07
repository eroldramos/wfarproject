import { Fragment, useState } from "react";
import styles from "./CommentField.module.css";

const InputField = (props) => {
  let validationClass = props.error != null ? "invalid" : "";

  return (
    <div
      className={
        styles["form-control"] +
        " " +
        styles[validationClass] +
        " " +
        styles[props.size]
      }
    >
      <label htmlFor={props.id}>{props.labelName}</label>
      <textarea
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

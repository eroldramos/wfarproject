import { Fragment, useState } from "react";
import './InputField.css';
// import styles from './TextField.module.css';

const TextField = (props) => {

    let classes = "form-control ";
    classes += props.error != null ? "invalid " : "";
    classes += props.size;

    const inputSize = props.inputSize;

    return (
        <div className={classes}>
            <label htmlFor={props.id}>{props.labelName}</label>
            <input type="text" 
                id={props.id}
                onChange={props.onChange}
                name={props.inputName} 
                placeholder={props.placeholder} 
                value={props.value}
                />
            <p className>{props.error}</p>
        </div>
    );
}

export default TextField;
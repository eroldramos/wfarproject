import { Fragment, useState } from "react";
import './InputField.css';

const TextField = (props) => {

    let classes = "form-control ";
    classes += props.error != null ? "invalid " : "";
    classes += props.size;

    return (
        <div className={classes}>
            <label htmlFor={props.id}>{props.labelName}</label>
            <div className="date">
                <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.3 1.72727H14.45V0H12.75V1.72727H4.25V0H2.55V1.72727H1.7C0.765 1.72727 0 2.50455 0 3.45455V17.2727C0 18.2227 0.765 19 1.7 19H15.3C16.235 19 17 18.2227 17 17.2727V3.45455C17 2.50455 16.235 1.72727 15.3 1.72727ZM15.3 17.2727H1.7V6.04545H15.3V17.2727Z" fill="#888888" />
                </svg>
                <input type="text"
                    id={props.id}
                    onChange={props.onChange}
                    name={props.inputName}
                    placeholder="MM/DD/YYYY"
                    value={props.value} />
            </div>
            <p className>{props.error}</p>
        </div>
    );
}

export default TextField;
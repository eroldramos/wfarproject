import { Fragment } from "react";
import './TextField.css';


const TextField = (props) => {
    return (
        <Fragment>
            <label htmlFor={props.id}>{props.label}</label>
            <input type="text" id={props.id} name={props.name} placeholder={props.placeholder}/>
        </Fragment>

    );
}

export default TextField;
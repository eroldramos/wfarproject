import InputField from "../../UI/FormControl/InputField/InputField";
import styles from "./DynamicInputField.module.css";

const DynamicInputField = (props) => {

    const isLastClass = props.isLast === "1" ? "last" : " ";

    const onRemoveHandler = () => {
        props.onRemove(props.index);
    }

    return (
        <div className={styles['input-field-container'] + " " + styles[isLastClass]}>
            
            <input
                type="text"
                id="learningActivity"
                onChange={props.onChange}
                onBlur={props.onBlur}
                name={props.inputName}
                placeholder={props.placeholder}
                value={props.value}
            />
            <p>{props.error}</p>
            {/* delete */}
            <svg className={styles['ic-input-remove']} onClick={onRemoveHandler} width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24.9246 13.6666L20.5 18.0912L16.0754 13.6666L13.6667 16.0754L18.0913 20.5L13.6667 24.9245L16.0754 27.3333L20.5 22.9087L24.9246 27.3333L27.3333 24.9245L22.9088 20.5L27.3333 16.0754L24.9246 13.6666ZM20.5 3.41663C11.0529 3.41663 3.41667 11.0529 3.41667 20.5C3.41667 29.947 11.0529 37.5833 20.5 37.5833C29.9471 37.5833 37.5833 29.947 37.5833 20.5C37.5833 11.0529 29.9471 3.41663 20.5 3.41663ZM20.5 34.1666C12.9663 34.1666 6.83333 28.0337 6.83333 20.5C6.83333 12.9662 12.9663 6.83329 20.5 6.83329C28.0338 6.83329 34.1667 12.9662 34.1667 20.5C34.1667 28.0337 28.0338 34.1666 20.5 34.1666Z" fill="#AAAAAA" />
            </svg>
            {/* add */}
            <svg className={styles['ic-input-add']} onClick={props.onAdd} width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.5 11.9583C19.5604 11.9583 18.7917 12.727 18.7917 13.6666V18.7916H13.6667C12.7271 18.7916 11.9583 19.5604 11.9583 20.5C11.9583 21.4395 12.7271 22.2083 13.6667 22.2083H18.7917V27.3333C18.7917 28.2729 19.5604 29.0416 20.5 29.0416C21.4396 29.0416 22.2083 28.2729 22.2083 27.3333V22.2083H27.3333C28.2729 22.2083 29.0417 21.4395 29.0417 20.5C29.0417 19.5604 28.2729 18.7916 27.3333 18.7916H22.2083V13.6666C22.2083 12.727 21.4396 11.9583 20.5 11.9583ZM20.5 3.41663C11.07 3.41663 3.41667 11.07 3.41667 20.5C3.41667 29.93 11.07 37.5833 20.5 37.5833C29.93 37.5833 37.5833 29.93 37.5833 20.5C37.5833 11.07 29.93 3.41663 20.5 3.41663ZM20.5 34.1666C12.9663 34.1666 6.83333 28.0337 6.83333 20.5C6.83333 12.9662 12.9663 6.83329 20.5 6.83329C28.0338 6.83329 34.1667 12.9662 34.1667 20.5C34.1667 28.0337 28.0338 34.1666 20.5 34.1666Z" fill="#BE5A40" />
            </svg>
        </div>
    );
}

export default DynamicInputField;
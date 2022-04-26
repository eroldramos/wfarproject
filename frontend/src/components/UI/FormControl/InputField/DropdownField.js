import styles from './DropdownField.module.css';

const DropdownField = (props) => {
    return (
        <div class={styles["form-control"] + " " + styles[props.width] + " " + styles[props.height]}>
            <label htmlFor={props.id}>{props.labelName}</label>
            <select class={styles["form-control"]} onChange={props.onChange}>
                {props.options.map(option => {
                    return (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    );
                })}
            </select>
        </div>
    );
}

export default DropdownField;
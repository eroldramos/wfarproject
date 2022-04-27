import styles from './DropdownField.module.css';

const DropdownField = (props) => {
    return (
        <div className={styles["form-control"] + " " + styles[props.type] + " " + styles[props.size]}>
            <label htmlFor={props.id}>{props.labelName}</label>
            <select className={styles["form-control"]} onChange={props.onChange}>
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
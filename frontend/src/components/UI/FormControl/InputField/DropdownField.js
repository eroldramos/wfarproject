import styles from './DropdownField.module.css';

const DropdownField = (props) => {
    return (
        <div class={styles["form-control"] + " " + styles[props.size]}>
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
import styles from './Checkbox.module.css';

const DropdownField = (props) => {
    return (
        <div className={styles["form-control"] + " " + styles[props.type]}>
            <label className={styles["title"]}>{props.label}</label>
            <div className={styles["container"] + " " + styles[props.custom]}>
                <input id={props.id} type="checkbox" value={props.value} onChange={props.onChange} />
                <label className={styles["text"]} htmlFor={props.id}>{props.labelName}</label>   
            </div>
        </div>
    );
}

export default DropdownField;
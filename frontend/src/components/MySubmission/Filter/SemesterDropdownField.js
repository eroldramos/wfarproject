import DropdownField from "../../UI/FormControl/DropdownField/DropdownField";
import styles from "./SemesterDropdownField.module.css";

const SemesterDropdownField = (props) => {

    const SAMPLE_ITEMS = [
        { label: "2021 - 2022 1st Semester", id: 1 },
        { label: "2021 - 2022 2st Semester", id: 2 },
        { label: "2022 - 2023 1st Semester", id: 3 }
    ];

    return (
        <div className={styles["filter-component"]}>
            <label>{props.labelName}</label>
            <DropdownField
                id={props.id}
                name={props.name}
                labelName={null}
                onChange={props.onChange}
                options={SAMPLE_ITEMS}
                size={props.size}
                type={props.type}
            />
        </div>
    )
}

export default SemesterDropdownField;
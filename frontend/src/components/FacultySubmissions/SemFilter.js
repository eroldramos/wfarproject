import SemFilter from "../UI/FormControl/DropdownField/DropdownField";
import styles from "./SemFilter.module.css";
const semFilter = (props) => {
  const SAMPLE_ITEMS = [
    { label: "2021 - 2022 1st Semester", id: 1 },
    { label: "2021 - 2022 2st Semester", id: 2 },
    { label: "2022 - 2023 1st Semester", id: 3 },
  ];
  return (
    <div className={styles.semFilterContainer}>
      <SemFilter
        id={props.id}
        name={props.name}
        labelName={props.labelName}
        onChange={null}
        options={SAMPLE_ITEMS}
        size={props.size}
        type={props.type}
      ></SemFilter>
    </div>
  );
};
export default semFilter;

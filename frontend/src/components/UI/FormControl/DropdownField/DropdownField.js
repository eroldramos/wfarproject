import styles from "./DropdownField.module.css";

const DropdownField = (props) => {

  console.log("dropdown field: ");
  console.log(props.options);

  const onChangeHandler = (event) => {
    props.onChange(event.target.value);
  }

  let validationClass = props.error != null ? "invalid" : "";
  return (
    <div
      className={
        styles["form-control"] +
        " " +
        styles[validationClass] +
        " " +
        styles[props.size] +
        " " +
        styles[props.type]
      }
    >
      <label htmlFor={props.id}>{props.labelName}</label>
      <select
        className={styles["form-control"]}
        onChange={onChangeHandler}
        onBlur={props.onBlur}
      >
        {props.options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
      <p className="">{props.error}</p>
    </div>
  );
};

export default DropdownField;

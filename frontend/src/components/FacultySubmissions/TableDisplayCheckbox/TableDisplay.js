import Checkbox from "../../UI/FormControl/Checkbox/Checkbox";
import styles from "./TableDisplay.module.css";

const tableDisplay = () => {
    const cbTrigger = () =>{
        alert("Change table display!");
    }

  return (
    <div className={styles.checkboxContainter}>
      <Checkbox
        id="sample"
        name="sample"
        label="Table Display"
        labelName="Display Upcoming Weeks"
        onChange={cbTrigger}
        type="filter"
      />
    </div>
  );
};

export default tableDisplay;

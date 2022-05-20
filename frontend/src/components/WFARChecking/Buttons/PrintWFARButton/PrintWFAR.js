import PrintButton from "../../../UI/FormControl/Button/PrintButton"
import styles from "./PrintWFAR.module.css";

const printButton = (props) =>{
    return (
        <div className={styles.printButtonContainer}>
            <PrintButton
                onClick = {props.onClick}
                label = "Export to PDF"
                type = "primary"
            />
        </div>
    );
}

export default printButton;
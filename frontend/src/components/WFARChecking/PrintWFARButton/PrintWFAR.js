import PrintButton from "../../UI/FormControl/Button/PrintButton"
import styles from "./PrintWFAR.module.css";

const printButton = () =>{
    const printWFAR = () => {
        alert("Print WFAR");
    }
    return (
        <div className={styles.printButtonContainer}>
            <PrintButton
                onClick = {printWFAR}
                label = "Print"
                type = "primary"
            />
        </div>
    );
}

export default printButton;
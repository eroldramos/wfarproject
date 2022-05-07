import SmallButton from "../../../UI/FormControl/Button/SmallButton";
import styles from "./Re-CheckWFARButton.module.css"

const checkWFARButton = () =>{
    const checkWFAR = () =>{
        alert("ReCheck WFAR")
    }
    return (
        <div>
            <SmallButton
                onClick = {checkWFAR}
                label="Re-check WFAR"
                type="primary"/>
        </div>
    );
}

export default checkWFARButton;
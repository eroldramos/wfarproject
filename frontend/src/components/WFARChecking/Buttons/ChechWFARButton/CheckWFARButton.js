import SmallButton from "../../../UI/FormControl/Button/SmallButton";
import styles from "./CheckWFARButton.module.css"

const checkWFARButton = () =>{
    const checkWFAR = () =>{
        alert("Check WFAR")
    }
    return (
        <div>
            <SmallButton
                onClick = {checkWFAR}
                label="Check WFAR"
                type="primary"/>
        </div>
    );
}

export default checkWFARButton;
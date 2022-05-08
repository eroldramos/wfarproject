import SmallButton from "../../../UI/FormControl/Button/SmallButton";
import styles from "./SubmitButton.module.css"

const checkWFARButton = () =>{
    const checkWFAR = () =>{
        alert("Submit WFAR")
    }
    return (
        <div>
            <SmallButton
                onClick = {checkWFAR}
                label="Submit
                "
                type="primary"/>
        </div>
    );
}

export default checkWFARButton;
import SmallButton from "../../../UI/FormControl/Button/SmallButton";
import styles from "./SubmitButton.module.css"

const checkWFARButton = (props) =>{

    return (
        <div>
            <SmallButton
                onClick = {props.onClick}
                label="Submit
                "
                type="primary"/>
        </div>
    );
}

export default checkWFARButton;
import Modal from "../../UI/Modal/Modal";
import React ,{useState} from "react";
import styles from "./CheckingModal.module.css"
import CancelButton from "../../UI/FormControl/Button/Button"; 
import SmallButton from "../../UI/FormControl/Button/SmallButton";
import DropdownField from "../../UI/FormControl/DropdownField/DropdownField";

const CheckingModal = (props) =>{
    const CHECKING_OPTIONS = [
        { label: "Ok", value: "1" },
        { label: "With Revisions", value: "2" }
      ];
    
    const labelName = props.label;
    const header = props.header;
    const buttonLabel = props.buttonLabel;
    return (
        <Modal onClose = {props.onClose} size = "m">
            <div className={styles.innerModal}>
                <h3>{header}</h3>
                <DropdownField 
                    id="sample"
                    name="sample"
                    labelName={labelName}
                    onChange={null}
                    options={CHECKING_OPTIONS}
                    size="m"
                    type="select"/>
                <div className={styles.buttonsContainer}>
                    <SmallButton label={buttonLabel} type="primary" size="s"/>
                    <CancelButton label="Cancel" type="cancel" size="s" onClick = {props.onClose}/> 
                </div>
            </div>
        </Modal>
    );
}
export default CheckingModal;
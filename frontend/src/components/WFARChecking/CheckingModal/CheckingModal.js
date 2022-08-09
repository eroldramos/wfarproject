import Modal from "../../UI/Modal/Modal";
import React, { useState } from "react";
import styles from "./CheckingModal.module.css";
import CancelButton from "../../UI/FormControl/Button/Button";
import SmallButton from "../../UI/FormControl/Button/SmallButton";
import CustomDropdownField from "../../UI/FormControl/DropdownField/CustomDropdownField";
import { useDispatch } from "react-redux";
import { changeCheckStatus } from "../../../store/checkWfarActions";
import { useParams } from "react-router-dom";
const CheckingModal = (props) => {
  const CHECKING_OPTIONS = [
    { label: "Ok", value: 3 },
    { label: "With Revisions", value: 4 },
  ];
  const params = useParams();
  const labelName = props.label;
  const header = props.header;
  const buttonLabel = props.buttonLabel;

  const dispatch = useDispatch();

  const [status, setStatus] = useState(3);

  const changeStatus = (event) => {
    setStatus(event.target.value);
  };

  const onUpdateStatus = () => {
    let data = {
      wfar_id: params.id,
    };
    console.log(data, status);
    dispatch(changeCheckStatus(data, status));
    props.onClose();
  };

  return (
    <Modal onClose={props.onClose} size="s">
      <div className={styles.innerModal}>
        <h3>{header}</h3>
        <CustomDropdownField
          id="sample"
          name="sample"
          labelName={labelName}
          onChange={changeStatus}
          options={CHECKING_OPTIONS}
          size="m"
          type="select"
        />
        <div className={styles.buttonsContainer}>
          <SmallButton
            label={buttonLabel}
            type="primary"
            size="s"
            onClick={onUpdateStatus}
          />
          <CancelButton
            label="Cancel"
            type="cancel"
            size="s"
            onClick={props.onClose}
          />
        </div>
      </div>
    </Modal>
  );
};
export default CheckingModal;

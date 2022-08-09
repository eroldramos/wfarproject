import SmallButton from "../../../UI/FormControl/Button/SmallButton";
import styles from "./Re-CheckWFARButton.module.css";
import React, { useState } from "react";
import CheckingModal from "../../CheckingModal/CheckingModal";
const CheckWFARButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <SmallButton
        onClick={() => setIsOpen(true)}
        label="Re-check WFAR"
        type="primary"
      />
      {isOpen && (
        <CheckingModal
          onClose={onClose}
          label="Update the WFAR's status."
          header="Re-checking WFAR"
          buttonLabel="Update"
        />
      )}
    </div>
  );
};

export default CheckWFARButton;

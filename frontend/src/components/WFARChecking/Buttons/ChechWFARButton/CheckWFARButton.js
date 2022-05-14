import SmallButton from "../../../UI/FormControl/Button/SmallButton";
import styles from "./CheckWFARButton.module.css";
import React, { useState } from "react";
import CheckingModal from "../../CheckingModal/CheckingModal";

const CheckWFARButton = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    console.log("ASDSD");
    setIsOpen(false);
  };
  return (
    <div>
      <SmallButton
        onClick={() => setIsOpen(true)}
        label="Check WFAR"
        type="primary"
      />
      {isOpen && (
        <CheckingModal
          onClose={onClose}
          label="Give the WFAR a status."
          header="Checking WFAR"
          buttonLabel="Ok"
        />
      )}
    </div>
  );
};

export default CheckWFARButton;

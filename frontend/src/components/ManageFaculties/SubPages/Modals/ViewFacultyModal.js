import React, { Fragment, useState } from "react";
import Modal from "../../../UI/Modal/Modal";
import styles from "./ViewFacultyStatus.module.css";
import ModalButton from "../../../UI/FormControl/Button/ModalButton";
import EyeButton from "../../../UI/FormControl/Button/EyeButton";
import Button from "../../../UI/FormControl/Button/Button";
import Tab from "../../../UI/Tab/Tab";
const ViewFacultyModal = (props) => {
  let user_type = "Faculty";
  if (props.user_type === 2) {
    user_type = "Area Chair";
  }
  if (props.user_type === 3) {
    user_type = "Department Head";
  }
  const icon = (
    <svg
      width="19"
      height="13"
      viewBox="0 0 19 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.50008 0.5625C5.54175 0.5625 2.16133 3.02458 0.791748 6.5C2.16133 9.97542 5.54175 12.4375 9.50008 12.4375C13.4584 12.4375 16.8388 9.97542 18.2084 6.5C16.8388 3.02458 13.4584 0.5625 9.50008 0.5625ZM9.50008 10.4583C7.31508 10.4583 5.54175 8.685 5.54175 6.5C5.54175 4.315 7.31508 2.54167 9.50008 2.54167C11.6851 2.54167 13.4584 4.315 13.4584 6.5C13.4584 8.685 11.6851 10.4583 9.50008 10.4583ZM9.50008 4.125C8.18591 4.125 7.12508 5.18583 7.12508 6.5C7.12508 7.81417 8.18591 8.875 9.50008 8.875C10.8142 8.875 11.8751 7.81417 11.8751 6.5C11.8751 5.18583 10.8142 4.125 9.50008 4.125Z"
        fill="#BE5A40"
      />
    </svg>
  );

  const SAMPLE_ITEMS = [
    {
      label: "Department Head",
      id: 1,
      side: false,
      onClick: () => null,
    },
    {
      label: "Area Chair",
      id: 2,
      side: false,
      onClick: () => null,
    },
    {
      label: "Faculty",
      id: 3,
      side: false,
      onClick: () => null,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  return (
    <Fragment>
      <Modal onClose={props.onClose}>
        <div className={styles["container"]}>
          <div className={styles["modal-btn-container"]}>
            <EyeButton
              icon={icon}
              type={"primary"}
              size="xs"
              disabled={false}
              onClick={null}
            />
          </div>
          <h1>{props.fullname}</h1>
          <p>{user_type}</p>
          <div className={styles["clearfix"]}></div>
          <Tab items={SAMPLE_ITEMS} currentPage={currentPage} />
          <div className={styles["button-container"]}>
            <div className={styles["cancel-btn-container"]}>
              <Button
                onClick={props.onClose}
                label="Cancel"
                type="cancel"
                size="rg"
              />
            </div>
            <div className={styles["clearfix"]}></div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default ViewFacultyModal;

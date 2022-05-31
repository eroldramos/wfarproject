import React, { Fragment, useState } from "react";
import Modal from "../../../UI/Modal/Modal";
import styles from "./ViewFacultyStatus.module.css";
import ModalButton from "../../../UI/FormControl/Button/ModalButton";
import Button from "../../../UI/FormControl/Button/Button";
const ViewStatusModal = (props) => {
  const icon = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.75 10.25H10.25V17.75H7.75V10.25H0.25V7.75H7.75V0.25H10.25V7.75H17.75V10.25Z"
        fill="#777777"
      />
    </svg>
  );

  let user_type = "Faculty";
  if (props.user_type === 2) {
    user_type = "Area Chair";
  }
  if (props.user_type === 3) {
    user_type = "Department Head";
  }

  const onOpenAssign = () => {
    props.onOpenAssign();
    props.closeViewFacultyModalTransition();
  };

  return (
    <Fragment>
      <Modal onClose={props.closeViewFacultyModal} size="m">
        {/* <h1>User type : {props.user_type}</h1> */}
        <div className={styles["container"]}>
          <div className={styles["header-container"]}>
            <div className={styles["header-text-container"]}>
              <h2>{props.fullname}</h2>
              <h5>{user_type}</h5>
            </div>
            <div className={styles["modal-btn-container"]}>
              <ModalButton
                label={props.assignee_id ? "Assigned" : "Not assigned"}
                type={null === 0 ? "cancel" : "primary"}
                size="s"
                disabled={true}
                onClick={null}
                hover = "hover-none"
              />
            </div>
          </div>

          <div className={styles["clearfix"]}></div>

          {props.assignee_id ? (
            <div onClick={null} className={styles["assign-container2"]}>
              <div className={styles["assigned-to-container"]}>
                <h3>ASSIGNED TO</h3>
              </div>
              <div className={styles["formater"]}>
                <div className={`${styles["assign-btn"]} ${styles["profile"]} `}>
                  <img
                    src={props.assignee_id.profile_picture}
                  />
                </div>
                <div className={styles["position-container"]}>
                  <h3>
                    {props.assignee_id.user_type === 3 && "Department Head"}
                    {props.assignee_id.user_type === 2 && "Area Chair"}
                  </h3>
                  <h3>
                    <strong>{props.assignee_id.last_name}, </strong>
                    {props.assignee_id.first_name} {props.assignee_id.middle_name}
                  </h3>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles["roles-container"]}>
              <div onClick={null} className={styles["assign-container"]}>
                <div className={styles["assign-btn"]} onClick={onOpenAssign}>
                  {icon}
                </div>
                <h3>Assign</h3>
              </div>
            </div>
          )}
          <div className={styles["button-container"]}>
            <div className={styles["cancel-btn-container"]}>
              <Button
                onClick={props.closeViewFacultyModal}
                label="Close"
                type="cancel"
                size="s"
              />
            </div>
            <div className={styles["clearfix"]}></div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default ViewStatusModal;

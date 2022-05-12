import React, { Fragment, useState } from "react";
import Modal from "../../../UI/Modal/Modal";
import styles from "./PromoteDemoteModal.module.css";
import ModalButton from "../../../UI/FormControl/Button/ModalButton";
import Button from "../../../UI/FormControl/Button/Button";
const DemoteModal = (props) => {
  let user_type = "Faculty";
  if (props.user_type === 2) {
    user_type = "Area Chair";
  }
  if (props.user_type === 3) {
    user_type = "Department Head";
  }

  const [facultyIsSelected, setFacultyIsSelected] = useState(false);
  const [areachairIsSelected, setAreachairIsSelected] = useState(false);
  const [departmentheadIsSelected, setDepartmentheadIsSelected] =
    useState(false);

  const [selectedRole, setSelectedRole] = useState(0);

  const selectFaculty = (user_type) => {
    setFacultyIsSelected(true);
    setAreachairIsSelected(false);
    setDepartmentheadIsSelected(false);
    setSelectedRole(1);
  };
  const selectAreachair = (user_type) => {
    setFacultyIsSelected(false);
    setAreachairIsSelected(true);
    setDepartmentheadIsSelected(false);
    setSelectedRole(2);
  };

  const selectDepartmenthead = (user_type) => {
    setFacultyIsSelected(false);
    setAreachairIsSelected(false);
    setDepartmentheadIsSelected(true);
    setSelectedRole(3);
  };

  const demoteRole = () => {
    let data = {
      id: props.id,
      new_user_type: selectedRole,
    };
    console.log(data);
  };
  console.log(selectedRole);
  return (
    <Fragment>
      <Modal onClose={props.onClose}>
        <h1>User type : {props.user_type}</h1>
        <div className={styles["container"]}>
          <div className={styles["modal-btn-container"]}>
            <ModalButton
              label="Demote"
              type={selectedRole === 0 ? "cancel" : "primary"}
              size="rg"
              disabled={selectedRole === 0 ? true : false}
              onClick={demoteRole}
            />
          </div>
          <h1>{props.fullname}</h1>
          <p>{user_type}</p>
          <div className={styles["clearfix"]}></div>

          <div className={styles["roles-container"]}>
            {props.user_type === 1 ? (
              <div></div>
            ) : (
              <div
                onClick={selectFaculty}
                className={
                  facultyIsSelected
                    ? `${styles["roles"]} ${styles["selected"]}`
                    : `${styles["roles"]} ${styles["unselected"]}`
                }
              >
                <h1>Faculty</h1>
              </div>
            )}

            {props.user_type === 2 || props.user_type <= 2 ? (
              <div></div>
            ) : (
              <div
                onClick={selectAreachair}
                className={
                  areachairIsSelected
                    ? `${styles["roles"]} ${styles["selected"]}`
                    : `${styles["roles"]} ${styles["unselected"]}`
                }
              >
                <h1>Area Chair</h1>
              </div>
            )}

            {props.user_type === 3 || props.user_type <= 3 ? (
              <div></div>
            ) : (
              <div
                onClick={selectDepartmenthead}
                className={
                  departmentheadIsSelected
                    ? `${styles["roles"]} ${styles["selected"]}`
                    : `${styles["roles"]} ${styles["unselected"]}`
                }
              >
                <h1>Department Head</h1>
              </div>
            )}
          </div>
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

export default DemoteModal;

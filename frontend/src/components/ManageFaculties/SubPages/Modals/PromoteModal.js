import React, { Fragment, useState, useEffect } from "react";
import Modal from "../../../UI/Modal/Modal";
import styles from "./PromoteDemoteModal.module.css";
import ModalButton from "../../../UI/FormControl/Button/ModalButton";
import Button from "../../../UI/FormControl/Button/Button";
import { changeUserType } from "../../../../store/manageFacultiesActions";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
const PromoteModal = (props) => {
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

  let navigate = useNavigate();
  const dispatch = useDispatch();
  // const changeUserTypeReducerValues = useSelector(
  //   (state) => state.changeUserType
  // );
  // const {
  //   isLoading: userTypeIsLoading,
  //   error: userTypeError,
  //   success: userTypeSuccess,
  // } = changeUserTypeReducerValues;

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

  const promoteRole = () => {
    let data = {
      id: props.id,
      new_user_type: selectedRole,
    };
    console.log(data);
    dispatch(changeUserType(data));
  };
  console.log(selectedRole);
  return (
    <Fragment>
      <Modal onClose={props.onClose} size="m">
        <div className={styles["container"]}>
          <div className={styles["header-container"]}>
            <div className={styles["header-text-container"]}>
              <h2>{props.fullname}</h2>
              <h5>{user_type}</h5>
            </div>
            <div className={styles["modal-btn-container"]}>
              <ModalButton
                label="Promote"
                type={selectedRole === 0 ? "cancel" : "primary"}
                size="s"
                disabled={selectedRole === 0 ? true : false}
                onClick={null}
              />
            </div>
          </div>

          <div className={styles["clearfix"]}></div>

          <div className={styles["roles-container"]}>
            {props.user_type === 1 || props.user_type >= 1 ? (
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
                <h3>Faculty</h3>
              </div>
            )}

            {props.user_type === 2 || props.user_type >= 2 ? (
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
                <h3>Area Chair</h3>
              </div>
            )}

            {props.user_type === 3 ? (
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
                <h3>Department Head</h3>
              </div>
            )}
          </div>
          <div className={styles["button-container"]}>
            <div className={styles["cancel-btn-container"]}>
              <Button
                onClick={props.onClose}
                label="Cancel"
                type="cancel"
                size="s"
              />
            </div>
            <div className={styles["confirm-btn-container"]}>
              <Button
                disabled={selectedRole === 0 ? true : false}
                onClick={promoteRole}
                label="Confirm"
                type="confirm"
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

export default PromoteModal;

import React, { Fragment, useState } from "react";
import styles from "./SemesterRows.module.css";
import PopupMenu from "./PopupMenu";
import { useNavigate } from "react-router-dom";
import { restoreSem } from "../../store/manageSemActions";
import { useDispatch, useSelector } from "react-redux";
const ArchivedSemesterRows = (props) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const ITEMS = [
    {
      id: 1,
      label: "Edit",
      onClick: () => onNavigateEditSemester(props.semId),
    },
    {
      id: 2,
      label: "Restore",
      onClick: () => onRestoreSemester(props.semId),
    },
  ];
  const [popupMenuIsShown, setPopupMenuIsShown] = useState(false);

  const openPopMenuHandler = () => {
    setPopupMenuIsShown(true);
  };

  const closePopMenuHandler = () => {
    setPopupMenuIsShown(false);
  };
  const onNavigateEditSemester = (semId) => {
    navigate(`/edit-semester/${semId}/`);
  };
  const onRestoreSemester = (semId) => {
    dispatch(restoreSem(semId));
    navigate(`/manage-semesters/archives/`);
  };
  return (
    <Fragment>
      <div
        className={styles["sem-container"]}
        onMouseLeave={closePopMenuHandler}
      >
        <strong>
          {props.schoolYear} {props.label}
        </strong>
        <div className={styles["popup-menu-container"]}>
          <span style={{ cursor: "pointer" }} onClick={openPopMenuHandler}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16ZM12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14ZM12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8Z"
                fill="#323232"
              />
            </svg>
          </span>

          {popupMenuIsShown && (
            <PopupMenu items={ITEMS} onMouseLeave={closePopMenuHandler} />
          )}
        </div>
        <div
          className={
            props.isActive
              ? `${styles["active-status"]} ${styles["active"]}`
              : `${styles["active-status"]} ${styles["inactive"]}`
          }
        ></div>
        <div className={styles["clearfix"]}></div>
      </div>
    </Fragment>
  );
};

export default ArchivedSemesterRows;
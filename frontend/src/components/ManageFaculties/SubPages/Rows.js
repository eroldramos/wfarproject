import React, { Fragment, useState, useEffect } from "react";
import table from "./Table.module.css";
import PopupMenu from "../SubComponents/PopupMenu";
import styles from "./Subpages.module.css";
import TableCellButton from "../../UI/FormControl/Button/TableCellButton";
import PromoteModal from "./Modals/PromoteModal";
import DemoteModal from "./Modals/DemoteModal";
import ViewFacultyModal from "./Modals/ViewFacultyModal";
import ViewStatusModal from "./Modals/ViewStatusModal";
import FacultyAssignModal from "./Modals/FacultyAssignModal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Rows = (props) => {
  const ITEMS = [
    {
      id: 1,
      label: "Promote",
      onClick: () => openPromoteModal(),
    },
    {
      id: 2,
      label: "Demote",
      onClick: () => openDemoteModal(),
    },
  ];

  let navigate = useNavigate();
  const [popupMenuIsShown, setPopupMenuIsShown] = useState(false);
  const [promoteModalIsShown, setPromoteModalIsShown] = useState(false);
  const [demoteModalIsShown, setDemoteModalIsShown] = useState(false);
  const [viewFacultyModal, setViewFacultyModal] = useState(false);
  const [facultyAssignModal, setFacultyAssignModal] = useState(false);

  const changeUserTypeReducerValues = useSelector(
    (state) => state.changeUserType
  );
  const {
    isLoading: userTypeIsLoading,
    error: userTypeError,
    success: userTypeSuccess,
  } = changeUserTypeReducerValues;

  useEffect(() => {
    if (userTypeSuccess && !userTypeIsLoading) {
      closePopMenuHandler();
      closePromoteModal();
      closeDemoteModal();
      closeViewFacultyModal();
      closeFacultyAssignModal();
    }
  }, [userTypeSuccess, userTypeIsLoading]);

  const openPopMenuHandler = () => {
    setPopupMenuIsShown(true);
  };

  const closePopMenuHandler = () => {
    setPopupMenuIsShown(false);
  };

  const openPromoteModal = () => {
    setPromoteModalIsShown(true);
  };

  const closePromoteModal = () => {
    setPromoteModalIsShown(false);
  };
  const openDemoteModal = () => {
    setDemoteModalIsShown(true);
  };
  const closeDemoteModal = () => {
    setDemoteModalIsShown(false);
  };
  const openViewFacultyModal = () => {
    setViewFacultyModal(true);
    props.disableSearch();
    console.log("disableSearch");
  };
  const closeViewFacultyModal = () => {
    setViewFacultyModal(false);
    props.enableSearch();
    console.log("enableSearch");
    let urlArray = window.location.pathname.split("/");
    let backHistory = `/${urlArray[1]}/${urlArray[2]}/`;
    navigate(backHistory);
  };

  const closeViewFacultyModalTransition = () => {
    setViewFacultyModal(false);
  };

  const openFacultyAssignModal = () => {
    setFacultyAssignModal(true);
    props.disableSearch();
    console.log("disableSearch", "-------");
  };
  const closeFacultyAssignModal = () => {
    setFacultyAssignModal(false);
    props.enableSearch();
    console.log("enableSearch", "-----------");
    let urlArray = window.location.pathname.split("/");
    let backHistory = `/${urlArray[1]}/${urlArray[2]}/`;
    navigate(backHistory);
  };
  return (
    <Fragment>
      <li className={table["table-row"]} onMouseLeave={closePopMenuHandler}>
        <div className={`${table["col"]} ${table["col-1"]}`}>
          <h5>{props.fullname}</h5>
        </div>
        <div
          className={`${table["col"]} ${table["col-2"]}`}
          data-label="Employee No."
        >
          <h5>{props.emp_no}</h5>
        </div>
        <div
          className={`${table["col"]} ${table["col-3"]}`}
          data-label="Username"
        >
          <h5>{props.username}</h5>
        </div>
        <div
          className={`${table["col"]} ${table["col-4"]}`}
          data-label="Birthdate"
        >
          <h5>{props.birthdate}</h5>
        </div>
        <div className={`${table["col"]} ${table["col-5"]}`} data-label="Email">
          <h5>{props.email}</h5>
        </div>
        <div
          className={`${table["col"]} ${table["col-6"]}`}
          data-label="Contact"
        >
          <h5>{props.contact_no}</h5>
        </div>
        <div
          className={`${table["col"]} ${table["col-7"]}`}
          data-label="Actions"
        >
          <div className={styles["filter-button-container"]}>
            <TableCellButton
              onClick={openViewFacultyModal}
              label={
                props.user_type === 2 || props.user_type === 3
                  ? "View Faculties"
                  : "View Status"
              }
              type="primary"
            ></TableCellButton>
            {props.user_type === 2 || props.user_type === 3
              ? viewFacultyModal && (
                  <ViewFacultyModal
                    onClose={closeViewFacultyModal}
                    id={props.id}
                    fullname={props.fullname}
                    user_type={props.user_type}
                  />
                )
              : viewFacultyModal && (
                  <ViewStatusModal
                    onClose={closeViewFacultyModalTransition}
                    onOpenAssign={openFacultyAssignModal}
                    id={props.id}
                    fullname={props.fullname}
                    user_type={props.user_type}
                    assignee_id={props.assignee_id}
                  />
                )}

            {facultyAssignModal && (
              <FacultyAssignModal
                onClose={closeViewFacultyModal}
                onCloseAssignModal={closeFacultyAssignModal}
                id={props.id}
                fullname={props.fullname}
                user_type={props.user_type}
              />
            )}
          </div>

          <div className={styles["popup-menu-container"]}>
            <div className={styles["popup-icon"]} onClick={openPopMenuHandler}>
              <svg
                style={{ cursor: "pointer" }}
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
            </div>
            {promoteModalIsShown && (
              <PromoteModal
                onClose={closePromoteModal}
                id={props.id}
                fullname={props.fullname}
                user_type={props.user_type}
              />
            )}

            {demoteModalIsShown && (
              <DemoteModal
                onClose={closeDemoteModal}
                id={props.id}
                fullname={props.fullname}
                user_type={props.user_type}
              />
            )}
          </div>
          {popupMenuIsShown && (
            <PopupMenu items={ITEMS} onMouseLeave={closePopMenuHandler} />
          )}

          <div className={styles["clearfix"]}></div>
        </div>
      </li>
    </Fragment>
  );
};

export default Rows;

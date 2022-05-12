import React, { Fragment, useState } from "react";
import table from "./Table.module.css";
import PopupMenu from "../SubComponents/PopupMenu";
import styles from "./Subpages.module.css";
import FilterButton from "../../UI/FormControl/Button/FilterButton";
import PromoteModal from "./Modals/PromoteModal";
import DemoteModal from "./Modals/DemoteModal";
import ViewFacultyModal from "./Modals/ViewFacultyModal";
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

  const [popupMenuIsShown, setPopupMenuIsShown] = useState(false);
  const [promoteModalIsShown, setPromoteModalIsShown] = useState(false);
  const [demoteModalIsShown, setDemoteModalIsShown] = useState(false);

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
  return (
    <Fragment>
      <li className={table["table-row"]} onMouseLeave={closePopMenuHandler}>
        <div
          className={`${table["col"]} ${table["col-1"]}`}
          data-label="Full Name"
        >
          {props.fullname}
        </div>
        <div
          className={`${table["col"]} ${table["col-2"]}`}
          data-label="Employee No."
        >
          {props.emp_no}
        </div>
        <div
          className={`${table["col"]} ${table["col-3"]}`}
          data-label="Username"
        >
          {props.username}
        </div>
        <div
          className={`${table["col"]} ${table["col-4"]}`}
          data-label="Birthdate"
        >
          {props.birthdate}
        </div>
        <div className={`${table["col"]} ${table["col-5"]}`} data-label="Email">
          {props.email}
        </div>
        <div
          className={`${table["col"]} ${table["col-6"]}`}
          data-label="Contact"
        >
          {props.contact_no}
        </div>
        <div
          className={`${table["col"]} ${table["col-7"]}`}
          data-label="Actions"
        >
          <div className={styles["filter-button-container"]}>
            <FilterButton
              label={
                props.user_type === 2 || props.user_type === 3
                  ? "View Faculties"
                  : "View Status"
              }
              type="primary"
            ></FilterButton>
            <ViewFacultyModal
              id={props.id}
              fullname={props.fullname}
              user_type={props.user_type}
            />
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
            {popupMenuIsShown && (
              <PopupMenu items={ITEMS} onMouseLeave={closePopMenuHandler} />
            )}
          </div>
          <div className={styles["clearfix"]}></div>
        </div>
      </li>
    </Fragment>
  );
};

export default Rows;
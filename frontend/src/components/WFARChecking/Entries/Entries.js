import styles from "./Entries.module.css";
import React, { useState, Fragment, useEffect } from "react";
import EntryData from "./ExpandedEntry/EntryData";
import PopupMenu from "../PopupMenu/PopupMenu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { archiveWfarEntry } from "../../../store/myWfarsActions";
import Swal from "sweetalert2";

const Entries = (props) => {
  const expandAttachments = () => {};
  const [isFacultyView, setIsFacultyView] = useState(true);
  const [expandIsCLicked, setExpandIsCLicked] = useState(false);

  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // use states
  const [displayPopup, setDisplayPopup] = useState("close");
  const [isArchive, setIsArchive] = useState(false);

  // constants
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // props
  let wfarId = props.entry.id;
  let id = props.entry.id;
  let wfarWeekNo = props.week_no;

  const onEditClickHandler = () => {
    console.log(props.entry);
    navigate(
      "/mySubmission/wfar/" +
        wfarId +
        "/week/" +
        wfarWeekNo +
        "/edit-entry/" +
        id
    );
  };

  // handlers
  const onArchiveClickHandler = () => {
    Swal.fire({
      html:
        "<h4>Archiving Entry from WFAR Week " +
        wfarWeekNo +
        "</h4>" +
        "<h5>Are you sure you want to archive this entry?</h5>",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Submit",
      iconColor: "#D1D1D1",
      confirmButtonColor: "#BE5A40",
      cancelButtonColor: "#A1A1A1",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsArchive(true);
      }
    });
  };

  // handlers
  const onClickMoreOptionsHandler = () => {
    let display = displayPopup === "open" ? "close" : "open";
    setDisplayPopup(display);
  };

  // use effects
  useEffect(() => {
    if (isArchive) {
      console.log("i am in use effect");
      dispatch(archiveWfarEntry(id));
      setIsArchive(false);
    }
  }, [isArchive]);

  // popup
  const popup_items = [
    {
      id: 1,
      label: "Edit",
      onClick: onEditClickHandler,
    },
    {
      id: 2,
      label: "Archive",
      onClick: onArchiveClickHandler,
    },
  ];

  return (
    <Fragment>
      {props.entry && (
        <div className={styles.entries}>
          <div className={styles.detailsContainer}>
            <div className={styles.entryTextContainer}>
              <h3>Entry # {props.number}</h3>
              <h3>Date Accomplished: </h3>
              <p>{props.entry.accomplishment_date}</p>
            </div>
            <div className={styles.attachmentContainer}>
              <h3>{props.entry.attachments.length == 0 && "No attachments"}</h3>
              {!expandIsCLicked && (
                <div
                  className={styles.chevronDown}
                  onClick={() => setExpandIsCLicked(true)}
                >
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 1.41L10.59 -6.16331e-08L6 4.58L1.41 -4.62904e-07L-6.16331e-08 1.41L6 7.41L12 1.41Z"
                      fill="#323232"
                    />
                  </svg>
                </div>
              )}
              {expandIsCLicked && (
                <div
                  className={styles.chevronUp}
                  onClick={() => setExpandIsCLicked(false)}
                >
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.8793 15.0261L11.9993 11.1461L8.1193 15.0261C7.7293 15.4161 7.0993 15.4161 6.7093 15.0261C6.3193 14.6361 6.3193 14.0061 6.7093 13.6161L11.2993 9.0261C11.6893 8.6361 12.3193 8.6361 12.7093 9.0261L17.2993 13.6161C17.6893 14.0061 17.6893 14.6361 17.2993 15.0261C16.9093 15.4061 16.2693 15.4161 15.8793 15.0261Z"
                      fill="#323232"
                    />
                  </svg>
                </div>
              )}
              {isFacultyView && props.status === 1 && (
                <div className={styles.moreSettingsContainer}>
                  <svg
                    onClick={onClickMoreOptionsHandler}
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

                  <div
                    className={styles["pop-up"] + " " + styles[displayPopup]}
                  >
                    <ul>
                      {popup_items.map((item) => {
                        return (
                          <li key={item.id} onClick={item.onClick}>
                            {item.label}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              )}
              {/* Faculty edit settings */}
            </div>
          </div>
          {/* <div className={styles.lineBreak}></div> */}
          {expandIsCLicked && (
            <div className={styles.expandedEntry}>
              {/* Pag di pa ciniclick yung expand wala pa to  */}
              <EntryData entry={props.entry}></EntryData>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};
export default Entries;

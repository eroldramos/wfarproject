import styles from "./PostedComments.module.css";
import ProfileImage from "../../../assets/profile.png";
import { Fragment } from "react";
import PopupMenu from "../PopupMenu/PopupMenu";
import Swal from "sweetalert2";
import { useState } from "react";
import { deleteComment } from "../../../store/checkWfarActions";
import { useDispatch } from "react-redux";
const PostedComments = (props) => {
  // const facultyImage = "";
  // const facultyName = "Dela Rosa, Aaron M.";
  // const timeAgo = "10 mins ago";
  // const comment = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";

  const dispatch = useDispatch();
  const [popupMenuIsShown, setPopupMenuIsShown] = useState(false);

  const openPopMenuHandler = () => {
    setPopupMenuIsShown(true);
  };

  const closePopMenuHandler = () => {
    setPopupMenuIsShown(false);
  };

  const ITEMS = [
    {
      id: 1,
      label: "Edit",
      onClick: () => props.onClick(),
    },
    {
      id: 2,
      label: "Delete",
      onClick: () => onDeleteComment(props.comment.id),
    },
  ];

  const onDeleteComment = (id) => {
    Swal.fire({
      html:
        "<h4>Are you sure you want to delete this comment?</h4>" +
        "<h5>Delete comment.</h5>",
      icon: "warning",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      iconColor: "#D1D1D1", // question icon color
      confirmButtonColor: "#BE5A40",
      cancelButtonColor: "#A1A1A1",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteComment(id));
      } else if (result.isDenied) {
        alert("denied!");
      } else if (result.isDismissed) {
      }
    });
  };
  return (
    <Fragment>
      {props.comment && (
        <div
          className={styles.postedComments}
          onMouseLeave={closePopMenuHandler}
        >
          <div className={styles.senderDetailsContainer}>
            <div className={styles.imageContainer}>
              <div className={styles.profileContainer}>
                <div
                  style={{
                    backgroundImage:
                      "url(" + props.comment.faculty.profile_picture + ")",
                  }}
                ></div>
              </div>
            </div>
            <div className={styles.details_TimeContainer}>
              <h5>
                {`${props.comment.faculty.last_name}, ${props.comment.faculty.first_name} ${props.comment.faculty.middle_name}`}{" "}
              </h5>
              <h5>{props.comment.created_at}</h5>
            </div>
            <div
              className={styles.moreContainer}
              style={{ cursor: "pointer" }}
              onClick={openPopMenuHandler}
            >
              {popupMenuIsShown && (
                <PopupMenu items={ITEMS} onMouseLeave={closePopMenuHandler} />
              )}

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
            </div>
          </div>
          <div className={styles.contentContainer}>
            <h5>{props.comment.description}</h5>
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default PostedComments;

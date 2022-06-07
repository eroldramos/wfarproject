import React, { Fragment, useState, useEffect } from "react";
import styles from "./WFARChecking.module.css";
import PrintWFARButton from "./Buttons/PrintWFARButton/PrintWFAR";
import CheckWFARButton from "./Buttons/ChechWFARButton/CheckWFARButton";
import ReCheckWFARButton from "./Buttons/Re-CheckWFARButton/Re-CheckWFARButton";
import SubmitWFARButton from "./Buttons/SubmitWFARButton/SubmitButton";
import SubmissionDetails from "./SubmissionDetails/SubmissionDetails";
import Status_Check from "./Status_&Checked/Status_&Checked";
import Entries from "./Entries/Entries";
import CommentInputs from "./Comments/CommentInput";
import PostedComments from "./Comments/PostedComments";
import { useSelector, useDispatch } from "react-redux";
import { getCheckWfar } from "../../store/checkWfarActions";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { submitWfar, unsubmitWfar } from "../../store/myWfarsActions";
import SmallButton from "../UI/FormControl/Button/SmallButton";
import { printWfarIndividual } from "../../store/wfarActions";

const WFARChecking = () => {
  //

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUnsubmitted, setIsUnsubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted === true && wfarData !== null) {
      dispatch(submitWfar(wfarData.id, wfarData.week_no));
      setIsSubmitted(false);
    }
  }, [isSubmitted]);

  useEffect(() => {
    if (isUnsubmitted === true && wfarData !== null) {
      dispatch(unsubmitWfar(wfarData.id, wfarData.week_no));
      setIsUnsubmitted(false);
    }
  }, [isUnsubmitted]);

  const params = useParams();

  const userInfo = useSelector((state) => state.login.userInfo);

  const [isNotFaculty, setIsNotFaculty] = useState(true);
  const [isOwner, setIsOwner] = useState(true);
  const [isChecked, setIsChecked] = useState(true);
  const [wfarData, setWfarData] = useState({
    id: 2,
    status: 4,
    checked_at: null,
    submitted_at: "May 19, 2022 02:57 AM",
    week_no: 2,
    semester: {
      id: 1,
      label: "a",
      school_year: "2021-2022",
      is_active: true,
    },
    faculty: {
      id: 1,
      last_name: "Ramos",
      first_name: "Erold",
      middle_name: "fsdf",
      profile_picture: "/images/avatar.svg",
    },
    entries: [
      {
        id: 1,
        accomplishment_date: "2022-05-17",
        subject: "eqweqw",
        course_year_section: "rqw",
        no_of_attendees: 3,
        recording_url: "rqwr",
        attachments: [
          {
            id: 1,
            image_uri: "/images/uploads/ReactJS_Udemy.jpg",
            type: 1,
          },
          {
            id: 2,
            image_uri: "/images/uploads/ReactJS_Udemy_5gMVIit.jpg",
            type: 2,
          },
        ],
        activities: [
          {
            id: 1,
            description: "213",
          },
        ],
      },
    ],
    comments: [
      {
        id: 1,
        created_at: "2022-05-19T15:07:57.835371+08:00",
        faculty: {
          id: 5,
          last_name: "Ramos",
          first_name: "Erold",
          middle_name: "Galang",
          profile_picture: "/images/avatar.svg",
        },
        description: "tama ang pag kakalagay",
      },
      {
        id: 2,
        created_at: "2022-05-19T15:57:11.780943+08:00",
        faculty: {
          id: 2,
          last_name: "Ramos",
          first_name: "Erold",
          middle_name: "Galang",
          profile_picture: "/images/avatar.svg",
        },
        description: "hello world",
      },
      {
        id: 3,
        created_at: "2022-05-19T17:09:13.666421+08:00",
        faculty: {
          id: 3,
          last_name: "Ramos",
          first_name: "Erold",
          middle_name: "Galang",
          profile_picture: "/images/avatar.svg",
        },
        description: "hello world 2",
      },
      {
        id: 4,
        created_at: "2022-05-19T17:09:46.538159+08:00",
        faculty: {
          id: 3,
          last_name: "Ramos",
          first_name: "Erold",
          middle_name: "Galang",
          profile_picture: "/images/avatar.svg",
        },
        description: "hello world 3",
      },
      {
        id: 5,
        created_at: "2022-05-19T17:13:54.265314+08:00",
        faculty: {
          id: 3,
          last_name: "Ramos",
          first_name: "Erold",
          middle_name: "Galang",
          profile_picture: "/images/avatar.svg",
        },
        description: "hello world 3",
      },
    ],
  });

  const dispatch = useDispatch();

  const postCommentReducerValues = useSelector((state) => state.postComment);
  const { isLoading: postCommentIsLoading } = postCommentReducerValues;

  const updateCommentReducerValues = useSelector(
    (state) => state.updateComment
  );
  const { isLoading: updateCommentIsLoading } = updateCommentReducerValues;

  const deleteCommentReducerValues = useSelector(
    (state) => state.deleteComment
  );
  const { isLoading: deleteCommentIsLoading } = deleteCommentReducerValues;

  const getCheckWfarReducerValues = useSelector((state) => state.getCheckWfar);
  const { isLoading, error, wfar } = getCheckWfarReducerValues;

  const changeCheckStatusrReducerValues = useSelector(
    (state) => state.changeCheckStatus
  );
  const { isLoading: changeCheckStatusIsLoading } =
    changeCheckStatusrReducerValues;

  const [getComment, setGetComment] = useState({});

  useEffect(() => {
    dispatch(getCheckWfar(params.id));
  }, [
    dispatch,
    params.id,
    postCommentIsLoading,
    changeCheckStatusIsLoading,
    updateCommentIsLoading,
    deleteCommentIsLoading,
    isSubmitted,
    isUnsubmitted,
  ]);

  useEffect(() => {
    if (wfar) {
      setWfarData(wfar);
    }
  }, [wfar]);

  console.log(getComment);

  const printError = useSelector((state) => state.wfarPrintOverview.error);

  useEffect(() => {
    if (printError != null) {
      Swal.fire({
        html: "<h5>" + printError + "</h5>",
        icon: "error",
        confirmButtonColor: "#BE5A40",
      });
    }
  }, [printError]);

  const onClickExportHandler = () => {
    // setIsPrintOverview(true);
    if (wfarData !== null) {
      // alert("id: " + wfarData.id);
      dispatch(printWfarIndividual(wfarData.id));
    }
  };

  const [jsxCodeForCheckButton, setJsxCodeForCheckButton] = useState("");
  const [jsxCodeForSubmitButton, setJsxCodeForSubmitButton] = useState("");
  const [jsxCodeForEntries, setJsxCodeForEntries] = useState("");
  // let jsxCodeForCheckButton;

  const onSubmitOnClickHandler = () => {
    Swal.fire({
      html:
        "<h4>Submit WFAR</h4>" +
        "<h5>Are you sure you want to submit WFAR?</h5>",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Submit",
      iconColor: "#D1D1D1",
      confirmButtonColor: "#BE5A40",
      cancelButtonColor: "#A1A1A1",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsSubmitted(true);
      }
    });
  };

  const onUnsubmitOnClickHandler = () => {
    Swal.fire({
      html:
        "<h4>Unsubmit WFAR</h4>" +
        "<h5>Are you sure you want to unsubmit your WFAR for Week " +
        wfarData.week_no +
        "?</h5>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Unsubmit",
      confirmButtonColor: "#BE5A40",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setIsUnsubmitted(true);
      }
    });
  };

  useEffect(() => {
    if (userInfo !== null && wfarData !== null) {
      if (wfarData.faculty !== null) {
        let timer1 = setTimeout(() => {
          console.log("userInfo");
          console.log(userInfo.id);
          console.log("wfarData.faculty");
          console.log(wfarData.faculty);
          console.log(wfarData.faculty.id);
          if (userInfo.id !== wfarData.faculty.id) {
            // jsxCodeForCheckButton = !wfarData.checked_at ? (<CheckWFARButton />) : (<ReCheckWFARButton />);
            setIsOwner(false);
            console.log("set is owner 1 " + isOwner);
            setJsxCodeForCheckButton(() => {
              return !wfarData.checked_at ? (
                <Fragment>
                  <PrintWFARButton onClick={onClickExportHandler} />
                  <CheckWFARButton />
                </Fragment>
              ) : (
                <Fragment>
                  <PrintWFARButton onClick={onClickExportHandler} />
                  <ReCheckWFARButton />
                </Fragment>
              );
            });
          } else {
            setIsOwner(true);
            console.log("set is owner 2 " + isOwner);
            if (wfarData.status === 1 && wfarData.entries.length > 0) {
              setJsxCodeForSubmitButton(
                <Fragment>
                  <PrintWFARButton onClick={onClickExportHandler} />
                  <SubmitWFARButton onClick={onSubmitOnClickHandler} />
                </Fragment>
              );
            } else if (wfarData.status === 2 || wfarData.status === 4) {
              setJsxCodeForSubmitButton(
                <Fragment>
                  <PrintWFARButton onClick={onClickExportHandler} />
                  <div>
                    <SmallButton
                      onClick={onUnsubmitOnClickHandler}
                      label="Unsubmit"
                      type="primary"
                    />
                  </div>
                </Fragment>
              );
            }
          }

          if (wfarData.entries.length > 0) {
            setJsxCodeForEntries(<h3 className={styles.Label}>Entries:</h3>);
          } else {
            setJsxCodeForEntries(
              <h3 className={styles.Label}>No entries yet.</h3>
            );
          }
        }, 500);

        return () => {
          clearTimeout(timer1);
        };
      }
    }
  }, [userInfo, wfarData]);

  return (
    <Fragment>
      {wfarData && (
        <div>
          <div className={styles.firstContainer}>
            <h2>Viewing WFAR</h2>
            <div className={styles.print_CheckContainer}>
              {/* {userInfo !== null 
                (!wfarData.checked_at ? (
                <CheckWFARButton />
              ) : (
                <ReCheckWFARButton />
              )) } */}
              {jsxCodeForCheckButton}

              {/* Gagawin pang dynamic */}
              {jsxCodeForSubmitButton}
              {/* Gagawin pang dynamic */}
            </div>
          </div>
          <div className={styles.secondContainer}>
            <SubmissionDetails
              faculty={wfarData.faculty}
              semester={wfarData.semester}
              submitted_at={wfarData.submitted_at}
              week_no={wfarData.week_no}
            />

            <Status_Check
              status={wfarData.status}
              checked_at={wfarData.checked_at}
            />

            {/* Pag dipa nachecheck wala to   */}
          </div>
          <div className={styles.mainContainer}>
            <div className={styles.entriesContainer}>
              {jsxCodeForEntries}
              {wfarData.entries &&
                wfarData.entries.map((entry, index) => (
                  <Entries
                    entry={entry}
                    week_no={wfarData.week_no}
                    status={wfarData.status}
                    key={index}
                    number={index + 1}
                  />
                ))}
            </div>
            {/* <span className={styles.divider}/> */}
            <div className={styles.commentsContainer}>
              {!isOwner && <h3 className={styles.Label}> Comments/Remarks</h3>}
              {isNotFaculty && !isOwner && (
                <CommentInputs
                  id={params.id}
                  getComment={getComment}
                  setGetComment={setGetComment}
                />
              )}
              {/* Pag faculty mag sasubmit wala to  */}
              {wfarData.comments &&
                wfarData.comments.map((comment) => (
                  <PostedComments
                    comment={comment}
                    onClick={() =>
                      setGetComment({
                        id: comment.id,
                        description: comment.description,
                      })
                    }
                  ></PostedComments>
                ))}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default WFARChecking;

import React, { Fragment } from "react";
import styles from "./SubmissionDetails.module.css";
const SubmissionDetails = (props) => {
  return (
    <Fragment>
      {props.faculty && props.semester && (
        <div className={styles.submissionDetailsContainer}>
          <div className={styles.facultyNameContainer}>
            <h3>
              <b>{props.faculty.last_name}</b>, {props.faculty.first_name}{" "}
              {props.faculty.middle_name}
            </h3>
          </div>
          <div className={styles.WeekContainer}>
            <h3>
              Week {props.week_no} - S.Y. {props.semester.school_year}{" "}
              {props.semester.label}
            </h3>
          </div>
          {props.submitted_at !== null && <div className={styles.dateContainer}>
            <h3>Submitted on: </h3>
            <p>{props.submitted_at}</p>
          </div>}
        </div>
      )}
    </Fragment>
  );
};

export default SubmissionDetails;

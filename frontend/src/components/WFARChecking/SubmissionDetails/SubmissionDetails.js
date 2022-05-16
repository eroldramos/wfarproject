import React from "react";
import styles from "./SubmissionDetails.module.css";
const SubmissionDetails = () =>{
    return (
        <div className={styles.submissionDetailsContainer}>
            <div className={styles.facultyNameContainer}>
                <h5><b>Dela Rosa</b>, Aaron Paul</h5>
            </div>
            <div className={styles.WeekContainer}>
                <h5>Week 4 - S.Y. 2021 - 2022 1st Semester</h5>
            </div>
            <div className={styles.dateContainer}>
                <h5><b>Submitted on:</b> April 16, 2021 7:25 pm</h5>
            </div>
        </div>
    );
}

export default SubmissionDetails;
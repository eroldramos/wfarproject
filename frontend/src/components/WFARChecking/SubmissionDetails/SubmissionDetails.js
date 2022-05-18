import React from "react";
import styles from "./SubmissionDetails.module.css";
const SubmissionDetails = () =>{
    return (
        <div className={styles.submissionDetailsContainer}>
            <div className={styles.facultyNameContainer}>
                <h3><b>Dela Rosa</b>, Aaron Paul</h3>
            </div>
            <div className={styles.WeekContainer}>
                <h3>Week 4 - S.Y. 2021 - 2022 1st Semester</h3>
            </div>
            <div className={styles.dateContainer}>
                <h3>Submitted on: </h3>
                <p>April 16, 2021 7:25 pm</p>
            </div>
        </div>
    );
}

export default SubmissionDetails;
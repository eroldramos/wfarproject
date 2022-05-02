import React from "react";
import styles from "./SubmissionDetails.module.css";
import Name from "./Name/FacultyName"
import Date from "./Date/Date"
import SemWeek from "./SemWeek/SemWeek"
const SubmissionDetails = () =>{
    return (
        <div className={styles.submissionDetailsContainer}>
            <Name/>
            <SemWeek/>
            <Date/>
        </div>
    );
}

export default SubmissionDetails;
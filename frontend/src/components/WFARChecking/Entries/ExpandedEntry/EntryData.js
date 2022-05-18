import styles from "./EntryData.module.css";
import Attachments from "./Attachment"
import { useState } from "react";
const EntryDetails = () =>{

    const dataPlaceHolder = "Text"
    const [activities, setActivities] = useState([
        "Combined the orientation of IT 312 because there was a curriculum revision meeting held at the school on their supposed schedule. 03/02/2022.",
        "Discussed the VMGO.", 
        "Discussed the Syllabus.",
        "Discussed the Learning Episodes.",
        "Discussed the Grading System.",
        "Discussed the Class policy."
    ]); 
    return (
        <div className={styles.entryDetailsContainer}>
            <h5>Subject: {dataPlaceHolder}</h5>
            <h5>Section: {dataPlaceHolder}</h5>
            <h5>No of Attendees: {dataPlaceHolder}</h5>
            <h5>Link of Team Meet Recording: {dataPlaceHolder}</h5>
            <div className={styles.learningActivitiesContainer}>
                <h5>Learning Activities: {dataPlaceHolder}</h5>
                <ol>
                    {activities.map(activities => <li>{activities}</li>)} 
                </ol>
            </div>
            <div className={styles.attachments}>
                <h5>Attachments: </h5>
                <Attachments/>
            </div>
        </div>
    );
}
export default EntryDetails;
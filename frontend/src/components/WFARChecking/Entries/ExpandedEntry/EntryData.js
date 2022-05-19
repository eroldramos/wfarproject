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
            <div className={styles.entryDetailsTextContainer}><h3>Subject: </h3><p>{dataPlaceHolder}</p></div>
            <div className={styles.entryDetailsTextContainer}><h3>Section: </h3><p>{dataPlaceHolder}</p></div>
            <div className={styles.entryDetailsTextContainer}><h3>No of Attendees: </h3><p>{dataPlaceHolder}</p></div>
            <div className={styles.entryDetailsTextContainer}><h3>Link of Team Meet Recording: </h3><p>{dataPlaceHolder}</p></div>
            <div className={styles.learningActivitiesContainer}>
                <h3>Learning Activities: </h3>
                <ol>
                    {activities.map(activities => <li>{activities}</li>)} 
                </ol>
            </div>
            <div className={styles.attachments}>
                <h2>Attachments: </h2>
                <Attachments/>
            </div>
        </div>
    );
}
export default EntryDetails;
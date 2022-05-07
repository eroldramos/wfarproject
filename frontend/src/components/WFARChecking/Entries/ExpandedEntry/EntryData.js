import styles from "./EntryData.module.css";
import Attachments from "./Attachment"
const EntryDetails = () =>{

    const dataPlaceHolder = "Text"
    return (
        <div className={styles.entryDetailsContainer}>
            <h4>Subject: {dataPlaceHolder}</h4>
            <h4>Section: {dataPlaceHolder}</h4>
            <h4>No of Attendees: {dataPlaceHolder}</h4>
            <h4>Link of Team Meet Recording: {dataPlaceHolder}</h4>
            <div className={styles.learningActivitiesContainer}>
                <h4>Learning Activities: {dataPlaceHolder}</h4>
                <ol>
                    <li>Combined the orientation of IT 312 because there was a curriculum revision meeting held at the school on their supposed schedule. 03/02/2022.</li> {/* dapat Dynamic */}
                    <li>Discussed the VMGO.</li>
                    <li>Discussed the Syllabus.</li>
                    <li>Discussed the Learning Episodes.</li>
                    <li>Discussed the Grading System.</li>
                    <li>Discussed the Class policy.</li>
                </ol>
            </div>
            <div className={styles.attachments}>
                <h4>Attachments: </h4>
                <Attachments/>
            </div>
        </div>
    );
}
export default EntryDetails;
import styles from "./Entries.module.css";
import React, {useState} from "react";
import EntryData from "./ExpandedEntry/EntryData";
import MoreSettings from "./FacultyModeComponents/More";

const Entries = () =>{

    const [icon, setIcon] = useState("");
    const expandAttachments = () => {
        setIcon("iconDisplay");
    }
    const [isFacultyView, setIsFacultyView] = useState(false);

    const facultyEditButton = <MoreSettings/>
    return (
        <div className={styles.entries}>
            <div className={styles.detailsContainer}>
                <div className={styles.entryTextContainer}>
                    <h4>Entry # 1</h4>
                    <h4><b>Date Accomlished:</b> Apr 29, 2022</h4>
                </div>
                <div className={styles.attachmentContainer}>
                    <h5>No attachments</h5>
                    <div className={styles.chevronDown} onClick = {expandAttachments}>
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 1.41L10.59 -6.16331e-08L6 4.58L1.41 -4.62904e-07L-6.16331e-08 1.41L6 7.41L12 1.41Z" fill="#323232"/>
                        </svg>
                    </div>
                    <div className={styles.chevronUp} onClick = {expandAttachments}>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.8793 15.0261L11.9993 11.1461L8.1193 15.0261C7.7293 15.4161 7.0993 15.4161 6.7093 15.0261C6.3193 14.6361 6.3193 14.0061 6.7093 13.6161L11.2993 9.0261C11.6893 8.6361 12.3193 8.6361 12.7093 9.0261L17.2993 13.6161C17.6893 14.0061 17.6893 14.6361 17.2993 15.0261C16.9093 15.4061 16.2693 15.4161 15.8793 15.0261Z" fill="#323232"/>
                        </svg>
                    </div>
                    {isFacultyView && facultyEditButton} {/* Faculty edit settings */}
                </div>
            </div>
            {/* <div className={styles.lineBreak}></div> */}
            <div className={styles.expandedEntry}> {/* Pag di pa ciniclick yung expand wala pa to  */}
                <EntryData></EntryData>
            </div>
        </div>
    )
}
export default Entries;
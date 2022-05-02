import React,{Fragment} from "react";
import styles from "./WFARChecking.module.css"
import PrintWFARButton from "./PrintWFARButton/PrintWFAR"
import CheckWFARButton from "./ChechWFARButton/CheckWFARButton";
import SubmissionDetails from "./SubmissionDetails/SubmissionDetails";
import Status_Check from "./Status_&Checked/Status_&Checked";
import Entries from "./Entries/Entries";
import CommentInputs from "./Comments/CommentInput";

const WFARChecking = () =>{

    //const Entries = 
    return (
        <Fragment>
            <div className={styles.firstContainer}>
                <h1>Viewing WFAR</h1>
                <div className={styles.print_CheckContainer}>
                    <PrintWFARButton/>
                    <CheckWFARButton/>
                </div>
            </div>
            <div className={styles.secondContainer}>
                <SubmissionDetails/>
                <Status_Check/>
            </div>
            <div className={styles.mainContainer}>
                <div className={styles.entriesContainer}>
                    <h4 className={styles.Label}>Entries:</h4>
                    <Entries/>
                </div>
                <span className={styles.divider}/>
                <div className={styles.commentsContainer}>
                    <h4 className={styles.Label}> Comments/Remarks</h4>
                    <CommentInputs/>
                </div>
            </div>
        </Fragment>
    );
}

export default WFARChecking;
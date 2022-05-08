import React,{Fragment} from "react";
import styles from "./WFARChecking.module.css"
import PrintWFARButton from "./PrintWFARButton/PrintWFAR"
import CheckWFARButton from "./Buttons/ChechWFARButton/CheckWFARButton";
import ReCheckWFARButton from "./Buttons/Re-CheckWFARButton/Re-CheckWFARButton";
import SubmitWFARButton from "./Buttons/SubmitWFARButton/SubmitButton";
import SubmissionDetails from "./SubmissionDetails/SubmissionDetails";
import Status_Check from "./Status_&Checked/Status_&Checked";
import Entries from "./Entries/Entries";
import CommentInputs from "./Comments/CommentInput";
import PostedComments from "./Comments/PostedComments";

const WFARChecking = () =>{

    //const Entries = 
    return (
        <Fragment>
            <div className={styles.firstContainer}>
                <h1>Viewing WFAR</h1>
                <div className={styles.print_CheckContainer}>
                    <PrintWFARButton/>
                    <CheckWFARButton/>
                    <ReCheckWFARButton/>{/* Gagawin pang dynamic */}
                    <SubmitWFARButton/>{/* Gagawin pang dynamic */}
                </div>
            </div>
            <div className={styles.secondContainer}>
                <SubmissionDetails/>
                <Status_Check/>{/* Pag dipa nachecheck wala to   */}
            </div>
            <div className={styles.mainContainer}>
                <div className={styles.entriesContainer}>
                    <h4 className={styles.Label}>Entries:</h4>
                    <Entries/>
                </div>
                {/* <span className={styles.divider}/> */}
                <div className={styles.commentsContainer}>
                    <h4 className={styles.Label}> Comments/Remarks</h4>
                    <CommentInputs></CommentInputs>{/* Pag faculty mag sasubmit wala to  */}
                    <PostedComments></PostedComments>
                </div>
            </div>
        </Fragment>
    );
}

export default WFARChecking;
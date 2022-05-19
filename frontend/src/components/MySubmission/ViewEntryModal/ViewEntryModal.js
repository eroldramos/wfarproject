import { Fragment } from "react";
import Modal from "../../UI/Modal/Modal";
import styles from "./ViewEntryModal.module.css"
import image from "../../../assets/Login_Register-Images/cict_bg1.png"
const ViewEntryModal = () =>{
    return (
        <Fragment>
            <Modal size = "long-height">
                <div className={styles["view-entry-modal-container"]}>
                    <div className={styles["close-btn"]}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#323232"/>
                        </svg>
                    </div>
                    <div className={styles["container"] + " " + styles["container-1"]}>
                        <h3>Entry #</h3> 
                        <h3>My WFAR Week 4 -  S.Y. 2021 - 2022 1st Semester </h3>
                    </div>
                    <div className={styles["container"] + " " + styles["container-2"]}>
                        <div className={styles["content"]}>
                            <h3>Date Accomplished: </h3><p>Apr 29, 2022</p> 
                        </div>
                        <div className={styles["content"]}>
                            <h3>Subject: </h3><p>CAP-301: Capstone Project Research and Project 1</p> 
                        </div>
                        <div className={styles["content"]}>
                            <h3>No of Attendees: </h3><p>20 Attendees</p> 
                        </div>
                        <div className={styles["content"]}>
                            <h3>Section:</h3><p>BSIT 3K</p> 
                        </div>
                        <div className={styles["content"]}>
                            <h3>Link of Team Meet Recording:</h3><p>https://bulsumain.sharepoint.com/:v:/s/IT312-BSIT3K...</p>
                        </div>
                    </div>
                    <div className={styles["container"] + " " + styles["container-3"]}>
                        <h3>Learning Activities:</h3>
                        <ul>
                            <li>Combined the orientation of IT 312 because there was a curriculum revision meeting held at the school on their supposed schedule. 03/02/2022.</li>
                            <li>Combined the orientation of IT 312 because there was a curriculum revision meeting held at the school on their supposed schedule. 03/02/2022.</li>
                        </ul>
                    </div>
                    <div className={styles["container"] + " " + styles["container-4"]}>
                        <h3>Attachments:</h3> <br/>
                        <h3>Team Meet Screenshots</h3>
                        <div className={styles["image-container"]}>
                            <div>
                                <img src={image}/>
                            </div>
                            <div>
                                <img src={image}/>
                            </div>
                            <div>
                                <img src={image}/>
                            </div>
                            <div>
                                <img src={image}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </Fragment>
    );
}

export default ViewEntryModal;
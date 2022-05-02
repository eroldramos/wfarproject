import { Fragment, useState } from "react";
import DateField from "../UI/FormControl/DateField/DateField";
import InputField from "../UI/FormControl/InputField/InputField";
import styles from "./AddEntry.module.css";

const AddEntry = (props) => {
    return (
        <Fragment>
            <div className={styles['container']}>
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.75 22.6667H21.25V14.1667H26.9167L17 4.25L7.08333 14.1667H12.75V22.6667ZM7.08333 25.5H26.9167V28.3333H7.08333V25.5Z" fill="#323232" />
                </svg>
                <div className={styles['add-entry-form-container']}>
                    <h1>Add WFAR Week 4 Entry</h1>
                    <p className={styles['subtitle']}>Fill up the form to submit an entry for Week 4 of S.Y. 2022 - 2021 1st semester.</p>
                    <p className={styles['required-label']}><strong>Required<span>*</span></strong></p>
                    <form className={styles['add-entry-form']}>
                        {/* row 1 */}
                        <div>
                            <DateField
                                id="accomplishedDate"
                                labelName="Date of Class / Accomplishment"
                                important={1}
                                onBlur={null}
                                onChange={null}
                                value={null}
                                size="rg" />
                        </div>
                        {/* row 2 */}
                        <div>
                            <InputField
                                id="subject"
                                type="text"
                                onBlur={null}
                                onChange={null}
                                value={null}
                                labelName="Subject"
                                inputName="subject"
                                placeholder="Ex. CAP 301 - Capstone Project 1"
                                error={null}
                                size="rg"
                                important={1}
                            />

                            <InputField
                                id="cys"
                                type="text"
                                onBlur={null}
                                onChange={null}
                                value={null}
                                labelName="Course, Year and Section"
                                inputName="cys"
                                placeholder="Ex. BSIT 3K"
                                error={null}
                                size="rg"
                                important={1}
                            />

                            <InputField
                                id="noOfAttendees"
                                type="number"
                                onBlur={null}
                                onChange={null}
                                value={null}
                                labelName="No of Attendees"
                                inputName="noOfAttendees"
                                placeholder="Enter # of attendees"
                                error={null}
                                size="rg"
                                important={1}
                            />
                        </div>

                        {/* row 3 */}
                        <div>
                            <InputField
                                id="meetingLink"
                                type="text"
                                onBlur={null}
                                onChange={null}
                                value={null}
                                labelName="Link of Team Meeting Recording"
                                inputName="meetingLink"
                                placeholder="Paste your meet link here"
                                error={null}
                                size="lg"
                                important={1}
                            />
                        </div>
                    </form>
                </div>
            </div>

        </Fragment>
    );
}

export default AddEntry;
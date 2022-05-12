import { Fragment, useState } from "react";
import DateField from "../UI/FormControl/DateField/DateField";
import InputField from "../UI/FormControl/InputField/InputField";
import styles from "./AddEntry.module.css";
import LearningActivities from "./LearningActivities/LearningActivities";
import DynamicInputField from "./UI/DynamicInputField";
import Button from "../UI/FormControl/Button/Button";
import TeamMeetScreenshots from "./Attachments/TeamMeetScreenshots";
import ProvidedActivities from "./Attachments/ProvidedActivities";
import Swal from 'sweetalert2';


const AddEntry = (props) => {

    const [accomplishedDate, setAccomplishedDate] = useState({ value: '', error: null });
    const [subject, setSubject] = useState({ value: '', error: null });
    const [cys, setCys] = useState({ value: '', error: null });
    const [noOfAttendees, setNoOfAttendees] = useState({ value: '', error: null });
    const [meetingLink, setMeetingLink] = useState({ value: '', error: null });
    const [learningActivities, setLearningActivities] = useState([{ value: '', error: null }]);
    const [teamMeetScreenshots, setTeamMeetScreenshots] = useState([]);
    const [providedActivitiesScreenshots, setProvidedActivitiesScreenshots] = useState([]);

    const accomplishedDateRequiredError = 'Please select the accomplishment date.';
    const subjectRequiredError = 'Please enter a subject.';
    const cysRequiredError = 'Please enter the course, year and section.';
    const meetingLinkRequiredError = 'Please enter the recording of the meeting link.';
    const noOfAttendeesRequiredError = 'Please enter the number of attendees.';
    const learningActivityRequiredError = 'Please enter the learning activity.';

    const addLearningActivityField = () => {
        let inputField = { value: '' };
        setLearningActivities((prevState) => {
            return [...prevState, inputField];
        })
    }

    const removeLearningActivityField = (index) => {
        let data = [...learningActivities];
        data.splice(index, 1);
        setLearningActivities(data);
    }

    const accomplishedDateOnChange = (event) => {
        setAccomplishedDate((prevState) => {
            return {
                ...prevState,
                value: event.target.value, error: null
            }
        });
    }

    const accomplishedDateOnBlur = (event) => {
        if (accomplishedDate.value === '') {
            setAccomplishedDate((prevState) => {
                return {
                    ...prevState,
                    value: event.target.value, error: accomplishedDateRequiredError
                }
            });
        }
    }

    const subjectOnChange = (event) => {
        setSubject((prevState) => {
            return {
                ...prevState,
                value: event.target.value, error: null
            }
        });
    }

    const subjectOnBlur = (event) => {
        if (event.target.value === '') {
            setSubject((prevState) => {
                return { ...prevState, error: subjectRequiredError }
            });
        }
    }

    const cysOnChange = (event) => {
        setCys((prevState) => {
            return {
                ...prevState,
                value: event.target.value, error: null
            }
        });
    }

    const cysOnBlur = (event) => {
        if (event.target.value === '') {
            setCys((prevState) => {
                return {
                    ...prevState,
                    value: event.target.value, error: cysRequiredError
                }
            });
        }
    }

    const meetingLinkOnChange = (event) => {
        setMeetingLink((prevState) => {
            return {
                ...prevState,
                value: event.target.value, error: null
            }
        });
    }

    const meetingLinkOnBlur = (event) => {
        if (event.target.value === '') {
            setMeetingLink((prevState) => {
                return {
                    ...prevState,
                    value: event.target.value, error: meetingLinkRequiredError
                }
            });
        }

    }

    const noOfAttendeesOnChange = (event) => {
        setNoOfAttendees((prevState) => {
            return {
                ...prevState,
                value: event.target.value, error: null
            }
        });
    }

    const noOfAttendeesOnBlur = (event) => {
        if (event.target.value === '') {
            setNoOfAttendees((prevState) => {
                return {
                    ...prevState,
                    value: event.target.value, error: noOfAttendeesRequiredError
                }
            });
        }

    }

    const learningActivityOnChange = (index, event) => {
        setLearningActivities((prevState) => {
            prevState[index].value = event.target.value;
            prevState[index].error = null;
            return [...prevState];
        });

        console.log(learningActivities);
    }

    const learningActivityOnBlur = (index, event) => {
        if (event.target.value === '') {
            setLearningActivities((prevState) => {
                prevState[index].value = event.target.value;
                prevState[index].error = learningActivityRequiredError;
                return [...prevState];
            });
        }
    }

    const getImageTeamMeetScreenshot = (event) => {
        let file = event.target.files[0];
        let url = URL.createObjectURL(event.target.files[0]);

        setTeamMeetScreenshots((prevState) => {
            return [...prevState, { file: file, imageSrc: url }];
        })
    }

    const removeImageTeamMeetScreenshot = (index) => {
        setTeamMeetScreenshots((prevState) => {
            prevState.splice(index, 1);
            return [...prevState];
        })
    }

    const getProvidedActivitiesScreenshot = (event) => {
        let file = event.target.files[0];
        let url = URL.createObjectURL(event.target.files[0]);

        setProvidedActivitiesScreenshots((prevState) => {
            return [...prevState, { file: file, imageSrc: url }];
        })
    }

    const removeProvidedActivitiesScreenshot = (index) => {
        setProvidedActivitiesScreenshots((prevState) => {
            prevState.splice(index, 1);
            return [...prevState];
        })


        console.log(teamMeetScreenshots);
    }

    const addEntry = (event) => {
        event.preventDefault();

        if (accomplishedDate.value === '') 
            setAccomplishedDate((prevState) => {
                return {...prevState, error: accomplishedDateRequiredError}
            })

        if (subject.value === '')
            setSubject((prevState) => {
                return {...prevState, error: subjectRequiredError}
            })

        if (accomplishedDate.error === null && 
            subject.error === null &&
            cys.error === null &&
            noOfAttendees === null &&
            meetingLink === null) {
        }

        for (let x of learningActivities) {
            if (x.error !== null) {
            }
        }

        console.log("Entry added!");
        let entry = {
            accomplishedDate: accomplishedDate,
            subject: subject,
            cys: cys,
            meetingLink: meetingLink,
            noOfAttendees: noOfAttendees,
            teamMeetScreenshots: teamMeetScreenshots,
            providedActivitiesScreenshots: providedActivitiesScreenshots
        }

        console.log(entry);
    }

    console.log(learningActivities);
    return (
        <Fragment>
            <div className={styles['container']}>
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.75 22.6667H21.25V14.1667H26.9167L17 4.25L7.08333 14.1667H12.75V22.6667ZM7.08333 25.5H26.9167V28.3333H7.08333V25.5Z" fill="#323232" />
                </svg>
                <div className={styles['add-entry-form-container']}>
                    <h1>Add WFAR Week 4 Entry</h1>
                    <p className={styles['subtitle']}>Fill up the form to submit an entry for Week 4 of S.Y. 2022 - 2021 1st semester.</p>
                    <p className={styles['required-label']}><strong>Required</strong></p>

                    <form className={styles['add-entry-form']} onSubmit={addEntry}>
                        {/* row 1 */}
                        <div className={styles['row-1']}>
                            <DateField
                                id="accomplishedDate"
                                labelName="Date of Class / Accomplishment"
                                important={1}
                                onBlur={accomplishedDateOnBlur}
                                onChange={accomplishedDateOnChange}
                                value={accomplishedDate.value}
                                error={accomplishedDate.error}
                                size="rg" />
                        </div>
                        {/* row 2 */}
                        <div className={styles['row-2']}>
                            <InputField
                                id="subject"
                                type="text"
                                onBlur={subjectOnBlur}
                                onChange={subjectOnChange}
                                value={subject.value}
                                labelName="Subject"
                                inputName="subject"
                                placeholder="Ex. CAP 301 - Capstone Project 1"
                                error={subject.error}
                                size="rg"
                                important={1}
                            />

                            <InputField
                                id="cys"
                                type="text"
                                onBlur={cysOnBlur}
                                onChange={cysOnChange}
                                value={cys.value}
                                labelName="Course, Year and Section"
                                inputName="cys"
                                placeholder="Ex. BSIT 3K"
                                error={cys.error}
                                size="rg"
                                important={1}
                            />

                            <InputField
                                id="noOfAttendees"
                                type="number"
                                onBlur={noOfAttendeesOnBlur}
                                onChange={noOfAttendeesOnChange}
                                value={noOfAttendees.noOfAttendees}
                                labelName="No of Attendees"
                                inputName="noOfAttendees"
                                placeholder="Enter # of attendees"
                                error={noOfAttendees.error}
                                size="rg"
                                important={1}
                            />
                        </div>

                        {/* row 3 */}
                        <div className={styles['row-3']}>
                            <InputField
                                id="meetingLink"
                                type="text"
                                onBlur={meetingLinkOnBlur}
                                onChange={meetingLinkOnChange}
                                value={meetingLink.value}
                                labelName="Link of Team Meeting Recording"
                                inputName="meetingLink"
                                placeholder="Paste your meet link here"
                                error={meetingLink.error}
                                size="lg"
                                important={1}
                            />
                        </div>

                        {/* row 4 */}
                        <div className={styles['row-4']}>
                            <label className={styles['add-entry-label'] + " " + styles['required']}>Learning Activities</label>
                            <LearningActivities
                                inputFields={learningActivities}
                                onAddInput={addLearningActivityField}
                                onRemoveInput={removeLearningActivityField}
                                onChange={learningActivityOnChange}
                                onBlur={learningActivityOnBlur}></LearningActivities>
                        </div>

                        {/* row 5 */}
                        <div className={styles['row-5']}>
                            <label className={styles['add-entry-label']}>Upload attachments</label>
                            <TeamMeetScreenshots teamMeetScreenshots={teamMeetScreenshots} getImage={getImageTeamMeetScreenshot} removeImage={removeImageTeamMeetScreenshot} />
                            <ProvidedActivities providedActivitiesScreenshots={providedActivitiesScreenshots} getImage={getProvidedActivitiesScreenshot} removeImage={removeProvidedActivitiesScreenshot} />
                        </div>

                        <div className={styles['button-container']}>
                            <Button label="Cancel" type="cancel" onClick={null}></Button>
                            <Button label="Save Entry" type="primary" onClick={null}></Button>
                        </div>
                    </form>
                </div>
            </div>

        </Fragment>
    );
}

export default AddEntry;
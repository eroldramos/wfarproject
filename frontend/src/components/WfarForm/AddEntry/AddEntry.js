import { Fragment, useState, useEffect } from "react";
import DateField from "../../UI/FormControl/DateField/DateField";
import InputField from "../../UI/FormControl/InputField/InputField";
import styles from "./AddEntry.module.css";
import LearningActivities from "../LearningActivities/LearningActivities";
import Button from "../../UI/FormControl/Button/Button";
import TeamMeetScreenshots from "../Attachments/TeamMeetScreenshots";
import ProvidedActivities from "../Attachments/ProvidedActivities";
import Swal from 'sweetalert2';
import { createWfarEntry } from "../../../store/myWfarsActions";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";


const AddEntry = (props) => {

    // hooks
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const [isSubmitted, setIsSubmitted] = useState(false);

    // props
    const wfarId = params.id;
    const weekNo = params.weekNo;

    // state redux
    const error = useSelector(state => state.myWfarEntryCreate.error);

    const [accomplishedDate, setAccomplishedDate] = useState({ value: '', error: null });
    const [subject, setSubject] = useState({ value: '', error: null });
    const [cys, setCys] = useState({ value: '', error: null });
    const [noOfAttendees, setNoOfAttendees] = useState({ value: '', error: null });
    const [meetingLink, setMeetingLink] = useState({ value: '', error: null });
    const [learningActivities, setLearningActivities] = useState([{ value: '', error: null }]);
    const [teamMeetScreenshots, setTeamMeetScreenshots] = useState([]);
    const [providedActivitiesScreenshots, setProvidedActivitiesScreenshots] = useState([]);
    const [entry, setEntry] = useState([]);
    const [attachmentFormData, setAttachmentFormData] = useState();

    const accomplishedDateRequiredError = 'Please select the accomplishment date.';
    const subjectRequiredError = 'Please enter a subject.';
    const cysRequiredError = 'Please enter the course, year and section.';
    const meetingLinkRequiredError = 'Please enter the recording of the meeting link.';
    const noOfAttendeesRequiredError = 'Please enter the number of attendees.';
    const learningActivityRequiredError = 'Please enter the learning activity.';

    // effects
    useEffect(() => {
        if (isSubmitted) {
            console.log("for submission na...");
            dispatch(createWfarEntry(wfarId, weekNo, entry, attachmentFormData))
            setIsSubmitted(false);

            if (error == null) {
                Swal.fire({
                    html:
                        '<h4>An entry for WFAR week ' + weekNo + ' has been recorded!</h4>',
                    icon: 'success',
                    confirmButtonColor: '#BE5A40'
                }).then(() => {
                    navigate(-1);
                })
            } else {
                Swal.fire({
                    html:
                        '<h4>' + error + '</h4>',
                    icon: 'error',
                    confirmButtonColor: '#BE5A40'
                })
            }
        }
    }, [isSubmitted, error]);

    // handlers
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
        let hasNoError = true;

        if (accomplishedDate.value === '') {
            hasNoError = false;
            setAccomplishedDate((prevState) => {
                return { ...prevState, error: accomplishedDateRequiredError }
            })
        }


        if (subject.value === '') {
            hasNoError = false;
            setSubject((prevState) => {
                return { ...prevState, error: subjectRequiredError }
            })
        }

        if (cys.value === '') {
            hasNoError = false;
            setCys((prevState) => {
                return { ...prevState, error: cysRequiredError }
            })
        }

        if (noOfAttendees.value === '') {
            hasNoError = false;
            setNoOfAttendees((prevState) => {
                return { ...prevState, error: noOfAttendeesRequiredError }
            })
        }

        if (meetingLink.value === '') {
            hasNoError = false;
            setMeetingLink((prevState) => {
                return { ...prevState, error: meetingLinkRequiredError }
            })
        }

        for (let index in learningActivities) {
            if (learningActivities[index].value === '') {
                hasNoError = false;
                setLearningActivities((prevState) => {
                    prevState[index].value = event.target.value;
                    prevState[index].error = learningActivityRequiredError;
                    return [...prevState];
                });
            }
        }

        if (hasNoError) {
            console.log("Entry added!");
            let entry = {
                accomplishment_date: accomplishedDate.value,
                subject: subject.value,
                course_year_section: cys.value,
                recording_url: meetingLink.value,
                no_of_attendees: noOfAttendees.value,
                activities: learningActivities.map(x => { return x.value })
            }

            let formData = new FormData();

            for (let x of teamMeetScreenshots) {
                formData.append("sc_meetings", x.file, x.file.name);
            }

            for (let x of providedActivitiesScreenshots) {
                formData.append("sc_activities", x.file, x.file.name);
            }

            setAttachmentFormData(formData);
            setEntry(entry);
            setIsSubmitted(true);
        } else {
            console.log("Entry not added. Resolved issues first.");
        }


    }

    const onClickCancelHandler = () => {
        navigate(-1);
    }

    return (
        <Fragment>
            <div className={styles['container']}>

                <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.75 22.6667H21.25V14.1667H26.9167L17 4.25L7.08333 14.1667H12.75V22.6667ZM7.08333 25.5H26.9167V28.3333H7.08333V25.5Z" fill="#323232" />
                </svg>
                <div className={styles['add-entry-form-container']}>
                    <h1>Add an Entry for Week {weekNo}</h1>
                    <p className={styles['subtitle']}>Fill up the form to submit an entry for Week {weekNo} of the current semester.</p>
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
                            <Button label="Cancel" type="cancel" onClick={onClickCancelHandler}></Button>
                            <Button label="Save Entry" type="primary" onClick={null}></Button>
                        </div>
                    </form>
                </div>
            </div>

        </Fragment>
    );
}

export default AddEntry;
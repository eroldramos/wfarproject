import { Fragment } from 'react';
import Button from '../../UI/FormControl/Button/Button';
import WFARStatus from '../../UI/WFAR/WFARStatus/WFARStatus';
import IconButton from '../../UI/FormControl/Button/IconButton';
import styles from './MyWFARCard.module.css';
import MyWfarEntry from '../MyWfarEntry/MyWfarEntry';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { submitWfar, unsubmitWfar } from "../../../store/myWfarsActions";
import { myWfarRefreshActions } from "../../../store/myWfarReducers";
import Swal from 'sweetalert2';
import { NavLink, Link } from 'react-router-dom';

const MyWFARCard = (props) => {

    // hooks
    const dispatch = useDispatch();

    // simple states
    const [displayEntries, setDisplayEntries] = useState("close");
    const [activeEntries, setActiveEntries] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isUnsubmitted, setIsUnsubmitted] = useState(false);

    // redux states
    const semester_id = useSelector(state => state.myWfarSemesterFilter.semester_id);

    // constants
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // props
    let entries = props.entries;
    let entryLabel = "";
    let id = props.id;
    let status = props.status;
    let weekNo = props.weekNo;
    let noOfEntries = entries.filter(function (x) {
        return x.deleted_at === null;
    }).length;
    let startDate = new Date(props.weekBracket[0]);
    let endDate = new Date(props.weekBracket[1]);
    let startDateLbl = month[startDate.getMonth()] + " " + startDate.getDate();
    let endDateLbl = month[endDate.getMonth()] + " " + endDate.getDate();
    let buttonsJSX;
    let counter = 0;

    useEffect(() => {
        if (isSubmitted === true) {
            dispatch(submitWfar(id, weekNo));
            setIsSubmitted(false);
        }
    }, [isSubmitted])

    useEffect(() => {
        if (isUnsubmitted === true) {
            dispatch(unsubmitWfar(id, weekNo));
            setIsUnsubmitted(false);
        }
    }, [isUnsubmitted])

    // handlers
    const displayEntriesHandler = () => {
        let display = displayEntries === "open" ? "close" : "open";
        setDisplayEntries(display);
    }

    const submitHandler = () => {

        Swal.fire({
            html:
                '<h4>Submit WFAR</h4>' +
                '<h5>Are you sure you want to submit WFAR for Week ' + weekNo + '?</h5>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            iconColor: '#D1D1D1',
            confirmButtonColor: '#BE5A40',
            cancelButtonColor: '#A1A1A1'
        }).then((result) => {
            if (result.isConfirmed) {
                setIsSubmitted(true);
            }
        })
    }

    const unsubmitHandler = () => {
        Swal.fire({
            html:
                '<h4>Unsubmit WFAR</h4>' +
                '<h5>Are you sure you want to unsubmit your WFAR for Week ' + weekNo + '?</h5>',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Unsubmit',
            confirmButtonColor: '#BE5A40'
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                setIsUnsubmitted(true);
            }
        })
    }


    // jsx
    if (noOfEntries > 1) {
        entryLabel = "WFAR entries";
    } else if (noOfEntries === 1) {
        entryLabel = "WFAR entry";
    } else {
        entryLabel = "No entries yet.";
    }

    // svg
    const icAddEntry = <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.25 9.75H9.75V14.25H8.25V9.75H3.75V8.25H8.25V3.75H9.75V8.25H14.25V9.75Z" fill="white" />
    </svg>;

    // button jsx
    switch (status) {
        case 1: // not submitted
            if (noOfEntries <= 0) {
                buttonsJSX =
                    (<Fragment>
                        <Link to="/mySubmission/wfar/add-entry"><IconButton label="Entry" type="primary" size="xs" svg={icAddEntry} /></Link>
                    </Fragment>);
            } else {
                buttonsJSX =
                    (<Fragment>
                        <Link to="/mySubmission/wfar/add-entry"><IconButton label="Entry" type="primary" size="xs" svg={icAddEntry} /></Link>
                        <Button label="Submit" type="primary" size="xs" onClick={submitHandler} />
                    </Fragment>);
            }
            break;

        case 2: // to be checked
            buttonsJSX =
                (<Fragment>
                    <Button label="Unsubmit" type="primary" size="xs" onClick={unsubmitHandler} />
                </Fragment>);
            break;

        case 3: //Ok

            break;


        case 4: //With Revisions
            buttonsJSX =
                (<Fragment>
                    <Button label="Unsubmit" type="primary" size="xs" onClick={unsubmitHandler} />
                </Fragment>);
            break;

        default:
            break;
    }

    return (
        <div className={styles.card}>

            <div className={styles.wfarContainer}>

                <div>
                    <div className={styles.weekContainer}>
                        <div className={styles.weekLabel}> Week {weekNo} </div>
                        <div className={styles.weekDate}> {startDateLbl} - {endDateLbl} </div>
                    </div>
                </div>


                <div>
                    <div className={styles.entryLabelContainer}>
                        <div className={styles.entryNo}> {noOfEntries} </div>
                        <div className={styles.entryWord}> {entryLabel} </div>
                    </div>
                </div>


                <div>
                    <div className={styles.buttonStatusContainer} style={{ display: "flex" }}>
                        {status !== 1 && <WFARStatus status={status}></WFARStatus>}
                        {buttonsJSX}
                    </div>
                    <div className={styles.openClose} onClick={displayEntriesHandler}>
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 1.41L10.59 -6.16331e-08L6 4.58L1.41 -4.62904e-07L-6.16331e-08 1.41L6 7.41L12 1.41Z" fill="#323232" />
                        </svg>
                    </div>
                </div>

            </div>

            <div id="entries-container" className={styles.entriesContainer + " " + styles[displayEntries]}>
                {entries.map((entry, index) => {
                    if (entry.deleted_at !== null) {
                        return ""
                    }
                    counter++;
                    return (<MyWfarEntry 
                        key={entry.id} 
                        id={entry.id} 
                        no={counter} 
                        accomplishmentDate={entry.accomplishment_date} 
                        courseYearSection={entry.course_year_section} 
                        subject={entry.subject} 
                        wfarWeekNo={weekNo}
                        wfarStatus={status}></MyWfarEntry>);
                })}
            </div>

        </div>
    );
}

export default MyWFARCard;
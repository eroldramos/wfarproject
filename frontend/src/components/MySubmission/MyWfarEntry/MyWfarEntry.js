import { useState, useEffect } from 'react';
import PopupMenu from '../../UI/Menu/PopupMenu';
import styles from './MyWfarEntry.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { archiveWfarEntry } from '../../../store/myWfarsActions';
import Swal from 'sweetalert2';

const MyWfarEntry = (props) => {

    // hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // use states
    const [displayPopup, setDisplayPopup] = useState("close");
    const [isArchive, setIsArchive] = useState(false);

    // constants
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // props
    let wfarId = props.wfarId;
    let id = props.id;
    let wfarWeekNo = props.wfarWeekNo;
    let wfarStatus = props.wfarStatus;
    let entryNo = props.no;
    let accomplishmentDate = new Date(props.accomplishmentDate);
    let accomplishmentDateLbl = month[accomplishmentDate.getMonth()] + " " + accomplishmentDate.getDate() + ", " + accomplishmentDate.getFullYear();
    let courseYearSection = props.courseYearSection;
    let subject = props.subject;

    const onEditClickHandler = () => {
        navigate('/mySubmission/wfar/' + wfarId +'/week/' + wfarWeekNo + '/edit-entry/' + id);
    }

    // handlers
    const onArchiveClickHandler = () => {
        Swal.fire({
            html:
                '<h4>Archiving Entry from WFAR Week ' + wfarWeekNo + '</h4>' +
                '<h5>Are you sure you want to archive this entry?</h5>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            iconColor: '#D1D1D1',
            confirmButtonColor: '#BE5A40',
            cancelButtonColor: '#A1A1A1'
        }).then((result) => {
            if (result.isConfirmed) {
                setIsArchive(true);
            }
        })
    }

    // handlers
    const onClickMoreOptionsHandler = () => {
        let display = displayPopup === "open" ? "close" : "open";
        setDisplayPopup(display);
    }

    // use effects
    useEffect(() => {
        if (isArchive) {
            console.log("i am in use effect")
            dispatch(archiveWfarEntry(id));
            setIsArchive(false);
        }
    }, [isArchive])

    // popup
    const popup_items = [
        {
            id: 1,
            label: "Edit",
            onClick: onEditClickHandler
        },
        {
            id: 2,
            label: "Archive",
            onClick: onArchiveClickHandler
        }
    ];
    
    return (
        <div className={styles.entryCard}>
            <div className={styles.entryNoLabel}>Entry {entryNo}</div>
            <div className={styles.entryDetails}>
                <span className={styles.entryDate}>{accomplishmentDateLbl}</span>
                <span className={styles.entryCourse}>{courseYearSection}</span> - 
                <span className={styles.entrySubject}>{subject}</span>
            </div>
            <div className={styles.entryMoreOptions}>
                {wfarStatus != 2 && <svg onClick={onClickMoreOptionsHandler} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16ZM12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14ZM12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8Z" fill="#323232" />
                </svg>}
                <PopupMenu
                    items={popup_items}
                    display={displayPopup} />
            </div>
        </div>
    );
}

export default MyWfarEntry;
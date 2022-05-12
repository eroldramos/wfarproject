import { Fragment } from "react";
import styles from './ArchivedEntry.module.css';

const ArchivedEntry = (props) => {
    return (
        <div className={styles['archived-entry']} data-id={props.id}>
            <div className={styles['column-1']}>
                <div className={styles['accomplishment-date-label']}>{props.applicableDate}</div>
                <div className={styles['cys-subject']}>{props.CYS} - {props.subject}</div>
            </div>
            <div className={styles['column-2']}>
                <div className={styles['semester']}>{props.semester}</div>
                <div className={styles['week']}>{props.week}</div>
                <div className={styles['restore-option']}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.4125 3.915L14.37 2.655C14.16 2.4075 13.8525 2.25 13.5 2.25H4.5C4.1475 2.25 3.84 2.4075 3.6375 2.6625L2.595 3.915C2.3775 4.1775 2.25 4.5075 2.25 4.875V14.25C2.25 15.075 2.9175 15.75 3.75 15.75H14.25C15.075 15.75 15.75 15.075 15.75 14.25V4.875C15.75 4.5075 15.6225 4.1775 15.4125 3.915ZM9 7.125L13.125 11.25H10.5V12.75H7.5V11.25H4.875L9 7.125ZM3.84 3.75L4.455 3H13.455L14.1525 3.75H3.84Z" fill="#BE5A40" />
                    </svg>
                </div>
            </div>
            
        </div>
    );
}

export default ArchivedEntry;
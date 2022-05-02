import PopupMenu from '../../UI/Menu/PopupMenu';
import styles from './MyWfarEntry.module.css';

const MyWfarEntry = (props) => {

    // let displayClass = props.display; // block or hide

    const ITEMS = [
        {
            id: 1,
            label: "Edit",
            onClick: null
        },
        {
            id: 2,
            label: "Archive",
            onClick: null
        }
    ];

    return (
        <div className={styles['entry-card']}>
            <div className={styles['entry-no-label']}>Entry {props.no}</div>
            <div className={styles['entry-details']}>
                <span>{props.accomplishmentDate}</span>
                <span>{props.CYS} - {props.subject}</span>
            </div>
            <div className={styles['entry-more-options']}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16ZM12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14ZM12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8Z" fill="#323232" />
                </svg>

                <PopupMenu
                    items={ITEMS} />

            </div>
        </div>
    );
}

export default MyWfarEntry;
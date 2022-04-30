import { Fragment } from 'react';
import Button from '../../UI/FormControl/Button/Button';
import WFARStatus from '../../UI/WFAR/WFARStatus/WFARStatus';
import styles from './MyWFARCard.module.css';

const MyWFARCard = (props) => {

    const weekTitle = props.weekTitle;
    const weekDate = props.weekDate;
    const wfarStatus = props.wfarStatus;

    // let entryLabel 

    return (
        <div className={styles['card']}>
            
            <div className={styles['week-container']}>
                <div className={styles['week-label']}> {weekTitle} </div>
                <div className={styles['week-date']}> {weekDate} </div>
            </div>

            <div className={styles['entry-label']}> {"5 entries"} </div>

            <div className={styles['button-status-container']} style={{ display: "flex"}}> 
                <WFARStatus status={wfarStatus}></WFARStatus>
                <Button
                    label="Submit"
                    type="primary"
                    size="xs"
                    />
            </div>

        </div>
    );
}

export default MyWFARCard;
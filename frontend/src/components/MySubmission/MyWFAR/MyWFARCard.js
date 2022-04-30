import { Fragment } from 'react';
import Button from '../../UI/FormControl/Button/Button';
import WFARStatus from '../../UI/WFAR/WFARStatus/WFARStatus';
import IconButton from '../../UI/FormControl/Button/IconButton';
import styles from './MyWFARCard.module.css';

const MyWFARCard = (props) => {

    const weekTitle = props.weekTitle;
    const weekDate = props.weekDate;
    const wfarStatus = props.wfarStatus;
    let entryNo = props.entryNo;
    let entryLabel = "";

    let buttonsJSX;

    if (entryNo > 1) {
        entryLabel = "WFAR entries";
    } else if (entryNo == 1) {
        entryLabel = "WFAR entry";
    } else {
        entryLabel = "No entries yet.";
    }

    // let entryLabel 
    const icAddEntry = <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.25 9.75H9.75V14.25H8.25V9.75H3.75V8.25H8.25V3.75H9.75V8.25H14.25V9.75Z" fill="white" />
    </svg>;

    switch (wfarStatus) {
        case 1: // not submitted
            if (entryNo < 5) {

                buttonsJSX =
                    (<Fragment>
                        <IconButton
                        label="Entry"
                        type="primary"
                        size="xs"
                        svg={icAddEntry} />
                        <Button
                        label="Unsubmit"
                        type="primary"
                        size="xs"
                        onClick={props.onClick} />
                    </Fragment>);
            }
            break;

        case 2: // to be checked
            buttonsJSX = 
                (<Fragment>
                    <Button
                        label="Unsubmit"
                        type="primary"
                        size="xs"
                        onClick={props.onClick} />
                </Fragment>);
            break;

        case 3: //Ok
            
            break;


        case 4: //With Revisions
            buttonsJSX =
                (<Fragment>
                    <Button
                        label="Unsubmit"
                        type="primary"
                        size="xs"
                        onClick={props.onClick} />
                </Fragment>);
            break;

        default:
            break;
    }


    return (
        <div className={styles['card']}>


            <div>
                <div className={styles['week-container']}>
                    <div className={styles['week-label']}> {weekTitle} </div>
                    <div className={styles['week-date']}> {weekDate} </div>
                </div>
            </div>


            <div>
                <div className={styles['entry-label-container']}>
                    <div className={styles['entry-no']}> {entryNo} </div>
                    <div className={styles['entry-word']}> {entryLabel} </div>
                </div>
            </div>


            <div>
                <div className={styles['button-status-container']} style={{ display: "flex" }}>
                    <WFARStatus status={wfarStatus}></WFARStatus>
                    {buttonsJSX}
                </div>
                <div>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 1.41L10.59 -6.16331e-08L6 4.58L1.41 -4.62904e-07L-6.16331e-08 1.41L6 7.41L12 1.41Z" fill="#323232" />
                    </svg>
                </div>
            </div>

        </div>
    );
}

export default MyWFARCard;
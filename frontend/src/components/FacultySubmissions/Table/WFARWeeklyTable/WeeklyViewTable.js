
import React, { Fragment, useState, useEffect } from "react";
import styles from "./WeeklyViewTable.module.css";
import TableCellButton from '../../../UI/FormControl/Button/TableCellButton';
import { useDispatch, useSelector } from "react-redux";
import { retrieveWeeklyWfars } from "../../../../store/wfarActions";

const WeeklyTable = (props) => {

    // hooks
    const dispatch = useDispatch();
    const facultiesWithWfars = useSelector(state => state.weeklyWfarRetrieve.facultiesWithWfars);


    useEffect(() => {

    }, [facultiesWithWfars]);

    function displayStatus(status) {
        switch (status) {
            case 1:
                return <div class={styles['noSubmission']}>No submission</div>

            case 2:
                return <div class={styles['forChecking']}>To be checked</div>

            case 3:
                return <div class={styles['ok']}>Ok</div>

            case 4:
                return <div class={styles['withRevisions']}>With Revisions</div>

            default:
                return <div class={styles['noSubmission']}>No Submission</div>
        }
    }

    let counter = 0;

    function dateFormat(dateSubmitted) {

        // constants
        const date = new Date(dateSubmitted);
        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const day = date.getDay();
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const minutesWithLeadingZero = minutes.toString().length < 2 ? "0" + minutes : minutes;
        const timeLabel = hours >= 12 ? "pm" : "am";

        const formatted = `${month[date.getMonth()]} ${day}, ${year} ${hours}:${minutesWithLeadingZero} ${timeLabel}`;
        return formatted;


    }

    return (
        <div className={styles.weeklyTableContainer}>
            <table className={styles.weeklyTable}>
                <tr>
                    <th>
                        Faculty{" "}
                        <svg
                            className={styles.sortFacultyName}
                            onClick={null}
                            width="11"
                            height="11"
                            viewBox="0 0 11 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.70835 4.12492L8.0621 4.77117L5.95835 2.672V10.0833H5.04169V2.672L2.93794 4.77575L2.29169 4.12492L5.50002 0.916585L8.70835 4.12492Z"
                                fill="#666B73" />
                        </svg>
                    </th>
                    <th># Entries</th>
                    <th>Status</th>
                    <th>Date Submitted</th>
                    <th></th>
                </tr>


                {facultiesWithWfars && facultiesWithWfars.map((faculty, index) => {


                    if ((props.status == 2 || props.status == 3 || props.status == 4) && faculty.wfars.length == 0) {
                        return "";
                    }

                    else if (props.status == 1 && faculty.wfars.length > 0) {
                        if (faculty.wfars[0].status != 1) {
                            return ""
                        }
                    }

                    else if (props.status == 2 && faculty.wfars[0].status != 2) {
                        return "";
                    } else if (props.status == 3 && faculty.wfars[0].status != 3) {
                        return "";
                    } else if (props.status == 4 && faculty.wfars[0].status != 4) {
                        return "";
                    }

                    counter = counter + 1;

                    return (
                        <tr key={index}
                            className={faculty.wfars.length > 0 && faculty.wfars[0].submitted_at != null ? styles['clickable'] : ""}

                        > {/* row 1  */}
                            <td><strong>{faculty.last_name}</strong>, {faculty.first_name} {faculty.middle_name != null ? faculty.middle_name[0] + "." : ""} {faculty.extension_name != null ? faculty.extension_name : ""}
                            </td>
                            <td>
                                {faculty.wfars.length == 0 && 'No Entry'}
                                {/* {faculty.wfars.length == 1 && faculty.wfars[0].no_of_entries + ' Entry'}  */}
                                {faculty.wfars.length > 0 && faculty.wfars[0].no_of_entries == 0 && 'No Entry'}
                                {faculty.wfars.length > 0 && faculty.wfars[0].no_of_entries == 1 && faculty.wfars[0].no_of_entries + ' Entry'}
                                {faculty.wfars.length > 0 && faculty.wfars[0].no_of_entries > 1 && faculty.wfars[0].no_of_entries + ' Entries'}
                            </td>
                            <td>
                                {faculty.wfars.length > 0 && displayStatus(faculty.wfars[0].status)}
                                {faculty.wfars.length == 0 && <div class={styles['noSubmission']}>No submission</div>}
                            </td>
                            <td>{faculty.wfars.length > 0 && faculty.wfars[0].submitted_at != null && dateFormat(faculty.wfars[0].submitted_at)}
                                {faculty.wfars.length > 0 && faculty.wfars[0].submitted_at == null && "N/A"}
                                {faculty.wfars.length == 0 && "N/A"}
                            </td>
                            <td><TableCellButton
                                id={null}
                                label={"Check Submission"}
                                type="primary"
                                onClick={null} /></td>
                        </tr>)
                })}


                {counter == 0 && 
                    <tr>
                        <td colSpan={5}>
                            <div className="placeholder-data-not-available">No data is available.</div>
                        </td>
                    </tr> }
            </table>
        </div>
    );
};

export default WeeklyTable;

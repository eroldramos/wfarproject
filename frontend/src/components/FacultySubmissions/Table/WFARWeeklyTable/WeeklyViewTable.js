
import React, { useState, useEffect } from "react";
import styles from "./WeeklyViewTable.module.css";
import TableCellButton from '../../../UI/FormControl/Button/TableCellButton';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const WeeklyTable = (props) => {

    // hooks
    const navigate = useNavigate();
    const facultiesWithWfars = useSelector(state => state.weeklyWfarRetrieve.facultiesWithWfars);
    const userInfo = useSelector((state) => state.login.userInfo);

    const [sortSvgClass, setSortSvgClass] = useState('sortAscSvg');

    const onClickSortHandler = () => {
        props.onSortClicked();
        setSortSvgClass((prevState) => {
            return prevState === 'sortAscSvg' ? 'sortDescSvg' : 'sortAscSvg';
        });

        console.log(sortSvgClass);
    }


    function displayStatus(status) {
        switch (status) {
            case 1:
                return <div class={styles['noSubmission']}>No submission</div>

            case 2:
                return <div class={styles['forChecking']}>To be checked</div>

            case 3:
                return <div class={styles['ok']}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.16995 0.035792C5.88849 0.247328 3.77337 1.32101 2.2563 3.03797C0.739042 4.75492 -0.0662966 6.98601 0.00427525 9.27616C0.0749888 11.5663 1.0162 13.7432 2.63645 15.3636C4.25669 16.9838 6.43367 17.925 8.72385 17.9957C11.0141 18.0663 13.2452 17.261 14.962 15.7437C16.679 14.2264 17.7527 12.1115 17.9642 9.83005C18.1215 8.07035 17.7588 6.30314 16.9212 4.74765C16.0837 3.19201 14.808 1.91636 13.2524 1.07887C11.6969 0.241231 9.92969 -0.121426 8.16999 0.0358304L8.16995 0.035792ZM13.8345 6.9774L8.50023 12.2561C8.34012 12.4119 8.12559 12.4992 7.90224 12.4992C7.6789 12.4992 7.46438 12.4119 7.30426 12.2561L4.16021 9.25365C3.93896 9.04107 3.84791 8.72666 3.92116 8.42887C3.99457 8.13092 4.22136 7.89488 4.51601 7.80949C4.81067 7.72398 5.1285 7.80232 5.34975 8.01475L7.88731 10.4494L12.6364 5.75817C12.8558 5.55187 13.1675 5.47592 13.4572 5.558C13.7471 5.64022 13.9726 5.8685 14.0511 6.15927C14.1297 6.45005 14.0499 6.7607 13.8409 6.97762L13.8345 6.9774Z" fill="#1A9E50" />
                    </svg>
                    Ok</div>

            case 4:
                return <div class={styles['withRevisions']}>With Revisions</div>

            default:
                return <div class={styles['noSubmission']}>No Submission</div>
        }
    }

    let counter = 0;

    function dateFormat(dateSubmitted) {

        const date = new Date(dateSubmitted);
        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const day = date.getDay();
        const year = date.getFullYear();
        const hours = date.getUTCHours();
        const minutes = date.getMinutes();
        const minutesWithLeadingZero = minutes.toString().length < 2 ? "0" + minutes : minutes;
        const timeLabel = hours >= 12 ? "pm" : "am";

        // const formatted = `${month[date.getMonth()]} ${day}, ${year} ${hours}:${minutesWithLeadingZero} ${timeLabel}`;
        const formatted = `${month[date.getMonth()]} ${day}, ${year} ${date.toLocaleTimeString()}`;
        return formatted;
    }

    const navigateToCheckWFAR = (index) => {
        navigate("/WFARChecking/" + index)
    }

    const rowClick = (wfars) => {
        if (wfars.length > 0) {
            if (wfars[0].submitted_at != null) {
                navigateToCheckWFAR(wfars[0].id);
            }
        }
    }

    const ViewFaculty = (id) => {
        //save ID to view_id
        let data = {
            view_id: id,
        };
        axios({
            method: "POST",
            url:
                "http://127.0.0.1:8000/api/profile/view-faculty/" + userInfo.id + "/",
            data: data,
        });
        //open viewfaculty
        navigate("/view-faculty");
    };


    return (
        <div className={styles.weeklyTableContainer}>
            <table className={styles.weeklyTable}>
                <tr>
                    <th>
                        Faculty{" "}
                        <svg
                            className={styles.sortFacultyName + " " + styles[sortSvgClass]}
                            onClick={onClickSortHandler}
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
                            onClick={() => rowClick(faculty.wfars)}

                        > {/* row 1  */}
                            <td onClick={() => ViewFaculty(faculty.id)}><strong>{faculty.last_name}</strong>, {faculty.first_name + " "}
                                {faculty.middle_name != null && faculty.middle_name != "N/a" ? faculty.middle_name[0] + ". " : ""}
                                {faculty.extension_name != null && faculty.extension_name != "N/a" ? faculty.extension_name : ""}
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
                            <td>
                                {faculty.wfars.length == 0 && 'No Entry' &&
                                    <TableCellButton
                                        id={null}
                                        label={"No Submission"}
                                        type="button"
                                        onClick={null}
                                        buttonEnabled={true} />}

                                {faculty.wfars.length > 0 && faculty.wfars[0].submitted_at == null &&
                                    <TableCellButton
                                        id={null}
                                        label={"No Submission"}
                                        type="button"
                                        onClick={null}
                                        buttonEnabled={true} />}

                                {faculty.wfars.length > 0 && faculty.wfars[0].submitted_at != null &&
                                    <TableCellButton
                                        id={null}
                                        label={"View Submission"}
                                        type="primary"
                                        onClick={() => navigateToCheckWFAR(faculty.wfars[0].id)}
                                        buttonEnabled={false} />}
                            </td>
                        </tr>)
                })}


                {counter == 0 &&
                    <tr>
                        <td colSpan={5}>
                            <div className="placeholder-data-not-available">No data is available.</div>
                        </td>
                    </tr>}
            </table>
        </div>
    );
};


export default WeeklyTable;

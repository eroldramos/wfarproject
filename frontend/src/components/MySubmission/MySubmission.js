import { Fragment } from "react";
import Tab from "../UI/Tab/Tab";
import SemesterDropdownField from "./Filter/SemesterDropdownField";
import styles from "./MySubmission.module.css";
import MyWFAR from "./MyWFAR/MyWFAR";
import MyWFARCard from "./MyWFAR/MyWFARCard";

const MySubmission = (props) => {


    const SAMPLE_ITEMS = [
        { label: "2021 - 2022 1st Semester", id: 1 },
        { label: "2021 - 2022 2st Semester", id: 2 },
        { label: "2022 - 2023 1st Semester", id: 3 }
    ];


    const TABS = [
        { label: "My WFARs", id: 1, side: false },
        { label: "Archived WFAR Entries", id: 2, side: true }
    ];


    const WFAR_ITEMS = [
        {
            weekTitle: "Week 3",
            startDate: "2022-04-08",
            endDate: "2022-04-14",
            status: 3,
            entryNo: 5
        },
        {
            weekTitle: "Week 3",
            startDate: "2022-04-08",
            endDate: "2022-04-14",
            status: 1,
            entryNo: 2
        }, 
        {
            weekTitle: "Week 3",
            startDate: "2022-04-08",
            endDate: "2022-04-14",
            status: 1,
            entryNo: 6
        },
        {
            weekTitle: "Week 2",
            startDate: "2022-04-01",
            endDate: "2022-04-17",
            status: 2,
            entryNo: 5
        },
        {
            weekTitle: "Week 1",
            startDate: "2022-03-23",
            endDate: "2022-03-30",
            status: 4,
            entryNo: 1
        },
    ]

    // weekTitle = "Week 1" weekDate = "April 8 - April 14" wfarStatus = { 3} entryNo = { 5}

    return (
        <Fragment>
            <h1>My Weekly Faculty Accomplishment Reports</h1>
            <SemesterDropdownField
                id="semester"
                name="semester"
                labelName={"Semester"}
                onChange={null}
                options={SAMPLE_ITEMS}
                size="rg"
                type="filter" />

            <div className={styles["tab-container"]}>
                <Tab items={TABS} />
                <MyWFAR items={WFAR_ITEMS}/>                
            </div>
        </Fragment>
    )
}

export default MySubmission;
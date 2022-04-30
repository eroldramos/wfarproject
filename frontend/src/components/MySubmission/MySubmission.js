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
                <MyWFAR />                
            </div>
        </Fragment>
    )
}

export default MySubmission;
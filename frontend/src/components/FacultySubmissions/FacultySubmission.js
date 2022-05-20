import WFARSubmissionsOverview from "./WFARSubmissionsOverview/WFARSubmissionsOverview";
import WFARWeeklyView from "./WFARWeeklyView/WFARWeeklyView";
import styles from "./FacultySubmission.module.css";
import FilterButton from "../UI/FormControl/Button/FilterButton";
import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";

const FacultySubmission = () => {
    // hooks
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // redux states, objects
    const wfars = useSelector((state) => state.myWfars.wfars);
    const archivedWfarEntries = useSelector((state) => state.myWfarsArchived.archivedEntries);
    const semesters = useSelector((state) => state.wfarSemesters.semesters);
    const newChange = useSelector((state) => state.myWfarRefresh.newChange);

    return (
        <Fragment>
            <div className={styles.mainConainter}>
                <h1>Weekly Faculty Accomplishment Reports</h1>
                <div style={{ width: "fit-content", float: "left" }}>
                    <h3>Faculty Submissions</h3>
                </div>

                <div className={styles.viewOptionsContainer}>
                    {/* <FilterButton
                        label="Overview"
                        type="primary"
                        linkTo="overview" />
                    <FilterButton
                        label="Weekly View"
                        type="primary"
                        linkTo="weekly-view" /> */}
                </div>

            </div>
            <Routes>
                <Route path="" element={<WFARSubmissionsOverview />}></Route>
                <Route path="overview" element={<WFARSubmissionsOverview />}></Route>
                <Route path="weekly-view" element={<WFARWeeklyView />}></Route>
            </Routes>
        </Fragment>
    )
}

export default FacultySubmission;
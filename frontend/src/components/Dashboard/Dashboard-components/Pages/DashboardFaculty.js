import "../../DashboardCSS/Dashboard-faculty.css"
import NotificationInDashboard from "../../Dashboard-components/NotificationInDashboard";
import CurrentWeekContainer from "../CurrentWeekContainer";
import WFARcompleted from "../WFARcompleted";
import WFARuncheckedFaculty from "../WFARuncheckedFaculty";
import RevisionContainer from "../RevisionContainer";

import { Fragment, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import styles from "../../../MySubmission/MySubmission.module.css";
import MyWFAR from "../../../MySubmission/MyWFAR/MyWFAR";
import { useSelector, useDispatch } from "react-redux";
import { retrieveWfars, retrieveArchivedWfars, retrieveWfarsSemestersList } from "../../../../store/myWfarsActions";
import { myWfarSemesterFilterActions, myWfarRefreshActions } from "../../../../store/myWfarReducers";

const DashboardFaculty = () => {

    // // hooks
    // const navigate = useNavigate();
    // const dispatch = useDispatch();

    // // redux states, objects
    // const wfars = useSelector((state) => state.allWFARwholeSem.wfar)
    // let twoWfars;
    // if (wfars.length>0) {
    //     twoWfars = [wfars[0], wfars[1]]
    // }

    // const semesters = useSelector((state) => state.wfarSemesters.semesters);

    // // get active sem
    // const sem = useSelector((state) => state.activeSem).activeSem;
    // let filterSemester = 1;
    // if (sem) filterSemester = sem[0].id

    // // retrieving wfars and archived wfars
    // useEffect(() => {
    //     dispatch(retrieveWfarsSemestersList(filterSemester));
    // }, [filterSemester]);

    return (
        <div className="dashboard-faculty">

            <div className="main-container">
                <div className="header">
                    <h1>Dashboard</h1>
                </div>

                <NotificationInDashboard />

                <CurrentWeekContainer />

                <div className="total-submission-container">
                    <WFARcompleted />
                    <WFARuncheckedFaculty />
                </div>

                <div className="my-wfar">
                    <div className="my-wfar-info">
                        <h3>My WFAR</h3>
                        <p>{'View All >'}</p>
                    </div>
                    <div className="my-wfar-container-dashboard">
                        {/* {twoWfars &&
                            <Routes>
                                <Route path="" element={<MyWFAR items={twoWfars} />}></Route>
                            </Routes>
                        } */}

                    </div>
                </div>

                <div className="management-container">
                    <div className="need-revision">
                        <h3>Need Revision</h3>
                    </div>
                    <RevisionContainer />
                </div>
            </div>
        </div>
    );
};

export default DashboardFaculty;

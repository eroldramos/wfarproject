import "../../DashboardCSS/Dashboard-area-depthead.css"
import pendingAccountIcon from "../../../../assets/DashboardDummyImg/access_time.svg"
import NotificationInDashboard from "../../Dashboard-components/NotificationInDashboard";
import WFARreceived from "../../Dashboard-components/WFARreceived";
import WFARunchecked from "../../Dashboard-components/WFARunchecked";
import ManageFacultiesUsers from "../../Dashboard-components/ManagementFacultiesUser";
import WFARstatusDashboard from "../../Dashboard-components/WFARstatusDashboard";

import { useEffect } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import styles from "../../../MySubmission/MySubmission.module.css";
import MyWFAR from "../../../MySubmission/MyWFAR/MyWFAR";
import { useSelector, useDispatch } from "react-redux";
import { retrieveWfars, retrieveWfarsSemestersList } from "../../../../store/myWfarsActions";
import { getPendingAccounts } from "../../../../store/pendingAccountsActions"




const DashboardAreaDeptHead = () => {

    // hooks
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // redux states, objects
    const wfars = useSelector((state) => state.myWfars.wfars);
    let twoWfars;
    if (wfars.length > 0) {
        twoWfars = [wfars[0], wfars[1]]
    }

    const semesters = useSelector((state) => state.wfarSemesters.semesters);
    const pendingFaculties = useSelector((state) => state.getPendingAccounts);
    let no_of_pending = 0;

    if (pendingFaculties) {
        if (pendingFaculties.pendingAccounts.faculties)
            no_of_pending = pendingFaculties.pendingAccounts.faculties.length;
    }

    // get active sem
    const sem = useSelector((state) => state.activeSem).activeSem;
    let filterSemester = 1;
    if (sem) filterSemester = sem[0].id

    useEffect(() => {
        dispatch(getPendingAccounts());
    }, [dispatch]);

    // retrieving wfars and archived wfars
    useEffect(() => {
        dispatch(retrieveWfars(filterSemester));
        dispatch(retrieveWfarsSemestersList(filterSemester));
    }, [filterSemester]);


    return (
        <div className="dashboard-area-depthead">

            <div className="main-container">
                <div className="header">
                    <h1>Dashboard</h1>
                </div>

                <NotificationInDashboard />

                <div className="total-submission-container">
                    <WFARreceived />
                    <WFARunchecked />
                </div>

                <WFARstatusDashboard role="dashboard-area-depthead"/>

                <div className="my-wfar">
                    <div className="my-wfar-info">
                        <h3>My WFAR</h3>
                        <Link to={'/mySubmission/'}>
                            <p>{'View All  >'}</p>
                        </Link>
                    </div>
                    <div className="my-wfar-container-dashboard">
                        {twoWfars &&
                            <Routes>
                                <Route path="" element={<MyWFAR items={twoWfars} />}></Route>
                            </Routes>
                        }
                    </div>
                </div>

                <div className="management-container">
                    <div className="faculties">
                        <h3>Faculties</h3>
                    </div>

                    <ManageFacultiesUsers />

                    <Link className="manage-pending-accounts text-link" to={'/pending-accounts/'}>
                        <div className="pending-accounts-icon">
                            <img src={pendingAccountIcon} alt="" />
                        </div>
                        <h3>Pending Accounts <p className="no_pending_dashboard">{no_of_pending}</p></h3>
                    </Link>
                </div>
            </div>


        </div>
    );
};

export default DashboardAreaDeptHead;

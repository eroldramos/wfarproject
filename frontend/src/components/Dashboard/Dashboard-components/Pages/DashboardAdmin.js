import "../../DashboardCSS/Dashboard-admin.css"
import pendingAccountIcon from "../../../../assets/DashboardDummyImg/access_time.svg"
import PerRoleTotalSubmission from "../../Dashboard-components/PerRoleTotalSubmission";
import ManagementPageRedirection from "../../Dashboard-components/ManagementPageRedirection";
import NotificationInDashboard from "../../Dashboard-components/NotificationInDashboard";
import WFARstatusDashboard from "../../Dashboard-components/WFARstatusDashboard";
import { getPendingAccounts } from "../../../../store/pendingAccountsActions"
import PendingAccountsScreen from "../../../Screens/FacultySubmissionScreen";
import { useSelector, useDispatch } from "react-redux";
import { retrieveWfars, retrieveWfarsSemestersList } from "../../../../store/myWfarsActions";

import { useEffect } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";

const DashboardAdmin = () => {

     // hooks
     const dispatch = useDispatch();

     const pendingFaculties = useSelector((state) => state.getPendingAccounts);
     let no_of_pending = 0;
 
     if (pendingFaculties) {
         if (pendingFaculties.pendingAccounts.faculties)
             no_of_pending = pendingFaculties.pendingAccounts.faculties.length;
     }

     useEffect(() => {
        dispatch(getPendingAccounts());
    }, [dispatch]);


    return (
        <div className="dashboard-admin">

            <div className="main-container">

                <div className="header">
                    <h1>Dashboard</h1>
                </div>

                <NotificationInDashboard/>

                <div className="total-submission-container">

                    <PerRoleTotalSubmission role="DEPARTMENT HEAD"/>
                    <PerRoleTotalSubmission role="AREA CHAIR"/>
                    <PerRoleTotalSubmission role="FACULTY"/>
                </div>

                <WFARstatusDashboard role="dashboard-admin"/>
                
                <div className="management-container">

                    <ManagementPageRedirection role="Department Head"/>
                    <ManagementPageRedirection role="Area chair"/>
                    <ManagementPageRedirection role="Faculty"/>
                    
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

export default DashboardAdmin;

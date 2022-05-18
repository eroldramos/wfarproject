import "../../DashboardCSS/Dashboard-admin.css"
import pendingAccountIcon from "../../../../assets/DashboardDummyImg/access_time.svg"
import PerRoleTotalSubmission from "../../Dashboard-components/PerRoleTotalSubmission";
import ManagementPageRedirection from "../../Dashboard-components/ManagementPageRedirection";
import NotificationInDashboard from "../../Dashboard-components/NotificationInDashboard";
import WFARstatusDashboard from "../../Dashboard-components/WFARstatusDashboard";
import { useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import { getAllWFARinThisWeek ,getAllUser, getActiveSem} from "../../../../store/dashboardAction";

const DashboardAdmin = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllWFARinThisWeek())
    },[dispatch]);

    useEffect(()=>{
        dispatch(getAllUser())
    },[dispatch]);

    useEffect(()=>{
        dispatch(getActiveSem())
    },[dispatch]);

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

                <WFARstatusDashboard/>

                <div className="management-container">

                    <ManagementPageRedirection role="Department Head"/>
                    <ManagementPageRedirection role="Area chair"/>
                    <ManagementPageRedirection role="Faculty"/>
                    
                    <div className="manage-pending-accounts">
                        <div className="pending-accounts-icon">
                            <img src={pendingAccountIcon} alt="" />
                        </div>
                        <h3>Pending Accounts</h3>
                    </div>
                </div>
            </div>     
        </div>
    );
};

export default DashboardAdmin;

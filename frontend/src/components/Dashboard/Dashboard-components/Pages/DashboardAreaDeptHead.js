import "../../DashboardCSS/Dashboard-area-depthead.css"
import pendingAccountIcon from "../../../../assets/DashboardDummyImg/access_time.svg"
import NotificationInDashboard from "../../Dashboard-components/NotificationInDashboard";
import WFARreceived from "../../Dashboard-components/WFARreceived";
import WFARunchecked from "../../Dashboard-components/WFARunchecked";
import ManageFacultiesUsers from "../../Dashboard-components/ManagementFacultiesUser";
import WFARstatusDashboard from "../../Dashboard-components/WFARstatusDashboard";
import WFARStatus from "../../../UI/WFAR/WFARStatus/WFARStatus";


const DashboardAreaDeptHead = () => {

    return (
        <div className="dashboard-area-depthead">

            <div className="main-container">
                <div className="header">
                    <h1>Dashboard</h1>
                </div>

                <NotificationInDashboard/>

                <div className="total-submission-container">
                    <WFARreceived/>
                    <WFARunchecked/>
                </div>

                <WFARstatusDashboard/>

                <div className="my-wfar">
                    <div className="my-wfar-info">
                        <h3>My WFAR</h3>
                        <p>View All</p>
                    </div>
                    <div>
                        <WFARStatus/>
                    </div>
                </div>

                <div className="management-container">
                    <div className="faculties">
                        <h3>Faculties</h3>
                    </div>
                    
                    <ManageFacultiesUsers/>

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

export default DashboardAreaDeptHead;

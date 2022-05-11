import "../../DashboardCSS/Dashboard-admin.css"
import pendingAccountIcon from "../../../../assets/DashboardDummyImg/access_time.svg"
import PerRoleTotalSubmission from "../../Dashboard-components/PerRoleTotalSubmission";
import ManagementPageRedirection from "../../Dashboard-components/ManagementPageRedirection";
import NotificationInDashboard from "../../Dashboard-components/NotificationInDashboard";
import WFARstatusDashboard from "../../Dashboard-components/WFARstatusDashboard";

const DashboardAdmin = () => {

    return (
        <div className="dashboard-admin">

            <div className="main-container">

                <div className="header">
                    <h1>Dashboard</h1>
                </div>

                <NotificationInDashboard/>

                <div className="total-submission-container">
                    <PerRoleTotalSubmission/>
                    <PerRoleTotalSubmission/>
                    <PerRoleTotalSubmission/>
                </div>

                <WFARstatusDashboard/>

                <div className="management-container">
                    <ManagementPageRedirection/>
                    <ManagementPageRedirection/>
                    <ManagementPageRedirection/>
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

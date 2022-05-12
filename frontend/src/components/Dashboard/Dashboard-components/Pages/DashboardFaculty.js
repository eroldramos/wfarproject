import "../../DashboardCSS/Dashboard-faculty.css"
import pendingAccountIcon from "../../../../assets/DashboardDummyImg/access_time.svg"
import PerRoleTotalSubmission from "../../Dashboard-components/PerRoleTotalSubmission";
import ManagementPageRedirection from "../../Dashboard-components/ManagementPageRedirection";
import NotificationInDashboard from "../../Dashboard-components/NotificationInDashboard";
import WFARstatusDashboard from "../../Dashboard-components/WFARstatusDashboard";

const DashboardFaculty = () => {

    return (
        <div className="dashboard-faculty">

            <div class="main-container">
                <div class="header">
                    <h1>Dashboard</h1>
                </div>

                <NotificationInDashboard/>

                <div class="current-week-main-container">
                    <div class="current-semester">
                        <p>1st Semester of 2021-2022</p>
                    </div>
                    <div class="current-week-container">
                        <p id="current-week">WEEK 7</p>
                        <p>Current Week</p>
                    </div>
                </div>

                <div class="total-submission-container">
                    <div class="wfar-completed">
                        <div class="info">
                            <h3>WFAR</h3>
                            <h3>Completed</h3>
                        </div>
                        <div class="number-completed-container">
                            <div class="vertical-design"></div>
                            <div class="number-completed">
                                <p>06</p>
                            </div>
                        </div>
                    </div>
                    <div class="wfar-inprogress">
                        <div class="info">
                            <h3>WFAR</h3>
                            <h3>In Progress</h3>
                        </div>
                        <div class="number-inprogress-container">
                            <div class="vertical-design"></div>
                            <div class="number-inprogress">
                                <p>02</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="my-wfar">
                    <div class="my-wfar-info">
                        <h3>My WFAR</h3>
                        <p>View All</p>
                    </div>

                </div>

                <div class="management-container">
                    <div class="need-revision">
                        <h3>Need Revision</h3>
                    </div>
                    <div class="revision-container">
                        <div class="revision-instance">
                            <div class="revision-date">
                                <div class="revision-week">Week 4</div>
                                <div class="revision-day">Commented 20 days ago</div>
                            </div>
                            <div class="revision-comment">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor...</div>
                            <div class="edit-button">
                                <p>Edit</p>
                            </div>
                        </div>
                        <div class="revision-instance">
                            <div class="revision-date">
                                <div class="revision-week">Week 3</div>
                                <div class="revision-day">Commented 37 days ago</div>
                            </div>
                            <div class="revision-comment">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor...</div>
                            <div class="edit-button">
                                <p>Edit</p>
                            </div>
                        </div>
                        <div class="revision-instance">
                            <div class="revision-date">
                                <div class="revision-week">Week 1</div>
                                <div class="revision-day">Commented 45 days ago</div>
                            </div>
                            <div class="revision-comment">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor...</div>
                            <div class="edit-button">
                                <p>Edit</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardFaculty;

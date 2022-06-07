import notificationIcon from "../../../assets/DashboardDummyImg/notifications.svg"
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";

const NotificationInDashboard = (props) => {

    const loggedUser = useSelector((state) => state.login);
    const [notificationIsClicked, setNotificationIsClicked] = useState(false);

    const { userInfo, loading, error } = loggedUser;

    // notification
    const getNotification = useSelector((state) => state.getNotifications);
    const notificationOutput = getNotification.notifications != [] ?
        getNotification.notifications.map((notification) => {
            let picture = "/images/avatar.svg"
            switch (notification.type) {
                case 1: picture = "/images/iconsNotification/WFAR Submisison.svg";
                    break
                case 2: picture = "/images/iconsNotification/WFAR UNSUBMISSION.svg";
                    break
                case 3: picture = "/images/iconsNotification/WFAR CHECK STATUS OK.svg";
                    break
                case 4: picture = "/images/iconsNotification/check status with revision.svg";
                    break
                case 5: picture = "/images/iconsNotification/WAFAR COMMENT.svg";
                    break
                case 6: picture = "/images/iconsNotification/WFAR REGISTRATION.svg";
                    break
                case 7: picture = "/images/iconsNotification/promote (1).png";
                    break
                case 8: picture = "/images/iconsNotification/demote (1).png";
                    break
                case 9: picture = "/images/iconsNotification/Faculty assigned to a faculty.svg";
                    break
                case 10: picture = "/images/iconsNotification/Faculties assignment.svg";
                    break
            }

            let output = <div key={notification.id} className="notification-item">
                <img src={picture}></img>
                <div>
                    <div className="detail">
                        {notification.detail}
                    </div>
                    <div className="date_time">
                        {notification.notif_at}
                    </div>
                </div>
            </div>;
            let direct_to = "/dashboard/";
            if (notification.type < 6) direct_to = "/WFARChecking/" + notification.wfar_id;
            else if (notification.type == 6) direct_to = "/pending-accounts/"
            else if (notification.type == 7 || notification.type == 8 || notification.type == 10) direct_to = "/manage-faculty/faculty/"
            return <Link className="" to={direct_to}>
                {output}
            </Link>;
        }) : <p>No notification</p>

    return (
        <div className="notifications">
            {notificationIsClicked &&
                <div className="notification-overlay">
                    <div className="label"> Notifications </div>
                    <div className="laman">
                        {notificationOutput}
                    </div>
                </div>
            }

            <div className="notification-container">
                <img src={notificationIcon} alt="" onClick={() => setNotificationIsClicked(!notificationIsClicked)} />
            </div>
            <div className="greetings">
                <h3>Hi {userInfo.name},</h3>
                <p>Good day!</p>
            </div>
        </div>
    )
}

export default NotificationInDashboard;
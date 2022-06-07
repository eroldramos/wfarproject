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
            let output = <div key={notification.id} className="notification-item">
                <img src={notification.faculty_picture}></img>
                <div>
                    <div className="detail">
                        {notification.detail}
                    </div>
                    <div className="date_time">
                        {notification.notif_at}
                    </div>
                </div>
            </div>;
            const direct_to = "/pending-accounts/"
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
                <img src={notificationIcon} alt="" onClick={()=> setNotificationIsClicked(!notificationIsClicked)}/>
            </div>
            <div className="greetings">
                <h3>Hi {userInfo.name},</h3>
                <p>Good day!</p>
            </div>
        </div>
    )
}

export default NotificationInDashboard;
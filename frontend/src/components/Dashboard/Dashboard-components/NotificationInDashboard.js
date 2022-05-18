import notificationIcon from "../../../assets/DashboardDummyImg/notifications.svg"
import { useSelector } from "react-redux";

const NotificationInDashboard = (props) => {

    const loggedUser = useSelector((state) => state.login);
    const { userInfo, loading, error} = loggedUser;

    return (
        <div className="notifications">
            <div className="notification-container">
                <img src={notificationIcon} alt="" />
            </div>
            <div className="greetings">
                <h3>Hi {userInfo.name},</h3>
                <p>Good Evening!</p>
            </div>
        </div>
    )
}

export default NotificationInDashboard;
import notificationIcon from "../../../assets/DashboardDummyImg/notifications.svg"

const NotificationInDashboard = (props) => {

    return (
        <div className="notifications">
            <div className="notification-container">
                <img src={notificationIcon} alt="" />
            </div>
            <div className="greetings">
                <h3>Hi User,</h3>
                <p>Good Evening!</p>
            </div>
        </div>
    )
}

export default NotificationInDashboard;
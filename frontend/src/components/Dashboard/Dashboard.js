import "./DashboardCSS/Dashboard-area-depthead.css"
import DashboardAdmin from "./Dashboard-components/Pages/DashboardAdmin";
import DashboardAreaDeptHead from "./Dashboard-components/Pages/DashboardAreaDeptHead";
import DashboardFaculty from "./Dashboard-components/Pages/DashboardFaculty";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllWFARinThisWeek, getAllUser, getActiveSem, getAllWFARwholeSem } from "../../store/dashboardAction";
import { getAllNotification } from "../../store/notificationActions";

const Dashboard = () => {

    const loggedUser = useSelector((state) => state.login);
    const { userInfo, loading, error } = loggedUser;
    let userID = 1;
    if(userInfo!=null) userID = userInfo.id;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllWFARinThisWeek())
        dispatch(getAllUser())
        dispatch(getActiveSem())
        dispatch(getAllWFARwholeSem(userID))
        dispatch(getAllNotification(userID))
    }, [dispatch]);

    if (userInfo === null || error !== null) {
        return <Navigate to="/" />
    }

    let resultContent = <span> </span>
    if (userInfo) {
        if(userInfo.isAdmin){
            resultContent = <DashboardAdmin />
        }
        if(userInfo.userType === 2 ||userInfo.userType === 3){
            resultContent = <DashboardAreaDeptHead />
        }
        if(userInfo.userType === 1 && !userInfo.isAdmin){
            resultContent = <DashboardFaculty />
        }
    }


    return (
        <div>
            {resultContent}
        </div>
    );
};

export default Dashboard;

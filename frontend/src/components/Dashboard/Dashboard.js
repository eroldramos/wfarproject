import "./DashboardCSS/Dashboard-area-depthead.css"
import DashboardAdmin from "./Dashboard-components/Pages/DashboardAdmin";
import DashboardAreaDeptHead from "./Dashboard-components/Pages/DashboardAreaDeptHead";
import DashboardFaculty from "./Dashboard-components/Pages/DashboardFaculty";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllWFARinThisWeek, getAllUser, getActiveSem, getAllWFARwholeSem } from "../../store/dashboardAction";

const Dashboard = () => {

    const loggedUser = useSelector((state) => state.login);
    const { userInfo, loading, error } = loggedUser;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllWFARinThisWeek())
        dispatch(getAllUser())
        dispatch(getActiveSem())
        dispatch(getAllWFARwholeSem(userInfo.id))
    }, [dispatch]);

    if (userInfo === null || error !== null) {
        return <Navigate to="/admin-login" />
    }

    return (
        <div>
            {userInfo.isAdmin && <DashboardAdmin />}
            {(userInfo.userType === 2 || userInfo.userType === 3) && <DashboardAreaDeptHead />}
            {(userInfo.userType === 1 && !userInfo.isAdmin) && <DashboardFaculty />}
        </div>
    );

};

export default Dashboard;

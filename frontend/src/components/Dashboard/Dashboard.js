import "./DashboardCSS/Dashboard-area-depthead.css"
import DashboardAdmin from "./Dashboard-components/Pages/DashboardAdmin";
import DashboardAreaDeptHead from "./Dashboard-components/Pages/DashboardAreaDeptHead";
import DashboardFaculty from "./Dashboard-components/Pages/DashboardFaculty";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Dashboard = () => {

  const loggedUser = useSelector((state) => state.login);
  const { userInfo, loading, error} = loggedUser;

  if(userInfo === null || error !== null){
    return <Navigate to="/admin-login" />
  }

    return (
        <div>
            { userInfo.isAdmin && <DashboardAdmin/>}
            { (userInfo.userType === 2 || userInfo.userType === 3) && <DashboardAreaDeptHead/>}
            { (userInfo.userType === 1 && !userInfo.isAdmin)  && <DashboardFaculty/>}
        </div>
    );

};

export default Dashboard;

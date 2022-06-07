import imageDefault from "../../../assets/DashboardDummyImg/image2.jpg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ManageFacultiesUsers = (props) => {

    const navigate = useNavigate();

    const loggedUser = useSelector((state) => state.login);
    const { userInfo, loading, error } = loggedUser;
    const allUsersAssigned = useSelector((state) => state.allUsers).users.filter(x => x.assignee_id == userInfo.id);
    let resultContent;

    const ViewFaculty = (id) => {
        //save ID to view_id
        let data = {
          view_id: id,
        };
        axios({
          method: "POST",
          url:
            "http://127.0.0.1:8000/api/profile/view-faculty/" + userInfo.id + "/",
          data: data,
        });
        //open viewfaculty
        navigate("/view-faculty");
      };
      
    if (allUsersAssigned) {
        resultContent = allUsersAssigned.map((user) => {
            let name;
            if(user.name.indexOf('@')==-1){
                name = <p><strong>{user.last_name}</strong> {user.first_name}</p>
            }else{
                name = <p>{user.name}</p>
            }
            let output =
                <div key ={user.id} className="users" onClick={() => ViewFaculty(user.id)}>
                    <div className="user-container">
                        <img src={user.profile_picture} alt="" />
                    </div>
                    {name}
                </div>
            return output;
        });
    } else {
        resultContent = <span></span>
    }

    return (
        <div className="managed-faculties">
            {resultContent}
        </div>
    )
}

export default ManageFacultiesUsers;
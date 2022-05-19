import imageDefault from "../../../assets/DashboardDummyImg/image2.jpg";
import { useSelector } from "react-redux";

const ManageFacultiesUsers = (props) => {

    const loggedUser = useSelector((state) => state.login);
    const { userInfo, loading, error } = loggedUser;
    const allUsersAssigned = useSelector((state) => state.allUsers).users.filter(x => x.assignee_id == userInfo.id);
    let resultContent;

    if (allUsersAssigned) {
        resultContent = allUsersAssigned.map((user) => {
            let name;
            if(user.name.indexOf('@')==-1){
                name = <p><strong>{user.last_name}</strong> {user.first_name}</p>
            }else{
                name = <p>{user.name}</p>
            }
            let output =
                <div key ={user.id} className="users">
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
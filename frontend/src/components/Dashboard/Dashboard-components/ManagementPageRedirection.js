import imageDefault from "../../../assets/DashboardDummyImg/image2.jpg"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ManagementPageRedirection = (props) => {

    let role;
    let roleName = "";

    if (props.role.toUpperCase() === "DEPARTMENT HEAD") {
        role = 3;
        roleName = "department-head";
    }
    if (props.role.toUpperCase() === "AREA CHAIR") {
        role = 2;
        roleName = "area-chair";
    }
    if (props.role.toUpperCase() === "FACULTY") {
        role = 1;
        roleName = "faculty";
    }

    const allUser = useSelector((state) => state.allUsers).users;

    let filteredUser;
    let resultContent;
    let countOfHiddenPict = 0;

    if (allUser) {
        filteredUser = allUser.filter(x => x.userType == role);

        resultContent = filteredUser.map((user, index) => {
            if (index < 5) {
                let output =
                    <div key={user.id} className="user-container">
                        <img src={user.profile_picture} alt="" />
                    </div>
                return output;
            } else {
                countOfHiddenPict = filteredUser.length - 5;
                return;
            }
        });
    } else {
        resultContent = <span></span>
    }



    return (
        <div className="manage-department-head">
            <Link className='text-link' to={`../manage-faculty/${roleName}/`}>
                <h3>{props.role}</h3>
                <div className="users">
                    {
                        resultContent
                    }
                    { countOfHiddenPict > 0 &&
                        <div className="user-container">
                            <p>+{countOfHiddenPict}</p>
                        </div>
                    }
                </div>
            </Link>
        </div>

    )
}

export default ManagementPageRedirection;
import imageDefault from "../../../assets/DashboardDummyImg/image2.jpg"

const ManagementPageRedirection = (props) => {

    return (
        <div className="manage-department-head">
            <h3>Department Head</h3>
            <div className="users">
                <div className="user-container">
                    <img src={imageDefault} alt="" />
                </div>
                <div className="user-container">
                    <img src={imageDefault} alt="" />
                </div>
                <div className="user-container">
                    <img src={imageDefault} alt="" />
                </div>
            </div>
        </div>
    )
}

export default ManagementPageRedirection;
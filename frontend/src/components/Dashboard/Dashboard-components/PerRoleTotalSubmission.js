import { useSelector } from "react-redux";

const PerRoleTotalSubmission = (props) => {

    let role;
    let countOfSubmitted = 0;

    if(props.role === "DEPARTMENT HEAD") role = 3;
    if(props.role === "AREA CHAIR") role = 2;
    if(props.role === "FACULTY") role = 1;

    const wfar = useSelector((state) => state.allWFARthisWeek).wfar.filter(x => x.owner.user_type == role);
    const totalCountPerRole = useSelector((state) => state.allUsers).users.filter(x => x.userType == role).length;
    const percentageOfSubmitted = parseInt((wfar.length/totalCountPerRole)*100);

    wfar.forEach(function (wfarItem) {
        countOfSubmitted++;
    });

    return (
        <div className="per-role-submission">
            <div className="info">
                <h5>{props.role}</h5>
                <div className="total-submission-status">
                    <p className="total-submitted">{countOfSubmitted}<span className="total-employees">/{totalCountPerRole}</span></p>
                </div>
                <p className="phrase">have submitted this week</p>
            </div>
            <div className="graph-container">
                <div className="circular-progress">
                    <div className="value-container">{percentageOfSubmitted>0?percentageOfSubmitted:0}%</div>
                </div>
            </div>
        </div>
    )
}

export default PerRoleTotalSubmission;
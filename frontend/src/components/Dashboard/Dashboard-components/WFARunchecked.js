import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const WFARunchecked = (props) => {

    const loggedUser = useSelector((state) => state.login);
    const { userInfo, loading, error } = loggedUser;
    const sem = useSelector((state) => state.activeSem).activeSem;
    const no_of_unchecked = useSelector((state) => state.allWFARthisWeek).wfar.filter(x => x.owner.assignee_id == userInfo.id && x.status == 2).length;

    let current_week = 0;
    if (sem) {
        current_week = sem[0].current_week;
    }

    return (
        <div className="wfar-unchecked">
            <Link className='text-link' to={'/FacultySubmission/overview'}>
                <div className="info">
                    <h3>WFAR Unchecked</h3>
                    <p className="week">Week {current_week}</p>
                </div>
                <div className="number-unchecked-container">
                    <div className="vertical-design"></div>
                    <div className="number-unchecked">
                        <p>{no_of_unchecked < 10 && no_of_unchecked > 0 ? "0" + no_of_unchecked : no_of_unchecked}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default WFARunchecked;
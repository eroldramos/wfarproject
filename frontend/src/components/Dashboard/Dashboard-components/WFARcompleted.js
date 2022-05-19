import { useSelector } from "react-redux";

const WFARcompleted = (props) => {

    const loggedUser = useSelector((state) => state.login);
    const { userInfo, loading, error} = loggedUser;
    const no_of_completed  = useSelector((state) => state.allWFARwholeSem).wfar.filter(x => x.status == 3 ).length;

    return (
        <div className="wfar-completed">
            <div className="info">
                <h3>WFAR</h3>
                <h3>Completed</h3>
            </div>
            <div className="number-completed-container">
                <div className="vertical-design"></div>
                <div className="number-completed">
                    <p>{no_of_completed<10 && no_of_completed>0 ? "0"+no_of_completed :no_of_completed}</p>
                </div>
            </div>
        </div>
    )
}

export default WFARcompleted;
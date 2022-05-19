import { useSelector } from "react-redux";

const WFARreceived = (props) => {

    const loggedUser = useSelector((state) => state.login);
    const { userInfo, loading, error} = loggedUser;
    const sem = useSelector((state) => state.activeSem).activeSem;
    const no_of_received  = useSelector((state) => state.allWFARthisWeek).wfar.filter(x => x.checker.id == userInfo.id).length;

    let current_week = 0;
    if(sem){
        current_week = sem[0].current_week;
    }
    
    return (
        <div className="wfar-received">
            <div className="info">
                <h3>WFAR Received</h3>
                <p className="week">Week {current_week}</p>
            </div>
            <div className="number-received-container">
                <div className="vertical-design"></div>
                <div className="number-received">
                    <p>{no_of_received<10 && no_of_received>0 ? "0"+no_of_received :no_of_received}</p>
                </div>
            </div>
        </div>
    )
}

export default WFARreceived;
import { useSelector } from "react-redux";

const WFARstatusDashboard = (props) => {

    const sem = useSelector((state) => state.activeSem).activeSem;
    let label;
    let school_year;
    if(sem){
        label = sem[0].label;
        school_year = sem[0].school_year;
    }
    return (
        <div className="wfar-status-container">
                    <h3>WFAR Status</h3>
                    <p>{label} of {school_year}</p>
                    <div className="status-graph-container">
                        <div className="status-graph">
                            <div className="container">
                                <div className="donut-chart-block block">
                                    <div className="donut-chart">
                                        <div id="part1" className="portion-block">
                                            <div className="circle"></div>
                                        </div>
                                        <div id="part2" className="portion-block">
                                            <div className="circle"></div>
                                        </div>
                                        <div id="part3" className="portion-block">
                                            <div className="circle"></div>
                                        </div>
                                        <p className="center"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="status-container">
                            <div className="per-status-container">
                                <div className="square"></div>
                                <p>OK</p>
                            </div>
                            <div className="per-status-container">
                                <div className="square"></div>
                                <p>Need Revision</p>
                            </div>
                            <div className="per-status-container">
                                <div className="square"></div>
                                <p>No Submission</p>
                            </div>
                        </div>
                    </div>
                </div>
    )
}

export default WFARstatusDashboard;
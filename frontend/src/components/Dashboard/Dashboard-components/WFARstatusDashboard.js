import { useSelector } from "react-redux";

const WFARstatusDashboard = (props) => {

    const sem = useSelector((state) => state.activeSem).activeSem;
    // const allWFARS = useSelector((state) => state.allWFARwholeSem).wfar;

    let label = 0;
    let school_year = "";
    // let percentage1 = -1;
    // let percentage2 = -1;
    // let percentage3 = -1;

    if (sem) {
        label = sem[0].label;
        school_year = sem[0].school_year;
        // if(allWFARS){
        //     let no_submission = allWFARS.filter(x => x.status == 1).length;
        //     let needrevision = allWFARS.filter(x => x.status == 4).length;
        //     let ok = allWFARS.filter(x => x.status == 3).length;
            
        //     let total = no_submission + needrevision + ok;
            
        //     percentage1 = (ok/total)*100;
        //     percentage2 = (needrevision/total)*100;
        //     percentage3 = (no_submission/total)*100;
        // }
    }
    // console.log("ok percentage: "+percentage1 + " need revision: "+percentage2+"  no_sub: "+percentage3);

    // let percentageToDegree1 = -1;
    // let percentageToDegree1end = -1;
    // let percentageToDegree2 = -1;
    // let percentageToDegree2end = -1;
    // let percentageToDegree3 = -1;
    // let percentageToDegree3end = -1;

    // if(percentage1!=-1){
    //     if(percentage1==100) {
    //         percentageToDegree1 = 0;
    //         percentageToDegree2 = 0;
    //         percentageToDegree3 = 0;
    //         percentageToDegree1end = 360;
    //         percentageToDegree2end = 0;
    //         percentageToDegree3end = 0;
    //     }else if(percentage2==100) {
    //         percentageToDegree1 = 0;
    //         percentageToDegree2 = 0;
    //         percentageToDegree3 = 0;
    //         percentageToDegree1end = 0;
    //         percentageToDegree2end = 360;
    //         percentageToDegree3end = 0;
    //     }else if(percentage3==100) {
    //         percentageToDegree1 = 0;
    //         percentageToDegree2 = 0;
    //         percentageToDegree3 = 0;
    //         percentageToDegree1end = 0;
    //         percentageToDegree2end = 0;
    //         percentageToDegree3end = 360;
    //     }
    // }

    const degreeStart_okPortion = 0;
    const degreeStart_needRevisionPortion = 100;
    const degreeStart_noSubmissionPortion = 250;

    // const degreeEnd_okPortion = percentageToDegree1;
    // const degreeEnd_needRevisionPortion = percentageToDegree2;
    // const degreeEnd_noSubmissionPortion = percentageToDegree3;


    let firstPortionElement = document.querySelector(`.${props.role} #part1`);
    let secondPortionElement = document.querySelector(`.${props.role} #part2`);
    let thirdPortionElement = document.querySelector(`.${props.role} #part3`);

    if (firstPortionElement != null) {
        firstPortionElement.style.transform = `rotate(${degreeStart_okPortion}deg)`;
        secondPortionElement.style.transform = `rotate(${degreeStart_needRevisionPortion}deg)`;
        thirdPortionElement.style.transform = `rotate(${degreeStart_noSubmissionPortion}deg)`;
        document.documentElement.style.setProperty('--first-port-degree',`${100}deg`);
        document.documentElement.style.setProperty('--second-port-degree',`${150}deg`);
        document.documentElement.style.setProperty('--third-port-degree',`${111}deg`);
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
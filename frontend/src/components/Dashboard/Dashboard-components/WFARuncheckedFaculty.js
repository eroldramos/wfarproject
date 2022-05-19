import { useSelector } from "react-redux";

const WFARuncheckedFaculty = (props) => {

    const no_of_unchecked = useSelector((state) => state.allWFARwholeSem).wfar.filter(x => x.status == 2).length;

    return (
        <div className="wfar-inprogress">
            <div className="info">
                <h3>WFAR</h3>
                <h3>Not checked</h3>
            </div>
            <div className="number-inprogress-container">
                <div className="vertical-design"></div>
                <div className="number-inprogress">
                    <p>{no_of_unchecked<10 && no_of_unchecked>0 ? "0"+no_of_unchecked :no_of_unchecked}</p>
                </div>
            </div>
        </div>
    )
}

export default WFARuncheckedFaculty;
import { useSelector } from "react-redux";
import Revision from "./Revision";

const RevisionContainer = (props) => {

    const revisions = useSelector((state) => state.allWFARwholeSem).wfar.filter(x => x.status == 4);

    let resultContent;

    if (revisions) {
        resultContent = revisions.map((wfar) => {
            let output = <Revision key ={wfar.id} revision={wfar}/>
            return output;
        });
    } else {
        resultContent = <span></span>
    }

    return (
        <div className="revision-container">
            {resultContent}
        </div>
    )
}

export default RevisionContainer;
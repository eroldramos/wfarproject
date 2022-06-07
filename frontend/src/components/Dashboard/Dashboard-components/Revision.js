import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Revision = (props) => {

    const dispatch = useDispatch();
    const outputComment = props.revision.description;
    const outputDateTime = props.revision.created_at_fix

    return (
        <div className="revision-instance">
            <div className="revision-date">
                <div className="revision-week">Week {props.week_no}</div>
                <div className="revision-day">Commented {outputDateTime} </div>
            </div>
            <div className="revision-comment">{outputComment}</div>
            <div className="edit-button">
                <Link to={'/mySubmission/'}>
                    <p>Edit</p>
                </Link>
                
            </div>
        </div>
    )
}

export default Revision;
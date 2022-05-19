import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllWFARComments } from "../../../store/dashboardAction";
import { Link } from "react-router-dom";

const Revision = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllWFARComments(props.revision.id))
    }, [dispatch]);

    const comment = useSelector((state) => state.allWFARcomments).comment;
    let outputComement = " ";
    let diffDays = 0;
    if (comment.length > 0) {
        outputComement = comment[0].description;
        let today = new Date();
        let date = today.getFullYear() + ',' + (today.getMonth() + 1) + ',' + today.getDate();
        const date1 = new Date(date);
        const date2 = new Date(comment[0].created_at_date);
        const diffTime = Math.abs(date2 - date1);
        diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffTime < 57600000) {
            diffDays = -1;
        }
    }

    return (
        <div className="revision-instance">
            <div className="revision-date">
                <div className="revision-week">Week {props.revision.week_no}</div>
                <div className="revision-day">Commented {diffDays < 1 ? 'today' : diffDays + (diffDays == 1 ? ' day ago' : ' days ago')} </div>
            </div>
            <div className="revision-comment">{outputComement}</div>
            <div className="edit-button">
                <Link to={'/mySubmission/'}>
                    <p>Edit</p>
                </Link>
                
            </div>
        </div>
    )
}

export default Revision;
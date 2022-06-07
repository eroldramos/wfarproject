import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Revision from "./Revision";
import { getAllWFARComments } from "../../../store/dashboardAction";

const RevisionContainer = (props) => {

    const dispatch = useDispatch()
    const getcomments = useSelector((state) => state.allWFARcomments);
    const loggedUser = useSelector((state) => state.login);
    const { userInfo, loading, error } = loggedUser;

    let resultContent;

    useEffect(() => {
        dispatch(getAllWFARComments(userInfo.id));
    }, [dispatch]);

    if (getcomments.comment != []) {
        console.log(getcomments.comment);
        resultContent = getcomments.comment.map((comment) => {
            if (comment.wfar_owner_id.faculty_id == userInfo.id) {
                let output = <span></span>
                output = <Revision key={comment.id} week_no={comment.wfar_owner_id.week_no} revision={comment} />
                return output;
            }
        });
    }
    else {
        resultContent = <span></span>
    }

    return (
        <div className="revision-container">
            {resultContent}
        </div>
    )
}

export default RevisionContainer;
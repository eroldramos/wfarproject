import styles from "./CommentInput.module.css";
import ProfileImage from "../../../assets/profile.png";
import CommentField from "../../UI/FormControl/InputField/CommentField";
import Button from "../../UI/FormControl/Button/SmallButton";
import React, { useState, useEffect } from "react";
import { postComment, updateComment } from "../../../store/checkWfarActions";
import { useDispatch, useSelector } from "react-redux";
const CommentInput = (props) => {
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState(null);
  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.login);
  const { userInfo } = loggedUser;

  useEffect(() => {
    setComment(props.getComment.description);
    setCommentId(props.getComment.id);
  }, [props.getComment.description, props.getComment.id]);

  const onPostingComment = () => {
    let data = {
      wfar_id: props.id,
      description: comment,
    };
    console.log(data);
    setComment("");
    dispatch(postComment(data));
  };

  const onUpdateComment = () => {
    let data = {
      description: comment,
    };
    console.log(data, commentId);
    dispatch(updateComment(data, commentId));
    setCommentId(null);
    setComment("");
    props.setGetComment({});
  };

  const setCommentValue = (event) => {
    setComment(event.target.value);
    if (event.target.value.length == 0) {
      setCommentId(null);
      setComment("");
      props.setGetComment({});
    }
  };

  return (
    <div className={styles.commentInputContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.profileContainer}>
          <div
            style={{ backgroundImage: "url(" + userInfo.profile_picture + ")" }}
          ></div>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.commentField}>
            <CommentField
              id="entryComment"
              type="text"
              inputName="entryComment"
              placeholder="Enter a comment..."
              size="lg"
              value={comment}
              onChange={setCommentValue}
            />
          </div>

          <div className={styles.postBtnContainer}>
            {!commentId ? (
              <Button
                label="POST"
                type="primary"
                size="r"
                onClick={onPostingComment}
              />
            ) : (
              <Button
                label="UPDATE"
                type="primary"
                size="r"
                onClick={onUpdateComment}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CommentInput;

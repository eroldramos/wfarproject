import styles from "./CommentInput.module.css";
import ProfileImage from "../../../assets/profile.png"
import CommentField from "../../UI/FormControl/InputField/CommentField";
import Button from "../../UI/FormControl/Button/SmallButton";
import React, {useState} from "react";

const CommentInput = () =>{

    const [comment, setComment] = useState("");

    const postComment = () =>{
        console.log(comment);
    }
    return (
        <div className={styles.commentInputContainer}>
            <div className={styles.innerContainer}>
                <div className={styles.profileContainer}>
                    <div style={{ backgroundImage: 'url(' + ProfileImage + ')' }}></div>
                </div>
                <div className={styles.inputContainer}>
                    <div className={styles.commentField}>
                        <CommentField
                            id="entryComment"
                            type="text"
                            inputName="entryComment"
                            placeholder="Enter a comment..."
                            size="lg"
                            onChange = {(event) => setComment(event.target.value)}
                        />
                    </div>
                    
                    <div className={styles.postBtnContainer}>
                        <Button
                            label="POST"
                            type="primary"
                            size="r"
                            onClick = {postComment}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CommentInput;
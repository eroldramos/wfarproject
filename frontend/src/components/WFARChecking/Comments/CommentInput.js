import styles from "./CommentInput.module.css";
import ProfileImage from "../../../assets/profile.png"
import CommentField from "../../UI/FormControl/InputField/CommentField";
import Button from "../../UI/FormControl/Button/SmallButton";
const CommentInput = () =>{
    return (
        <div className={styles.commentInputContainer}>
            <div className={styles.innerContainer}>
                <div className={styles.profileContainer}>
                    <div style={{ backgroundImage: 'url(' + ProfileImage + ')' }}></div>
                </div>
                <div className={styles.inputContainer}>
                    <div className={styles.commentField}>
                        <CommentField
                            id="comment"
                            type="text"
                            inputName="sampleText"
                            placeholder="Enter a comment..."
                            size="lg"
                        />
                    </div>
                    
                    <div className={styles.postBtnContainer}>
                        <Button
                            label="POST"
                            type="primary"
                            size="r"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CommentInput;
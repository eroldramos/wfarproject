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
                <CommentField
                        id="comment"
                        type="text"
                        inputName="sampleText"
                        placeholder="Enter a comment..."
                        size="lg"
                    />
                    {/* <Button
                        label="POST"
                        type="primary"
                        size="r"
                    /> */}
                </div>
            </div>
        </div>
    );
}
export default CommentInput;
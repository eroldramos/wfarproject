import styles from './TeamMeetScreenshots.module.css';
import ImageCard from '../../UI/FormControl/ImageCard/ImageCard';

const TeamMeetScreenshots = (props) => {

    const getFileImage = () => {
        console.log("hello!");
        document.getElementById("teamMeetScreenshotImageFileInput").click();
    }

    const removeImage = (index) => {
        console.log("index: " + index);
        props.removeImage(index);
    }

    return (
        <div class={styles["team-meet-screenshots"]}>
            <label>Teams Meet Screenshot</label>

            <div className={styles['imageContainer']}>
                {props.teamMeetScreenshots.map((file, index) => {
                    return (
                        <div key={index}>
                            <ImageCard imageSrc={file.imageSrc} removeImage={() => removeImage(index)} />
                        </div>
                    )
                })}

                <ImageCard imageSrc="" getFileImage={getFileImage} onRemoveImage={null} />
                <input type="file" id="teamMeetScreenshotImageFileInput" name="myfile" accept="image/*" onChange={props.getImage} style={{ display: "none" }}></input>

            </div>
            
        </div>
    );
}

export default TeamMeetScreenshots;
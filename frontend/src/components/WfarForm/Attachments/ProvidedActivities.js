import styles from './ProvidedActivities.module.css';
import ImageCard from '../../UI/FormControl/ImageCard/ImageCard';

const ProvidedActivities = (props) => {

    const getFileImage = () => {
        console.log("hello!");
        document.getElementById("providedScreenshotImageFileInput").click();
    }

    const removeImage = (index) => {
        console.log("index: " + index);
        props.removeImage(index);
    }

    return (
        <div className={styles['provided-activities-screenshots']}>
            <label>Provided Activities</label>

            <div className={styles['imageContainer']}>
                {props.providedActivitiesScreenshots.map((file, index) => {
                    return (
                        <div key={index}>
                            <ImageCard imageSrc={file.imageSrc} removeImage={() => removeImage(index)} />
                        </div>
                    )
                })}

                <ImageCard imageSrc="" getFileImage={getFileImage} onRemoveImage={null} />
                <input type="file" id="providedScreenshotImageFileInput" name="myfile" accept="image/*" onChange={props.getImage} style={{ display: "none" }}></input>

            </div>

        </div>
    );
}

export default ProvidedActivities;
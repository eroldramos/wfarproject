import styles from "./Attachment.module.css";
import image from "../../../../assets/sample-image-attachment.png"
const ImageAttachment = () =>{
    return (
        <div className={styles.attachmentsContainer}>
            <h3>Description</h3>
            <div className={styles.imagesContainer}>
                <div>
                    <img src={image}></img>
                </div>
                <div>
                    <img src={image}></img>
                </div>
                <div>
                    <img src={image}></img>
                </div>
            </div>
            
        </div>
    )
}
export default ImageAttachment;
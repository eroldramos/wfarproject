import styles from "./Attachment.module.css";
import image from "../../../../assets/sample-image-attachment.png"
const ImageAttachment = () =>{
    for(let i = 0; i < 5; i++){
        return (
            <div className={styles.attachmentsContainer}>
                <h5>Description</h5>
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
}
export default ImageAttachment;
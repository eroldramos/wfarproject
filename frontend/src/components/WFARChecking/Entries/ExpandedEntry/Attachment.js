import styles from "./Attachment.module.css";
import image from "../../../../assets/sample-image-attachment.png";
const ImageAttachment = (props) => {
  const meetings = props.attachments.map((attachment, index) => {
    if (attachment.type == 1) {
      return (
        <div key={index}>
          <img className={styles["img"]} src={attachment.image_uri}></img>
        </div>
      );
    }
  });

  const activities = props.attachments.map((attachment, index) => {
    if (attachment.type == 2) {
      return (
        <div key={index}>
          <img className={styles["img"]} src={attachment.image_uri}></img>
        </div>
      );
    }
  });

  return (
    <div className={styles.attachmentsContainer}>
      <h3>Meeting Attachment</h3>
      <div className={styles.imagesContainer}>{meetings}</div>
      <h3>Activity Attachment</h3>
      <div className={styles.imagesContainer}>{activities}</div>
    </div>
  );
};
export default ImageAttachment;

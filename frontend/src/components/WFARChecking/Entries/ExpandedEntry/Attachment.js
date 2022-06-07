import styles from "./Attachment.module.css";
import image from "../../../../assets/sample-image-attachment.png";
const ImageAttachment = (props) => {
  let meetingsNum = 0;
  let activitiesNum = 0;

  const meetings = props.attachments.map((attachment, index) => {
    if (attachment.type == 1) {
      meetingsNum += 1;
      return (
        <div key={index}>
          <img className={styles["img"]} src={attachment.image_uri}></img>
        </div>
      );
    }
  });

  const activities = props.attachments.map((attachment, index) => {
    if (attachment.type == 2) {
      activitiesNum += 1;
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

      <div className={styles.imagesContainer}>
        {meetings}
        {meetingsNum == 0 && "No images available."}
      </div>
      <h3>Activity Attachment</h3>
      <div className={styles.imagesContainer}>
        {activities}
        {activitiesNum == 0 && "No images available."}
      </div>
    </div>
  );
};
export default ImageAttachment;

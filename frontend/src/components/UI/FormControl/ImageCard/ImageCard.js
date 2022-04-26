import styles from "./ImageCard.module.css";

const ImageCard = () => {
    return (
        <div className={styles["image-card"]}>
            <div className={styles["image-card__container"]}></div>
            <div className={styles["image-card__remove"]}>
                
            </div>
        </div>
    );
}
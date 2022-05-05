import styles from "./ImageCard.module.css";
import { useState } from "react";

const ImageCard = (props) => {

    const displayClass = props.imageSrc == "" ? "block" : "none";

    return (
        <div className={styles["image-card"] + " " + styles[displayClass]}>
            <div className={styles["container"]}>
                <img src={props.imageSrc}/>
                <div className={styles["placeholder"]} onClick={props.getFileImage}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 17.3333H17.3334V24C17.3334 24.7333 16.7334 25.3333 16 25.3333C15.2667 25.3333 14.6667 24.7333 14.6667 24V17.3333H8.00002C7.26669 17.3333 6.66669 16.7333 6.66669 16C6.66669 15.2666 7.26669 14.6666 8.00002 14.6666H14.6667V7.99996C14.6667 7.26663 15.2667 6.66663 16 6.66663C16.7334 6.66663 17.3334 7.26663 17.3334 7.99996V14.6666H24C24.7334 14.6666 25.3334 15.2666 25.3334 16C25.3334 16.7333 24.7334 17.3333 24 17.3333Z" fill="#323232" />
                    </svg>
                </div>
            </div>
            <div className={styles["remove-icon"]} onClick={props.removeImage}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="9.25" fill="white" stroke="#BE5A40" stroke-width="1.5" />
                    <path d="M9.65459 9.29754L10.0085 9.65224L10.3625 9.29754L12.5293 7.12604C12.6294 7.0257 12.7554 7.0257 12.8556 7.12604C12.9544 7.22505 12.9703 7.38069 12.9107 7.49954L10.7872 9.62759L10.4348 9.98076L10.7872 10.3339L12.9541 12.5054C13.0548 12.6064 13.0548 12.7345 12.9541 12.8355C12.9331 12.8565 12.8859 12.8861 12.7663 12.8861C12.6467 12.8861 12.5995 12.8565 12.5785 12.8355L10.4117 10.664L10.0578 10.3093L9.70384 10.664L7.53702 12.8355C7.51608 12.8565 7.46889 12.8861 7.34925 12.8861C7.22961 12.8861 7.18241 12.8565 7.16148 12.8355C7.06076 12.7345 7.06076 12.6064 7.16148 12.5054L9.3283 10.3339L9.68071 9.98076L9.3283 9.62759L7.16148 7.45609C7.06076 7.35515 7.06076 7.22698 7.16148 7.12604C7.2616 7.0257 7.38765 7.0257 7.48777 7.12604L9.65459 9.29754Z" fill="#BE5A40" stroke="#BE5A40" />
                </svg>
            </div>
        </div>
    );
}

export default ImageCard;
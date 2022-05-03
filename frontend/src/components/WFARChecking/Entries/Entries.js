import styles from "./Entries.module.css";
const Entries = () =>{
    return (
        <div className={styles.entries}>
            <div className={styles.detailsContainer}>
                <h4>Entry # 1</h4>
                <h4><b>Date Accomlished:</b> Apr 29, 2022</h4>
            </div>
            <div className={styles.attachmentContainer}>
                <h5>No attachments</h5>
                <div className={styles.iconContainer}>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1.41L10.59 -6.16331e-08L6 4.58L1.41 -4.62904e-07L-6.16331e-08 1.41L6 7.41L12 1.41Z" fill="#323232"/>
                    </svg>
                </div>
            </div>
        </div>
    )
}
export default Entries;
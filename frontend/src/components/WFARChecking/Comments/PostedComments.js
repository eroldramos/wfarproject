import styles from "./PostedComments.module.css"
import ProfileImage from "../../../assets/profile.png"
const PostedComments = () =>{
    return ( 
        <div className={styles.postedComments}>
            <div className={styles.senderDetailsContainer}>
                <div className={styles.imageContainer}>
                    <div className={styles.profileContainer}>
                        <div style={{ backgroundImage: 'url(' + ProfileImage + ')' }}></div>
                    </div>
                </div>
                <div className={styles.details_TimeContainer}>
                    <h4>Dela Rosa, Aaron M.</h4>
                    <h4>10 mins ago</h4>
                </div>
                <div className={styles.moreContainer}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16ZM12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14ZM12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8Z" fill="#323232"/>
                    </svg>
                </div>
            </div>
            <div className={styles.contentContainer}>
                <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h4>
            </div>
        </div>
    );
}
export default PostedComments;
import styles from "./Footer.module.css"
const Footer = () =>{
    return (
        <div className={styles.footerComponent}>
            <div className={styles.exportContainer}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.3286 3.82613H1.27544C0.937193 3.82613 0.612758 3.96056 0.373551 4.19968C0.13444 4.43889 0 4.76329 0 5.10157V9.77792C0 10.1162 0.134432 10.4405 0.373551 10.6797C0.612761 10.9189 0.937168 11.0533 1.27544 11.0533H2.12574V12.3286H2.12564C2.12564 12.6668 2.26007 12.9913 2.49919 13.2305C2.7384 13.4696 3.06281 13.604 3.40108 13.604H10.203C10.5413 13.604 10.8657 13.4696 11.1049 13.2305C11.344 12.9913 11.4785 12.6669 11.4785 12.3286V11.0533H12.3288H12.3287C12.6669 11.0533 12.9914 10.9189 13.2306 10.6797C13.4697 10.4405 13.6041 10.1162 13.6041 9.77792V5.10157C13.6041 4.76332 13.4697 4.43889 13.2306 4.19968C12.9914 3.96057 12.667 3.82613 12.3287 3.82613H12.3286ZM9.77789 11.9035H3.82618V8.9276H9.77789V11.9035ZM10.6282 2.55076H2.97598V1.27544C2.97598 0.937193 3.11032 0.612758 3.34953 0.373551C3.58865 0.13444 3.91308 0 4.25133 0H9.3528C9.69105 0 10.0155 0.134432 10.2546 0.373551C10.4938 0.612761 10.6281 0.937167 10.6281 1.27544L10.6282 2.55076Z" fill="#323232"/>
            </svg>
            <h6>EXPORT</h6>
            <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.21651 5.625C4.12028 5.79167 3.87972 5.79167 3.78349 5.625L0.752404 0.375C0.656179 0.208333 0.77646 -1.54665e-07 0.968911 -1.3784e-07L7.03109 3.92132e-07C7.22354 4.08957e-07 7.34382 0.208334 7.2476 0.375L4.21651 5.625Z" fill="#323232"/>
            </svg>

            </div>
            <div className={styles.paginationContainer}>

            </div>
        </div>
    );
}
export default Footer;
import styles from "./Footer.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Footer = (props) => {

    const pageNo = useSelector(state => state.wfarRetrieveOverview.pageNo);
    const noOfPages = useSelector(state => state.wfarRetrieveOverview.noOfPages);

    const [liPages, setLiPages] = useState([]);

    const pageOnClick = (i) => {
        props.onSelectedPage(i);
    }

    const onClickPrevPageHandler = () => {
        let tempPageNo = parseInt(pageNo) - 1;
        if (parseInt(tempPageNo) >= 1 && parseInt(tempPageNo) <= parseInt(noOfPages)) {
            props.onSelectedPage(tempPageNo);
        }
    }

    const onClickNextPageHandler = () => {
        let tempPageNo = parseInt(pageNo) + 1;
        if (parseInt(tempPageNo) >= 1 && parseInt(tempPageNo) <= parseInt(noOfPages)) {
            props.onSelectedPage(tempPageNo);
        }
    }

    useEffect(() => {

        let pagesBuffer = [];

        if (pageNo !== 0 && noOfPages !== 0) {
            for (let i = 1; i <= noOfPages; i++) {
                if (i === parseInt(pageNo)) {
                    pagesBuffer.push(<li className={styles['active']} onClick={() => pageOnClick(i)}>{i}</li>);
                } else {
                    pagesBuffer.push(<li onClick={() => pageOnClick(i)}>{i}</li>);
                }
            }

            setLiPages(pagesBuffer);
        }
    }, [pageNo, noOfPages]);

    const onClickExportHandler = () => {
        // window.location = 'http://127.0.0.1:8000/api/wfar/overview/faculty=1/semester=1/sort=1/print';
        // var restorepage = document.body.innerHTML;
        // var printcontent = document.getElementById("tableWFAROverview").innerHTML;
        // document.body.innerHTML = printcontent;
        // window.print();
        // document.body.innerHTML = restorepage;
    }

    return (
        <div className={styles.footerComponent}>
            <div className={styles.exportContainer}>
                <svg onClick={props.onClickExportHandler} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.3286 3.82613H1.27544C0.937193 3.82613 0.612758 3.96056 0.373551 4.19968C0.13444 4.43889 0 4.76329 0 5.10157V9.77792C0 10.1162 0.134432 10.4405 0.373551 10.6797C0.612761 10.9189 0.937168 11.0533 1.27544 11.0533H2.12574V12.3286H2.12564C2.12564 12.6668 2.26007 12.9913 2.49919 13.2305C2.7384 13.4696 3.06281 13.604 3.40108 13.604H10.203C10.5413 13.604 10.8657 13.4696 11.1049 13.2305C11.344 12.9913 11.4785 12.6669 11.4785 12.3286V11.0533H12.3288H12.3287C12.6669 11.0533 12.9914 10.9189 13.2306 10.6797C13.4697 10.4405 13.6041 10.1162 13.6041 9.77792V5.10157C13.6041 4.76332 13.4697 4.43889 13.2306 4.19968C12.9914 3.96057 12.667 3.82613 12.3287 3.82613H12.3286ZM9.77789 11.9035H3.82618V8.9276H9.77789V11.9035ZM10.6282 2.55076H2.97598V1.27544C2.97598 0.937193 3.11032 0.612758 3.34953 0.373551C3.58865 0.13444 3.91308 0 4.25133 0H9.3528C9.69105 0 10.0155 0.134432 10.2546 0.373551C10.4938 0.612761 10.6281 0.937167 10.6281 1.27544L10.6282 2.55076Z" fill="#323232" />
                </svg>
                <h6 onClick={props.onClickExportHandler}>EXPORT TO PDF</h6>
            </div>
            <div className={styles.paginationContainer}>
                <ul>
                    <li onClick={onClickPrevPageHandler}><svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.6227 1.10636C7.24632 0.51287 6.25892 -0.426818 5.6353 0.216126L1.06207 4.51891C0.802227 4.7662 0.802227 5.21131 1.06207 5.4586L5.6353 9.81084C6.25892 10.4043 7.24632 9.46464 6.6227 8.87115L2.56916 5.01348L6.6227 1.10636Z" fill="#333" />
                    </svg></li>
                    {liPages}
                    <li onClick={onClickNextPageHandler}><svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.33824 1.10636C-0.285381 0.51287 0.70202 -0.426818 1.32564 0.216126L5.89887 4.51891C6.15871 4.7662 6.15871 5.21131 5.89887 5.4586L1.32564 9.81084C0.70202 10.4043 -0.285381 9.46464 0.33824 8.87115L4.39178 5.01348L0.33824 1.10636Z" fill="#333" />
                    </svg></li>
                </ul>
            </div>
        </div>
    );
}
export default Footer;
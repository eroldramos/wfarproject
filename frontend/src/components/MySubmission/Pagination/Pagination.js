import styles from "./Pagination.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Pagination = (props) => {

    let pageNo = props.pageNo;
    let noOfPages = props.noOfPages;
    const [liPages, setLiPages] = useState([]);

    const pageOnClick = (i) => {
        // alert("hi!");
        props.onSelectedPage(i);
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

    return (
        <div className={styles.footerComponent}>
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

export default Pagination;
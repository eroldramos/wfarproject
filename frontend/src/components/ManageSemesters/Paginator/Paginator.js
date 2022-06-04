import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./Paginator.module.css";
const Paginator = ({ pages, page, search = "", url }) => {
  if (search) {
    search = search.split("?search=")[1].split("&")[0];
  }
  return (
    pages >= 1 && (
      <Fragment>
        <div className={styles["pagination"]}>
          <Link to={`/pending-accounts/?search=${search}&page=${1}`}>
            <svg
              width="7"
              height="10"
              viewBox="0 0 7 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.6227 1.10636C7.24632 0.51287 6.25892 -0.426818 5.6353 0.216126L1.06207 4.51891C0.802227 4.7662 0.802227 5.21131 1.06207 5.4586L5.6353 9.81084C6.25892 10.4043 7.24632 9.46464 6.6227 8.87115L2.56916 5.01348L6.6227 1.10636Z"
                fill="#777777"
              />
            </svg>
          </Link>
          {[...Array(pages).keys()].map((x) => (
            <Link
              key={x + 1}
              to={`/pending-accounts/?search=${search}&page=${x + 1}`}
              className={x + 1 === page ? styles["active"] : ""}
            >
              {x + 1}
            </Link>
          ))}

          <Link to={`/pending-accounts/?search=${search}&page=${pages}`}>
            <svg
              width="7"
              height="10"
              viewBox="0 0 7 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.33824 1.10636C-0.285381 0.51287 0.70202 -0.426818 1.32564 0.216126L5.89887 4.51891C6.15871 4.7662 6.15871 5.21131 5.89887 5.4586L1.32564 9.81084C0.70202 10.4043 -0.285381 9.46464 0.33824 8.87115L4.39178 5.01348L0.33824 1.10636Z"
                fill="#777777"
              />
            </svg>
          </Link>
        </div>
      </Fragment>
    )
  );
};

export default Paginator;

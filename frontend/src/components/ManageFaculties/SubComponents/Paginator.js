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
          <Link to={`${url}?search=${search}&page=${1}`}>&laquo;</Link>
          {[...Array(pages).keys()].map((x) => (
            <Link
              key={x + 1}
              to={`${url}?search=${search}&page=${x + 1}`}
              className={x + 1 === page ? styles["active"] : ""}
            >
              {x + 1}
            </Link>
          ))}

          <Link to={`${url}?search=${search}&page=${pages}`}>&raquo;</Link>
        </div>
      </Fragment>
    )
  );
};

export default Paginator;

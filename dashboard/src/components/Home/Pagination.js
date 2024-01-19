import React from "react";
import { Link } from "react-router-dom";

const Pagination = (props) => {
  const { page, pages, keyword = "", source } = props;
  return (
    pages > 1 && (
      <nav>
        <ul className="pagination justify-content-center">
          {[...Array(pages).keys()].map((x) => (
            <li
              className={`page-item ${x + 1 === page ? "active" : ""}`}
              key={x + 1}
            >
              <Link
                className="page-link"
                to={
                  source==="products" ? (
                  keyword
                    ? `/products/search/${keyword}/page/${x + 1}`
                    : `/products/page/${x + 1}`
                  ) : source==="users" ? (
                    keyword
                    ? `/users/search/${keyword}/page/${x + 1}`
                    : `/users/page/${x + 1}`
                  ) : source==="orders" ? (
                    keyword
                    ? `/orders/search/${keyword}/page/${x + 1}`
                    : `/orders/page/${x + 1}`
                  ) : source === "returns" ? (
                    keyword
                    ? `/returns/search/${keyword}/page/${x + 1}`
                    : `/returns/page/${x + 1}`
                  ) : ""
                }
              >
                {x + 1}
              </Link> 
            </li>
          ))}
        </ul>
      </nav>
    )
  );
};

export default Pagination;
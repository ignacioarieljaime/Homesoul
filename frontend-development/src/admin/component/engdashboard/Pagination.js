import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ReactPaginate from "react-paginate";

const PaginationComp = ({ initialPage, pageCount, handleRequest }) => {
  const handlePageClick = (event) => {
    handleRequest(event.selected);
  };
  return (
    <>
      <ReactPaginate
        nextLabel={
          <FontAwesomeIcon
            style={{ width: 10, height: 8 }}
            icon={faArrowRight}
          />
        }
        forcePage={initialPage}
        selectedPageRel={initialPage}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel={
          <FontAwesomeIcon
            style={{ width: 10, height: 8 }}
            icon={faArrowLeft}
          />
        }
        pageClassName="d-flex pagination-item"
        pageLinkClassName="page-link pagination-link"
        previousClassName="page-item previous-next-item"
        previousLinkClassName="page-link previous-next-link"
        nextClassName="page-item previous-next-item "
        nextLinkClassName="page-link  previous-next-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link pagination-link"
        containerClassName="pagination"
        activeClassName="active-pagination-link"
        renderOnZeroPageCount={null}
        hrefBuilder={false}
      />
    </>
  );
};

export default PaginationComp;

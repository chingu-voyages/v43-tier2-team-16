import React from 'react';
import ReactPaginate from 'react-paginate';
import '../../static/css/bootstrap.min.css';


export default function Pagination(props) {

    const pageNumbers = Math.ceil(props.objectsTotal / props.objectsPerPage);

    return (
        <ReactPaginate
        className='pagination'
        breakLabel='...'
        nextLabel='next >'
        pageRangeDisplayed={3}
        pageCount={pageNumbers}
        forcePage={props.currentPage - 1}
        onPageChange = {event=> props.handlePageClick(event)}
        previousLabel='< previous'
        containerClassName = {'pagination justify-content-center pagination-sm'}
        pageClassName = {'page-item'}
        pageLinkClassName = {'page-link'}
        previousLinkClassName = {'page-link'}
        previousClassName = {'page-item'}
        nextLinkClassName = {'page-link'}
        nextClassName = {'page-item'}
        breakLinkClassName = {'page-link'}
        activeClassName = {'active'}
        />
    );
}


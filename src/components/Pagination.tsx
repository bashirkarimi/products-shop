import { useState } from 'react';

interface PaginationProps {
  total?: number;
  skip?: number;
  limit?: number;
  onPageNumber: (pageNumber: number) => void;
}

const Pagination = ({
  total = 0,
  skip = 0,
  limit = 0,
  onPageNumber,
}: PaginationProps) => {
  const totalPages = Math.ceil(total / limit);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handlePageNumber = (pageNumber: number) => {
    onPageNumber(pageNumber);
  };

  return (
    <div className="my-6">
      {pageNumbers.map((pageNumber) => (
        <button
          className="border rounded px-3 py-1 mr-2 last:mr-0 disabled:bg-slate-200"
          key={pageNumber}
          onClick={() => handlePageNumber(pageNumber)}
          disabled={skip / limit + 1 === pageNumber}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;

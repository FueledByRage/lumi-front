import ReactPaginate from "react-paginate";
import { PaginationContainer } from "./pagination.styles";

export interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ totalPages, onPageChange }: IPaginationProps) {
  return (
    <PaginationContainer>
          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={totalPages || 0}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={(e) => onPageChange(e.selected)}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </PaginationContainer>
    )
}
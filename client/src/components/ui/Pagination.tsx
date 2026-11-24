import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router";
import "./pagination.css";
import Button from "./Button";
import type { IPagintaionProps } from "../../types/uiTypes";

const Pagination = ({ hasPrev, hasNext, hasPrevFunc, hasNextFunc, totalPages, pageNumber }: IPagintaionProps) => {
    const [params] = useSearchParams();
    const currentPage = Number(params.get("page") || 1);
    const visiblePages = Array.from({ length: totalPages }, (_, index) => index + 1).filter(page => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1);
    return <nav className="pagination-container" aria-label="Pagination"><Button className="arrowBtns secondary" disabled={!hasPrev} aria-label="Previous page" onClick={hasPrevFunc}><FontAwesomeIcon icon={faArrowLeft} /></Button><div className="pageBtns-container">{visiblePages.map((page, index) => <span className="page-number-group" key={page}>{index > 0 && page - visiblePages[index - 1] > 1 && <span className="pagination-ellipsis" aria-hidden="true">…</span>}<Button className={page === currentPage ? "current-page" : "secondary"} aria-current={page === currentPage ? "page" : undefined} aria-label={`Page ${page}`} onClick={() => pageNumber(page)}>{page}</Button></span>)}</div><Button className="arrowBtns secondary" disabled={!hasNext} aria-label="Next page" onClick={hasNextFunc}><FontAwesomeIcon icon={faArrowRight} /></Button></nav>;
};
export default Pagination;

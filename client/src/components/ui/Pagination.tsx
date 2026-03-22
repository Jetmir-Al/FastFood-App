import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./pagination.css";
import Button from "./Button";
import type { IPagintaionProps } from "../../types/uiTypes";

const Pagination = ({ hasPrev, hasNext, hasPrevFunc, hasNextFunc, totalPages, pageNumber }: IPagintaionProps) => {
    return (
        <div className='pagination-container'>
            {
                hasPrev &&
                <Button
                    className="arrowBtns"
                    type="button"
                    onClick={() => hasPrevFunc()}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Button>
            }
            <div className="pageBtns-container">
                {
                    Array.from({ length: totalPages }, (_, index: number) => (
                        <Button
                            className=""
                            type="button"
                            onClick={() => pageNumber(index + 1)}>
                            {index + 1}
                        </Button>
                    ))
                }
            </div>
            {
                hasNext &&
                <Button
                    className="arrowBtns"
                    type="button"
                    onClick={() => hasNextFunc()}>
                    <FontAwesomeIcon icon={faArrowRight} />
                </Button>
            }
        </div >
    )
}

export default Pagination;
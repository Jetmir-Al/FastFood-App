import type { ICardProps } from "../../types/uiTypes";
import "./card.css";


const Card = ({ foodName, foodImg, quantity, foodDesc, address, orderTime, orderDate, status, fullPrice }: ICardProps) => {
    return (
        <div className='new__card swiper-slide' id='boughtBooks'>
            <img src={foodImg} alt='image' className='new__img' min-height='200px' />
            <div className='boughtInfo'>
                <h2 className='testimonial__title'>
                    {foodName} / {quantity}
                </h2>
                <div className='boughtBookInfo'>
                    <h4> Food description:
                        <span> {foodDesc}</span>
                    </h4>
                    <h4>
                        Status:
                        <span> {status}</span>
                    </h4>
                    <h4>
                        Price:
                        <span > {fullPrice}$</span>
                    </h4>
                    <h4>
                        Date:
                        <span> {orderDate.toDateString()}</span>
                    </h4>

                </div>
            </div>
        </div>
    );
}

export default Card;
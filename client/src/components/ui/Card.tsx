import type { ICardProps } from "../../types/uiTypes";
import "./card.css";


const Card = ({ foodName, foodImg, quantity, foodDesc, address, orderTime, orderDate, status, fullPrice }: ICardProps) => {
    return (
        <div className='card-container'>
            <img src={foodImg} alt='image' className='foodImg' />
            <div className='cardInfo'>
                <h2>
                    {foodName} / {quantity}
                </h2>
                <div className='foodInfo'>
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
                        <span> {orderTime.toLocaleTimeString()}</span>
                    </h4>

                </div>
            </div>
        </div>
    );
}

export default Card;
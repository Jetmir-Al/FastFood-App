import { getImageUrl } from "../../api/food.api";
import type { ICardProps } from "../../types/uiTypes";
import "./card.css";


const Card = ({ orderItemID, orderID, foodName, foodImg, quantity, foodDesc, address, orderDate, status, fullPrice }: ICardProps) => {
    return (
        <div className='card-container'>
            <img src={getImageUrl(foodImg)} alt='image' className='foodImg' />
            <div className='cardInfo'>
                <h2>
                    {foodName} / {quantity}
                </h2>
                <div className='foodInfo'>
                    <h5> Description:
                        <span> {foodDesc}</span>
                    </h5>
                    <h5>
                        Status:
                        <span> {status.toUpperCase()}</span>
                    </h5>
                    <h5>
                        Price:
                        <span > {fullPrice}$</span>
                    </h5>
                    <h5>
                        Date:
                        <span> {new Date(orderDate).toLocaleString()}</span>
                    </h5>
                    <h5>
                        Address:
                        <address> {address}</address>
                    </h5>

                </div>
            </div>
        </div>
    );
}

export default Card;
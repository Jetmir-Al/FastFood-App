import { updateAsDelivered } from "../../api/delivery.api";
import { getImageUrl } from "../../api/food.api";
import { cancelOrder } from "../../api/order.api";
import { useAuthHook } from "../../hooks/useAuthHook";
import type { ICardProps } from "../../types/uiTypes";
import Error from "../../utils/Error";
import Button from "./Button";
import "./card.css";


const Card = ({ orderID, deliveryID, foodName, foodImg, quantity, foodDesc, address, orderDate, status, fullPrice, markAsDelivered, callFunc }: ICardProps) => {
    const { user } = useAuthHook();
    const markDeliveryFunc = async () => {
        try {
            const res = await updateAsDelivered(deliveryID, orderID);

            if (res.message === "Update Successfully!") {
                await callFunc();
            }
        } catch {
            return <Error
                title="Problem updating delivery"
                details={"Try again later, until we fix this issue!"}
                onRetry={() => { }}
            />
        }
    }

    return (
        <div className='card-container'>
            <img src={getImageUrl(foodImg)} alt='image' className='foodImg' />
            <div className='cardInfo'>
                <h2>
                    {quantity} - {foodName}
                </h2>
                <div className='foodInfo'>
                    <h5> Description:
                        <span> {foodDesc}</span>
                    </h5>
                    <h5>
                        Status:
                        <span> {
                            status.toUpperCase() === "OUT_FOR_DELIVERY" ?
                                "OUT FOR DELIVERY" : status.toUpperCase()
                        }</span>
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
                    {
                        status === "pending" &&
                        <Button className="ordersBtn"
                            type="button"
                            onClick={async () => {
                                const res = await cancelOrder(orderID);
                                if (res.message === "Canceled Successfully!") {
                                    await callFunc();
                                }
                            }}>
                            Cancel
                        </Button>
                    }
                    {
                        (user?.role === "delivery" && markAsDelivered) &&
                        <Button
                            className="ordersBtn"
                            type="button"
                            onClick={async () => {
                                await markDeliveryFunc();
                            }}>
                            Mark As Delivered
                        </Button>
                    }
                </div>
            </div>
        </div>
    );
}

export default Card;
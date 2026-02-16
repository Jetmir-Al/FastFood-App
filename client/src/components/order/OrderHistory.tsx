import { useEffect, useState } from "react";
import type { ICardProps } from "../../types/uiTypes";
import NoInfo from "../../utils/NoInfo";
import Card from "../ui/Card";
import { getOrderHistory } from "../../api/order.api";
import Error from "../../utils/Error";


const OrderHistory = () => {
    const [orderHistory, setOrderHistory] = useState<ICardProps[] | null>(null);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await getOrderHistory();
                setOrderHistory(res);
            } catch {
                return <Error
                    title='Problem getting Active Orders'
                    details={null}
                    onRetry={() => { }}
                />
            }
        }
        getOrders();

    }, []);

    return (
        <>
            <h2>Order History</h2>
            <div className='activeOrders'>
                {
                    orderHistory?.length === 0 ?
                        <NoInfo noInfo='No order history!' />
                        : orderHistory?.map((order: ICardProps) => (
                            <Card
                                key={order.orderItemID}
                                orderItemID={order.orderItemID}
                                orderID={order.orderID}
                                quantity={order.quantity}
                                foodDesc={order.foodDesc}
                                foodImg={order.foodImg}
                                foodName={order.foodName}
                                fullPrice={order.fullPrice}
                                orderDate={order.orderDate}
                                address={order.address}
                                status={order.status}
                            />
                        ))
                }
            </div>
        </>
    );
}

export default OrderHistory;
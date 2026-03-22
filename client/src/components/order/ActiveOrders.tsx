import { useEffect, useState } from "react";
import { getActiveOrders } from "../../api/order.api";
import Error from "../../utils/Error";
import type { ICardProps } from "../../types/uiTypes";
import NoInfo from "../../utils/NoInfo";
import Card from "../ui/Card";


const ActiveOrders = () => {
    const [activeOrder, setActiveOrder] = useState<ICardProps[] | null>(null);


    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await getActiveOrders();
                setActiveOrder(res);
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
            <h2>Active Orders</h2>
            <div className='activeOrders'>

                {
                    activeOrder?.length === 0 ?
                        <NoInfo noInfo='No active orders yet!' />
                        : activeOrder?.map((order: ICardProps) => (
                            <Card
                                key={order.orderItemID}
                                orderItemID={order.orderItemID}
                                orderID={order.orderID}
                                deliveryID={0}
                                quantity={order.quantity}
                                foodDesc={order.foodDesc}
                                foodImg={order.foodImg}
                                foodName={order.foodName}
                                fullPrice={order.fullPrice}
                                orderDate={order.orderDate}
                                address={order.address}
                                status={order.status}
                                markAsDelivered={false}
                                callFunc={async () => {
                                    const res = await getActiveOrders();
                                    setActiveOrder(res);
                                }}
                            />
                        ))
                }
            </div>
        </>
    )
}

export default ActiveOrders;
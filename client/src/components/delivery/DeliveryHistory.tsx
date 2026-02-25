import { useEffect, useState } from "react";
import type { ICardProps } from "../../types/uiTypes";
import NoInfo from "../../utils/NoInfo";
import Card from "../ui/Card";
import Error from "../../utils/Error";
import { getDeliveryHistory } from "../../api/delivery.api";
import Loading from "../../utils/Loading";


const DeliveryHistory = () => {
    const [deliveryHistory, setDeliveryHistory] = useState<ICardProps[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const deliveryHistory = async () => {
            try {
                const res = await getDeliveryHistory();
                setDeliveryHistory(res);
                setLoading(false);
            } catch {
                return <Error
                    title="Problem getting history of deliveries"
                    details={"Try again later"}
                    onRetry={async () => {
                        const res = await getDeliveryHistory();
                        setDeliveryHistory(res);
                        setLoading(false);
                    }}
                />
            }
        }
        deliveryHistory();
    }, []);

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <h2>Delivery History</h2>
            <div className='activeOrders'>
                {
                    deliveryHistory?.length === 0 ?
                        <NoInfo noInfo='No order history!' />
                        : deliveryHistory?.map((order: ICardProps) => (
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
                                markAsDelivered={false}
                                callFunc={() => { }}
                            />
                        ))
                }
            </div>
        </>
    );
}

export default DeliveryHistory;
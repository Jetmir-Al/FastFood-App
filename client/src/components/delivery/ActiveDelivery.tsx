import { useEffect, useState } from "react";
import type { ICardProps } from "../../types/uiTypes";
import NoInfo from "../../utils/NoInfo";
import Card from "../ui/Card";
import Error from "../../utils/Error";
import "./activeDelivery.css";
import { getActiveDeliveries } from "../../api/delivery.api";
import Loading from "../../utils/Loading";


const ActiveDelivery = () => {
    const [activeDelivery, setActiveDelivery] = useState<ICardProps[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        const activeDeliveryFunc = async () => {
            try {
                const res = await getActiveDeliveries();
                setActiveDelivery(res);
                setLoading(false);
            } catch {
                return <Error
                    title="Problem getting active deliveries"
                    details={"Try later, until i finish this issue"}
                    onRetry={async () => {
                        const res = await getActiveDeliveries();
                        setActiveDelivery(res);
                        setLoading(false);

                    }}
                />
            }
        }
        activeDeliveryFunc();
    }, []);

    if (loading) {
        return <Loading />
    }

    return (
        <div className="activeDelivery-container">
            <h2>Active Deliveries</h2>
            <div className='activeOrders'>
                {
                    activeDelivery?.length === 0 ?
                        <NoInfo noInfo='No order history!' />
                        : activeDelivery?.map((order: ICardProps) => (
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
                                markAsDelivered={true}
                                callFunc={() => { }}
                            />
                        ))
                }
            </div>
        </div>
    );
}

export default ActiveDelivery;
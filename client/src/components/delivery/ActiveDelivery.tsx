import { useCallback, useEffect, useState } from "react";
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
    const [loadError, setLoadError] = useState(false);

    const activeDeliveryFunc = useCallback(async () => {
        setLoading(true);
        setLoadError(false);
        try {
            const res = await getActiveDeliveries();
            setActiveDelivery(res);
        } catch {
            setLoadError(true);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void activeDeliveryFunc();
    }, [activeDeliveryFunc]);

    return (
        <div className="activeDelivery-container">
            <header className="delivery-page-heading">
                <p className="delivery-eyebrow">On the road</p>
                <h1>Active deliveries</h1>
                <p>Your assigned orders, ready for the final handoff.</p>
            </header>
            {loading ? <div className="delivery-page-state"><Loading /><p>Loading your deliveries…</p></div>
                : loadError ? <div className="delivery-page-state" aria-live="polite"><Error
                    title="Couldn't load active deliveries"
                    details="Check your connection and retry."
                    onRetry={() => { void activeDeliveryFunc(); }} /></div>
                    : !activeDelivery?.length ? <div className="delivery-page-state"><NoInfo noInfo="No active deliveries right now. Orders you take from Live Orders will appear here." /></div>
                        : <div className="activeOrders">
                            {activeDelivery.map((order: ICardProps) => (
                                <Card
                                    key={order.deliveryID}
                                    deliveryID={order.deliveryID}
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
                                    callFunc={async () => {
                                        try {
                                            const res = await getActiveDeliveries();
                                            setActiveDelivery(res);
                                        } catch {
                                            setLoadError(true);
                                        }
                                    }}
                                />
                            ))}
                        </div>}
        </div>
    );
};

export default ActiveDelivery;

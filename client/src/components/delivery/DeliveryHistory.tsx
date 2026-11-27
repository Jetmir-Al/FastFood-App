import { useCallback, useEffect, useState } from "react";
import type { ICardProps } from "../../types/uiTypes";
import NoInfo from "../../utils/NoInfo";
import Card from "../ui/Card";
import Error from "../../utils/Error";
import { getDeliveryHistory } from "../../api/delivery.api";
import Loading from "../../utils/Loading";
import "./activeDelivery.css";

const DeliveryHistory = () => {
    const [deliveryHistory, setDeliveryHistory] = useState<ICardProps[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadError, setLoadError] = useState(false);

    const deliveryHistoryFunc = useCallback(async () => {
        setLoading(true);
        setLoadError(false);
        try {
            const res = await getDeliveryHistory();
            setDeliveryHistory(res);
        } catch {
            setLoadError(true);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void deliveryHistoryFunc();
    }, [deliveryHistoryFunc]);

    return (
        <div className="activeDelivery-container deliveryHistory-container">
            <header className="delivery-page-heading">
                <p className="delivery-eyebrow">Completed handoffs</p>
                <h1>Delivery history</h1>
                <p>A look back at the orders you've delivered.</p>
            </header>
            {loading ? <div className="delivery-page-state"><Loading /><p>Loading delivery history…</p></div>
                : loadError ? <div className="delivery-page-state" aria-live="polite"><Error
                    title="Couldn't load delivery history"
                    details="Check your connection and retry."
                    onRetry={() => { void deliveryHistoryFunc(); }} /></div>
                    : !deliveryHistory?.length ? <div className="delivery-page-state"><NoInfo noInfo="No completed deliveries yet. Your delivery history will appear here after your first handoff." /></div>
                        : <div className="activeOrders">
                            {deliveryHistory.map((order: ICardProps) => (
                                <Card
                                    key={order.orderItemID}
                                    deliveryID={0}
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
                            ))}
                        </div>}
        </div>
    );
};

export default DeliveryHistory;

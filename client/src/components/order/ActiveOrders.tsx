import { useEffect, useState } from "react";
import { getActiveOrders } from "../../api/order.api";
import Error from "../../utils/Error";
import Loading from "../../utils/Loading";
import type { ICardProps } from "../../types/uiTypes";
import NoInfo from "../../utils/NoInfo";
import Card from "../ui/Card";

const ActiveOrders = () => {
    const [activeOrder, setActiveOrder] = useState<ICardProps[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [retry, setRetry] = useState(0);
    useEffect(() => {
        const getOrders = async () => {
            setLoading(true);
            setError(false);
            try { setActiveOrder(await getActiveOrders()); }
            catch { setError(true); }
            finally { setLoading(false); }
        };
        getOrders();
    }, [retry]);
    return <section className="order-history-section"><header><h2>Active orders</h2><p>From the kitchen to your doorstep. Here’s what’s happening.</p></header>{loading ? <Loading /> : error ? <Error title="Couldn’t load your active orders" details="Check your connection and try again." onRetry={() => setRetry(value => value + 1)} /> : <div className="activeOrders">{activeOrder?.length === 0 ? <NoInfo noInfo="Nothing cooking for you just yet. Your next order will appear here." /> : activeOrder?.map(order => <Card key={order.orderItemID} orderItemID={order.orderItemID} orderID={order.orderID} deliveryID={0} quantity={order.quantity} foodDesc={order.foodDesc} foodImg={order.foodImg} foodName={order.foodName} fullPrice={order.fullPrice} orderDate={order.orderDate} address={order.address} status={order.status} markAsDelivered={false} callFunc={async () => { setActiveOrder(await getActiveOrders()); }} />)}</div>}</section>;
};
export default ActiveOrders;

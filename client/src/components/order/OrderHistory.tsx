import { useEffect, useState } from "react";
import type { ICardProps } from "../../types/uiTypes";
import NoInfo from "../../utils/NoInfo";
import Loading from "../../utils/Loading";
import Card from "../ui/Card";
import { getOrderHistory } from "../../api/order.api";
import Error from "../../utils/Error";

const OrderHistory = () => {
    const [orderHistory, setOrderHistory] = useState<ICardProps[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [retry, setRetry] = useState(0);
    useEffect(() => {
        const getOrders = async () => {
            setLoading(true);
            setError(false);
            try { setOrderHistory(await getOrderHistory()); }
            catch { setError(true); }
            finally { setLoading(false); }
        };
        getOrders();
    }, [retry]);
    return <section className="order-history-section"><header><h2>Order history</h2><p>A look back at your good food moments.</p></header>{loading ? <Loading /> : error ? <Error title="Couldn’t load your order history" details="Check your connection and try again." onRetry={() => setRetry(value => value + 1)} /> : <div className="activeOrders">{orderHistory?.length === 0 ? <NoInfo noInfo="Your food story starts with your first order." /> : orderHistory?.map(order => <Card deliveryID={0} key={order.orderItemID} orderItemID={order.orderItemID} orderID={order.orderID} quantity={order.quantity} foodDesc={order.foodDesc} foodImg={order.foodImg} foodName={order.foodName} fullPrice={order.fullPrice} orderDate={order.orderDate} address={order.address} status={order.status} markAsDelivered={false} callFunc={() => { }} />)}</div>}</section>;
};
export default OrderHistory;

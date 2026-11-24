import { useRef, useState } from "react";
import { updateAsDelivered } from "../../api/delivery.api";
import { getImageUrl } from "../../api/food.api";
import { cancelOrder } from "../../api/order.api";
import { useAuthHook } from "../../hooks/useAuthHook";
import type { ICardProps } from "../../types/uiTypes";
import Button from "./Button";
import ConfirmDialog from "./ConfirmDialog";
import "./card.css";

const Card = ({ orderID, deliveryID, foodName, foodImg, quantity, foodDesc, address, orderDate, status, fullPrice, markAsDelivered, callFunc }: ICardProps) => {
    const { user } = useAuthHook();
    const [pending, setPending] = useState(false);
    const [error, setError] = useState("");
    const [confirmCancel, setConfirmCancel] = useState(false);
    const inFlight = useRef(false);
    const markDeliveryFunc = async () => {
        if (inFlight.current) return;
        inFlight.current = true;
        setPending(true);
        setError("");
        try {
            const res = await updateAsDelivered(deliveryID, orderID);
            if (res.message === "Update Successfully!") await callFunc();
        } catch { setError("We couldn’t mark this delivery as complete. Please try again."); }
        finally { inFlight.current = false; setPending(false); }
    };
    const cancelOrderFunc = async () => {
        if (inFlight.current) return;
        inFlight.current = true;
        setPending(true);
        setError("");
        try {
            const res = await cancelOrder(orderID);
            if (res.message === "Canceled Successfully!") await callFunc();
        } catch { setError("We couldn’t cancel this order. Please try again."); }
        finally { inFlight.current = false; setPending(false); setConfirmCancel(false); }
    };
    return <article className="card-container">
        <div className="order-card-image"><img src={getImageUrl(foodImg)} alt={foodName} className="foodImg" loading="lazy" /></div>
        <div className="cardInfo"><div className="order-card-heading"><p className="eyebrow">Order #{orderID}</p><span className="status-badge" data-status={status.toLowerCase()}>{status.replaceAll('_', ' ').toUpperCase()}</span></div><h3>{quantity} × {foodName}</h3><p className="order-food-description">{foodDesc}</p>
            <dl className="foodInfo"><div><dt>Total</dt><dd className="order-card-price">€{Number(fullPrice).toFixed(2)}</dd></div><div><dt>Ordered</dt><dd>{new Date(orderDate).toLocaleString()}</dd></div><div><dt>Deliver to</dt><dd><address>{address}</address></dd></div></dl>
            {error && <p role="alert" className="inline-alert">{error}</p>}
            {status === "pending" && <Button className="secondary ordersBtn" disabled={pending} onClick={() => setConfirmCancel(true)} aria-label={`Cancel order ${orderID}`}>Cancel order</Button>}
            {user?.role === "delivery" && markAsDelivered && <Button className="ordersBtn" disabled={pending} onClick={markDeliveryFunc} aria-label={`Mark order ${orderID} as delivered`}>{pending ? "Updating…" : "Mark as delivered"}</Button>}
        </div>
        {confirmCancel && <ConfirmDialog title="Cancel this order?" description={`Cancel order #${orderID} for ${foodName}? You can keep it if you’ve changed your mind.`} confirmLabel="Cancel order" pending={pending} onClose={() => setConfirmCancel(false)} onConfirm={cancelOrderFunc} />}
    </article>;
};
export default Card;

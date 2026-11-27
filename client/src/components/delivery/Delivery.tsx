import { useCallback, useEffect, useRef, useState } from "react";
import "./delivery.css";
import type { ICardProps } from "../../types/uiTypes";
import Error from "../../utils/Error";
import Loading from "../../utils/Loading";
import { getLiveOrder, takeToDeliver } from "../../api/order.api";
import Button from "../ui/Button";
import { useNavigate, useSearchParams } from "react-router";
import type { ILiveOrderTypes } from "../../types/orderTypes";
import Pagination from "../ui/Pagination";

const Delivery = () => {
    const [liveOrders, setLiveOrders] = useState<ILiveOrderTypes | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);
    const [actionError, setActionError] = useState("");
    const [pendingID, setPendingID] = useState<number | null>(null);
    const actionLock = useRef<number | null>(null);
    const navigate = useNavigate();
    const [params, setParams] = useSearchParams();
    const page = params.get("page") || 1;
    const totalPages = params.get("totalPages") || 1;

    const GetLiveOrders = useCallback(async () => {
        setIsLoading(true);
        setLoadError(false);
        try {
            const res = await getLiveOrder({
                params: {
                    page: page,
                    totalPages: totalPages
                }
            });
            if (res) {
                setLiveOrders(res);
            } else {
                setLoadError(true);
            }
        } catch {
            setLoadError(true);
        } finally {
            setIsLoading(false);
        }
    }, [page, totalPages]);

    useEffect(() => {
        void GetLiveOrders();
    }, [GetLiveOrders]);

    const deliverFunc = async (orderID: number) => {
        if (actionLock.current !== null) return;
        actionLock.current = orderID;
        setPendingID(orderID);
        setActionError("");
        try {
            const res = await takeToDeliver(orderID);
            if (res.message === "Ready to deliver!") {
                const res = await getLiveOrder({
                    params: {
                        page: page,
                        totalPages: totalPages
                    }
                });
                setLiveOrders(res);
            } else {
                setActionError("This order couldn't be assigned. Refresh the list before trying again.");
            }
        } catch {
            setActionError("We couldn't take the order or refresh the list. Refresh before trying again; the assignment may already be saved.");
        } finally {
            actionLock.current = null;
            setPendingID(null);
        }
    };

    return (
        <div className="liveOrders-container">
            <header className="usersHeader">
                <div>
                    <p className="liveOrders-eyebrow">Dispatch board</p>
                    <h1 className="header-title">Live orders</h1>
                    <p>Pick up an order and get it on its way.</p>
                </div>
                <Button className="header-btn" type="button" onClick={() => navigate("/active_Deliveries")}>
                    Active Deliveries
                </Button>
            </header>
            {actionError && <div className="liveOrders-notice">
                <p aria-live="polite">{actionError}</p>
                <Button className="liveOrders-retry" type="button" disabled={isLoading || pendingID !== null}
                    onClick={async () => { setActionError(""); await GetLiveOrders(); }}>Refresh orders</Button>
            </div>}
            <div className="table-wrapper" role="region" aria-label="Live orders table, scroll horizontally for all columns" tabIndex={0}>
                <table className="liveOrders" aria-busy={isLoading}>
                    <caption>Orders available for delivery on this page</caption>
                    <thead>
                        <tr>
                            <th scope="col">Food Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Time</th>
                            <th scope="col">Full Price</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? <tr><td colSpan={6} className="liveOrders-state"><Loading /><p>Loading available orders…</p></td></tr>
                            : loadError ? <tr><td colSpan={6} className="liveOrders-state"><div aria-live="polite"><Error
                                title="Couldn't load live orders"
                                details="Check your connection and retry."
                                onRetry={() => { void GetLiveOrders(); }} /></div></td></tr>
                                : !liveOrders?.live.length ? <tr><td colSpan={6} className="liveOrders-state">No orders ready for delivery right now. Check back for the next pickup.</td></tr>
                                    : liveOrders.live.map((res: ICardProps) => (
                                        <tr className="liveOrder-row" key={res.orderID}>
                                            <th scope="row">{res.foodName} + {res.quantity}</th>
                                            <td>{res.address}</td>
                                            <td>{new Date(res.orderDate).toLocaleTimeString()}</td>
                                            <td>{res.fullPrice}€</td>
                                            <td><span className="liveOrders-status">{res.status.toUpperCase()}</span></td>
                                            <td>
                                                <button type="button" className="liveOrders-deliver"
                                                    disabled={pendingID !== null}
                                                    aria-label={`${pendingID === res.orderID ? "Taking order…" : "Deliver!"} Order ${res.orderID}, ${res.foodName} to ${res.address}`}
                                                    onClick={async () => await deliverFunc(res.orderID)}>
                                                    {pendingID === res.orderID ? "Taking order…" : "Deliver!"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                    </tbody>
                </table>
            </div>
            {liveOrders && liveOrders.totalPages > 1 &&
                <Pagination
                    hasPrev={liveOrders?.hasPrev}
                    hasNext={liveOrders?.hasNext}
                    hasPrevFunc={() => setParams({
                        page: String(Number(page) - 1),
                        totalPages: String(liveOrders.totalPages)
                    })}
                    hasNextFunc={() => setParams({
                        page: String(Number(page) + 1),
                        totalPages: String(liveOrders.totalPages)
                    })}
                    totalPages={liveOrders.totalPages}
                    pageNumber={(index: number) => setParams({
                        page: String(index),
                        totalPages: String(liveOrders.totalPages)
                    })}
                />}
        </div>
    );
};

export default Delivery;

import { useCallback, useEffect, useRef, useState } from "react";
import Button from "../ui/Button";
import DashboardHeader from "./DashboardHeader";
import type { IOrderDashboard, IOrderDashboardTypes } from "../../types/orderTypes";
import Error from "../../utils/Error";
import { deleteOrder, getAllOrders } from "../../api/order.api";
import NoInfo from "../../utils/NoInfo";
import Loading from "../../utils/Loading";
import { useSearchParams } from "react-router";
import Pagination from "../ui/Pagination";

const OrderDashboard = () => {
    const [orders, setOrders] = useState<IOrderDashboard | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [loadError, setLoadError] = useState(false);
    const [actionError, setActionError] = useState("");
    const [pendingID, setPendingID] = useState<number | null>(null);
    const actionLock = useRef<number | null>(null);
    const [params, setParams] = useSearchParams();
    const page = params.get("page") || 1;
    const totalPages = params.get("totalPages") || 1;

    const allOrders = useCallback(async () => {
        setIsLoading(true);
        setLoadError(false);
        try {
            const res = await getAllOrders({
                params: {
                    page: page,
                    totalPages: totalPages
                }
            });
            if (res) {
                setOrders(res);
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
        void allOrders();
    }, [allOrders]);

    const DeleteOrderFunc = async (orderID: number) => {
        if (actionLock.current !== null) return;
        actionLock.current = orderID;
        setPendingID(orderID);
        setActionError("");
        try {
            const res = await deleteOrder(orderID);
            if (res.message === "Deleted Successfully!") {
                const orders = await getAllOrders({
                    params: {
                        page: page,
                        totalPages: totalPages
                    }
                });
                setOrders(orders);
            } else {
                setActionError("The order was not deleted. Refresh the list before trying again.");
            }
        } catch {
            setActionError("We couldn't complete the deletion or refresh the orders. Refresh before trying again.");
        } finally {
            actionLock.current = null;
            setPendingID(null);
        }
    };

    return (
        <section className="dashboard-panel">
            <div className="dashboard-panel-heading">
                <h2>Customer orders</h2>
                <p>Review order items, status, and customer details.</p>
            </div>
            {actionError && <div className="operations-notice">
                <p aria-live="polite">{actionError}</p>
                <Button className="operations-retry" type="button" disabled={isLoading || pendingID !== null}
                    onClick={async () => { setActionError(""); await allOrders(); }}>Refresh orders</Button>
            </div>}
            <div className="table-wrapper" role="region" aria-label="Customer orders table, scroll horizontally for all columns" tabIndex={0}>
                <table className="dashboardTable" aria-busy={isLoading}>
                    <caption>Order items on this page</caption>
                    <DashboardHeader
                        tHeader1="User"
                        tHeader2="Food"
                        tHeader3="Quantity"
                        tHeader4="Price"
                        tHeader5="Status"
                        tHeader6="Date"
                    />
                    <tbody>
                        {isLoading ? <tr className="tr-row"><td colSpan={7} className="operations-state"><Loading /><p>Loading orders…</p></td></tr>
                            : loadError ? <tr className="tr-row"><td colSpan={7} className="operations-state"><div aria-live="polite"><Error
                                title="Couldn't load orders"
                                details="Check your connection and retry."
                                onRetry={() => { void allOrders(); }} /></div></td></tr>
                                : !orders?.active.length ? <tr className="tr-row"><td colSpan={7} className="operations-state"><NoInfo noInfo="No orders on this page. New order items will appear here." /></td></tr>
                                    : orders.active.map((o: IOrderDashboardTypes) => (
                                        <tr className="tr-row" key={o.orderItemID}>
                                            <th scope="row">{o.name}</th>
                                            <td>{o.foodName}</td>
                                            <td>{o.quantity}</td>
                                            <td>€{Number(o.fullPrice).toFixed(2)}</td>
                                            <td><span className="operations-status">{o.status.toUpperCase() === "OUT_FOR_DELIVERY" ? "OUT FOR DELIVERY" : o.status.toUpperCase()}</span></td>
                                            <td>{new Date(o.orderDate).toLocaleString()}</td>
                                            <td className="tableBtns">
                                                <Button type="button" className="delete-btn"
                                                    disabled={pendingID !== null}
                                                    aria-label={`${pendingID === o.orderID ? "Deleting…" : "Delete"} order ${o.orderID}: ${o.foodName} for ${o.name}`}
                                                    onClick={async () => { await DeleteOrderFunc(o.orderID); }}>
                                                    {pendingID === o.orderID ? "Deleting…" : "Delete"}
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                    </tbody>
                </table>
            </div>
            {orders && orders.totalPages > 1 &&
                <Pagination
                    hasPrev={orders?.hasPrev}
                    hasNext={orders?.hasNext}
                    hasPrevFunc={() => setParams({
                        page: String(Number(page) - 1),
                        totalPages: String(orders.totalPages)
                    })}
                    hasNextFunc={() => setParams({
                        page: String(Number(page) + 1),
                        totalPages: String(orders.totalPages)
                    })}
                    totalPages={orders.totalPages}
                    pageNumber={(index: number) => setParams({
                        page: String(index),
                        totalPages: String(orders.totalPages)
                    })}
                />}
        </section>
    );
};

export default OrderDashboard;

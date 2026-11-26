import { useCallback, useEffect, useRef, useState } from "react";
import Button from "../ui/Button";
import DashboardHeader from "./DashboardHeader";
import Loading from "../../utils/Loading";
import type { IDeliveryDashboard } from "../../types/deliveryTypes";
import Error from "../../utils/Error";
import { deleteDelivery, getAllDeliveries } from "../../api/delivery.api";
import NoInfo from "../../utils/NoInfo";
import UpdateDelivery from "../forms/UpdateDelivery";

const DeliveryDashboard = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [delivery, setDelivery] = useState<IDeliveryDashboard[] | null>(null);
    const [deliveryForm, setDeliveryForm] = useState<boolean>(false);
    const [deliveryID, setDeliveryID] = useState<number>(0);
    const [customer, setCustomer] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [deliveryMan, setDeliveryMan] = useState<string>("");
    const [loadError, setLoadError] = useState(false);
    const [actionError, setActionError] = useState("");
    const [pendingID, setPendingID] = useState<number | null>(null);
    const actionLock = useRef<number | null>(null);

    const getAllDeliveryFunc = useCallback(async () => {
        setIsLoading(true);
        setLoadError(false);
        try {
            const res = await getAllDeliveries();
            setDelivery(res);
        } catch {
            setLoadError(true);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        void getAllDeliveryFunc();
    }, [getAllDeliveryFunc]);

    const refetchDeliveries = async () => {
        setIsLoading(true);
        setActionError("");
        try {
            const res = await getAllDeliveries();
            setDelivery(res);
            setDeliveryForm(false);
        } catch {
            setActionError("The assignment was saved, but the delivery list couldn't refresh. Retry the refresh below.");
        } finally {
            setIsLoading(false);
        }
    };

    const deleteDeliveryFunc = async (deliveryID: number) => {
        if (actionLock.current !== null) return;
        actionLock.current = deliveryID;
        setPendingID(deliveryID);
        setActionError("");
        try {
            const del = await deleteDelivery(deliveryID);
            if (del.message === "Deleted Successfully!") {
                const res = await getAllDeliveries();
                setDelivery(res);
            } else {
                setActionError("The delivery was not deleted. Refresh the list before trying again.");
            }
        } catch {
            setActionError("We couldn't complete the deletion or refresh the deliveries. Refresh before trying again.");
        } finally {
            actionLock.current = null;
            setPendingID(null);
        }
    };

    if (deliveryForm) {
        return <section className="dashboard-panel">
            {actionError && <div className="operations-notice">
                <p aria-live="polite">{actionError}</p>
                <Button className="operations-retry" type="button" disabled={isLoading}
                    onClick={async () => { await refetchDeliveries(); }}>Refresh deliveries</Button>
            </div>}
            <UpdateDelivery
                deliveryID={deliveryID}
                customer={customer}
                address={address}
                deliveryMan={deliveryMan}
                refetchFunc={async () => { await refetchDeliveries() }}
                onCancel={() => setDeliveryForm(false)}
            />
        </section>;
    }

    return (
        <section className="dashboard-panel">
            <div className="dashboard-panel-heading">
                <h2>Delivery assignments</h2>
                <p>Track deliveries and keep the right crew member assigned.</p>
            </div>
            {actionError && <div className="operations-notice">
                <p aria-live="polite">{actionError}</p>
                <Button className="operations-retry" type="button" disabled={isLoading || pendingID !== null}
                    onClick={async () => { setActionError(""); await getAllDeliveryFunc(); }}>Refresh deliveries</Button>
            </div>}
            <div className="table-wrapper" role="region" aria-label="Delivery assignments table, scroll horizontally for all columns" tabIndex={0}>
                <table className="dashboardTable" aria-busy={isLoading}>
                    <caption>Delivery assignments and order status</caption>
                    <DashboardHeader
                        tHeader1="Worker"
                        tHeader2="Food"
                        tHeader3="Address"
                        tHeader4="Price"
                        tHeader5="Status"
                        tHeader6="Date"
                    />
                    <tbody>
                        {isLoading ? <tr className="tr-row"><td colSpan={7} className="operations-state"><Loading /><p>Loading delivery assignments…</p></td></tr>
                            : loadError ? <tr className="tr-row"><td colSpan={7} className="operations-state"><div aria-live="polite"><Error
                                title="Couldn't load deliveries"
                                details="Check your connection and retry."
                                onRetry={() => { void getAllDeliveryFunc(); }} /></div></td></tr>
                                : !delivery?.length ? <tr className="tr-row"><td colSpan={7} className="operations-state"><NoInfo noInfo="No delivery assignments yet. Assigned orders will appear here." /></td></tr>
                                    : delivery.map((d: IDeliveryDashboard) => (
                                        <tr className="tr-row" key={d.deliveryID}>
                                            <th scope="row">{d.deliveryMan}</th>
                                            <td>{d.foodName} + {d.quantity}</td>
                                            <td>{d.address}</td>
                                            <td>€{Number(d.fullPrice).toFixed(2)}</td>
                                            <td><span className="operations-status">{d.status.toUpperCase() === "OUT_FOR_DELIVERY" ? "OUT FOR DELIVERY" : d.status.toUpperCase()}</span></td>
                                            <td>{new Date(d.orderDate).toLocaleString()}</td>
                                            <td className="tableBtns">
                                                <Button type="button" className="delete-btn"
                                                    disabled={pendingID !== null}
                                                    aria-label={`${pendingID === d.deliveryID ? "Deleting…" : "Delete"} delivery ${d.deliveryID} for ${d.customer}`}
                                                    onClick={async () => { await deleteDeliveryFunc(d.deliveryID); }}>
                                                    {pendingID === d.deliveryID ? "Deleting…" : "Delete"}
                                                </Button>
                                                {d.status !== 'delivered' && <Button type="button" className="update-btn"
                                                    disabled={pendingID !== null}
                                                    aria-label={`Update delivery ${d.deliveryID} assignment for ${d.customer}`}
                                                    onClick={() => {
                                                        setDeliveryID(d.deliveryID);
                                                        setCustomer(d.customer);
                                                        setAddress(d.address);
                                                        setDeliveryMan(d.deliveryMan);
                                                        setActionError("");
                                                        setDeliveryForm(true);
                                                    }}>Update</Button>}
                                            </td>
                                        </tr>
                                    ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default DeliveryDashboard;

import { useEffect, useState } from "react";
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
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [params, setParams] = useSearchParams();
    const page = params.get("page") || 1;
    const totalPages = params.get("totalPages") || 1;

    useEffect(() => {
        const allOrders = async () => {
            try {
                const res = await getAllOrders({
                    params: {
                        page: page,
                        totalPages: totalPages
                    }
                });
                if (res) {
                    setOrders(res);
                    setIsLoading(false);
                }
            } catch {
                return <Error
                    title="Problem getting Orders"
                    details={"Will fix soon"}
                    onRetry={() => { }}
                />
            }
        }
        allOrders();
    }, [page, totalPages]);


    const DeleteOrderFunc = async (orderID: number) => {
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
            }
        } catch {
            return <Error
                title="Problem getting Orders"
                details={"Will fix soon"}
                onRetry={() => { }}
            />
        }
    }

    return (
        <div className="table-wrapper">
            <table className="dashboardTable">
                <DashboardHeader
                    tHeader1="User"
                    tHeader2="Food"
                    tHeader3="Quantity"
                    tHeader4="Price"
                    tHeader5="Status"
                    tHeader6="Date"
                />
                <tbody>
                    {
                        isLoading ?
                            <tr className="tr-row">
                                <td>
                                    <Loading />
                                </td>
                            </tr> :
                            orders?.active.length === 0 ? <tr className="tr-row">
                                <td>
                                    <NoInfo noInfo="No orders have been made!" />
                                </td>
                            </tr> :
                                orders?.active.map((o: IOrderDashboardTypes) => (
                                    <tr className="tr-row"
                                        key={o.orderItemID}
                                    >
                                        <td>{o.name}</td>
                                        <td>{o.foodName}</td>
                                        <td>{o.quantity}</td>
                                        <td>{o.fullPrice}$</td>
                                        <td>{
                                            o.status.toUpperCase() === "OUT_FOR_DELIVERY" ?
                                                "OUT FOR DELIVERY" : o.status.toUpperCase()
                                        }</td>
                                        <td>{new Date(o.orderDate).toLocaleString()}</td>
                                        <td className='tableBtns'>
                                            <Button
                                                type="button"
                                                className="delete-btn"
                                                onClick={async () => {
                                                    await DeleteOrderFunc(o.orderID);
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                    }
                </tbody>
            </table>
            {
                orders &&
                orders.totalPages > 1 &&
                <Pagination
                    hasPrev={orders?.hasPrev}
                    hasNext={orders?.hasNext}
                    hasPrevFunc={
                        () => setParams({
                            page: String(Number(page) - 1),
                            totalPages: String(orders.totalPages)
                        })
                    }
                    hasNextFunc={
                        () => setParams({
                            page: String(Number(page) + 1),
                            totalPages: String(orders.totalPages)
                        })}
                    totalPages={orders.totalPages}
                    pageNumber={(index: number) => setParams({
                        page: String(index),
                        totalPages: String(orders.totalPages)
                    })}
                />
            }
        </div>
    );
}

export default OrderDashboard;
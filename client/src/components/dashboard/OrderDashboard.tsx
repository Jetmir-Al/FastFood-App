import { useEffect, useState } from "react";
import Button from "../ui/Button";
import DashboardHeader from "./DashboardHeader";
import type { IOrderDashboardTypes } from "../../types/orderTypes";
import Error from "../../utils/Error";
import { getAllOrders } from "../../api/order.api";
import NoInfo from "../../utils/NoInfo";
import Loading from "../../utils/Loading";

const OrderDashboard = () => {
    const [orders, setOrders] = useState<IOrderDashboardTypes[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const allOrders = async () => {
            try {
                const res = await getAllOrders();
                setOrders(res);
                setIsLoading(false);
            } catch {
                return <Error
                    title="Problem getting Orders"
                    details={"Will fix soon"}
                    onRetry={() => { }}
                />
            }
        }
        allOrders();
    }, []);


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
                            orders?.length === 0 ? <tr className="tr-row">
                                <td>
                                    <NoInfo noInfo="No orders have been made!" />
                                </td>
                            </tr> :
                                orders?.map((o: IOrderDashboardTypes) => (
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
                                                onClick={() => { }}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default OrderDashboard;
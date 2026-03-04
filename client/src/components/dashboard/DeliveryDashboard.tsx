import { useEffect, useState } from "react";
import Button from "../ui/Button";
import DashboardHeader from "./DashboardHeader";
import Loading from "../../utils/Loading";
import type { IDeliveryDashboard } from "../../types/deliveryTypes";
import Error from "../../utils/Error";
import { deleteDelivery, getAllDeliveries } from "../../api/delivery.api";
import NoInfo from "../../utils/NoInfo";


const DeliveryDashboard = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [delivery, setDelivery] = useState<IDeliveryDashboard[] | null>(null);

    useEffect(() => {
        const getAllDeliveryFunc = async () => {
            try {
                const res = await getAllDeliveries();
                setDelivery(res);
                setIsLoading(false);
            } catch {
                return <Error
                    title="Problem getting deliveries"
                    details={"Will fix this issue soon!"}
                    onRetry={() => { }}
                />
            }
        }

        getAllDeliveryFunc();
    }, []);

    const deleteDeliveryFunc = async (deliveryID: number) => {
        try {
            const del = await deleteDelivery(deliveryID);
            if (del.message === "Deleted Successfully!") {
                const res = await getAllDeliveries();
                setDelivery(res);
            }
        } catch {
            return <Error
                title="Problem deleting the user"
                details={"Try again later, until the issue is fixed"}
                onRetry={() => { }} />
        }
    }

    return (
        <div className="table-wrapper">
            <table className="dashboardTable">
                <DashboardHeader
                    tHeader1="Worker"
                    tHeader2="Food"
                    tHeader3="Address"
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
                            delivery?.length === 0 ? <tr className="tr-row">
                                <td>
                                    <NoInfo noInfo="No deliveries have been made!" />
                                </td>
                            </tr> :
                                delivery?.map((d: IDeliveryDashboard) => (
                                    <tr className="tr-row"
                                        key={d.deliveryID}
                                    >
                                        <td>{d.deliveryMan}</td>
                                        <td>{d.foodName} + {d.quantity}</td>
                                        <td>{d.address}</td>
                                        <td>{d.fullPrice}$</td>
                                        <td>{
                                            d.status.toUpperCase() === "OUT_FOR_DELIVERY" ?
                                                "OUT FOR DELIVERY" : d.status.toUpperCase()
                                        }</td>
                                        <td>{new Date(d.orderDate).toLocaleString()}</td>
                                        <td className='tableBtns'>
                                            <Button
                                                type="button"
                                                className="delete-btn"
                                                onClick={async () => {
                                                    await deleteDeliveryFunc(d.deliveryID);
                                                }}
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                type="button"
                                                className="update-btn"
                                                onClick={() => { }}>
                                                Update
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

export default DeliveryDashboard;
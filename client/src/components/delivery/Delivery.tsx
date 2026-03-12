import { useEffect, useState } from "react";
import "./delivery.css";
import type { ICardProps } from "../../types/uiTypes";
import Error from "../../utils/Error";
import { getLiveOrder, takeToDeliver } from "../../api/order.api";
import Button from "../ui/Button";
import { useNavigate } from "react-router";
import type { ILiveOrderTypes } from "../../types/orderTypes";
import Pagination from "../ui/Pagination";

const Delivery = () => {
    const [liveOrders, setLiveOrders] = useState<ILiveOrderTypes | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const GetLiveOrders = async () => {
            try {
                const res = await getLiveOrder();
                if (res) {
                    setLiveOrders(res);
                }
            } catch {
                return <Error
                    title="Problem getting live orders!"
                    details={"Will fix this issue soon!"}
                    onRetry={() => { }}
                />
            }
        }
        GetLiveOrders();
    }, []);

    const deliverFunc = async (orderID: number) => {
        try {
            const res = await takeToDeliver(orderID);
            if (res.message === "Ready to deliver!") {
                const res = await getLiveOrder();
                setLiveOrders(res);
            }
        } catch {
            return <Error
                title="Problem taking the order!"
                details={"Try later until issue is fixed!"}
                onRetry={() => { }}
            />
        }
    }

    return (
        <div className="liveOrders-container">
            <div className='usersHeader'>
                <h2 className="header-title">Live Orders</h2>
                <Button
                    className="header-btn"
                    type="button"
                    onClick={() => navigate("/active_Deliveries")}>
                    Active Deliveries
                </Button>
            </div>
            <div className='table-wrapper'>

                <table className='liveOrders'>
                    <thead>
                        <tr>
                            <th>Food Name</th>
                            <th>Address</th>
                            <th>Time</th>
                            <th>Full Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            liveOrders?.live.length === 0 ? <tr style={{ textAlign: 'center' }}>
                                <td colSpan={6}>No deliveries as of this moment!</td>
                            </tr> : liveOrders?.live.map((res: ICardProps) => (
                                <tr className='liveOrder-row'
                                    key={res.orderID}>

                                    <td>{res.foodName} + {res.quantity}</td>
                                    <td>{res.address}</td>
                                    <td>{new Date(res.orderDate).toLocaleTimeString()}</td>
                                    <td>{res.fullPrice}€</td>
                                    <td>{res.status.toUpperCase()}</td>
                                    <td>
                                        <button
                                            onClick={async () => await deliverFunc(res.orderID)}
                                        >Deliver!</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {
                    liveOrders &&
                    liveOrders.totalPages > 1 &&
                    <Pagination
                        hasPrev={liveOrders?.hasPrev}
                        hasNext={liveOrders?.hasNext}
                        totalPages={liveOrders.totalPages}
                    />
                }
            </div>
        </div>
    );

}

export default Delivery;
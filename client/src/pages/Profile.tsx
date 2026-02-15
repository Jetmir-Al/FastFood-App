import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/ui/Button';
import { useEffect, useState } from 'react';
import { useAuthHook } from '../hooks/useAuthHook';
import "./styles/profile.css";
import Error from '../utils/Error';
import Card from '../components/ui/Card';
import { useDeleteAcc, useLogout } from '../services/auth.services';
import { type ICardProps } from '../types/uiTypes';
import NoInfo from '../utils/NoInfo';
import { getActiveOrders, getOrderHistory } from '../api/order.api';

const Profile = () => {

    const [updatePsw, setUpdatePsw] = useState<boolean>(false);
    const [newPsw, setNewPsw] = useState<string>("");
    const [oldPsw, setOldPsw] = useState<string>("");
    const [err, setErr] = useState<boolean>(false);
    const [activeOrder, setActiveOrder] = useState<ICardProps[] | null>(null);
    const [orderHistory, setOrderHistory] = useState<ICardProps[] | null>(null);
    const { user } = useAuthHook();
    const Logout = useLogout();
    const DeleteAcc = useDeleteAcc();
    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await getActiveOrders();
                const orderHisto = await getOrderHistory();
                setOrderHistory(orderHisto);
                setActiveOrder(res);
            } catch {
                return <Error
                    title='Problem getting Active Orders'
                    details={null}
                    onRetry={() => { }}
                />
            }
        }
        getOrders();

    }, []);

    const logoutFunc = async () => {
        try {
            await Logout();
        } catch {
            setErr(true);
        }
    }

    if (err) {
        return <Error
            title='Error login out!'
            details={"Try again later"}
            onRetry={async () => { await logoutFunc() }} />
    }

    return (
        <div className="customer-Container">

            <div className='custmoreInfo-container'>
                <div className='accInfo'>
                    <h1>{user?.name}</h1>
                    <h3>{user?.role.toUpperCase()}</h3>
                    <div className='accInfo-extra'>
                        <h3><FontAwesomeIcon className='icons' icon={faEnvelope} /> {
                            user?.email
                        }</h3>
                        <h3> <FontAwesomeIcon className='icons' icon={faPhoneVolume} /> {user?.phone}</h3>
                        {
                            updatePsw ? <form className="updatePsw" onSubmit={() => { }}>
                                <input className='inputPsw' type="password" placeholder="Enter your old password" onChange={(e) => setOldPsw(e.target.value)} />
                                <input className='inputPsw' type="password" placeholder="Enter your new password" onChange={(e) => setNewPsw(e.target.value)} />
                                <div className="accinfo-btns">
                                    <Button
                                        type="submit"
                                        className=''
                                        onClick={() => { }}>
                                        Submit
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => setUpdatePsw(p => !p)}
                                        className=''>
                                        Cancel
                                    </Button>
                                </div>
                            </form> :
                                <Button
                                    className='updatePswBtn'
                                    type='button'
                                    onClick={() => setUpdatePsw(p => !p)}>
                                    Update password
                                </Button>
                        }
                    </div>
                    <div className="accountManagment">
                        <Button
                            type='button'
                            className=''
                            onClick={async () => await logoutFunc()}
                        >Logout
                        </Button>
                        <Button
                            className=''
                            type='button'
                            onClick={async () => await DeleteAcc()}>
                            Delete Account
                        </Button>
                    </div>

                </div>
            </div>
            <h2>Active Orders</h2>
            <div className='activeOrders'>

                {
                    activeOrder?.length === 0 ?
                        <NoInfo noInfo='No active orders yet!' />
                        : activeOrder?.map((order: ICardProps) => (
                            <Card
                                key={order.orderItemID}
                                orderItemID={order.orderItemID}
                                orderID={order.orderID}
                                quantity={order.quantity}
                                foodDesc={order.foodDesc}
                                foodImg={order.foodImg}
                                foodName={order.foodName}
                                fullPrice={order.fullPrice}
                                orderDate={order.orderDate}
                                address={order.address}
                                status={order.status} />
                        ))
                }
            </div>
            <h2>Order History</h2>
            <div className='activeOrders'>
                {
                    orderHistory?.length === 0 ?
                        <NoInfo noInfo='No order history!' />
                        : orderHistory?.map((order: ICardProps) => (
                            <Card
                                key={order.orderItemID}
                                orderItemID={order.orderItemID}
                                orderID={order.orderID}
                                quantity={order.quantity}
                                foodDesc={order.foodDesc}
                                foodImg={order.foodImg}
                                foodName={order.foodName}
                                fullPrice={order.fullPrice}
                                orderDate={order.orderDate}
                                address={order.address}
                                status={order.status} />
                        ))
                }
            </div>
        </div>
    )
}

export default Profile;
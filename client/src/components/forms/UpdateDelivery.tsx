import { useEffect, useState } from "react";
import { getAllDeliveryMen } from "../../api/auth.api";
import type { IUpdateDelivery } from "../../types/deliveryTypes";
import Error from "../../utils/Error";
import Button from "../ui/Button";
import "./updateDelivery.css";
import type { IDashboardUsers } from "../../types/userTypes";
import Loading from "../../utils/Loading";
import { changeDeliveryMan } from "../../api/delivery.api";

const UpdateDelivery = ({ deliveryID, customer, address, deliveryMan, refetchFunc }: IUpdateDelivery) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<IDashboardUsers[] | null>(null);
    const [userID, setUserID] = useState<number>(0);
    const [problem, setProblem] = useState<boolean>(false)

    useEffect(() => {
        const allDeliveryMenFunc = async () => {
            try {
                const res = await getAllDeliveryMen();
                setUsers(res);
                setIsLoading(false);
            } catch {
                return <Error
                    title="Problem getting users"
                    details={"Try again later, until the issue is fixed"}
                    onRetry={() => { }} />
            }
        }

        allDeliveryMenFunc();
    }, []);

    if (isLoading) {
        return <Loading />
    }

    const deliveryManForm = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const res = await changeDeliveryMan(userID, deliveryID);
            if (res.message === "Updated Successfully!") {
                await refetchFunc();
            }
        } catch {
            setProblem(true);
        }
    }

    return (
        <div className="updateForm-container">
            <div className="updateForm">
                <div className="deliveryInfo">
                    <h2>
                        Current
                    </h2>
                    <p>Worker: {deliveryMan}</p>
                    <p>Customer: {customer}</p>
                    <p>{address}</p>
                </div>
                <form className="deliveryForm" onSubmit={deliveryManForm}>
                    {
                        problem && <h2>Problem with this action!</h2>
                    }
                    <label>
                        Delivery Men:
                        <select id="orderItem" className='orderItem' name="orderItem" required
                            defaultValue={""}
                            onChange={(e) => setUserID(Number(e.target.value))}
                        >
                            <option value="" disabled>Select Worker to Change:</option>
                            {
                                users?.map((res: IDashboardUsers) => (
                                    <option key={res.userID} value={Number(res.userID)}>{res.name}</option>
                                ))
                            }
                        </select>
                    </label>
                    <div className="btn-container">
                        <Button
                            className=""
                            type="submit"
                        >
                            Submit
                        </Button>
                        <Button
                            className="delete-btn"
                            type="button"
                            onClick={() => { }}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateDelivery;
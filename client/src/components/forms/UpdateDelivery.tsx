import { useCallback, useEffect, useId, useRef, useState } from "react";
import { getAllDeliveryMen } from "../../api/auth.api";
import type { IUpdateDelivery } from "../../types/deliveryTypes";
import Error from "../../utils/Error";
import Button from "../ui/Button";
import "./updateDelivery.css";
import type { IDashboardUsers } from "../../types/userTypes";
import Loading from "../../utils/Loading";
import { changeDeliveryMan } from "../../api/delivery.api";

const UpdateDelivery = ({ deliveryID, customer, address, deliveryMan, refetchFunc, onCancel }: IUpdateDelivery & { onCancel?: () => void }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<IDashboardUsers[] | null>(null);
    const [userID, setUserID] = useState<number>(0);
    const [problem, setProblem] = useState("");
    const [loadError, setLoadError] = useState(false);
    const [pending, setPending] = useState(false);
    const [saved, setSaved] = useState(false);
    const actionLock = useRef(false);
    const workerSelectID = useId();

    const allDeliveryMenFunc = useCallback(async () => {
        setIsLoading(true);
        setLoadError(false);
        try {
            const res = await getAllDeliveryMen();
            setUsers(res);
        } catch {
            setLoadError(true);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        void allDeliveryMenFunc();
    }, [allDeliveryMenFunc]);

    const deliveryManForm = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (actionLock.current || saved) return;
        actionLock.current = true;
        setPending(true);
        setProblem("");
        try {
            const res = await changeDeliveryMan(userID, deliveryID);
            if (res.message === "Updated Successfully!") {
                setSaved(true);
                await refetchFunc();
            } else {
                setProblem("The assignment was not updated. Please try again.");
            }
        } catch {
            setProblem("We couldn't update the assignment or refresh the deliveries. Check the delivery list before trying again.");
        } finally {
            actionLock.current = false;
            setPending(false);
        }
    };

    return (
        <div className="updateForm-container">
            <header className="updateForm-heading">
                <p className="updateForm-eyebrow">Crew coordination</p>
                <h2>Update delivery assignment</h2>
                <p>Choose the worker responsible for this delivery.</p>
            </header>
            <div className="updateForm">
                <section className="deliveryInfo">
                    <h3>Current assignment</h3>
                    <dl>
                        <div><dt>Worker</dt><dd>{deliveryMan}</dd></div>
                        <div><dt>Customer</dt><dd>{customer}</dd></div>
                        <div><dt>Delivery address</dt><dd>{address}</dd></div>
                    </dl>
                </section>
                <form className="deliveryForm" onSubmit={deliveryManForm} aria-busy={pending || isLoading}>
                    <h3>Assign a worker</h3>
                    {problem && <p className="updateForm-error" aria-live="polite">{problem}</p>}
                    {isLoading ? <div className="updateForm-state"><Loading /><p>Loading available workers…</p></div>
                        : loadError ? <div className="updateForm-state" aria-live="polite"><Error
                            title="Couldn't load workers"
                            details="Check your connection and retry."
                            onRetry={() => { void allDeliveryMenFunc(); }} /></div>
                            : !users?.length ? <p className="updateForm-empty">No delivery workers are available to assign.</p>
                                : <>
                                    <label htmlFor={workerSelectID}>Delivery worker</label>
                                    <select id={workerSelectID} className="orderItem" name="orderItem" required
                                        defaultValue="" disabled={pending || saved}
                                        onChange={(e) => setUserID(Number(e.target.value))}>
                                        <option value="" disabled>Select a worker</option>
                                        {users.map((res: IDashboardUsers) => (
                                            <option key={res.userID} value={Number(res.userID)}>{res.name}</option>
                                        ))}
                                    </select>
                                </>}
                    {saved && <p className="updateForm-saved" aria-live="polite">Assignment saved. Refresh the delivery list if it hasn't updated.</p>}
                    <div className="btn-container">
                        <Button className="updateForm-submit" type="submit"
                            disabled={pending || saved || isLoading || loadError || !users?.length}>
                            {pending ? "Saving…" : saved ? "Saved" : "Save assignment"}
                        </Button>
                        <Button className="updateForm-cancel" type="button" disabled={pending} onClick={onCancel}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateDelivery;

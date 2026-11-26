import DashboardHeader from "./DashboardHeader";
import Button from "../ui/Button";
import { useCallback, useEffect, useRef, useState } from "react";
import { type IDashboardUsers } from "../../types/userTypes";
import Error from "../../utils/Error";
import { deleteUser, getAllDeliveryMen } from "../../api/auth.api";
import Loading from "../../utils/Loading";
import NoInfo from "../../utils/NoInfo";

const UsersDashboard = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<IDashboardUsers[] | null>(null);
    const [loadError, setLoadError] = useState(false);
    const [actionError, setActionError] = useState("");
    const [pendingID, setPendingID] = useState<number | null>(null);
    const actionLock = useRef<number | null>(null);

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

    const deleteUserFunc = async (userID: number) => {
        if (actionLock.current !== null) return;
        actionLock.current = userID;
        setPendingID(userID);
        setActionError("");
        try {
            const del = await deleteUser(userID);
            if (del.message === "Deleted Succesfully!") {
                const res = await getAllDeliveryMen();
                setUsers(res);
            } else {
                setActionError("The crew account was not deleted. Refresh the list before trying again.");
            }
        } catch {
            setActionError("We couldn't complete the deletion or refresh the crew list. Refresh before trying again.");
        } finally {
            actionLock.current = null;
            setPendingID(null);
        }
    };

    return (
        <section className="dashboard-panel">
            <div className="dashboard-panel-heading">
                <h2>Delivery crew</h2>
                <p>Worker accounts and contact details.</p>
            </div>
            {actionError && <div className="operations-notice">
                <p aria-live="polite">{actionError}</p>
                <Button className="operations-retry" type="button" disabled={isLoading || pendingID !== null}
                    onClick={async () => { setActionError(""); await allDeliveryMenFunc(); }}>Refresh crew</Button>
            </div>}
            <div className="table-wrapper" role="region" aria-label="Delivery crew table, scroll horizontally for all columns" tabIndex={0}>
                <table className="dashboardTable" aria-busy={isLoading}>
                    <caption>Delivery worker accounts</caption>
                    <DashboardHeader
                        tHeader1="Name"
                        tHeader2="Email"
                        tHeader3="Phone"
                        tHeader4="Role"
                        tHeader5="Joined"
                        tHeader6="Problems?"
                    />
                    <tbody>
                        {isLoading ? <tr className="tr-row"><td colSpan={7} className="operations-state"><Loading /><p>Loading crew accounts…</p></td></tr>
                            : loadError ? <tr className="tr-row"><td colSpan={7} className="operations-state"><div aria-live="polite"><Error
                                title="Couldn't load the crew"
                                details="Check your connection and retry."
                                onRetry={() => { void allDeliveryMenFunc(); }} /></div></td></tr>
                                : !users?.length ? <tr className="tr-row"><td colSpan={7} className="operations-state"><NoInfo noInfo="No worker accounts yet. Crew accounts will appear here when available." /></td></tr>
                                    : users.map((u: IDashboardUsers) => (
                                        <tr className="tr-row" key={u.userID}>
                                            <th scope="row">{u.name}</th>
                                            <td>{u.email}</td>
                                            <td>{u.phone}</td>
                                            <td><span className="operations-status">{u.role.toUpperCase()}</span></td>
                                            <td>{new Date(u.createdAt).toLocaleString()}</td>
                                            <td>—</td>
                                            <td className="tableBtns">
                                                <Button type="button" className="delete-btn"
                                                    disabled={pendingID !== null}
                                                    aria-label={`${pendingID === u.userID ? "Deleting…" : "Delete"} crew account for ${u.name}`}
                                                    onClick={async () => { await deleteUserFunc(u.userID); }}>
                                                    {pendingID === u.userID ? "Deleting…" : "Delete"}
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default UsersDashboard;

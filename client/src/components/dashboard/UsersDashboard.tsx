import DashboardHeader from "./DashboardHeader";
import Button from "../ui/Button";
import { useEffect, useState } from "react";
import { type IDashboardUsers } from "../../types/userTypes";
import Error from "../../utils/Error";
import { getAllDeliveryMen } from "../../api/auth.api";
import Loading from "../../utils/Loading";
import NoInfo from "../../utils/NoInfo";

const UsersDashboard = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<IDashboardUsers[] | null>(null);

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

    return (
        <div className="table-wrapper">
            <table className="dashboardTable">
                <DashboardHeader
                    tHeader1="Name"
                    tHeader2="Email"
                    tHeader3="Phone"
                    tHeader4="Role"
                    tHeader5="Joined"
                    tHeader6="Problems?"
                />
                <tbody>
                    {
                        isLoading ?
                            <tr className="tr-row">
                                <td>
                                    <Loading />
                                </td>
                            </tr> :
                            users?.length === 0 ? <tr className="tr-row">
                                <td>
                                    <NoInfo noInfo="No worker accounts yet!" />
                                </td>
                            </tr> :
                                users?.map((u: IDashboardUsers) => (
                                    <tr className="tr-row"
                                        key={u.userID}
                                    >
                                        <td>{u.name}</td>
                                        <td>{u.email}</td>
                                        <td>{u.phone}</td>
                                        <td>{u.role.toUpperCase()}</td>
                                        <td>{new Date(u.createdAt).toLocaleString()}</td>
                                        <td></td>
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

export default UsersDashboard;
import Button from "../ui/Button";
import DashboardHeader from "./DashboardHeader";

const OrderDashboard = () => {
    return (
        <div className="table-wrapper">
            <table className="dashboardTable">
                <DashboardHeader
                    tHeader1="Title"
                    tHeader2="Address"
                    tHeader3="Date"
                    tHeader4="Food Name"
                    tHeader5="Quantity"
                    tHeader6="something"
                />
                <tbody>
                    <tr className="tr-row"
                    >
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
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

                </tbody>
            </table>
        </div>
    );
}

export default OrderDashboard;
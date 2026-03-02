import { Activity } from "react";
import "./dashboard.css";
import UsersDashboard from "./UsersDashboard";
import OrderDashboard from "./OrderDashboard";
import DeliveryDashboard from "./DeliveryDashboard";
import { useDashboardHook } from "../../hooks/useDashboardHook";

const Dashboard = () => {

    const { display } = useDashboardHook();
    return (
        <div className="dashboard-container">
            <Activity mode={display === "users" ? "visible" : "hidden"}>
                <UsersDashboard />
            </Activity>
            <Activity mode={display === "orders" ? "visible" : "hidden"}>
                <OrderDashboard />
            </Activity>
            <Activity mode={display === "delivery" ? "visible" : "hidden"}>
                <DeliveryDashboard />
            </Activity>
        </div>
    );
}

export default Dashboard
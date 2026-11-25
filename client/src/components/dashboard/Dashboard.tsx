import { Activity } from "react";
import "./dashboard.css";
import UsersDashboard from "./UsersDashboard";
import OrderDashboard from "./OrderDashboard";
import DeliveryDashboard from "./DeliveryDashboard";
import { useDashboardHook } from "../../hooks/useDashboardHook";

const Dashboard = () => {

    const { display, displayFunc } = useDashboardHook();
    return (
        <div className="dashboard-container">
            <header className="dashboard-heading">
                <p className="operations-eyebrow">Kitchen &amp; crew operations</p>
                <h1>Operations dashboard</h1>
                <p>Keep orders moving, coordinate deliveries, and manage your crew.</p>
            </header>
            <div className="dashboard-tabs" role="group" aria-label="Dashboard views">
                <button type="button" aria-pressed={display === "orders"} onClick={() => displayFunc("orders")}>Orders</button>
                <button type="button" aria-pressed={display === "delivery"} onClick={() => displayFunc("delivery")}>Deliveries</button>
                <button type="button" aria-pressed={display === "users"} onClick={() => displayFunc("users")}>Crew</button>
            </div>
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
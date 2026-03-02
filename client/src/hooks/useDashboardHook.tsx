import { useContext } from "react";
import { DashboardContext } from "../context/DashboardContext";

export const useDashboardHook = () => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error("Problem with context!");

    }
    return context;
}
import { createContext } from "react";

interface IDashboardContext {
    display: string,
    displayFunc: (value: string) => void
}

export const defaultDashboard: IDashboardContext = {
    display: "orders",
    displayFunc: () => { }
}



export const DashboardContext = createContext<IDashboardContext>(defaultDashboard);
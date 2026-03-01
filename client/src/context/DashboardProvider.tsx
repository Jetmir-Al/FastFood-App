import { useState, type ReactNode } from "react";
import { DashboardContext } from "./DashboardContext";

interface IDashboardProvider {
    children: ReactNode
}


export const AuthProvider = ({ children }: IDashboardProvider) => {
    const [display, setDisplay] = useState<string>("orders");


    const displayFunc = (value: string) => {
        setDisplay(value);
    }


    return (
        <DashboardContext.Provider
            value={{
                display,
                displayFunc
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
}
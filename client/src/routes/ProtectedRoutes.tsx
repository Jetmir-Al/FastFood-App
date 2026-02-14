import { Navigate, Outlet } from "react-router";


type ProtectedRoutesProps = {
    isAllowed: boolean;
    children?: React.ReactNode;
}


const ProtectedRoutes = ({ isAllowed, children }: ProtectedRoutesProps) => {
    if (!isAllowed) {
        return <Navigate to={"/"} replace />;
    }
    return children ? children : <Outlet />
}

export default ProtectedRoutes;
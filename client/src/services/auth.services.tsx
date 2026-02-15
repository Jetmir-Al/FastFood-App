import { useNavigate } from "react-router";
import { deleteAcc, logout } from "../api/auth.api"
import { useAuthHook } from "../hooks/useAuthHook";
import Error from "../utils/Error";



export const useDeleteAcc = () => {
    const { setAuth, setUser } = useAuthHook();
    const navigate = useNavigate();
    return async function () {
        try {
            const res = await deleteAcc();
            if (res.message === "User deleted") {
                setAuth(false);
                setUser(null);
                navigate('/');
            }
        } catch {
            return <Error
                title='Error deleting account!'
                details={"Try again later"}
                onRetry={async () => {
                    const res = await deleteAcc()
                    if (res.message === "User deleted") {
                        setAuth(false);
                        setUser(null);
                        navigate('/');
                    }
                }} />
        }
    }
}

export const useLogout = () => {
    const { setAuth, setUser } = useAuthHook();
    const navigate = useNavigate();
    return async function () {
        try {
            const res = await logout();
            if (res.message === "Loged out") {
                setAuth(false);
                setUser(null);
                navigate('/');
            }
        } catch {
            // 
        }
    }
}


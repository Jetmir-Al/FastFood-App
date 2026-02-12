import { api } from "./api"

export const Login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", {
        email,
        password
    });
    return res.data;
};

export const SignUp = async (name: string, email: string, password: string, phone: string, role: string) => {
    const res = await api.post("/auth/signup", {
        name,
        email,
        password,
        phone,
        role
    });

    return res.data;
};

export const updatePsw = async (oldPsw: string, newPsw: string) => {
    const res = await api.put("/auth/updatePsw", {
        oldPsw,
        newPsw
    },
        { withCredentials: true });
    return res.data;
}
export const status = async () => {
    const res = await api.get("/auth/status", { withCredentials: true });
    return res.data;
}

export const deleteAcc = async () => {
    const res = await api.delete("/auth/deleteAcc", { withCredentials: true });
    return res.data;
}

export const logout = async () => {
    await api.post("/auth/logout", {}, { withCredentials: true });
}
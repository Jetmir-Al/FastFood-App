import { api } from "./api"

export const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", {
        email,
        password
    });
    return res.data;
};

export const register = async (name: string, email: string, passwordHash: string, phone: string, role: string) => {
    const res = await api.post("/auth/signup", {
        name,
        email,
        passwordHash,
        phone,
        role
    });

    return res.data;
};

export const UpdatePsw = async (oldPsw: string, newPsw: string) => {
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
    const res = await api.post("/auth/logout", {}, { withCredentials: true });
    return res.data;
}

export const getAllDeliveryMen = async () => {
    const res = await api.get("/auth/getAllDeliveryMen", { withCredentials: true });
    return res.data;
}
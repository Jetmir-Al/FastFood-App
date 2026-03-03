import { UserService } from "../services/user.service";
import { signToken, verifyToken } from "../utils/jwt";
import { HttpError } from "../http/http.error";
import { IDeleteUser, ILogin, IRegister, IUpdatePsw, IUpdateUser, IUser } from "../types/User";
import { Request, Response } from "express";
import { cookieConfig } from "../config/httpCookies";


export const signUp = async (req: Request, res: Response) => {
    try {
        const { name, email, passwordHash, phone, role }: IRegister = req.body;

        if (!email || !passwordHash || !name || !phone || !role) {
            return res.status(400).json({ message: "Invalid Credencials" });
        }

        await UserService.register(name, email, passwordHash, phone, role);

        res.status(201).json({ message: "User Created" });

    } catch (error: any) {
        if (error instanceof HttpError) {
            return res.status(error.statusCode).json({ message: error.message });
        }

        res.status(500).json({ message: error.message });
    }
};


export const Login = async (req: Request, res: Response) => {
    try {
        const { email, password }: ILogin = req.body;

        if (!email || !password) {
            res.status(400).json({ message: "Invalid Credencials" });
        }

        const user = await UserService.login(email, password);
        const token = signToken({ userID: user.userID });

        res.cookie("access_token", token, cookieConfig);
        res.status(200).json({ message: "User loged in!", user });
    }
    catch (error: any) {
        if (error instanceof HttpError) {
            return res.status(error.statusCode).json({ message: error.message });
        }

        res.status(500).json({ message: error.message });
    }
};


export const status = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(404).json({ message: "Cookie not found" });
        }
        const payload = verifyToken(token)
        const user = await UserService.status(payload.userID);
        if (!user) {
            return res.status(401).json({ message: "Invalid sesion" });
        }

        return res.status(200).json({
            authenticated: true,
            user
        });
    } catch {
        res.status(200).json({ message: "No user sesion!" });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        const { httpOnly, sameSite } = cookieConfig;
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(404).json({ message: "Cookie not found" });
        }

        res.clearCookie('access_token', { httpOnly, sameSite });
        res.status(200).json({ message: "Loged out" });

    } catch (error: any) {
        res.status(401).json({ message: error.message });
    }
}


export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { userID }: IDeleteUser = req.body;
        await UserService.delUser(userID);

        res.status(200).json({ message: "Deleted Succesfully!" });

    } catch (error: any) {
        if (error instanceof HttpError) {
            return res.status(error.statusCode).json({ message: error.message });
        }

        res.status(500).json({ message: error.message });
    }
};


export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(404).json({ message: "Cookie not found" });
        }
        const payload = verifyToken(token);
        const user = await UserService.status(payload.userID);

        if (user?.role !== 'admin') {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const users = UserService.getUsers();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllDeliveryMen = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(404).json({ message: "Cookie not found" });
        }
        const payload = verifyToken(token);
        const user = await UserService.status(payload.userID);

        if (user?.role !== 'admin') {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const deliveryMen = await UserService.deliveryMen();
        res.status(200).json(deliveryMen);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export const updateUser = async (req: Request, res: Response) => {
    try {
        const { userID, name, email, phone, role }: IUpdateUser = req.body;

        await UserService.updUser(userID, name, email, phone, role);

        res.status(200).json({ message: "Updated Successfully!" })

    } catch (error: any) {
        if (error instanceof HttpError) {
            return res.status(error.statusCode).json({ message: error.message });
        }

        res.status(500).json({ message: error.message });
    }
};


export const UpdatePsw = async (req: Request, res: Response) => {
    try {
        const { oldPsw, newPsw }: IUpdatePsw = req.body;

        const token = req.cookies.access_token;
        if (!token) {
            return res.status(404).json({ message: "Cookie not found" });
        }
        const payload = verifyToken(token);


        await UserService.updPsw(oldPsw, newPsw, payload.userID);
        res.status(200).json({ message: "Password updated" });

    } catch (error: any) {
        if (error instanceof HttpError) {
            return res.status(error.statusCode).json({ message: error.message });
        }

        res.status(500).json({ message: error.message });
    }
};

export const DeleteAccount = async (req: Request, res: Response) => {
    try {
        const { httpOnly, sameSite } = cookieConfig;
        const token = req.cookies.access_token;
        const payload = verifyToken(token);
        await UserService.delAcc(payload.userID);
        res.clearCookie('access_token', { httpOnly, sameSite });
        res.status(200).json({ message: "User deleted" });

    } catch (error: any) {
        if (error instanceof HttpError) {
            return res.status(error.statusCode).json({ message: error.message });
        }

        res.status(500).json({ message: error.message });
    }
}

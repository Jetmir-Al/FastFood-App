import bcrypt from "bcrypt";
import { UserModel } from "../models/user.model";
import { ConfilctError, UnauthorizedError } from "../http/http.error";

export const UserService = {

    async register(name: string, email: string, psw: string, phone: string, role: string) {
        const userExists = await UserModel.findByEmail(email);

        if (userExists) {
            throw new ConfilctError("User already exists");
        }

        const passwordHash = await bcrypt.hash(psw, 10);

        return await UserModel.SignUp(name, email, passwordHash, phone, role);

    },

    async login(email: string, psw: string) {
        const user = await UserModel.findByEmail(email);

        if (!user) {
            throw new UnauthorizedError("Invalid credentials");
        }
        const isMatch = await bcrypt.compare(psw, user.passwordHash);

        if (!isMatch) {
            throw new UnauthorizedError("Invalid credentials");
        }

        return {
            userID: user.userID,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role
        };
    },

    async deliveryMen() {
        const res = await UserModel.getDeliveryMen();
        return res;
    },

    async status(userID: number) {
        const userInfo = await UserModel.findByID(userID);
        if (!userInfo) return null;

        return {
            userID: userInfo.userID,
            name: userInfo.name,
            email: userInfo.email,
            phone: userInfo.phone,
            role: userInfo.role,
        }
    },


    async delUser(userID: number) {
        const delUser = await UserModel.deleteUser(userID);

        if (!delUser) {
            throw new UnauthorizedError("Invalid credentials");
        }
    },

    async getUsers() {
        return await UserModel.allUsers();
    },

    async updUser(userID: number, name: string, email: string, phone: string, role: string) {
        const upd = await UserModel.updatedUserInfo(userID, name, email, phone, role);

        if (upd.message !== "updated user!") {
            throw new Error("Problem with updating");
        }
    },

    async updPsw(oldPsw: string, newPsw: string, userID: number) {

        const userInfo = await UserModel.findByID(userID);

        if (!userInfo) {
            throw new Error("Invalid credentials");
        }
        const isMatch = await bcrypt.compare(oldPsw, userInfo.passwordHash);

        if (!isMatch) {
            throw new Error("Invalid credentials");
        }
        const passwordHash = await bcrypt.hash(newPsw, 10);

        await UserModel.UpdatePsw(passwordHash, userID);

    },

    async delAcc(userID: number) {
        const res = await UserModel.deleteAccount(userID);

        if (res.message !== "deleted acc!") {
            throw new Error("Problem with updating");
        }
    }

}
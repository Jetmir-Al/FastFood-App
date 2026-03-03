import { RowDataPacket } from "mysql2";
import { db } from "../config/db";
import { IUser } from "../types/User";



export const UserModel = {

    async findByEmail(email: string): Promise<IUser | null> {
        const [rows] = await db.execute<IUser[] & RowDataPacket[]>(
            `SELECT * FROM users WHERE email = ?`,
            [email]
        );
        return rows[0] ?? null;
    },

    async getDeliveryMen(): Promise<IUser[] | null> {
        const [rowsDeliveryMan] = await db.execute<IUser[] & RowDataPacket[]>(
            `
        SELECT userID, name, email, phone, role, createdAt
        FROM users WHERE role = 'delivery';
        `
        );
        return rowsDeliveryMan ?? null;
    },

    async deleteUser(userID: number) {
        const res = await db.execute(`
        DELETE FROM users WHERE userID = ?;
        `, [userID]
        );

        if (res) return "Deleted"
    },

    //left to send specific info
    async allUsers(): Promise<IUser[] | null> {
        const [users] = await db.execute<IUser[] & RowDataPacket[]>(`
        SELECT 
        *
        FROM
        users
        WHERE
        role != 'admin';
        `);
        return users ?? null;
    },

    //update userInfo

    async updatedUserInfo(userID: number, name: string, email: string, phone: string, role: string) {
        await db.execute(`
        UPDATE users 
    SET 
	    name = ?,
        email = ?,
        phone = ?,
        role = ?
    WHERE
        userID = ?
        `, [name, email, phone, role, userID]);

        return { message: "updated user!" };
    },

    async UpdatePsw(psw: string, userID: number) {
        await db.execute(`
            UPDATE users SET passwordHash = ? WHERE userID = ?;
        `, [psw, userID]);
    },

    async Login(email: string, psw: string, role: string): Promise<IUser | null> {
        const [rowsLogin] = await db.execute<IUser[] & RowDataPacket[]>(`
        SELECT * FROM users WHERE email = ? AND  passwordHash = ? AND role = ?
    `, [email, psw, role]);
        return rowsLogin[0] ?? null;
    },

    async findByID(userID: number): Promise<IUser | null> {
        const [user] = await db.execute<IUser[] & RowDataPacket[]>(
            `SELECT * FROM users WHERE userID = ?`, [userID]
        );
        return user[0] ?? null;
    },

    async SignUp(name: string, email: string, psw: string, phone: string, role: string) {
        await db.execute(`
        INSERT INTO users(name,email,passwordHash,phone,role) VALUES(?, ?, ?, ?, ?)
        `, [name, email, psw, phone, role])
    },

    async deleteAccount(userID: number) {
        await db.execute(`
        DELETE FROM users WHERE userID = ?;
        `, [userID]);

        return { message: "deleted acc!" }

    },
}
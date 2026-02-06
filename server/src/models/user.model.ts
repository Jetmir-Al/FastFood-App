import { db } from "../config/db"



export const UserModel = {
    async create() {

    },

    async getDeliveryMen() {
        const [rowsDeliveryMan] = await db.execute(
            `
        SELECT * FROM users WHERE role = 'delivery';
        `
        );
        return rowsDeliveryMan;
    },

    async deleteUser(userID: number) {
        await db.execute(`
        DELETE FROM users WHERE userID = ?;
        `, [userID]
        );
    },

    //left to send specific info
    async allUsers() {
        const [users] = await db.execute(`
        SELECT 
        *
        FROM
        users
        WHERE
        role != '';
        `);
        return users;
    },

    //update userInfo

    async updatedUserInfo(userID: number, name: string, email: string, passwordHash: string, phone: string, role: string) {
        await db.execute(`
        UPDATE users 
    SET 
	    name = ?,
        email = ?,
        passwordHash = ?,
        phone = ?,
        role = ?
    WHERE
        userID = ?
        `, [name, email, passwordHash, phone, role, userID]);
    },

    async UpdatePsw(psw: string, userID: number) {
        await db.execute(`
            UPDATE users SET passwordHash = ? WHERE userID = ?;
        `, [psw, userID]);
    },

    async Login(email: string, psw: string, role: string) {
        const [rowsLogin] = await db.execute(`
        SELECT * FROM users WHERE email = ? AND  passwordHash = ? AND role = ?
    `, [email, psw, role]);
        // return {
        //     userID: rowsLogin[0].userID,
        //     name: rowsLogin[0].name,
        //     email: rowsLogin[0].email,
        //     phone: rowsLogin[0].phone,
        //     role: rowsLogin[0].role
        // };
    },

    async Status(userID: number) {
        const [rowsLogin] = await db.execute(`
        SELECT * FROM users WHERE userID = ?
        `, [userID]);
        // return {
        //     name: rowsLogin[0].name,
        //     email: rowsLogin[0].email,
        //     phone: rowsLogin[0].phone,
        //     role: rowsLogin[0].role
        // };
    },

    async SignUp(name: string, email: string, psw: string, phone: string, role: string) {
        await db.execute(`
        INSERT INTO users(name,email,passwordHash,phone,role) VALUES(?, ?, ?, ?, ?)
        `, [name, email, psw, phone, role])
    },

    async deleteAccount(email: string, psw: string, role: string) {
        await db.execute(`
        DELETE FROM users WHERE email = ? AND passwordHash = ? AND role = ?; 
        `, [email, psw, role]);
    },
}
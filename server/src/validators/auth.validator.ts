import { IDeleteUser, ILogin, IRegister, IUpdatePsw, IUpdateUser } from "../types/User";


export const isSignUpBody = (body: any): body is IRegister => {
    return (
        typeof body === "object" &&
        typeof body.name === "string" &&
        body.name !== "" &&
        typeof body.email === "string" &&
        body.email.includes("@") &&
        body.email !== "" &&
        typeof body.passwordHash === "string" &&
        body.passwordHash !== "" &&
        typeof body.phone === "string" &&
        body.phone !== "" &&
        typeof body.role === "string" &&
        body.role !== ""

    );
}

export const isLoginBody = (body: any): body is ILogin => {
    return (
        typeof body === "object" &&
        typeof body.email === "string" &&
        body.email.includes("@") &&
        body.email !== "" &&
        typeof body.password === "string" &&
        body.password !== ""
    );
}

export const isDeleteUser = (body: any): body is IDeleteUser => {
    return (
        typeof body === "object" &&
        typeof body.userID === "number" &&
        body.userID !== 0
    );
}

export const isUpdateUser = (body: any): body is IUpdateUser => {
    return (
        // name, email, phone, role
        typeof body === "object" &&
        typeof body.userID === "number" &&
        body.userID !== 0 &&
        typeof body.name === "string" &&
        body.name !== "" &&
        typeof body.email === "string" &&
        body.email.includes("@") &&
        body.email !== "" &&
        typeof body.phone === "string" &&
        body.phone !== "" &&
        typeof body.role === "string" &&
        body.role !== ""
    );
}

export const isUpdPsw = (body: any): body is IUpdatePsw => {
    return (
        typeof body === "object" &&
        typeof body.oldPsw === "string" &&
        typeof body.newPsw === "string" &&
        body.newPsw.length > 6
    );
}
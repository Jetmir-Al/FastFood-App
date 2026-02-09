
export interface IUser {
    userID: number;
    name: string;
    email: string;
    passwordHash: string;
    phone: string;
    role: string;
}

export interface IRegister {
    name: string;
    email: string;
    passwordHash: string;
    phone: string;
    role: string;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface IUpdateUser {
    userID: number,
    name: string,
    email: string,
    phone: string,
    role: string
}

export interface IUpdatePsw {
    oldPsw: string,
    newPsw: string
}

export interface IDeleteUser {
    userID: number;
}

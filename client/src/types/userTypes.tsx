

export interface IUser {
    userID: number,
    name: string,
    email: string,
    phone: string,
    role: string,
}

export interface IDashboardUsers {
    userID: number,
    name: string;
    email: string;
    phone: string;
    role: string;
    createdAt: Date;
}

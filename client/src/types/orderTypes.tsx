import type { ICardProps } from "./uiTypes";


export interface IOrderDashboardTypes {
    name: string;
    orderDate: Date;
    foodName: string;
    fullPrice: number;
    quantity: number;
    status: string;
    orderItemID: number;
    orderID: number;
}

export interface IOrderDashboard {
    page: number;
    active: IOrderDashboardTypes[];
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface ILiveOrderTypes {
    page: number;
    live: ICardProps[];
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface IOrderParams {
    params: {
        page: number | string;
        totalPages: number | string;
    }
}
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

export interface ILiveOrderTypes {
    page: number;
    live: ICardProps[];
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}
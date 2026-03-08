

export interface IDeliveryDashboard {
    customer: string;
    deliveryID: number;
    deliveryMan: string;
    address: string;
    orderDate: Date;
    status: string;
    foodName: string;
    quantity: number;
    fullPrice: number;
}

export interface IUpdateDelivery {
    customer: string;
    deliveryID: number;
    deliveryMan: string;
    address: string;
}
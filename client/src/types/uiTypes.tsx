export interface IButtonProps {
    children: React.ReactNode,
    onClick?: () => void,
    type?: 'submit' | 'reset' | 'button',
    className: string
}

export interface IDashboardHeader {
    tHeader1: string;
    tHeader2: string;
    tHeader3: string;
    tHeader4: string;
    tHeader5: string;
    tHeader6: string;
}

export interface ICardProps {
    address: string;
    orderID: number;
    deliveryID: number;
    orderItemID: number;
    foodName: string;
    foodImg: string;
    quantity: number;
    foodDesc: string;
    orderDate: Date;
    status: string;
    fullPrice: number;
    markAsDelivered: boolean;
    callFunc: () => void | Promise<void>;
}
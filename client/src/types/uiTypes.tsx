export interface IButtonProps {
    children: React.ReactNode,
    onClick?: () => void,
    type?: 'submit' | 'reset' | 'button',
    className: string
}

export interface ICardProps {
    address: string;
    orderID: number;
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
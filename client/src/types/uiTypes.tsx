export interface IButtonProps {
    children: React.ReactNode,
    onClick?: () => void,
    type?: 'submit' | 'reset' | 'button',
    className: string
}

export interface ICardProps {
    orderID: number;
    foodName: string;
    foodImg: string;
    quantity: number;
    foodDesc: string;
    address: string;
    orderTime: Date;
    orderDate: Date;
    status: string;
    fullPrice: number;
}
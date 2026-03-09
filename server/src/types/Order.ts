
export interface IInsertOrder {
    newID: number;
}

export interface IOrderForm {
    address: string,
    foodID: number,
    quantity: number
}

export interface ITakeToDeliver {
    orderID: number;
}

export interface IDeleteOrder {
    orderID: number;
}
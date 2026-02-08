
export interface IFoodInsert {
    foodName: string,
    foodDesc: string,
    price: number,
    foodImg: string
}

export interface IFoodUpdate {
    foodID: number;
    foodImg: string;
}
// import

import { IFoodInsert, IFoodUpdate } from "../types/Food";

export const isAddFoodItemBody = (body: any): body is IFoodInsert => {
    return (
        typeof body === "object" &&
        typeof body.foodName === "string" &&
        body.foodName !== "" &&
        typeof body.foodDesc === "string" &&
        body.foodDesc !== "" &&
        typeof body.price === "string" &&
        body.price !== ""
    );
}

export const isUpdateFoodImg = (body: any): body is IFoodUpdate => {
    return (
        typeof body === "object" &&
        typeof body.foodID === "number" &&
        body.foodID !== 0 &&
        typeof body.foodImg === "string" &&
        body.foodImg !== ""
    );
}
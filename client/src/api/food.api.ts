import { type IMenu } from "../types/foodTypes";
import { api } from "./api";



export const getFoodItems = async () => {
    const res = await api.get<IMenu[]>("/food/getFoodItems");
    return res.data;
}
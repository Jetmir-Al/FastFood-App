import { type IMenu } from "../types/foodTypes";
import { api } from "./api";



export const getImageUrl = (filename: string) => {
    return `${import.meta.env.VITE_SERVER_URL}/images/${filename}`;
}

export const getFoodItems = async () => {
    const res = await api.get<IMenu[]>("/food/getFoodItems");
    return res.data;
};

export const getTopFoods = async () => {
    const res = await api.get<IMenu[]>("/food/getTopFoods");
    return res.data;
};




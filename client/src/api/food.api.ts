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


export const addFoodItem = async (foodName: string, foodDesc: string, price: string, imgFile: File) => {
    const formData = new FormData();
    formData.append("foodName", foodName);
    formData.append("foodDesc", foodDesc);
    formData.append("price", price);
    formData.append("foodImg", imgFile);
    const res = await api.post("/food/addNewFood", formData, { withCredentials: true });
    return res.data;
}

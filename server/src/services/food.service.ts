import { FoodModel } from "../models/food.model";


export const FoodService = {

    async getMenu() {
        return await FoodModel.foodList();
    },

    async getTopFood() {
        return await FoodModel.topFoods();
    },

    async addNewFood(foodName: string, foodDesc: string, price: number, foodImg: string | undefined) {
        const res = await FoodModel.addFoodItem(foodName, foodDesc, price, foodImg);
        if (res.message !== "added food item!") {
            throw new Error("Problem with inserting");
        }
    },

    async updFoodImg(image: string, foodID: number) {
        const res = await FoodModel.UpdFoodImg(image, foodID);

        if (res.message !== "updated food image!") {
            throw new Error("Problem with updating");
        }
    }
}
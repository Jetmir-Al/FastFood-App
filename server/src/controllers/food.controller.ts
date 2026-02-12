import { FoodService } from "../services/food.service";
import { Request, Response } from "express";
import { HttpError } from "../http/http.error";
import { IFoodInsert, IFoodUpdate } from "../types/Food";


export const getFoodItems = async (req: Request, res: Response) => {
    try {
        const foodItems = await FoodService.getMenu();
        res.status(200).json(foodItems);

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const addNewFoodItem = async (req: Request, res: Response) => {
    try {
        const { foodName, foodDesc, price, foodImg }: IFoodInsert = req.body;

        await FoodService.addNewFood(foodName, foodDesc, price, foodImg);

        res.status(200).json({ message: "Insert Succesfully" });

    } catch (error: any) {
        if (error instanceof HttpError) {
            return res.status(error.statusCode).json({ message: error.message });
        }

        res.status(500).json({ message: error.message });
    }
};

export const updateFoodImge = async (req: Request, res: Response) => {
    try {
        const { foodID, foodImg }: IFoodUpdate = req.body;

        await FoodService.updFoodImg(foodImg, foodID);

        res.status(200).json({ message: "Updated Successfully" });

    } catch (error: any) {
        if (error instanceof HttpError) {
            return res.status(error.statusCode).json({ message: error.message });
        }

        res.status(500).json({ message: error.message });
    }
};
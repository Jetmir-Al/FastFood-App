import { db } from "../config/db"



export const FoodModel = {
    async foodList() {
        const [rowsFood] = await db.execute(
            `SELECT * FROM fastfood`
        );

        return rowsFood;
    },



    async addFoodItem(foodName: string, foodDesc: string, price: number, foodImg: string) {
        await db.execute(`
        INSERT INTO fastfood (foodName, foodDesc, price, foodImg)
        VALUES  
        (?, ?, ?, ?)
        `, [foodName, foodDesc, price, foodImg]);
    },


    async UpdFoodImg(image: string, foodID: number) {
        await db.execute(`
        Update fastfood set foodImg = ? where foodID = ?
        `, [image, foodID]);
    }

}
import { useState, useEffect } from "react";
import './styles/menu.css';
import { type IMenu } from "../types/foodTypes";
import { getFoodItems } from "../api/food.api";
import NoInfo from "../utils/NoInfo";
import Loading from "../utils/Loading";



const Menu = () => {

    const [foodInfo, setFoodInfo] = useState<IMenu[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const foodList = async () => {
            try {
                //    
                const food = await getFoodItems();
                setFoodInfo(food);
                setLoading(false);
            } catch (err) {
                console.log("Diqka shkoj keq: ", err);
            }
        }
        foodList();
    }, []);

    if (loading) return <Loading />

    return (
        <div className="foodList-conatiner">

            <div className="foodList">
                {
                    foodInfo?.length === 0 ? <NoInfo noInfo="No food items" />
                        :
                        foodInfo?.map((food: IMenu) => (

                            <div className="food" key={food.foodID}>
                                <img src={`images`} alt={food.foodName} />
                                <p>{food.foodName}</p>
                                <p>Price: {food.price}€</p>
                            </div>
                        ))
                }
            </div>

        </div >
    )
}

export default Menu;
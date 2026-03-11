import { useState, useEffect } from "react";
import './styles/menu.css';
import { type IMenu } from "../types/foodTypes";
import { getFoodItems, getImageUrl } from "../api/food.api";
import NoInfo from "../utils/NoInfo";
import Loading from "../utils/Loading";
import { useAuthHook } from "../hooks/useAuthHook";
import Button from "../components/ui/Button";
import FoodForm from "../components/forms/FoodForm";



const Menu = () => {
    const { user } = useAuthHook();
    const [foodInfo, setFoodInfo] = useState<IMenu[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [foodForm, setFoodForm] = useState<boolean>(false);

    useEffect(() => {
        const foodList = async () => {
            try {
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
    if (foodForm) return <FoodForm
        setDisplay={() => setFoodForm(false)}
        reFetchFunc={async () => {
            const food = await getFoodItems();
            setFoodInfo(food);
        }}
    />

    return (
        <div className="foodList-conatiner">

            <div className="foodList">
                {
                    foodInfo?.length === 0 ? <NoInfo noInfo="No food items" />
                        :
                        foodInfo?.map((food: IMenu) => (

                            <div className="food" key={food.foodID}>
                                <img src={getImageUrl(food.foodImg)} alt={food.foodName} />
                                <h4>{food.foodName}</h4>
                                <p>Price: {food.price}€</p>
                            </div>
                        ))
                }
            </div>
            {
                user?.role === "admin" &&
                <Button className="addFoodItem-btn"
                    type="button"
                    onClick={() => setFoodForm(true)}>
                    ADD
                </Button>
            }

        </div >
    )
}

export default Menu;
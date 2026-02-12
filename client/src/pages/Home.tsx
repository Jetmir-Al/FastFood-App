import "./styles/home.css";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import type { IMenu } from "../types/foodTypes";
import { getImageUrl, getTopFoods } from "../api/food.api";
import NoInfo from "../utils/NoInfo";
import Loading from "../utils/Loading";


const Home = () => {
    const [foodInfo, setFoodInfo] = useState<IMenu[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const foodList = async () => {
            try {
                const food = await getTopFoods();
                setFoodInfo(food);
                setLoading(false);
            } catch (err) {
                console.log("Diqka shkoj keq: ", err);
            }
        }
        foodList();
    }, []);

    if (loading) {
        return <Loading />
    }
    return (
        <div className="hero-NoAcc">
            <div className='hero-info'>
                <h1>The BEST Fast Food
                    place in your area!</h1>
                <Link to={"/logIn"}>
                    <button>Create account to order!</button>
                </Link>
            </div>
            <div className='heroImg-container'>
                {
                    foodInfo?.length === 0 ? <NoInfo noInfo="No foods" /> :
                        foodInfo?.map((food: IMenu) => (
                            <div className="img-container" key={food.foodID}>
                                <img src={getImageUrl(food.foodImg)} alt="hamburger Img" />
                                <div className="Img-info">
                                    <h3>{food.foodName}</h3>
                                    <p>{food.foodDesc}</p>
                                </div>
                            </div>
                        ))
                }
            </div>
        </div>
    );
}

export default Home;
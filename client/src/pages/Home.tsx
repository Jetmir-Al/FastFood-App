import "./styles/home.css";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import type { IMenu } from "../types/foodTypes";
import { getImageUrl, getTopFoods } from "../api/food.api";
import NoInfo from "../utils/NoInfo";
import Button from "../components/ui/Button";
import Loading from "../utils/Loading";
import { useAuthHook } from "../hooks/useAuthHook";


const Home = () => {
    const [foodInfo, setFoodInfo] = useState<IMenu[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const { authenticated, user } = useAuthHook();

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
                {
                    authenticated ?
                        user?.role === "customer" ?
                            <Button className=""
                                type="button"
                                onClick={() => navigate("/order")}>
                                Order Now!
                            </Button>
                            : user?.role === "delivery" ?
                                <Button className=""
                                    type="button"
                                    onClick={() => navigate("/delivery")}>
                                    Deliver Now!
                                </Button>
                                :
                                <Button className=""
                                    type="button"
                                    onClick={() => navigate("/dashboard_panel")}>
                                    Manage Now!
                                </Button>
                        :
                        <Button className=""
                            type="button"
                            onClick={() => navigate("/signup")}>
                            Create account to order!
                        </Button>
                }
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
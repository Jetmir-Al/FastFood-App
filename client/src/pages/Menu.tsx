import { useState, useEffect } from "react";
import { Link } from "react-router";
import './styles/menu.css';
import { type IMenu } from "../types/foodTypes";
import { getFoodItems, getImageUrl } from "../api/food.api";
import NoInfo from "../utils/NoInfo";
import Loading from "../utils/Loading";
import { useAuthHook } from "../hooks/useAuthHook";
import Button from "../components/ui/Button";
import FoodForm from "../components/forms/FoodForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";

const Menu = () => {
    const { user } = useAuthHook();
    const [foodInfo, setFoodInfo] = useState<IMenu[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [foodForm, setFoodForm] = useState(false);
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState("original");
    const [error, setError] = useState(false);
    const [retry, setRetry] = useState(0);

    useEffect(() => {
        const foodList = async () => {
            setLoading(true);
            setError(false);
            try { setFoodInfo(await getFoodItems()); }
            catch { setError(true); }
            finally { setLoading(false); }
        };
        foodList();
    }, [retry]);

    if (foodForm) return <FoodForm setDisplay={() => setFoodForm(false)} reFetchFunc={async () => { setFoodInfo(await getFoodItems()); }} />;
    const foods = (foodInfo ?? []).filter(food => `${food.foodName} ${food.foodDesc}`.toLowerCase().includes(query.toLowerCase()));
    if (sort === "price-low") foods.sort((a, b) => Number(a.price) - Number(b.price));
    if (sort === "price-high") foods.sort((a, b) => Number(b.price) - Number(a.price));
    return (
        <div className="menu-page page-shell">
            <div className="page-heading"><div><p className="eyebrow">Something for every craving</p><h1>The good stuff.</h1><p>Find your favourite bite. Big on flavour, easy to love.</p></div>{user?.role === "admin" ? <Button onClick={() => setFoodForm(true)}><FontAwesomeIcon icon={faPlus} />Add food item</Button> : <span className="menu-heading-note">Pick. Order. Enjoy.</span>}</div>
            <div className="menu-toolbar">
                <div className="menu-search"><label htmlFor="menu-search" className="visually-hidden">Search the menu</label><FontAwesomeIcon icon={faSearch} /><input id="menu-search" type="search" placeholder="Search for your next favourite…" value={query} onChange={event => setQuery(event.target.value)} /></div>
                <div className="menu-sort"><label htmlFor="menu-sort">Sort by</label><select id="menu-sort" value={sort} onChange={event => setSort(event.target.value)}><option value="original">Menu order</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></div>
            </div>
            {loading ? <Loading /> : error ? <div className="inline-alert"><p role="alert">We couldn’t load the menu. Please check the connection and try again.</p><Button className="text-button" onClick={() => setRetry(value => value + 1)}>Try again</Button></div> : <>
                <p className="menu-result-count">{foods.length} {foods.length === 1 ? "delicious option" : "delicious options"}{query && ` matching “${query}”`}</p>
                {foods.length === 0 ? <div className="menu-empty"><NoInfo noInfo={query ? "No bites found. Try another search." : "The menu is being prepared. Check back soon."} />{query && <Button className="secondary" onClick={() => setQuery("")}>Clear search</Button>}</div> : <div className="foodList">{foods.map(food => <article className="food" key={food.foodID}>
                    <div className="menu-food-image"><img src={getImageUrl(food.foodImg)} alt={food.foodName} loading="lazy" /></div><div className="menu-food-info"><h2>{food.foodName}</h2><p>{food.foodDesc}</p><div className="menu-food-bottom"><strong>€{Number(food.price).toFixed(2)}</strong>{(!user || user.role === "customer") && <Link to={user ? "/order" : "/signup"} className="menu-order-link" aria-label={`${user ? "Order" : "Sign up to order"} ${food.foodName}`}>{user ? "Order" : "Get started"}<FontAwesomeIcon icon={faArrowRight} /></Link>}</div></div>
                </article>)}</div>}
            </>}
            <div className="menu-note"><span>GOOD FOOD. GOOD MOOD.</span><p>Your next favourite is waiting on the menu.</p></div>
        </div>
    );
};
export default Menu;

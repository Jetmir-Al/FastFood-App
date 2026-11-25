import "./styles/home.css";
import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import type { IMenu } from "../types/foodTypes";
import { getImageUrl, getTopFoods } from "../api/food.api";
import NoInfo from "../utils/NoInfo";
import Button from "../components/ui/Button";
import Loading from "../utils/Loading";
import { useAuthHook } from "../hooks/useAuthHook";
import FoodArtwork from "../components/ui/FoodArtwork";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faFireFlameCurved, faBurger, faBagShopping, faMotorcycle } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
    const [foodInfo, setFoodInfo] = useState<IMenu[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [retry, setRetry] = useState(0);
    const navigate = useNavigate();
    const { authenticated, user } = useAuthHook();

    useEffect(() => {
        const foodList = async () => {
            setLoading(true);
            setError(false);
            try { setFoodInfo(await getTopFoods()); }
            catch { setError(true); }
            finally { setLoading(false); }
        };
        foodList();
    }, [retry]);

    const action = authenticated ? user?.role === "customer" ? { path: "/order", label: "Order now" } : user?.role === "delivery" ? { path: "/delivery", label: "Find a delivery" } : { path: "/dashboard_panel", label: "Open dashboard" } : { path: "/signup", label: "Get started" };
    return (
        <div className="home-page">
            <section className="home-hero">
                <div className="hero-info">
                    <p className="hero-kicker"><FontAwesomeIcon icon={faFireFlameCurved} /> Your next craving starts here</p>
                    <h1>Big flavour.<br />Zero <span>boring bites.</span></h1>
                    <p className="hero-description">The burgers you crave. The sides you love. Your favourite fast-food moments, just a few taps away.</p>
                    <div className="hero-actions"><Button onClick={() => navigate(action.path)}>{action.label}<FontAwesomeIcon icon={faArrowRight} /></Button><Link to="/menu" className="button-link secondary">Explore the menu</Link></div>
                    <div className="hero-footnote"><span className="mini-food-icon"><FontAwesomeIcon icon={faBurger} /></span><p>A little hungry?<br /><strong>We’ve got something for that.</strong></p></div>
                </div>
                <div className="hero-visual">
                    <span className="visual-word" aria-hidden="true">CRAVE IT.</span>
                    <div className="hero-circle" />
                    <FoodArtwork />
                    <span className="flavour-stamp">ALL ABOUT<br /><strong>FLAVOUR</strong><span aria-hidden="true">✦</span></span>
                    <div className="hero-visual-note"><FontAwesomeIcon icon={faFireFlameCurved} /><div><strong>Meet your next favourite</strong><span>Good food. Great mood.</span></div></div>
                </div>
            </section>
            <div className="flavour-strip" aria-hidden="true"><span>BIG BITES</span><span>✦</span><span>BOLD FLAVOURS</span><span>✦</span><span>GOOD TIMES</span><span>✦</span><span>FASTFOOD</span><span>✦</span></div>
            <section className="home-favourites page-shell">
                <div className="section-heading"><div><p className="eyebrow">Craving inspiration</p><h2>The crowd favourites.</h2><p>Get to know the stars of our menu.</p></div><Link to="/menu" className="text-link">View full menu<FontAwesomeIcon icon={faArrowRight} /></Link></div>
                {loading ? <Loading /> : error ? <div className="inline-alert"><p role="alert">We couldn’t load the favourites. The menu will be back when the kitchen connection is restored.</p><Button className="text-button" onClick={() => setRetry(value => value + 1)}>Try again</Button></div> : foodInfo?.length === 0 ? <NoInfo noInfo="The favourites are still cooking. Check back soon." /> : <div className="favourites-grid">{foodInfo?.map(food => <article className="favourite-card" key={food.foodID}>
                    <div className="favourite-image"><span className="food-tag">Fan favourite</span><img src={getImageUrl(food.foodImg)} alt={food.foodName} loading="lazy" /></div>
                    <div className="favourite-info"><h3>{food.foodName}</h3><p>{food.foodDesc}</p><div className="favourite-bottom"><strong>€{Number(food.price).toFixed(2)}</strong><Link to="/menu" className="food-card-link" aria-label={`Explore ${food.foodName} on the menu`}><FontAwesomeIcon icon={faArrowRight} /></Link></div></div>
                </article>)}</div>}
            </section>
            <section className="how-it-works page-shell">
                <div><p className="eyebrow">Less effort. More flavour.</p><h2>Your craving.<br />Three simple steps.</h2><Link to="/menu" className="text-link">Let’s find your favourite<FontAwesomeIcon icon={faArrowRight} /></Link></div>
                <ol className="order-steps"><li><span><FontAwesomeIcon icon={faBurger} /></span><div><h3>Pick your favourite</h3><p>Explore the menu and find your perfect bite.</p></div></li><li><span><FontAwesomeIcon icon={faBagShopping} /></span><div><h3>Make it an order</h3><p>Sign in, choose your quantity, and add your address.</p></div></li><li><span><FontAwesomeIcon icon={faMotorcycle} /></span><div><h3>Leave the rest to us</h3><p>Follow your order’s status from your account.</p></div></li></ol>
            </section>
            <section className="home-cta"><div><p className="eyebrow">Your next good food moment</p><h2>Hungry looks good on you.</h2><p>Let’s turn that craving into something delicious.</p></div><Button className="cta-button" onClick={() => navigate(action.path)}>{action.label}<FontAwesomeIcon icon={faArrowRight} /></Button></section>
        </div>
    );
};
export default Home;

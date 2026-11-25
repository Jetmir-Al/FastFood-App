import './styles/about.css';
import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger, faHeart, faMotorcycle, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import FoodArtwork from '../components/ui/FoodArtwork';

const About = () => (
    <div className="about-page page-shell">
        <section className="about-intro"><div><p className="eyebrow">The story behind the bites</p><h1>Good food.<br />Even better <span>moments.</span></h1><p>Sometimes all you need is your favourite food. FastFood brings the menu, the ordering, and the little anticipation of that first bite together in one place.</p><Link to="/menu" className="button-link">Find your favourite<FontAwesomeIcon icon={faArrowRight} /></Link></div><div className="about-art"><FoodArtwork /><span>IT’S A GOOD FOOD DAY.</span></div></section>
        <section className="about-values"><div className="section-heading"><div><p className="eyebrow">What we’re about</p><h2>Keep it simple. Make it delicious.</h2></div></div><div className="about-value-grid"><article><span className="about-icon"><FontAwesomeIcon icon={faBurger} /></span><h3>Food worth craving</h3><p>Explore our menu, read what’s in each bite, and choose the food that fits your mood.</p></article><article><span className="about-icon"><FontAwesomeIcon icon={faHeart} /></span><h3>Your order, your way</h3><p>Choose your favourite, set your quantity, and tell us where to bring it. Less friction between you and your food.</p></article><article><span className="about-icon"><FontAwesomeIcon icon={faMotorcycle} /></span><h3>From kitchen to doorstep</h3><p>Our delivery team picks up your order, while you follow its status from your account.</p></article></div></section>
        <section className="about-closing"><p className="eyebrow">Let the menu do the talking</p><h2>Your next favourite is one bite away.</h2><Link to="/menu" className="text-link">Explore the menu<FontAwesomeIcon icon={faArrowRight} /></Link></section>
    </div>
);
export default About;

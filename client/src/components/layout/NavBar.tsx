import { Link } from "react-router";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHamburger } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
    const roleBasedNav = "ll";
    const accountLinks = "ll";

    return (
        <div className='navbar-container'>
            <ul className='navbar-left'>
                <li>
                    <FontAwesomeIcon icon={faHamburger} />
                </li>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/foodList">Menu</Link>
                </li>
                {roleBasedNav}
            </ul>
            <div className='navbar-right'>
                {accountLinks}
            </div>
        </div>
    );
}

export default NavBar;
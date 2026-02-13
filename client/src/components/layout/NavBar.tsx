import { Link, useNavigate } from "react-router";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHamburger } from "@fortawesome/free-solid-svg-icons";
import Button from "../ui/Button";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
    const roleBasedNav = "ll";
    const navigate = useNavigate();

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
                    <Link to="/menu">Menu</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                {roleBasedNav}
            </ul>
            <div className='navbar-right'>
                {
                    <Button
                        className=""
                        type="button"
                        onClick={() => { navigate("/signup") }} >
                        <FontAwesomeIcon icon={faUser} />
                    </Button>
                }
            </div>
        </div>
    );
}

export default NavBar;
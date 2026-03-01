import { Link, useNavigate } from "react-router";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHamburger, faUserGear } from "@fortawesome/free-solid-svg-icons";
import Button from "../ui/Button";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuthHook } from "../../hooks/useAuthHook";

const NavBar = () => {
    const { user, authenticated } = useAuthHook();
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
                {
                    user?.role === "customer" &&
                    <li>
                        <Link to="/order">Order</Link>
                    </li>
                }
                {
                    user?.role === "delivery" &&
                    <li>
                        <Link to="/delivery">Delivery</Link>
                    </li>
                }
                {
                    user?.role === "admin" &&
                    <li>
                        <Link to="/dashboard_panel">Dashboard</Link>
                    </li>
                }
            </ul>
            <div className='navbar-right'>
                {
                    authenticated ?
                        <Button
                            className=""
                            type="button"
                            onClick={() => { navigate("/profile") }} >
                            <FontAwesomeIcon icon={faUserGear} />
                        </Button>
                        :
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
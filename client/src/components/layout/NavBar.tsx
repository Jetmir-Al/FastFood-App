import { Link, useNavigate, useLocation } from "react-router";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faHamburger, faUserGear } from "@fortawesome/free-solid-svg-icons";
import Button from "../ui/Button";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuthHook } from "../../hooks/useAuthHook";
import { useDashboardHook } from "../../hooks/useDashboardHook";
import { Activity, useState } from "react";

const NavBar = () => {
    const { user, authenticated } = useAuthHook();
    const { displayFunc } = useDashboardHook();
    const [dropDown, setDropDown] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();

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
                    <li className="dashboardList">
                        <Button
                            className=""
                            type="button"
                            onClick={() => setDropDown(d => !d)}
                        >
                            Dashboard <FontAwesomeIcon icon={faCaretDown} />
                        </Button>
                        <Activity mode={dropDown ? "visible" : "hidden"}>
                            <div className="dashboardOption-container" >
                                <Button
                                    className="dashboardOption"
                                    type="button"
                                    onClick={() => {
                                        if (location.pathname !== "/dashboard_panel") {
                                            navigate("/dashboard_panel");
                                        }
                                        displayFunc('orders');
                                        setDropDown(false);
                                    }}>
                                    Orders
                                </Button>
                                <Button
                                    className="dashboardOption"
                                    type="button"
                                    onClick={() => {
                                        if (location.pathname !== "/dashboard_panel") {
                                            navigate("/dashboard_panel");
                                        }
                                        displayFunc('delivery');
                                        setDropDown(false);
                                    }}>
                                    Deliveries
                                </Button>
                                <Button
                                    className="dashboardOption"
                                    type="button"
                                    onClick={() => {
                                        if (location.pathname !== "/dashboard_panel") {
                                            navigate("/dashboard_panel");
                                        }
                                        displayFunc('users');
                                        setDropDown(false);
                                    }}>
                                    Users
                                </Button>
                            </div>
                        </Activity>
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
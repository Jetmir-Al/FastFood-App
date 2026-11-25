import { Link, NavLink, useNavigate, useLocation } from "react-router";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHamburger, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "../ui/Button";
import { useAuthHook } from "../../hooks/useAuthHook";
import { useDashboardHook } from "../../hooks/useDashboardHook";
import { useEffect, useRef, useState } from "react";

const NavBar = () => {
    const { user, authenticated } = useAuthHook();
    const { displayFunc } = useDashboardHook();
    const [menuOpen, setMenuOpen] = useState(false);
    const dashboardDetails = useRef<HTMLDetailsElement>(null);
    const menuButton = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const titles: Record<string, string> = { "/": "Big flavour, good moments", "/menu": "Our menu", "/about": "Our story", "/login": "Sign in", "/signup": "Create account", "/profile": "My account", "/order": "Place an order", "/delivery": "Live orders", "/active_Deliveries": "Active deliveries", "/dashboard_panel": "Kitchen dashboard" };
        document.title = `${titles[location.pathname] ?? "Page not found"} | FastFood`;
    }, [location.pathname]);

    const openDashboard = (display: string) => {
        if (location.pathname !== "/dashboard_panel") navigate("/dashboard_panel");
        displayFunc(display);
        if (dashboardDetails.current) dashboardDetails.current.open = false;
        setMenuOpen(false);
    };

    return (
        <header className="site-header">
            <div className="navbar-container">
                <Link to="/" className="brand" aria-label="FastFood home" onClick={() => setMenuOpen(false)}>
                    <span className="brand-icon"><FontAwesomeIcon icon={faHamburger} /></span>
                    <span>Fast<span className="brand-accent">Food.</span></span>
                </Link>
                <nav id="primary-navigation" aria-label="Primary" className={`primary-navigation ${menuOpen ? "is-open" : ""}`} onKeyDown={(event) => { if (event.key === "Escape") { if (dashboardDetails.current?.open) { dashboardDetails.current.open = false; dashboardDetails.current.querySelector('summary')?.focus(); } else { menuButton.current?.focus(); setMenuOpen(false); } } }}>
                    <ul className="navbar-left">
                        <li><NavLink to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink></li>
                        <li><NavLink to="/menu" onClick={() => setMenuOpen(false)}>Menu</NavLink></li>
                        <li><NavLink to="/about" onClick={() => setMenuOpen(false)}>Our story</NavLink></li>
                        {user?.role === "customer" && <li><NavLink to="/order" onClick={() => setMenuOpen(false)}>Order</NavLink></li>}
                        {user?.role === "delivery" && <><li><NavLink to="/delivery" onClick={() => setMenuOpen(false)}>Live orders</NavLink></li><li><NavLink to="/active_Deliveries" onClick={() => setMenuOpen(false)}>Active deliveries</NavLink></li></>}
                        {user?.role === "admin" && <li className="dashboardList">
                            <details ref={dashboardDetails}>
                                <summary className={location.pathname === "/dashboard_panel" ? "active" : ""}>Dashboard</summary>
                                <div className="dashboardOption-container">
                                    <Button className="dashboardOption" onClick={() => openDashboard("orders")}>Orders</Button>
                                    <Button className="dashboardOption" onClick={() => openDashboard("delivery")}>Deliveries</Button>
                                    <Button className="dashboardOption" onClick={() => openDashboard("users")}>Team</Button>
                                </div>
                            </details>
                        </li>}
                    </ul>
                </nav>
                <div className="navbar-right">
                    {authenticated ? <Link to="/profile" className="account-link" aria-label="My account" onClick={() => setMenuOpen(false)}><FontAwesomeIcon icon={faUser} /><span>My account</span></Link> : <>
                        <Link to="/login" className="signin-link" onClick={() => setMenuOpen(false)}>Sign in</Link>
                        <Link to="/signup" className="button-link nav-cta" onClick={() => setMenuOpen(false)}>Get started</Link>
                    </>}
                    <button ref={menuButton} className="mobile-menu-button" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(open => !open)}><FontAwesomeIcon icon={menuOpen ? faXmark : faBars} /></button>
                </div>
            </div>
        </header>
    );
};
export default NavBar;

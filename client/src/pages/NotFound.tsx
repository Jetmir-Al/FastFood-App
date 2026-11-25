import Button from "../components/ui/Button";
import "./styles/notfound.css";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurger, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function NotFound() {
    const navigate = useNavigate();
    return <div className="notFound-container page-shell"><div className="notfound-art" aria-hidden="true">4<FontAwesomeIcon icon={faBurger} />4</div><p className="eyebrow">A little off the menu</p><h1>This bite doesn’t exist.</h1><p>We couldn’t find that page. Let’s get you back to the good stuff.</p><Button onClick={() => navigate("/")}>Back to home<FontAwesomeIcon icon={faArrowRight} /></Button></div>;
}
export default NotFound;

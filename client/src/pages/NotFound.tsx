import Button from "../components/ui/Button";
import "./styles/notfound.css";
import { useNavigate } from "react-router";

function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="notFound-container">
            <h2>404 NOT FOUND!</h2>
            <Button
                type="button"
                className={"notFound-btn"}
                onClick={() => navigate("/")}
            >
                Go Home!
            </Button>
        </div>
    )
}

export default NotFound;
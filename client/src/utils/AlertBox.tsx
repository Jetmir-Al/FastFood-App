import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/ui/Button";
import "./utils.css";

interface IAlertBox {
    title: string;
    desc: string;
}

function AlertBox({ title, desc }: IAlertBox) {
    return (
        <div className="alertBox-continer">
            <div className="alertHeader">

                <h3>
                    {title}
                </h3>
                <Button
                    className="xBtn"
                    type="button"
                    onClick={() => { }}>
                    <FontAwesomeIcon icon={faX} />
                </Button>
            </div>
            <p>
                {desc}
            </p>
        </div>
    );
}

export default AlertBox;
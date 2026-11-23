import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import "./utils.css";

function NoInfo({ noInfo }: { noInfo: string }) {
    return <div className="noInfo-container"><span className="empty-state-icon"><FontAwesomeIcon icon={faBagShopping} /></span><p>{noInfo}</p></div>;
}
export default NoInfo;

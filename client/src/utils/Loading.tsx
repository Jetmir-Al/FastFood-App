import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurger } from "@fortawesome/free-solid-svg-icons";
import './utils.css';

function Loading() {
    return <div className="loading-Container"><div className="loading-food"><FontAwesomeIcon icon={faBurger} /></div><p>Getting the good stuff ready…</p><progress className="loading-progress" aria-label="Loading content" /></div>;
}
export default Loading;

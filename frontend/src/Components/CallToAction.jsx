import { Link } from "react-router-dom";
import './css/calltoaction.css';

export default function CallToAction() {
    return (
        <Link className="calltoaction" to="/authpage"><button className="calltoaction-button">Get Started</button></Link>
    )
}

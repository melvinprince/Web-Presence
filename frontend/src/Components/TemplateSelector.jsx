import { Link } from "react-router-dom";
import "./css/templateselector.css";



export default function TemplateSelector() {
    return (
        <div className="template-selector">
            <h3>Select a template</h3>
            <div className="templates">
                <Link to="/template/black-and-white">
                    <img src="../Templates/BlackAndWhite/preview.png" alt="" />
                </Link>
                <Link to="/template/minimal-and-modern">
                    <img src="../Templates/MinimalAndModern/preview.png" alt="" />
                </Link>
            </div>
        </div>
    );
}

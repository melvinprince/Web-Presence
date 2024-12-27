import { Link } from "react-router-dom";
import "./css/templateselector.css";



export default function TemplateSelector() {
    return (
        <div className="template-selector">
            <h3>Select a template</h3>
            <div className="templates">
                <div className="template">
                <img src="../Templates/BlackAndWhite/preview.png" alt="" />
                <Link to="/template/black-and-white">Black And White Template</Link>
                </div>
                <div className="template">
                <img src="../Templates/MinimalAndModern/preview.png" alt="" />
                <Link to="/template/minimal-and-modern">Minimal And Modern</Link>
                </div>
            </div>
        </div>
    );
}

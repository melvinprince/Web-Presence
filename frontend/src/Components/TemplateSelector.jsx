import { Link } from "react-router-dom";
import "./css/templateselector.css";

export default function TemplateSelector() {
    return (
        <div className="template-selector">
            <h3>Select a template</h3>
            <div className="templates">
                <Link to="/template"><img src="/Modern and Minimalistic preview.png" alt="" /></Link>
                <Link to="/template"><img src="/Modern and Minimalistic preview #2.png" alt="" /></Link>
                <Link to="/template"><img src="/Modern and Minimalistic preview #3.png" alt="" /></Link>
            </div>
        </div>
    )
}
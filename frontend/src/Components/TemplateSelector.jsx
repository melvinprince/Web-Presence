import { Link } from "react-router-dom";
import "./css/templateselector.css";
import blackAndWhitePreview from "../Templates/BlackAndWhite/preview.png";
import minimalAndModernPreview from "../Templates/MinimalAndModern/preview.png";
// import sleekfolioPreview from "../Templates/Sleekfolio/preview.png";

export default function TemplateSelector() {
    return (
        <div className="template-selector">
            <h3>Select a template</h3>
            <div className="templates">
                <div className="template">
                    <img src={blackAndWhitePreview} alt="Black And White Template" />
                    <Link to="/template/black-and-white">Black And White Template</Link>
                </div>
                <div className="template">
                    <img src={minimalAndModernPreview} alt="Minimal And Modern Template" />
                    <Link to="/template/minimal-and-modern">Minimal And Modern</Link>
                </div>
                <div className="template">
                    {/* <img src={sleekfolioPreview} alt="Sleekfolio Template" /> */}
                    <Link to="/template/sleekfolio">Sleekfolio</Link>
                </div>
            </div>
        </div>
    );
}


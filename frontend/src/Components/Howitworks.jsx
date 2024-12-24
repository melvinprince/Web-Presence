import "./css/howitworks.css";
import CallToAction from "./CallToAction";

export default function Howitworks() {
    return (
        <div className="howitworks">
            <h2>How It Works</h2>
        <div className="howitworks-card">
          <div className="step">
            <h3>Step 1: Sign Up</h3>
            <p>
              Create an account by signing up with your email and password to get started.
            </p>
          </div>
          <div className="step">
            <h3>Step 2: Choose a Template</h3>
            <p>
              Select from a range of professional templates that suit your style and needs.
            </p>
          </div>
          <div className="step">
            <h3>Step 3: Customize</h3>
            <p>
              Use our intuitive drag-and-drop editor to add your details and make it unique.
            </p>
          </div>
          <div className="step">
            <h3>Step 4: Publish</h3>
            <p>
              Publish your portfolio and share it with the world using a custom URL.
            </p>
          </div>
        </div>
        <div className="cta">
          <CallToAction />
        </div>
        </div>
    )
}
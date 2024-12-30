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
            <h3>Step 2: Enter Youre Details</h3>
            <p>
              Provide the necessary information to create your portfolio, such as your name, profession, and skills.
            </p>
          </div>
          <div className="step">
            <h3>Step 3: Choose a Template</h3>
            <p>
              Select a template that best fits your style and customize it to make it your own.
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
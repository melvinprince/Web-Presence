import "./css/features.css";

export default function Features() {
    return (
        <div className="features">
            <h2>Features</h2>
            <div className="features-card">
          <div className="item">
            <h3>Drag-and-Drop Editor</h3>
            <p>
              Create stunning portfolios effortlessly with our user-friendly editor designed for freelancers with no coding skills.
            </p>
          </div>
          <div className="item">
            <h3>Professional Templates</h3>
            <p>
              Choose from a variety of beautifully designed templates to make your portfolio stand out and impress clients.
            </p>
          </div>
          <div className="item">
            <h3>Custom Domain Support</h3>
            <p>
              Upgrade to a premium plan to use your own custom domain and give your portfolio a personalized touch.
            </p>
          </div>
          <div className="item">
            <h3>Responsive Design</h3>
            <p>
              Ensure your portfolio looks great on all devices, from desktops to smartphones, with our fully responsive layouts.
            </p>
          </div>
        </div>
        </div>
    )
}
import CallToAction from "./CallToAction"
import "./css/homemain.css"

export default function HomeMain() {
    return (
        <div className="home-main">
            <div className="left">
                <h1>Simplify your Portfolio Creation</h1>
                <p>Build Stunning, professional portfolios in minutes with our beautifully designed Web Presence portfolio templates</p>
                <div className="cta">
                    <CallToAction />
                </div>
            </div>
            <div className="right"></div>
        </div>
    )
}
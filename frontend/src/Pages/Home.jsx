import Header from "../Components/Header";
import Footer from "../Components/Footer";
import HomeMain from "../Components/HomeMain";
import Howitworks from "../Components/Howitworks";
import Features from "../Components/Features";

export default function Home() {
    return (
        <div>
            <Header loggedIn={false} />
            <HomeMain />
            <Features />
            <Howitworks />
            <Footer />
        </div>
    )
}
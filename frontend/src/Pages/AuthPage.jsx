import { useState } from "react"
import Header from "../Components/Header"
import Footer from "../Components/Footer"
import "./css/authpage.css"
import axios from "../services/axiosInstance"

export default function AuthPage() {

    const [activeTab, setActiveTab] = useState("signin")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleChangeTab = (tab) => setActiveTab(tab)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(activeTab === "signin") {
            try {                
                const result = await axios.post("/user/checkpass", {email, password});
                console.log("Succesfully Logged In", result);
            } catch (err) {
                try {
                    const result = await axios.post("/user/checkuser", {email, password});
                    console.log("Entered Wrong Pssword", result);
                } catch (err) {
                    console.log("User Not Registered", err);
                }
                console.log("Failed to Login", err); 
            }
        } else {
            if(password !== confirmPassword) {
                alert("Passwords do not match")
                return
            }
            try {
                const result = await axios.post("/user/register", {email, password});
                console.log("Succesfully Registered", result);
            } catch (err) {
                console.log("Failed to Register", err);
            }
        }
    }

    return (
        <div className="authpage">
            <Header />
            <div className="content">
                <div className="auth-form">
                    <button 
                        onClick={() => handleChangeTab("signin")} 
                        className={activeTab === "signin" ? "active auth-btn" : "auth-btn"}>
                        Sign-In</button>
                    <button
                        onClick={() => handleChangeTab("signup")}
                        className={activeTab === "signup" ? "active auth-btn" : "auth-btn"}>
                            Sign-Up</button>
                    <form onSubmit={handleSubmit}>
                        <div className="email form-content">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="text" 
                                id="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value) } />
                        </div>
                        <div className="password form-content">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        {activeTab === "signup" && (
                            <div className="confirm-pass form-content">
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input 
                                id="confirm-password" 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password" />
                        </div>
                        )}
                        <button type="submit">Let's Go</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}
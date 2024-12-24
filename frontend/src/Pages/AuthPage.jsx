import { useState } from "react"
import Header from "../Components/Header"
import Footer from "../Components/Footer"
import "./css/authpage.css"
import { loginUser, registerUser } from "../services/authServices"

export default function AuthPage() {

    const [activeTab, setActiveTab] = useState("signin")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleChangeTab = (tab) => setActiveTab(tab)

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (activeTab === "signin") {
      try {
        const result = await loginUser(email, password);
        console.log("Successfully Logged In", result);
        // Handle successful login (e.g., redirect to dashboard)
      } catch (err) {
        alert(err.message); // Display the error message from the API
      }
    } else {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      try {
        const result = await registerUser(email, password);
        console.log("Successfully Registered", result);
        // Handle successful registration (e.g., redirect to login page)
      } catch (err) {
            alert(err.message); // Display the error message from the API}
        }
    }
  };

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
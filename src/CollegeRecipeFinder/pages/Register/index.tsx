import Signup from "../../Users/SignUp";
import Navigation from "../Navigation";
import "../Login/Login.css"

export default function Register() {
    return (
        <div>
            <Navigation />
            <div className="login-container">
            <h1>Register</h1>
            <Signup />
            </div>
        </div>
    )
}
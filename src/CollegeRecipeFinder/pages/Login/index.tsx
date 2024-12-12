import "./Login.css";
import Signin from "../../Users/Signin";
import Navigation from "../Navigation";

export default function Login() {
    return (
        <div>
            <Navigation />
            <div className="login-container">
                <h1>Login</h1>
                <Signin />
            </div>
        </div>
    );
}

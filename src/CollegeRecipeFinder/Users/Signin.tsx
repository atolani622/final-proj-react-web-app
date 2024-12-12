import "./Signin.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "../client";

export default function Signin() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const signin = async () => {
        try {
            const user = await client.signin(credentials);
            if (user) {
                dispatch(setCurrentUser(user));
                navigate("/Dashboard");
            } else {
                setError("Invalid credentials. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
        }
    };

    const goToSignUp = () => {
        navigate("/Register");
    };

    return (
        <div className="signin-container">
            <h1>Signin</h1>
            {error && <p>{error}</p>}
            <input
                name="username"
                placeholder="Username"
                value={credentials.username}
                onChange={handleInputChange}
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleInputChange}
            />
            <button onClick={signin}>Signin</button>
            <button className="signup-button" onClick={goToSignUp}>
                Sign Up
            </button>
        </div>
    );
}

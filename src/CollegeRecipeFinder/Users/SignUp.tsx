import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "../client";
import "./Signin.css"
function Signup() {
    const [error, setError] = useState("");
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const signup = async () => {
        try {
            await client.signup(credentials);
            navigate("/profile");
        } catch (err) {
            setError("An error occurred. Please try again later.");
        }
    };
    const gotoSignIn = () => {
        navigate("/Login");
    };

    return (
        <div className="signin-container">
            <h1>Signup</h1>
            {error && <p className="error-text">{error}</p>}
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
            <button onClick={signup}>Signup</button>
            &nbsp;
            <button onClick={gotoSignIn}>Signin</button>
        </div>
    );
}

export default Signup;

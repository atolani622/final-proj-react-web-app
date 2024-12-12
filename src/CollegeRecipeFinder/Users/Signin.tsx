import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "../client";

function Signin() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState<any>({});

  const signin = async () => {
    const user =  await client.signin(credentials);
    if (!user) return;
    dispatch(setCurrentUser(user));
    navigate("/Home");
  };

  return (
    <div>
      <h1>Signin</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <input
        placeholder="Username"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <button onClick={signin}>Signin</button>
    </div>
  );
}

export default Signin;

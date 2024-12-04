import { useNavigate } from "react-router-dom";

export default function Signin() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/CollegeRecipeFinder/Login/");
  };

  return (
    <div id="wd-signin-screen">
      <h3>Sign in</h3>
      <input className="wd-username" placeholder="username" /> <br />
      <input className="wd-password" placeholder="password" type="password" /> <br />
      <button id="wd-signin-btn" onClick={handleSignIn}>
        Sign in
      </button>
      <br />
      <button id="wd-signup-link" onClick={() => navigate("/CollegeRecipeFinder/Register")} >
        Sign up
      </button>
      <button
        id="wd-signup-link"
        onClick={() => navigate("/CollegeRecipeFinder/Profile")}
      >
        Profile
      </button>
    </div>
  );
}

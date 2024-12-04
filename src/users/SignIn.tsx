import { useNavigate } from "react-router-dom";

export default function Signin() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/CollegeRecipeFinder/Login/");
  };

  return (
    <div id="wd-signin-screen" className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Sign In</h3>
            <div className="mb-3">
              <input
                className="form-control wd-username"
                placeholder="Username"
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control wd-password"
                placeholder="Password"
                type="password"
              />
            </div>
            <div className="d-grid gap-2">
              <button
                id="wd-signin-btn"
                className="btn btn-primary"
                onClick={handleSignIn}
              >
                Sign in
              </button>
              <button
                id="wd-signup-link"
                className="btn btn-link"
                onClick={() => navigate("/CollegeRecipeFinder/Register")}
              >
                Sign up
              </button>
              <button
                id="wd-profile-link"
                className="btn btn-secondary"
                onClick={() => navigate("/CollegeRecipeFinder/Profile")}
              >
                Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

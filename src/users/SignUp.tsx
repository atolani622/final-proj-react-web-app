import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Sign Up</h3>
            <div className="mb-3">
              <input
                placeholder="Username"
                className="form-control wd-username"
              />
            </div>
            <div className="mb-3">
              <input
                placeholder="Password"
                type="password"
                className="form-control wd-password"
              />
            </div>
            <div className="mb-3">
              <input
                placeholder="Verify Password"
                type="password"
                className="form-control wd-password-verify"
              />
            </div>
            <div className="text-center">
              <Link to="/CollegeRecipeFinder/Register" className="btn btn-primary me-2">
                Sign up
              </Link>
              <Link to="/CollegeRecipeFinder/Login" className="btn btn-secondary">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

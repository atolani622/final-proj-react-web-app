import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Profile</h3>
            <div className="mb-3">
              <input
                defaultValue="alice"
                placeholder="Username"
                className="form-control wd-username"
              />
            </div>
            <div className="mb-3">
              <input
                defaultValue="123"
                placeholder="Password"
                type="password"
                className="form-control wd-password"
              />
            </div>
            <div className="mb-3">
              <input
                defaultValue="Alice"
                placeholder="First Name"
                id="wd-firstname"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                defaultValue="Wonderland"
                placeholder="Last Name"
                id="wd-lastname"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                defaultValue="2000-01-01"
                type="date"
                id="wd-dob"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                defaultValue="alice@wonderland"
                type="email"
                id="wd-email"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <select defaultValue="USER" id="wd-role" className="form-select">
                <option value="USER">User</option>
                <option value="CHEF">Chef</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <div className="text-center">
              <Link to="/CollegeRecipeFinder/Profile" className="btn btn-danger">
                Sign out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

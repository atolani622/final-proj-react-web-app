import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "../client";

export default function Profile() {
    const [profile, setProfile] = useState<any>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const fetchProfile = async () => {
        try {
            const userProfile = await client.profile(); // Fetch the current user's profile from the server
            setProfile(userProfile);
            dispatch(setCurrentUser(userProfile)); // Update Redux store to reflect the latest profile
        } catch (err) {
            console.error("Error fetching profile:", err);
            navigate("/Login"); // Redirect to login if fetching the profile fails
        }
    };

    const signout = async () => {
        try {
            await client.signout();
            dispatch(setCurrentUser(null));
            navigate("/Login");
        } catch (err) {
            console.error("Error signing out:", err);
        }
    };

    const updateProfile = async () => {
        try {
            const updatedProfile = await client.updateUser(profile);
            setProfile(updatedProfile);
            dispatch(setCurrentUser(updatedProfile)); // Update Redux store with updated profile
        } catch (err) {
            console.error("Error updating profile:", err);
        }
    };

    useEffect(() => {
        fetchProfile(); // Fetch the profile data when the component mounts
    }, []);

    return (
        <div className="wd-profile-screen">
            <h3>Profile</h3>
            {profile && (
                <div>
                    <input
                        defaultValue={profile.username}
                        id="wd-username"
                        className="form-control mb-2"
                        placeholder="Username"
                        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                    />
                    <input
                        defaultValue={profile.firstName}
                        id="wd-firstname"
                        className="form-control mb-2"
                        placeholder="First Name"
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    />
                    <input
                        defaultValue={profile.lastName}
                        id="wd-lastname"
                        className="form-control mb-2"
                        placeholder="Last Name"
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    />
                    <input
                        defaultValue={profile.dob}
                        id="wd-dob"
                        className="form-control mb-2"
                        placeholder="Date of Birth"
                        onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                        type="date"
                    />
                    <input
                        defaultValue={profile.email}
                        id="wd-email"
                        className="form-control mb-2"
                        placeholder="Email"
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                    <select
                        onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                        className="form-control mb-2"
                        id="wd-role"
                        value={profile.role}
                    >
                        <option value="CHEF">Chef</option>
                        <option value="ADMIN">Admin</option>
                        <option value="STUDENT">Student</option>
                    </select>
                    <div>
                        <button onClick={updateProfile} className="btn btn-primary w-100 mb-2">
                            Update
                        </button>
                        <button onClick={signout} className="btn btn-danger w-100 mb-2" id="wd-signout-btn">
                            Sign out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

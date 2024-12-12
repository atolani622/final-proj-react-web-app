import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as client from "../client";
import './ProfileDetails.css'
import Navigation from "../pages/Navigation";

export default function ProfileDetails() {
    const [profile, setProfile] = useState<any>({});
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams()
    const navigate = useNavigate();

    // Fetch the selected user's profile by ID
    const fetchProfile = async () => {
        try {
            const userProfile = await client.findUserById(id!); // Ensure `id` is used to fetch the correct profile
            setProfile(userProfile);
        } catch (err) {
            console.error("Error fetching profile:", err);
            setError("Failed to fetch user profile.");
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [id]);

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    if (!profile) {
        return <p>Loading profile...</p>;
    }

    return (
        <div>
            <Navigation />
            <div className="wd-profile-screen">
                <h3>Profile</h3>
                <div>
                    <p><strong>Username:</strong> {profile.username}</p>
                    <p><strong>First Name:</strong> {profile.firstName}</p>
                    <p><strong>Last Name:</strong> {profile.lastName}</p>
                    <p><strong>Date of Birth:</strong> {profile.dob}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <h4>Followed Users</h4>
                    {error && <p style={{ color: "red" }}>Error: {error}</p>}
                    {profile.followedChefs && profile.followedChefs.length > 0 ? (
                        <ul>
                            {profile.followedChefs.map((chef: any) => (
                                <li key={chef._id}>
                                    <button
                                        className="btn btn-link"
                                        onClick={() => navigate(`/users/profile/${chef._id}`)}
                                    >
                                        {chef._id}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>This user is not following anyone.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as client from "../client";
import './ProfileDetails.css';
import Navigation from "../pages/Navigation";

export default function ProfileDetails() {
    const [likedRecipes, setLikedRecipes] = useState<any[]>([]);
    const [followedChefs, setFollowedChefs] = useState<any[]>([]);
    const [profile, setProfile] = useState<any>({});
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchProfile = async () => {
        try {
            const userProfile = await client.findUserById(id!); // Ensure `id` is used to fetch the correct profile
            setProfile(userProfile);

            // Load liked recipes
            const liked = await client.getLikedRecipes(id!);
            setLikedRecipes(liked);

            // Load followed chefs
            const chefIds: string[] = await client.getFollowedChefs(id!);
            const chefDetails = await Promise.all(
                chefIds.map((chefId) => client.findUserById(chefId))
            );
            setFollowedChefs(chefDetails);
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

                    <h4>Liked Recipes</h4>
                    {likedRecipes.length > 0 ? (
                        <ul>
                            {likedRecipes.map((recipe) => (
                                <li key={recipe._id}>
                                    <button
                                        className="btn btn-link"
                                        onClick={() => navigate(`/Recipe/${recipe._id}`)}
                                    >
                                        {recipe.title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>This user has no liked recipes.</p>
                    )}

                    <h4>Followed Users</h4>
                    {followedChefs.length > 0 ? (
                        <ul>
                            {followedChefs.map((chef: any) => (
                                <li key={chef._id}>
                                    <button
                                        className="btn btn-link"
                                        onClick={() => navigate(`/users/${chef._id}`)}
                                    >
                                        {chef.firstName} {chef.lastName} ({chef.username})
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

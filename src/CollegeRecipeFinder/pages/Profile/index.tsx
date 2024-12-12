import { useState, useEffect } from "react";
import Navigation from "../Navigation";
import { getLikedRecipes, getFollowedChefs } from "../../client";
import { useSelector } from "react-redux";
import ProfileDetails from "../../Users/Profile";

export default function Profile() {
    const [likedRecipes, setLikedRecipes] = useState<any[]>([]);
    const [followedChefs, setFollowedChefs] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    useEffect(() => {
        if (!currentUser) return; // Exit if no user is signed in

        const loadLikedRecipes = async () => {
            try {
                const data: any[] = await getLikedRecipes(currentUser._id);
                setLikedRecipes(data);
            } catch (err) {
                console.error("Failed to load liked recipes.");
                setError("Unable to load liked recipes.");
            }
        };

        const loadFollowedChefs = async () => {
            try {
                const data: any[] = await getFollowedChefs(currentUser._id);
                setFollowedChefs(data);
            } catch (err) {
                console.error("Failed to load followed chefs.");
                setError("Unable to load followed chefs.");
            }
        };

        loadLikedRecipes();
        loadFollowedChefs();
    }, [currentUser]);

    if (!currentUser) {
        return (
            <div>
                <Navigation />
                <div className="container mt-4">
                    <h1 className="text-center mb-4">Profile</h1>
                    <p className="text-center text-danger">
                        No user is signed in. Please sign in to view your profile.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navigation />
            <div className="container mt-4">
                <h1 className="text-center mb-4">Profile</h1>
                <ProfileDetails />

                <div>
                    <h2 className="mb-3">Followed Chefs</h2>
                    {error && (
                        <p className="text-danger">
                            {error}
                        </p>
                    )}
                    {!error && followedChefs.length === 0 && (
                        <p>You are not following any chefs yet!</p>
                    )}
                    {!error && followedChefs.length > 0 && (
                        <ul className="list-group">
                            {followedChefs.map((chef: any) => (
                                <li key={chef._id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>
                                        {chef.firstName} {chef.lastName}
                                    </span>
                                    <button
                                        className="btn btn-outline-primary"
                                        onClick={() => window.location.href = `/users/${chef._id}`}
                                    >
                                        View Profile
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

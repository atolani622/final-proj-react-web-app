import { useState, useEffect } from "react";
import Navigation from "../Navigation";
import { getLikedRecipes, getFollowedChefs, findUserById } from "../../client"; // Import the function to fetch user details
import { useSelector } from "react-redux";
import ProfileDetails from "../../Users/Profile";

export default function Profile() {
    const [likedRecipes, setLikedRecipes] = useState<any[]>([]);
    const [followedChefs, setFollowedChefs] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    useEffect(() => {
        if (!currentUser) return;

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
                const chefIds: string[] = await getFollowedChefs(currentUser._id); // Fetch the array of IDs
                const chefDetails = await Promise.all(
                    chefIds.map((id) => findUserById(id)) // Fetch each chef's details
                );
                setFollowedChefs(chefDetails);
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
                <div className="mt-4">
                    <h3>Liked Recipes</h3>
                    {likedRecipes.length > 0 ? (
                        <ul>
                            {likedRecipes.map((recipe) => (
                                <li key={recipe._id}>{recipe.title}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>You have no liked recipes yet.</p>
                    )}
                </div>
                <div className="mt-4">
                    <h3>Followed Chefs</h3>
                    {followedChefs.length > 0 ? (
                        <ul>
                            {followedChefs.map((chef) => (
                                <li key={chef._id}>
                                    {chef.firstName} {chef.lastName} ({chef.username})
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>You are not following anyone yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

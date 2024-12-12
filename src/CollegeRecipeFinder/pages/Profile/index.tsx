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
    }, [currentUser._id]);

    return (
        <div>
            <Navigation />
            <h1>Profile</h1>
            <ProfileDetails />

            <div>
                <h2>Your Liked Recipes</h2>
                {error && <p style={{ color: "red" }}>Error: {error}</p>}
                {!error && likedRecipes.length === 0 && <p>No liked recipes yet!</p>}
                <ul>
                    {likedRecipes.map((recipe) => (
                        <li key={recipe._id}>
                            <h3>{recipe.title}</h3>
                            <p>{recipe.description}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h2>Your Followed Chefs</h2>
                {error && <p style={{ color: "red" }}>Error: {error}</p>}
                {!error && followedChefs.length === 0 && <p>You are not following any chefs yet!</p>}
                <ul>
                    {followedChefs.map((chef) => (
                        <li key={chef}>
                            <h3>{chef}</h3>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

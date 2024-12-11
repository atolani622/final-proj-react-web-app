import { useState, useEffect } from "react";
import ProfileDetails from "../../Users/Profile";
import Navigation from "../Navigation";
import { getLikedRecipes } from "../../client";
import { setCurrentUser } from "../../Users/reducer";
import { useSelector } from "react-redux";

export default function Profile() {

    const [likedRecipes, setLikedRecipes] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    useEffect(() => {
        const loadLikedRecipes = async () => {
            try {
                const data: any[] = await getLikedRecipes(currentUser._id); // Pass user ID to API
                setLikedRecipes(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load liked recipes.");
            }
        };
    
        loadLikedRecipes();
    }, [currentUser._id]);
    return (
        <div>
            <Navigation />
            <h1>Profile</h1>
            <ProfileDetails />
            <div>
                <h1>Your Liked Recipes</h1>
                {error && <p style={{ color: "red" }}>Error: {error}</p>}
                {!error && likedRecipes.length === 0 && <p>No liked recipes yet!</p>}
                <ul>
                    {likedRecipes.map((recipe) => (
                        <li key={recipe}>
                            <h2>{recipe.title}</h2>
                            <p>{recipe.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
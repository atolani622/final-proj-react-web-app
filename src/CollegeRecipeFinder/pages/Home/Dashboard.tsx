import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../Navigation";
import { getLikedRecipes, getFollowedChefs } from "../../client";
import { useSelector } from "react-redux";
import "./Home.css";

export default function MyDashboard() {
    const [likedRecipes, setLikedRecipes] = useState<any[]>([]);
    const [followedChefs, setFollowedChefs] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: any) => state.accountReducer); // Get current user from Redux

    useEffect(() => {
        if (!currentUser) {
            setError("User is not logged in. Please log in to view your dashboard.");
            return;
        }

        const loadLikedRecipes = async () => {
            try {
                console.log("Fetching liked recipes for user:", currentUser._id);
                const data = await getLikedRecipes(currentUser._id); // Fetch full recipe details
                console.log("Liked recipes fetched:", data);
                setLikedRecipes(data); // Set recipes in state
            } catch (err) {
                console.error("Failed to load liked recipes:");
                setError("Unable to load liked recipes.");
            }
        };

        loadLikedRecipes();
    }, [currentUser]);

    const handleRecipeClick = (recipeId: string) => {
        navigate(`/Recipe/${recipeId}`); // Navigate to the recipe detail page
    };

    return (
        <div>
            <Navigation />
            <div className="container mt-4">
                <h1 className="text-center mb-4">Your Dashboard</h1>
                {error && <p className="text-danger text-center">{error}</p>}

                <div className="row mb-5">
                    <h2 className="mb-4">Liked Recipes</h2>
                    {!error && likedRecipes.length === 0 && <p>No liked recipes yet!</p>}
                    {likedRecipes.map((recipe) => (
                        <div key={recipe.id} className="col-md-6 mb-4">
                            <div className="card h-100">
                                <img
                                    src={recipe.image}
                                    alt={recipe.title}
                                    className="card-img-top"
                                />
                                <div className="card-body">
                                    <h3
                                        className="card-title text-primary"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleRecipeClick(recipe.id)}
                                    >
                                        {recipe.title}
                                    </h3>
                                    <p className="card-text">
                                        {recipe.summary
                                            ? recipe.summary.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 100) + "..."
                                            : "No description available."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
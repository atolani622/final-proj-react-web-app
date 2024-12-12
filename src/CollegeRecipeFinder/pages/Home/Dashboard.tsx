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

    const { currentUser } = useSelector((state: any) => state.accountReducer);

    useEffect(() => {
        const loadLikedRecipes = async () => {
            try {
                const data = await getLikedRecipes(currentUser._id);
                setLikedRecipes(data);
            } catch (err) {
                console.error("Failed to load liked recipes.");
                setError("Unable to load liked recipes.");
            }
        };

        const loadFollowedChefs = async () => {
            try {
                const data = await getFollowedChefs(currentUser._id);
                setFollowedChefs(data);
            } catch (err) {
                console.error("Failed to load followed chefs.");
                setError("Unable to load followed chefs.");
            }
        };

        loadLikedRecipes();
        loadFollowedChefs();
    }, [currentUser._id]);

    const handleRecipeClick = (recipeId: string) => {
        navigate(`/Recipe/${recipeId}`);
    };

    return (
        <div>
            <Navigation />
            <div className="container mt-4">
                <h1 className="text-center mb-4">Your Dashboard</h1>
                {error && <p className="text-danger">Error: {error}</p>}

                <div className="row mb-5">
                    <h2 className="mb-4">Liked Recipes</h2>
                    {!error && likedRecipes.length === 0 && (
                        <p>No liked recipes yet!</p>
                    )}
                    {likedRecipes.map((recipe) => (
                        <div key={recipe._id} className="col-md-6 mb-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h3
                                        className="card-title text-primary"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleRecipeClick(recipe._id)}
                                    >
                                        {recipe.title}
                                    </h3>
                                    <p className="card-text">{recipe.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="row">
                    <h2 className="mb-4">Followed Chefs</h2>
                    {!error && followedChefs.length === 0 && (
                        <p>You are not following any chefs yet!</p>
                    )}
                    {followedChefs.map((chef) => (
                        <div key={chef} className="col-md-6 mb-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h3 className="card-title">{chef}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

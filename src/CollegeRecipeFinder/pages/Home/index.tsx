import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../Navigation";
import { getRecipes, likeRecipe, followChef } from "../../client";
import { useSelector } from "react-redux";
import "./Home.css";

export default function Home(
    { recipes, setRecipes }: {
        recipes: any[];
        setRecipes: (recipe: any) => void
    }) {
    const [error, setError] = useState(null); // State for errors
    const navigate = useNavigate();


    useEffect(() => {
        const loadRecipes = async () => {
            try {
                const data = await getRecipes();
                console.log("Fetched recipes:", data); // Debug log
                setRecipes(data.recipes || []); // Ensure it assigns an array
            } catch (err) {
                console.error("Failed to load recipes:"); // Log detailed error
            }
        };

        loadRecipes();
    }, []);

    const handleRecipeClick = (recipeId: any) => {
        navigate(`/Recipe/${recipeId}`);
    };



    return (
        <div>
            <Navigation />
            <div>
                Akshay Tolani
                <a href="https://github.com/atolani622/final-proj-react-web-app">Web App</a>
                <a href="https://github.com/atolani622/final-proj-node-server-app">Server</a>
            </div>
            <div className="container mt-4">
                <h1 className="text-center mb-4">Discover Delicious Recipes</h1>
                {error && <p className="text-danger text-center">{error}</p>}
                {!error && recipes.length === 0 && <p className="text-center">Loading recipes...</p>}
                <div className="row">
                    {recipes.map((recipe) => (
                        <div key={recipe.id} className="col-md-4 mb-4">
                            <div className="card recipe-card h-100">
                                <img
                                    src={recipe.image}
                                    alt={recipe.title}
                                    className="card-img-top"
                                />
                                <div className="card-body">
                                    <h5
                                        className="card-title"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleRecipeClick(recipe.id)}
                                    >
                                        {recipe.title}
                                    </h5>
                                    <p className="card-text">
                                        {recipe.summary
                                            ? recipe.summary.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 100) + "..."
                                            : "No description available."}
                                    </p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleRecipeClick(recipe.id)}
                                    >
                                        View Recipe
                                    </button>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

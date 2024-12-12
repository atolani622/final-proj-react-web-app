import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navigation from "../Navigation";
import "./Search.css";

export default function RecipeSearch() {
    const [query, setQuery] = useState("");
    const [recipes, setRecipes] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!query) {
            setError("Please enter a search query.");
            return;
        }

        try {
            setError(null);

        } catch (err) {
            console.error("Error searching for recipes:");
            setError("Failed to fetch search results. Please try again later.");
        }
    };

    const handleRecipeClick = (recipeId: number) => {
        navigate(`/Recipe/${recipeId}`); // Navigate to detailed recipe view
    };

    return (
        <div>
            <Navigation />
            <div className="container mt-4">
                <h1 className="text-center mb-4">Search Recipes</h1>
                <form onSubmit={handleSearch} className="mb-4">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter recipe name..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary">
                            Search
                        </button>
                    </div>
                    {error && <p className="text-danger mt-2">{error}</p>}
                </form>

                <div className="row">
                    {recipes.length === 0 && query && !error && <p className="text-center">No results found.</p>}
                    {recipes.map((recipe) => (
                        <div key={recipe.id} className="col-md-4 mb-4">
                            <div className="card h-100">
                                <img
                                    src={recipe.image}
                                    alt={recipe.title}
                                    className="card-img-top"
                                />
                                <div className="card-body">
                                    <h5
                                        className="card-title text-primary"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleRecipeClick(recipe.id)}
                                    >
                                        {recipe.title}
                                    </h5>
                                    <button
                                        className="btn btn-outline-primary"
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

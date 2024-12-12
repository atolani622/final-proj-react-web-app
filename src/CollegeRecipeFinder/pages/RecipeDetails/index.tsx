import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecipeDetails, likeRecipe } from "../../client";
import Navigation from "../Navigation";
import { useSelector } from "react-redux";

export default function RecipeDetail() {
    const { id } = useParams(); // Get the recipe ID from the URL
    const [recipe, setRecipe] = useState<any>(null); // Local state for recipe
    const [error, setError] = useState<string | null>(null);
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    useEffect(() => {
        const loadRecipe = async () => {
            try {
                const data = await getRecipeDetails(id as string); // Fetch recipe details
                console.log("Fetched recipe details:", data); // Debug log
                setRecipe(data); // Set the fetched recipe data
            } catch (err) {
                console.error("Failed to load recipe details:", err);
                setError("Failed to fetch recipe details. Please try again later.");
            }
        };

        loadRecipe();
    }, [id]); // Dependency array includes `id`

    const handleLikeRecipe = async (recipeId: string) => {
        try {
            await likeRecipe(currentUser._id, id as string);
            alert("Recipe liked successfully!");
        } catch (err) {
            console.error("Failed to like recipe:");
            alert("Unable to like recipe. Please try again.");
        }
    };

    if (error) {
        return <p className="text-danger">{error}</p>;
    }

    if (!recipe) {
        return <p>Loading recipe details...</p>;
    }

    return (
        <div>
            <Navigation />
            <div className="container mt-4">
                <h1 className="text-center">{recipe.title}</h1>
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="img-fluid rounded mx-auto d-block my-4"
                />
                <p><strong>Ready in:</strong> {recipe.readyInMinutes} minutes</p>
                <p><strong>Servings:</strong> {recipe.servings}</p>
                <h3>Ingredients</h3>
                <ul>
                    {recipe.extendedIngredients.map((ingredient: any) => (
                        <li key={ingredient.id}>{ingredient.original}</li>
                    ))}
                </ul>
                <h3>Instructions</h3>
                {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 ? (
                    <ol>
                        {recipe.analyzedInstructions[0].steps.map((step: any) => (
                            <li key={step.number}>{step.step}</li>
                        ))}
                    </ol>
                ) : (
                    <p>No instructions available.</p>
                )}
                <a
                    href={recipe.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary mt-4"
                >
                    View Full Recipe on Source
                </a>
                <button
                    className="btn btn-outline-secondary"
                    onClick={() => handleLikeRecipe(recipe)}
                >
                    Like
                </button>
            </div>
        </div>
    );
}

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navigation from "../Navigation";
import { getRecipeDetails } from "../../client";

export default function RecipeDetails() {
    const { recipeId } = useParams(); 
    const [recipe, setRecipe] = useState<any>(null); // Use `any` for recipe
    const [error, setError] = useState<string | null>(null); // Error as a string or null

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const data = await getRecipeDetails(recipeId as string);
                setRecipe(data);
            } catch (err) {
                console.error("Failed to load recipe details.", err);
                setError("Unable to load recipe details."); // Set error message
            }
        };

        fetchRecipe();
    }, [recipeId]);

    if (error) {
        return (
            <div>
                <Navigation />
                <h1>Recipe Details</h1>
                <p style={{ color: "red" }}>{error}</p>
            </div>
        );
    }

    if (!recipe) {
        return (
            <div>
                <Navigation />
                <h1>Recipe Details</h1>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div>
            <h1>{recipeId}</h1>
            <Navigation />
            <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
                <h1>{recipe.title}</h1>
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    style={{ width: "100%", borderRadius: "8px", marginBottom: "20px" }}
                />
                <p><strong>Description:</strong> {recipe.description}</p>
                <p><strong>Ingredients:</strong></p>
                <ul>
                    {recipe.ingredients && recipe.ingredients.map((ingredient: string, index: number) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
                <p><strong>Instructions:</strong></p>
                <ol>
                    {recipe.instructions && recipe.instructions.map((instruction: string, index: number) => (
                        <li key={index}>{instruction}</li>
                    ))}
                </ol>
                <p><strong>Created By:</strong> {recipe.chefName}</p>
            </div>
        </div>
    );
}

// src/components/Dashboard.js
import { useState, useEffect } from "react";
import Navigation from "../Navigation";
import { getRecipes, likeRecipe } from "../../client";
import { useSelector } from "react-redux";

export default function Dashboard(
    { recipes, setRecipes }: {
        recipes: any[];
        setRecipes: (course: any) => void
    }) {
    const [error, setError] = useState(null);


    useEffect(() => {
        const loadRecipes = async () => {
            try {
                const data = await getRecipes();
                setRecipes(data);
            } catch (err) {
                console.log("Failed to load recipes.");
            }
        };

        loadRecipes();
    }, []);
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const handleLike = async (recipeId: string) => {
        try {
            const userId = currentUser._id
            await likeRecipe(userId, recipeId);
            alert("Recipe liked!");
        } catch (err) {
            alert("Failed to like recipe. Please try again.");
        }
    };

    return (
        <div>
            <Navigation />
            <h1>Welcome to the Dashboard!</h1>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {!error && recipes.length === 0 && <p>Loading recipes...</p>}
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <h2>{recipe.title}</h2>
                        <p>{recipe.description}</p>
                        <p><strong>Type:</strong> {recipe.type}</p>
                        <p><strong>Chef:</strong> {recipe.chef}</p>
                        <button onClick={() => handleLike(recipe._id)}>Like</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
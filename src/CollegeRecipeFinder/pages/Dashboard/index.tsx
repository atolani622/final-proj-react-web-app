// src/components/Dashboard.js
import { useState, useEffect } from "react";
import Navigation from "../Navigation";
import { getRecipes } from "../../client";

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
                    </li>
                ))}
            </ul>
        </div>
    );
}

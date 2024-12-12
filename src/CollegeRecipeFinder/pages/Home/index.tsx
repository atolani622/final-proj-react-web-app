import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../Navigation";
import { getRecipes, likeRecipe, followChef } from "../../client";
import { useSelector } from "react-redux";

export default function Home(
    { recipes, setRecipes }: {
        recipes: any[];
        setRecipes: (course: any) => void
    }) {
    const [error, setError] = useState(null);
    const navigate = useNavigate();


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

    const  handleFollow = async (chefId: string) => {
        try {
            const userId = currentUser._id
            await followChef(userId, chefId);
            alert("Chef followed!");
        } catch (err) {
            alert("Failed to follow recipe. Please try again.");
        }
    };

    // Handle recipe click to navigate to recipe details page
    const handleRecipeClick = (recipeId: string) => {
        navigate(`/recipe/${recipeId}`);
    };

    return (
        <div>
            <Navigation />
            <h1>Welcome to the Dashboard!</h1>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {!error && recipes.length === 0 && <p>Loading recipes...</p>}
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe._id}>
                        <h2
                            style={{ cursor: "pointer", color: "blue" }}
                            onClick={() => handleRecipeClick(recipe._id)}
                        >
                            {recipe.title}
                        </h2>
                        <p>{recipe.description}</p>
                        <p><strong>Type:</strong> {recipe.type}</p>
                        <p><strong>Chef:</strong> {recipe.chefId}</p>
                        <button onClick={() => handleLike(recipe._id)}>Like</button>
                        <button onClick={() => handleFollow(recipe.chefId)}>Follow</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
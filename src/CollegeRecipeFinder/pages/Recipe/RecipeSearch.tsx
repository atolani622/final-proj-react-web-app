import React, { useState } from "react";
import axios from "axios";

const RecipeSearch = () => {
    const [query, setQuery] = useState("");
    const [recipes, setRecipes] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!query) return;

        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:4000/api/recipes/search`, {
                params: { query },
            });
            setRecipes(response.data);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        } finally {
            setLoading(false);
        }
    };

    function onSelectRecipe(id: any): void {
        throw new Error("Function not implemented.");
    }

    return (
        <div>
            <h2>Search Recipes</h2>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter recipe name"
            />
            <button onClick={handleSearch}>Search</button>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {recipes.map((recipe: any) => (
                        <li key={recipe.id} onClick={() => onSelectRecipe(recipe.id)}>
                            {recipe.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RecipeSearch;

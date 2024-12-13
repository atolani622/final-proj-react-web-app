import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecipeDetails, likeRecipe, getReviewsForRecipe, saveReview } from "../../client";
import Navigation from "../Navigation";
import { useSelector } from "react-redux";

export default function RecipeDetail() {
    const { id } = useParams<{ id: string }>();
    const [recipe, setRecipe] = useState<any | null>(null);
    const [reviews, setReviews] = useState<any[]>([]);
    const [newReview, setNewReview] = useState({ rating: 1, comment: "" });
    const [error, setError] = useState<string | null>(null);
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    useEffect(() => {
        const loadRecipe = async () => {
            try {
                if (!id) {
                    setError("Recipe ID is missing.");
                    return;
                }
                const data = await getRecipeDetails(id);
                setRecipe(data);
            } catch (err) {
                console.error("Failed to load recipe details:", err);
                setError("Failed to fetch recipe details. Please try again later.");
            }
        };

        const loadReviews = async () => {
            try {
                if (!id) return;
                const data = await getReviewsForRecipe(id);
                setReviews(data);
            } catch (err) {
                console.error("Failed to load reviews:", err);
            }
        };

        loadRecipe();
        loadReviews();
    }, [id]);

    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentUser) {
            alert("You must be logged in to submit a review.");
            return;
        }

        try {
            const review = {
                recipeId: id as string,
                userId: currentUser._id,
                rating: newReview.rating,
                comment: newReview.comment,
            };

            const savedReview = await saveReview(review);
            setReviews((prev) => [savedReview, ...prev]);
            setNewReview({ rating: 1, comment: "" });
        } catch (err) {
            console.error("Failed to submit review:", err);
            alert("Failed to submit review. Please try again.");
        }
    };

    const handleLikeRecipe = async () => {
        if (!currentUser) {
            alert("You must be logged in to like a recipe.");
            return;
        }

        try {
            await likeRecipe(currentUser._id, id as string);
            alert("Recipe liked successfully!");
        } catch (err) {
            console.error("Failed to like recipe:", err);
            alert("Unable to like recipe. Please try again.");
        }
    };

    if (error) {
        return (
            <div>
                <Navigation />
                <div className="container mt-4">
                    <p className="text-danger">{error}</p>
                </div>
            </div>
        );
    }

    if (!recipe) {
        return (
            <div>
                <Navigation />
                <div className="container mt-4">
                    <p>Loading recipe details...</p>
                </div>
            </div>
        );
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
                    onClick={handleLikeRecipe}
                >
                    Like
                </button>

                <div className="mt-4">
                    <h3>Reviews</h3>
                    {reviews.length > 0 ? (
                        <ul>
                            {reviews.map((review) => (
                                <li key={review._id}>
                                    <p>
                                        <strong>{review.userId.username}</strong> ({review.rating}/5):
                                    </p>
                                    <p>{review.comment}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No reviews yet. Be the first to review!</p>
                    )}

                    {currentUser && (
                        <form onSubmit={handleReviewSubmit} className="mt-4">
                            <div>
                                <label>Rating:</label>
                                <select
                                    value={newReview.rating}
                                    onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                                >
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <option key={value} value={value}>
                                            {value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label>Comment:</label>
                                <textarea
                                    value={newReview.comment}
                                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="btn btn-success mt-2">
                                Submit Review
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

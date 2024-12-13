import React, { useState } from "react";

interface ReviewFormProps {
    recipeId: string; // Type of recipeId
    onReviewSubmit: (review: { recipeId: string; rating: number; comment: string }) => void; // Type of onReviewSubmit
}

export default function ReviewForm({ recipeId, onReviewSubmit }: ReviewFormProps) {
    const [rating, setRating] = useState<number>(1);
    const [comment, setComment] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onReviewSubmit({ recipeId, rating, comment });
        setRating(1); // Reset rating
        setComment(""); // Reset comment
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Rating:</label>
                <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                    {[1, 2, 3, 4, 5].map((value) => (
                        <option key={value} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Comment:</label>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
            </div>
            <button type="submit">Submit Review</button>
        </form>
    );
}

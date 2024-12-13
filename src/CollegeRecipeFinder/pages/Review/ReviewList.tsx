export default function ReviewsList({ reviews }: { reviews: any[] }) {
    return (
        <div>
            <h3>Reviews</h3>
            {reviews.length > 0 ? (
                <ul>
                    {reviews.map((review) => (
                        <li key={review._id}>
                            <p><strong>{review.userId.username}</strong> ({review.rating}/5)</p>
                            <p>{review.comment}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reviews yet. Be the first to review!</p>
            )}
        </div>
    );
}

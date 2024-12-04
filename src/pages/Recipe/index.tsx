import { useParams, useNavigate } from "react-router-dom";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const recipe = {
    id: id,
    image: "https://via.placeholder.com/600",
    title: "Recipe Title",
    description: "Full recipe description goes here.",
    chef: "Chef Name",
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate(-1)}>
        Back
      </button>
      <div className="card shadow">
        <img src={recipe.image} className="card-img-top" alt={recipe.title} />
        <div className="card-body">
          <h2 className="card-title">{recipe.title}</h2>
          <p className="card-text">{recipe.description}</p>
          <p className="text-muted">By: 
            <button 
              className="btn btn-link p-0"
              onClick={() => navigate(`/chef/${recipe.chef}`)}>
              {recipe.chef}
            </button>
          </p>
        </div>
        <div className="card-footer">
          <h5>Comments & Ratings</h5>
          <p>Feature to be added later</p>
        </div>
      </div>
    </div>
  );
}

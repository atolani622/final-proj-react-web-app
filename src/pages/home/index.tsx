import { useNavigate } from "react-router-dom";
import './home.css';

const recipes = [
  {
    id: 1,
    image: "https://via.placeholder.com/300",
    title: "Spaghetti Carbonara",
    description: "A classic Italian pasta dish with creamy sauce.",
    chef: "Chef Mario",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/300",
    title: "Vegan Buddha Bowl",
    description: "A healthy bowl with quinoa, veggies, and tahini sauce.",
    chef: "Chef Alice",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/300",
    title: "Chocolate Cake",
    description: "Rich and moist chocolate cake for dessert lovers.",
    chef: "Chef Olivia",
  },
  // Add more hardcoded recipes here
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Welcome to CollegeRecipeFinder!</h1>
      <p className="text-center mb-5">Explore popular recipes and find your favorites!</p>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {recipes.map((recipe) => (
          <div className="col" key={recipe.id}>
            <div className="card h-100 shadow">
              <div className="position-relative">
                <img
                  src={recipe.image}
                  className="card-img-top"
                  alt={recipe.title}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <button
                  className="btn btn-sm btn-outline-danger position-absolute top-0 end-0 m-2"
                  onClick={() => alert("Favorited!")}
                >
                  ♥
                </button>
              </div>
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">{recipe.description}</p>
                <p className="text-muted">By: {recipe.chef}</p>
              </div>
              <div className="card-footer text-center">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/CollegeRecipeFinder/Recipes/${recipe.id}/${recipe.title}`)}
                >
                  View Recipe
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import './home.css';
import Signin from "../../users/SignIn";

export default function Home() {
  return (
    <div className="main-mt-3">
      <div className="main-content">
        <div className="main-title">Welcome to CollegeRecipeFinder!</div>
        <div className="main-description mb-3">
          <div>Save lists of recipes you've liked.</div>
          <div>See other people's favorite recipes</div>
          <div>Create a network of chefs!</div>
          <div>Build recipes to share with your friends</div>
        </div>
      </div>
      <Signin />
    </div>
  );
}

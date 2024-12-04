import './home.css'

export default function Home() {
    return (
        <div className="home-container-mt-3" >
            <div className="not-logged-in-content">
                <div className='home-title'>Welcome to RecipeFinder! </div>
                <div className="page-description mb-3">
                    <div>Save lists of recipes you've liked.</div>
                    <div>See other people's favorite recipes</div>
                    <div>Create a network of chefs!</div>
                    <div>Build recipes to share with your friends</div>
                </div>
            </div>
        </div>
    );
}
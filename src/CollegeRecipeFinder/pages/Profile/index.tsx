import Account from "../../Users/Account";
import ProfileDetails from "../../Users/Profile";
import Navigation from "../Navigation";

export default function Profile() {
    return (
        <div>
            <Navigation />
            <h1>Profile</h1>
            <ProfileDetails />
        </div>
    )
}
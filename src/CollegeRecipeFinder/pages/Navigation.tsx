import { Link, useLocation } from "react-router-dom";
export default function Navigation() {
    const { pathname } = useLocation();
    return (
        <nav className="nav nav-tabs mt-2">
            <Link to="/Home" className={`nav-link ${pathname.includes("home") ? "active" : ""}`}>
                Home
            </Link>
            <Link to="/Login" className={`nav-link ${pathname.includes("login") ? "active" : ""}`}>
                Login
            </Link>
            <Link to="/Profile" className={`nav-link ${pathname.includes("profile") ? "active" : ""}`}>
                Profile
            </Link>
            <Link to="/Search" className={`nav-link ${pathname.includes("search") ? "active" : ""}`}>
                Search
            </Link>
            <Link to="/Details" className={`nav-link ${pathname.includes("details") ? "active" : ""}`}>
                Details
            </Link>
            <Link to="/Recipe" className={`nav-link ${pathname.includes("recipe") ? "active" : ""}`}>
                Recipe
            </Link>
        </nav>
    );
}
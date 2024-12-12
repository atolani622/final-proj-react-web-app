import UserTable from "../../Users/Table";
import Navigation from "../Navigation";

export default function Details() {
    return (
        <div>
            <Navigation />
            <h1>Table</h1>
            <UserTable />
        </div>
    )
}
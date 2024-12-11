import { Routes, Route, Navigate } from "react-router"
import Signin from "./Signin";
import Signup from "./SignUp";
import Profile from "../pages/Profile/index"
import { useSelector } from "react-redux";
import UserTable from "./Table";


export default function Account() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    return (
        <div id="wd-account-screen">
            <table>
                <tr>
                    <td valign="top">
                    <Routes>
                        <Route path="/" element={<Navigate to={ currentUser ? "/Profile" : "/SignIn"} />} />
                        <Route path="/Signin" element={<Signin />} />
                        <Route path="/Profile" element={<Profile />} />
                        <Route path="/Signup" element={<Signup />} />
                        <Route path="/Users" element={<UserTable />} />
                        <Route path="/Users/:uid" element={<UserTable />} />
                    </Routes>
                </td>
            </tr>
        </table>
    </div >
  );
}

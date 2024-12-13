import React, { useState, useEffect } from "react";
import * as client from "../client";
import { BsFillCheckCircleFill, BsPencil, BsPlusCircleFill, BsTrash3Fill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function UserTable() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({ username: "", password: "", role: "USER" });
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    // Fetch the current logged-in user's details
    const fetchCurrentUser = async () => {
        try {
            const user = await client.profile();
            setCurrentUser(user);
        } catch (err) {
            console.log(err);
        }
    };

    const handleFollow = async (chefId) => {
        try {
            const userId = currentUser?._id; // Use optional chaining for null safety
            if (!userId) throw new Error("No current user logged in.");
            await client.followChef(userId, chefId);
            alert("User followed successfully!");
        } catch (err) {
            alert("Failed to follow user. Please try again.");
        }
    };

    const viewUserProfile = (userId) => {
        navigate(`/Users/${userId}`);
    };

    // Create a new user
    const createUser = async () => {
        try {
            const newUser = await client.createUser(user);
            setUsers([newUser, ...users]);
        } catch (err) {
            console.error("Error creating user:", err);
        }
    };

    // Select a user for editing
    const selectUser = async (user) => {
        try {
            const u = await client.findUserById(user._id);
            setUser(u);
        } catch (err) {
            console.error("Error selecting user:", err);
        }
    };

    // Update user details
    const updateUser = async () => {
        try {
            const status = await client.updateUser(user);
            setUsers(users.map((u) => (u._id === user._id ? user : u)));
        } catch (err) {
            console.error("Error updating user:", err);
        }
    };

    // Fetch all users
    const fetchUsers = async () => {
        try {
            const users = await client.findAllUsers();
            setUsers(users);
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };

    // Delete a user
    const deleteUser = async (user) => {
        try {
            await client.deleteUser(user._id);
            setUsers(users.filter((u) => u._id !== user._id));
        } catch (err) {
            console.error("Error deleting user:", err);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchCurrentUser();
    }, []);

    return (
        <div>
            <h1>User List</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Actions</th>
                    </tr>
                    {currentUser?.role === "ADMIN" && (
                        <tr>
                            <td>
                                <input
                                    value={user.password}
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                />
                                <input
                                    value={user.username}
                                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                                />
                            </td>
                            <td>
                                <input
                                    value={user.firstName}
                                    onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                                />
                            </td>
                            <td>
                                <input
                                    value={user.lastName}
                                    onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                                />
                            </td>
                            <td>
                                <select value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })}>
                                    <option value="USER">User</option>
                                    <option value="ADMIN">Admin</option>
                                </select>
                            </td>
                            <td>
                                <BsPlusCircleFill onClick={createUser} />
                                <BsFillCheckCircleFill onClick={updateUser} className="me-2 text-success fs-1" />
                            </td>
                        </tr>
                    )}
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => viewUserProfile(user._id)}>
                                    View Profile
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-success" onClick={() => handleFollow(user._id)}>
                                    Follow
                                </button>
                            </td>
                            {currentUser?.role === "ADMIN" && (
                                <>
                                    <td>
                                        <button onClick={() => deleteUser(user)}>
                                            <BsTrash3Fill />
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-warning me-2">
                                            <BsPencil onClick={() => selectUser(user)} />
                                        </button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserTable;

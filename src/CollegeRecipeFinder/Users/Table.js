import React, { useState, useEffect } from "react";
import * as client from "../client";
import { BsFillCheckCircleFill, BsPencil, BsPlusCircleFill, BsTrash3Fill } from "react-icons/bs";


function UserTable() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({ username: "", password: "", role: "USER" });
    const [currentUser, setCurrentUser] = useState(null);

    // Fetch the current logged-in user's details
    const fetchCurrentUser = async () => {
        try {
            const user = await client.profile();
            setCurrentUser(user);
        } catch (err) {
            console.log(err);
        }
    };

    // Create a new user
    const createUser = async () => {
        const newUser = await client.createUser(user);
        setUsers([newUser, ...users]);
    };

    // Select a user for editing
    const selectUser = async (user) => {
        const u = await client.findUserById(user._id);
        setUser(u);
    };

    // Update user details
    const updateUser = async () => {
        const status = await client.updateUser(user);
        setUsers(users.map((u) => (u._id === user._id ? user : u)));
    };

    // Fetch all users
    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };

    // Delete a user
    const deleteUser = async (user) => {
        await client.deleteUser(user._id);
        setUsers(users.filter((u) => u._id !== user._id));
    };

    useEffect(() => {
        fetchUsers();
        fetchCurrentUser();
    }, []);

    if (!currentUser || currentUser.role !== "ADMIN") {
        return <p>You do not have permission to view this page.</p>;
    }

    return (
        <div>
            <h1>User List</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
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
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserTable;
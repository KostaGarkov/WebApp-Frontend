import { useState } from "react";
import http from "../api/http";

export default function UserCreate() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await http.post("/user", {
            username,
            email,
            passwordHash: "test123"
        });

        setUsername("");
        setEmail("");

        alert("User created!");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create User</h2>

            <div>
                <label>Username:</label>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div>
                <label>Email:</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <button type="submit">Create</button>
        </form>
    );
}

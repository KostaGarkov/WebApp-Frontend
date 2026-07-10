import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UserEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        age: ""
    });

    useEffect(() => {
        fetch(`https://localhost:7000/api/users/${id}`)
            .then(res => res.json())
            .then(data => setUser(data));
    }, [id]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        fetch(`https://localhost:7000/api/users/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }).then(() => navigate("/settings/users"));
    }

    return (
        <div>
            <h2>Edit User</h2>

            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input name="name" value={user.name} onChange={handleChange} />

                <label>Email</label>
                <input name="email" value={user.email} onChange={handleChange} />

                <label>Age</label>
                <input name="age" value={user.age} onChange={handleChange} />

                <button type="submit">Save</button>
            </form>
        </div>
    );
}

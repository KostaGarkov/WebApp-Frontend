import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_CONFIG } from "../config";

export default function RoleCreate() {
    const navigate = useNavigate();

    const [bgName, setBgName] = useState("");
    const [enName, setEnName] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const body = {
            translations: [
                { language: "bg", name: bgName },
                { language: "en", name: enName }
            ]
        };

        fetch(`${APP_CONFIG.apiBaseUrl}/role`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })
            .then(r => r.json())
            .then(() => navigate("/roles"));
    }

    return (
        <div>
            <h2>Create Role</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Име (BG):</label>
                    <input
                        value={bgName}
                        onChange={e => setBgName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Name (EN):</label>
                    <input
                        value={enName}
                        onChange={e => setEnName(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Save</button>
            </form>
        </div>
    );
}
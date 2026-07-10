import { useEffect, useState } from "react";
import { userApi, User } from "../api/userApi";
import { useLang } from "../i18n/LanguageContext";

export default function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const { t } = useLang();

    useEffect(() => {
        userApi.getAll().then(setUsers);
    }, []);

    return (
        <div>
            <h2>{t("users")}</h2>
            <ul>
                {users.map(u => (
                    <li key={u.id}>
                        {u.name} — {u.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}
    
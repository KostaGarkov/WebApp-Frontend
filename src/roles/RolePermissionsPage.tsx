import { useEffect, useState } from "react";
import { fetchRolePermissions } from "../api/permissions";
import { fetchRoles } from "../api/roles";
import PermissionTree from "../components/permissions/PermissionTree";
import { useLang } from "../i18n/LanguageContext";

export default function RolePermissionsPage() {
    const [roles, setRoles] = useState<{ id: number; nameBg: string; nameEn: string }[]>([]);
    const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
    const [rolePermissions, setRolePermissions] = useState<number[]>([]);
    const [localPermissions, setLocalPermissions] = useState<number[]>([]);
    const { t, lang } = useLang();

    useEffect(() => {
        fetchRoles().then(allRoles => {
            const filtered = allRoles.filter(r => r.roleCode !== "Administrator");
            setRoles(filtered);
        });
    }, []);

    useEffect(() => {
        if (!selectedRoleId) return;
        fetchRolePermissions(selectedRoleId)
            .then(data => {
                setRolePermissions(data);
                setLocalPermissions(data);
            })
            .catch(err => console.error("Failed to load role permissions", err));
    }, [selectedRoleId]);

    const togglePermission = (id: number) => {
        setLocalPermissions(prev =>
            prev.includes(id)
                ? prev.filter(x => x !== id)
                : [...prev, id]
        );
    };

    return (
        <div style={{ display: "flex", gap: 24, padding: 24 }}>
            {/* Лява колона — списък с роли */}
            <div style={{ width: "250px" }}>
                <h3>{t("roles")}</h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {roles.map(role => (
                        <li
                            key={role.id}
                            style={{
                                padding: "6px 10px",
                                cursor: "pointer",
                                backgroundColor: selectedRoleId === role.id ? "#d0e7ff" : "transparent",
                                borderRadius: "4px",
                            }}
                            onClick={() => setSelectedRoleId(role.id)}
                        >
                            {lang==="bg" ? role.nameBg : role.nameEn}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Дясна колона — дърво с permissions */}
            <div style={{ flex: 1 }}>
                {selectedRoleId ? (
                    <>
                        <h3>{t("rolePermissions")}</h3>
                        <PermissionTree
                            rolePermissions={localPermissions}
                            onTogglePermission={togglePermission}
                        />
                    </>
                ) : (
                    <h4>{t("selectRoleFromList")}</h4>
                )}
            </div>
        </div>
    );
}
import { useEffect, useState } from "react";
import RolePermissionTree from "../components/permissions/RolePermissionTree";
import { APP_CONFIG } from "../config";

interface RoleDto {
  id: number;
  name?: string;
  translations?: { name?: string }[];
}

export default function RolePermissionsPage() {
  const [roles, setRoles] = useState<RoleDto[]>([]);
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${APP_CONFIG.apiBaseUrl}/role`)
      .then((res) => res.json())
      .then((data) => {
        // RoleController връща { data, totalCount }
        setRoles(data.data);
      });
  }, []);

  return (
    <div style={{ display: "flex", gap: 24, padding: 24 }}>
      <div style={{ minWidth: 220 }}>
        <h3>Роли</h3>
        {roles.map((r) => {
          const label =
            r.translations?.[0]?.name ??
            r.name ??
            `Role #${r.id}`;

          return (
            <div
              key={r.id}
              style={{
                padding: "6px 10px",
                marginBottom: 4,
                borderRadius: 4,
                cursor: "pointer",
                background:
                  selectedRoleId === r.id ? "#e0f2ff" : "transparent",
                border:
                  selectedRoleId === r.id ? "1px solid #1976d2" : "1px solid #ddd"
              }}
              onClick={() => setSelectedRoleId(r.id)}
            >
              {label}
            </div>
          );
        })}
      </div>

      <div style={{ flex: 1 }}>
        {selectedRoleId ? (
          <>
            <h3>Права на ролята</h3>
            <RolePermissionTree roleId={selectedRoleId} />
          </>
        ) : (
          <p>Избери роля от списъка.</p>
        )}
      </div>
    </div>
  );
}
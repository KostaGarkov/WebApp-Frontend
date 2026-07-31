import { useState } from "react";
import PermissionList from "../../components/permissions/PermissionList";
import PermissionForm from "../../components/permissions/PermissionForm";
import PermissionTree from "../../components/permissions/PermissionTree";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function PermissionsPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [refresh, setRefresh] = useState(false);

  const handleSaved = () => {
    setRefresh(!refresh); // презарежда таблицата
    setSelectedId(null);  // затваря формата
  };

  return (
    <Box sx={{ display: "flex", gap: 4, padding: 3 }}>
      {/* Лява част: таблица */}
      <Box sx={{ flex: 2 }}>
        <PermissionList
          refresh={refresh}
          onEdit={(id) => setSelectedId(id)}
        />

        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => setSelectedId(null)}
        >
          Добави Permission
        </Button>
      </Box>

      {/* Дясна част: форма */}
      <Box sx={{ flex: 1 }}>
        <PermissionForm id={selectedId ?? undefined} onSaved={handleSaved} />
      </Box>

      {/* Дърво */}
      <Box sx={{ flex: 1 }}>
        <PermissionTree />
      </Box>
    </Box>
  );
}
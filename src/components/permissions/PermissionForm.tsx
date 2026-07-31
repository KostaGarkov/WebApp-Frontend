import { useEffect, useState } from "react";
import { TextField, Button, MenuItem, Box } from "@mui/material";

interface PermissionFormProps {
  id?: number; // ако има id → Update, иначе Create
  onSaved?: () => void; // callback след запис
}

interface PermissionDto {
  id: number;
  key: string;
  nameBg: string;
  nameEn: string;
  elementTypeId: number;
  stateId: number;
  parentId: number | null;
  order: number;
}

export default function PermissionForm({ id, onSaved }: PermissionFormProps) {
  const [model, setModel] = useState<PermissionDto>({
    id: 0,
    key: "",
    nameBg: "",
    nameEn: "",
    elementTypeId: 1,
    stateId: 1,
    parentId: null,
    order: 1,
  });

  // Load existing permission for edit
  useEffect(() => {
    if (!id) return;

    fetch(`/api/permissions/${id}`)
      .then((res) => res.json())
      .then((data) => setModel(data));
  }, [id]);

  const handleChange = (field: keyof PermissionDto, value: any) => {
    setModel((prev) => ({ ...prev, [field]: value }));
  };

  const save = () => {
    const method = id ? "PUT" : "POST";
    const url = id ? `/api/permissions/${id}` : "/api/permissions";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(model),
    }).then(() => {
      if (onSaved) onSaved();
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: 400 }}>
      <TextField
        label="Key"
        value={model.key}
        onChange={(e) => handleChange("key", e.target.value)}
      />

      <TextField
        label="Име (BG)"
        value={model.nameBg}
        onChange={(e) => handleChange("nameBg", e.target.value)}
      />

      <TextField
        label="Name (EN)"
        value={model.nameEn}
        onChange={(e) => handleChange("nameEn", e.target.value)}
      />

      <TextField
        label="Element Type"
        type="number"
        value={model.elementTypeId}
        onChange={(e) => handleChange("elementTypeId", Number(e.target.value))}
      />

      <TextField
        label="State"
        type="number"
        value={model.stateId}
        onChange={(e) => handleChange("stateId", Number(e.target.value))}
      />

      <TextField
        label="Parent ID"
        type="number"
        value={model.parentId ?? ""}
        onChange={(e) =>
          handleChange("parentId", e.target.value ? Number(e.target.value) : null)
        }
      />

      <TextField
        label="Order"
        type="number"
        value={model.order}
        onChange={(e) => handleChange("order", Number(e.target.value))}
      />

      <Button variant="contained" onClick={save}>
        {id ? "Update" : "Create"}
      </Button>
    </Box>
  );
}

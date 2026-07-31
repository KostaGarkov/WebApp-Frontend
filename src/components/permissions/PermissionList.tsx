import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";

interface PermissionGetDto {
  id: number;
  key: string;
  nameBg: string;
  nameEn: string;
  elementTypeId: number;
  stateId: number;
  parentId: number | null;
  order: number;
}

interface PermissionListProps {
  refresh: boolean;
  onEdit: (id: number) => void;
}

interface PermissionListProps {
  refresh: boolean;
  onEdit: (id: number) => void;
}

export default function PermissionList({ refresh, onEdit }: PermissionListProps) {
  const [rows, setRows] = useState<PermissionGetDto[]>([]);

  useEffect(() => {
    fetch("/api/permissions")
      .then((res) => res.json())
      .then((data) => setRows(data));
  }, [refresh]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "key", headerName: "Key", width: 200 },
    { field: "nameBg", headerName: "Име (BG)", width: 200 },
    { field: "nameEn", headerName: "Name (EN)", width: 200 },
    { field: "elementTypeId", headerName: "Type", width: 100 },
    { field: "stateId", headerName: "State", width: 100 },
    { field: "parentId", headerName: "Parent", width: 100 },
    { field: "order", headerName: "Order", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => onEdit(params.row.id)}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: 600 }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
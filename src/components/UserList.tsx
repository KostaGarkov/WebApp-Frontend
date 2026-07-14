import { useEffect, useState } from "react";
import { useLang } from "../i18n/LanguageContext";
import { GridColDef } from "@mui/x-data-grid";
import { userApi, User } from "../api/userApi";
import { AppDataGrid } from "../components/common/AppDataGrid";
import { useWindowHeight } from "../hooks/useWindowHeight";
import { APP_CONFIG } from "../config";
import { AddButton } from '../components/buttons/AddButton';
import { EditButton } from '../components/buttons/EditButton';
import { DeleteButton } from '../components/buttons/DeleteButton';
import { Box } from '@mui/material';
import { GridRowSelectionModel } from "@mui/x-data-grid";

export default function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const { t, lang } = useLang();
    const browserHeight = useWindowHeight();
    const [selectedIds, setSelectedIds] = useState<GridRowSelectionModel>({
        type: "include",
        ids: new Set<string | number>(),
    });
    const [selectedId, setSelectedId] = useState<string | number | null>(null);

    const columns: GridColDef[] = [
        {
            field: lang === "bg" ? "firstNameCyr" : "firstNameLat",
            headerName: t("firstName"),
            width: 200
        },
        {
            field: lang === "bg" ? "lastNameCyr" : "lastNameLat",
            headerName: t("lastName"),
            width: 200
        },
        { field: "email", headerName: t("email"), width: 250 },
        { field: "phone", headerName: t("phone"), width: 150 },
        { field: "isActive", headerName: t("active"), width: 120, type: "boolean" }
    ];


    useEffect(() => {
    userApi.getAll()
        .then((data) => {
            console.log("USERS FROM API:", data);
            setUsers(data);
        })
        .catch((err) => {
            console.error("Error loading users", err);
        });
    }, []);

    const handleAdd = () => {
        console.log("Добавяне на потребител");
    };

    const handleEdit = () => {
        console.log("Редакция на потребител");
    };

    const handleDelete = () => {
        console.log("Изтриване на потребител");
    };

    const refreshGrid = () => {
        userApi.getAll().then(setUsers);
    };
    
    return (
        <div>
            <Box sx={{ ml: 2 }}>
                <h2>{t("users")}</h2>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 0.5, ml: 2 }}>
                <AddButton onClick={handleAdd} />
                <EditButton onClick={handleEdit} disabled={!selectedId} />
                <DeleteButton onClick={handleDelete} disabled={!selectedId} />
            </Box>

            <AppDataGrid
                checkboxSelection
                rows={users}
                columns={columns}
                getRowId={(row) => row.id}
                height={browserHeight*APP_CONFIG.factorGridHeight}
                rowSelectionModel={selectedIds}
                onRowSelectionModelChange={(model: GridRowSelectionModel) => {
                    setSelectedIds(model);
                    const firstId = model.ids.size > 0 ? Array.from(model.ids)[0] : null;
                    setSelectedId(firstId);
                }}
                onRefresh={refreshGrid}
            />
        </div>
    );
}

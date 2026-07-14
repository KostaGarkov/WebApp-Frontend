import { useEffect, useState } from "react";
import { useLang } from "../i18n/LanguageContext";
import { GridColDef } from "@mui/x-data-grid";
import { AppDataGrid } from "../components/common/AppDataGrid";
import { useWindowHeight } from "../hooks/useWindowHeight";
import { APP_CONFIG } from "../config";
import { roleApi, Role } from "../api/roleApi";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { AddButton } from '../components/buttons/AddButton';
import { EditButton } from '../components/buttons/EditButton';
import { DeleteButton } from '../components/buttons/DeleteButton';
import { Box } from '@mui/material';

export default function RoleList() {
    const { lang, t } = useLang();
    const browserHeight = useWindowHeight();
    const [roles, setRoles] = useState<Role[]>([]);
    const [selectedIds, setSelectedIds] = useState<GridRowSelectionModel>({
        type: "include",
        ids: new Set<string | number>(),
    });
     const [selectedId, setSelectedId] = useState<string | number | null>(null);

    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "ID",
            width: 100
        },
        {
            field: "nameDisplay",
            headerName: t("name"),
            width: 300,
            sortable: false,
            filterable: false,
            renderCell: (params: any) => {
                const row = params.row;
                if (!row || !row.translations) return "";

                const targetLang = lang === "bg" ? "bg" : "en";
                const entry = row.translations.find((t: any) => t.language === targetLang);

                return entry ? entry.name : "";
            }
        }
    ];

    useEffect(() => {
    roleApi.getAll()
        .then((data) => {
            console.log("ROLES FROM API:", data);
            setRoles(data);
        })
        .catch((err) => {
            console.error("Error loading roles", err);
        });
    }, []);

    const handleAdd = () => {
        console.log("Добавяне на роля");
    };

    const handleEdit = () => {
        console.log("Редакция на роля");
    };

    const handleDelete = () => {
        console.log("Изтриване на роля");
    };

    const refreshGrid = () => {
        roleApi.getAll().then(setRoles);
    };

    return (
        <div>
            <Box sx={{ ml: 2 }}>
                <h2>{t("roles")}</h2>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 0.5, ml: 2 }}>
                <AddButton onClick={handleAdd} />
                <EditButton onClick={handleEdit} disabled={!selectedId} />
                <DeleteButton onClick={handleDelete} disabled={!selectedId} />
            </Box>

            <AppDataGrid
                checkboxSelection
                rows={roles}
                columns={columns}
                getRowId={(row) => row.id}
                columnVisibilityModel={{
                    id: false
                }}
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
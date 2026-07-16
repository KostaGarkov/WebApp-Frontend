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
import RoleModal from "./RoleModal";
import { YesNoModal } from "../components/common/YesNoModal";
import { AppSnackbar } from "../components/common/AppSnackbar";

export default function RoleList() {
    const { lang, t } = useLang();
    const browserHeight = useWindowHeight();
    const [roles, setRoles] = useState<Role[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "warning" | "info">("info");


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
            setRoles(data);
        })
        .catch((err) => {
            console.error("Error loading roles", err);
        });
    }, []);

    const handleAdd = () => {
        setSelectedRole(null);   // режим CREATE
        setModalOpen(true);
    };

    const handleEdit = () => {
        if (!selectedId) return;

        const role = roles.find(r => r.id === selectedId);
        if (!role) return;

        setSelectedRole(role);
        setModalOpen(true);
    };

    const handleDelete = () => {
        if (!selectedId) return;
        setDeleteOpen(true);
    };

    const handleConfirmDelete = async () => {
        const result = await roleApi.delete(Number(selectedId));

        setSnackbarMessage(result.message);
        setSnackbarSeverity("success");
        setSnackbarOpen(true);

        loadRoles();
        setDeleteOpen(false);   
    };

    const handleCancelDelete = () => {
        setDeleteOpen(false);
    };

    function loadRoles() {
        fetch(`${APP_CONFIG.apiBaseUrl}/role`)
            .then(r => r.json())
            .then(data => setRoles(data));
    }

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

            <RoleModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                role={selectedRole}
                onSaved={() => loadRoles()}
            />

            <YesNoModal
                open={deleteOpen}
                title={t("areYouSure")}
                message={t("rowWillBeDeleted")}
                yesText={t("yes")}
                noText={t("no")}
                onYes={handleConfirmDelete}
                onNo={handleCancelDelete}
            />

            <AppSnackbar
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={() => setSnackbarOpen(false)}
            />
        </div>
    );
}
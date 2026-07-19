import { useEffect, useState, useRef, useCallback } from "react";
import { useLang } from "../i18n/LanguageContext";
import {
    GridColDef,
    GridRowSelectionModel,
    GridFilterModel,
    GridSortModel
} from "@mui/x-data-grid";
import { AppDataGrid } from "../components/common/AppDataGrid";
import { useWindowHeight } from "../hooks/useWindowHeight";
import { APP_CONFIG } from "../config";
import { roleApi, Role } from "../api/roleApi";
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
    const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] });
    const handleFilterChange = (model: GridFilterModel) => {
        setFilterModel(model);

        if (filterTimer.current) {
            clearTimeout(filterTimer.current);
        }

        filterTimer.current = setTimeout(() => {
            loadRoles(model, sortModel, page, pageSize);
        }, 300);
    };
    const [sortModel, setSortModel] = useState<GridSortModel>([]);
    const handleSortChange = (model: GridSortModel) => {
        setSortModel(model);

        if (sortTimer.current) {
            clearTimeout(sortTimer.current);
        }

        sortTimer.current = setTimeout(() => {
            loadRoles(filterModel, model, page, pageSize);
        }, 150);
    };

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
            filterable: true,
            type: "string"
        }
    ];
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [rowCount, setRowCount] = useState(0);
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        loadRoles(filterModel, sortModel, newPage, pageSize);
    };
    const handlePageSizeChange = (newSize: number) => {
        setPageSize(newSize);
        loadRoles(filterModel, sortModel, page, newSize);
    };
    const filterTimer = useRef<NodeJS.Timeout | null>(null);
    const sortTimer = useRef<NodeJS.Timeout | null>(null);

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

        loadRoles(filterModel, sortModel, page, pageSize);
        setDeleteOpen(false);   
    };

    const handleCancelDelete = () => {
        setDeleteOpen(false);
    };

    const loadRoles = useCallback((
        filterModel: GridFilterModel,
        sortModel: GridSortModel,
        page: number,
        pageSize: number = 20
    ) => {
        const params = new URLSearchParams();

        if (filterModel?.items) {
            params.append("filters", JSON.stringify(filterModel.items));
        }

        if (sortModel && sortModel.length > 0) {
            params.append("sortField", sortModel[0].field);
            params.append("sortDirection", sortModel[0].sort ?? "asc");
        }

        params.append("page", page.toString());
        params.append("pageSize", pageSize.toString());

        fetch(`${APP_CONFIG.apiBaseUrl}/role?${params.toString()}`)
            .then(r => r.json())
            .then(result => {
                setRoles(
                    result.data.map((r: any) => ({
                        ...r,
                        nameDisplay: r.translations.find((t: any) => t.language === lang)?.name ?? ""
                    }))
                );
                setRowCount(result.totalCount);
            });
    }, [lang]);

    const refreshGrid = () => {
        loadRoles(filterModel, sortModel, page, pageSize);
    };

    useEffect(() => {
        loadRoles(filterModel, sortModel, page, pageSize);
    }, [filterModel, sortModel, page, pageSize, loadRoles]);
    
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
                page={page}
                pageSize={pageSize}
                rowCount={rowCount}
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
                onFilterModelChange={handleFilterChange}
                onSortModelChange={handleSortChange}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
            />

            <RoleModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                role={selectedRole}
                onSaved={() => loadRoles(filterModel, sortModel, page, pageSize)}
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
import { useEffect, useState } from "react";
import { useLang } from "../i18n/LanguageContext";
import { Link } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface RoleTranslation {
    language: string;
    name: string;
}

interface Role {
    id: number;
    translations: RoleTranslation[];
}

export default function RoleList() {
    const [roles, setRoles] = useState<Role[]>([]);
    const { lang, t } = useLang();

    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "ID",
            width: 100,
            hideable: false
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
        fetch("http://localhost:5016/api/role")
            .then(r => r.json())
            .then(data => setRoles(data));
    }, []);

    return (
        <div>
            <h2>{t("roles")}</h2>

            <Link to="/roles/create">Добави роля</Link>

            <div style={{ height: 600, width: "100%", marginTop: 20 }}>
                <DataGrid
                    rows={roles}
                    columns={columns}
                    getRowId={(row) => row.id}
                    columnVisibilityModel={{
                        id: false
                    }}
                    checkboxSelection
                    disableRowSelectionOnClick
                    initialState={{
                        filter: { filterModel: { items: [] } },
                        pagination: {
                            paginationModel: { pageSize: 20 }
                        }
                    }}
                    pageSizeOptions={[20, 50, 100, 300, 500]}
                    localeText={{
                        toolbarDensity: t("density"),
                        toolbarDensityLabel: t("density"),
                        toolbarDensityCompact: t("compact"),
                        toolbarDensityStandard: t("standard"),
                        toolbarDensityComfortable: t("comfortable"),

                        footerRowSelected: (count) =>
                            count !== 1 ? `${count} ${t("rowsSelected")}` : `${count} ${t("rowSelected")}`,

                        footerTotalRows: t("totalRows"),
                        footerTotalVisibleRows: (visibleCount, totalCount) =>
                            `${visibleCount} ${t("of")} ${totalCount}`,
                        paginationDisplayedRows: ({ from, to, count }) =>
                            `${from}–${to} ${t("of")} ${count}`,
                        paginationRowsPerPage: t("rowsPerPage"),

                    }}
                />
            </div>
        </div>
    );
}
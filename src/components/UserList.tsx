import { useEffect, useState } from "react";
import { useLang } from "../i18n/LanguageContext";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface User {
    id: number;
    username: string;
    email: string;
    phone: string;
    isActive: boolean;
}

export default function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const { lang, t } = useLang();

    useEffect(() => {
        fetch("http://localhost:5016/api/user")
            .then(r => r.json())
            .then(data => setUsers(data));
    }, []);

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

    return (
        <div style={{ height: 600, width: "100%" }}>
            <h2>{t("users")}</h2>

            <DataGrid
                rows={users}
                columns={columns}
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
                    paginationDisplayedRows: ({ from, to, count }) =>
                            `${from}–${to} ${t("of")} ${count}`,
                    paginationRowsPerPage: t("rowsPerPage")
                }}
            />
        </div>
    );
}

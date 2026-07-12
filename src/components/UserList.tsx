import { useEffect, useState } from "react";
import { useLang } from "../i18n/LanguageContext";
import { Link } from "react-router-dom";
import { GridColDef } from "@mui/x-data-grid";
import { userApi, User } from "../api/userApi";
import { AppDataGrid } from "../components/common/AppDataGrid";
import { useWindowHeight } from "../hooks/useWindowHeight";
import { APP_CONFIG } from "../config";

export default function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const { t, lang } = useLang();
    const browserHeight = useWindowHeight();

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

    return (
        <div>
            <h2>{t("users")}</h2>

            <Link to="/users/create">{t("add")}</Link>

            <AppDataGrid
                checkboxSelection
                rows={users}
                columns={columns}
                getRowId={(row) => row.id}
                height={browserHeight*APP_CONFIG.factorGridHeight}
            />
        </div>
    );
}

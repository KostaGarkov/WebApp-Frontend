import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { APP_CONFIG } from "../config";
import { Role } from "../api/roleApi";
import { useLang } from "../i18n/LanguageContext";

interface Props {
    open: boolean;
    onClose: () => void;
    role: Role | null;
    onSaved: () => void;
}

export default function RoleModal({ open, onClose, role, onSaved }: Props) {
    const [bgName, setBgName] = useState("");
    const [enName, setEnName] = useState("");
    const { t } = useLang();

    useEffect(() => {
        if (role) {
            const bg = role.translations.find(t => t.language === "bg")?.name || "";
            const en = role.translations.find(t => t.language === "en")?.name || "";
            setBgName(bg);
            setEnName(en);
        } else {
            setBgName("");
            setEnName("");
        }
    }, [role]);

    async function handleSave() {
        const body = {
            translations: [
                { language: "bg", name: bgName },
                { language: "en", name: enName }
            ]
        };

        if (role) {
            await fetch(`${APP_CONFIG.apiBaseUrl}/role/${role.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
        } else {
            await fetch(`${APP_CONFIG.apiBaseUrl}/role`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
        }

        onSaved();
        onClose();
    }

    return (
        <Dialog open={open}
            onClose={(_, reason) => {
                if (reason === "backdropClick" || reason === "escapeKeyDown") {
                    return; // блокира затварянето
                }
                onClose(); // позволено затваряне
            }}
        >
            <DialogTitle>
                {role ? t("roleEditing") : t("addRole")}
            </DialogTitle>

            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 0 }}>
                <TextField 
                    label={`${t("name")} (BG)`}
                    value={bgName}
                    onChange={(e) => setBgName(e.target.value)}
                    fullWidth
                    sx={{ mt: 1 }}
                />

                <TextField
                    label={`${t("name")} (EN)`}
                    value={enName}
                    onChange={(e) => setEnName(e.target.value)}
                    fullWidth
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>{t("close")}</Button>
                <Button onClick={handleSave} variant="contained">{t("save")}</Button>
            </DialogActions>
        </Dialog>
    );
}

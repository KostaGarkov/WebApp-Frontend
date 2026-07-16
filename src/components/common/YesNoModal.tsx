import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useLang } from "../../i18n/LanguageContext";

interface YesNoModalProps {
    open: boolean;
    title?: string;
    message?: string;
    yesText?: string;
    noText?: string;
    onYes: () => void;
    onNo: () => void;
}

export function YesNoModal({
    open,
    title,
    message = "",
    yesText,
    noText,
    onYes,
    onNo
}: YesNoModalProps) {

    const { t } = useLang();

    return (
        <Dialog
            open={open}
            onClose={(_, reason) => {
                if (reason === "backdropClick" || reason === "escapeKeyDown") {
                    return;
                }
                onNo();
            }}
        >
            <DialogTitle>
                {title ?? t("areYouSure")}
            </DialogTitle>

            {message && (
                <DialogContent>
                    {message}
                </DialogContent>
            )}

            <DialogActions>
                <Button onClick={onNo} color="inherit">
                    {noText ?? t("no")}
                </Button>

                <Button onClick={onYes} color="error" variant="contained">
                    {yesText ?? t("yes")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

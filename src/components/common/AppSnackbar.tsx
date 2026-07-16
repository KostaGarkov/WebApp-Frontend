import { Snackbar, Alert } from "@mui/material";

interface AppSnackbarProps {
    open: boolean;
    message: string;
    severity?: "success" | "error" | "warning" | "info";
    onClose: () => void;
}

export function AppSnackbar({
    open,
    message,
    severity = "info",
    onClose
}: AppSnackbarProps) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={onClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Alert onClose={onClose} severity={severity} variant="filled">
                {message}
            </Alert>
        </Snackbar>
    );
}

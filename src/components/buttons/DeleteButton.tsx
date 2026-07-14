import { Button, Tooltip } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { actionButtonStyle } from '../common/actionButtonStyle';
import { useLang } from "../../i18n/LanguageContext";

type Props = {
  disabled?: boolean;
  onClick?: () => void;
};

export const DeleteButton = ({ disabled, onClick }: Props) => {
    const { t } = useLang();

    return (
        <Tooltip title={t("deleteSelectedEntry")}>
            <span>
                <Button
                variant="contained"
                color="error"
                size="large"
                startIcon={<DeleteForeverIcon />}
                sx={actionButtonStyle('small')}
                disabled={disabled}
                onClick={onClick}
                >
                    {t("delete")}
                </Button>
            </span>
        </Tooltip>
    );
};

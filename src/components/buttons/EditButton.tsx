import { Button, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { actionButtonStyle } from '../common/actionButtonStyle';
import { useLang } from "../../i18n/LanguageContext";

type Props = {
  disabled?: boolean;
  onClick?: () => void;
};

export const EditButton = ({ disabled, onClick }: Props) => {
    const { t } = useLang();

    return (
        <Tooltip title={t("editSelectedEntry")}>
            <span>
                <Button
                variant="contained"
                color="warning"
                size="large"
                startIcon={<EditIcon />}
                sx={actionButtonStyle('small')}
                disabled={disabled}
                onClick={onClick}
                >
                    {t("edit")}
                </Button>
            </span>
        </Tooltip>
    );
};

import { Button, Tooltip } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/Add';
import { actionButtonStyle } from '../common/actionButtonStyle';
import { useLang } from "../../i18n/LanguageContext";

type Props = {
  disabled?: boolean;
  onClick?: () => void;
};

export const AddButton = ({ disabled, onClick }: Props) => {
  const { t } = useLang();

  return (
    <Tooltip title={t("addNewEntry")}>
        <span>
            <Button
                variant="contained"
                color="success"
                size="large"
                startIcon={<AddCircleOutlineIcon />}
                sx={actionButtonStyle('small')}
                disabled={disabled}
                onClick={onClick}
            >
                {t("add")}
            </Button>
        </span>
    </Tooltip>
  );
};

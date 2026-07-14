import { DataGrid, DataGridProps, GridFooterContainer, GridPagination, GridSelectedRowCount, GridRowSelectionModel } from "@mui/x-data-grid";
import { useLang } from "../../i18n/LanguageContext";
import { Button, Box, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

interface AppDataGridProps extends DataGridProps {
  height?: number;
  width?: number | string;
  onRefresh?: () => void;
}

function AppDataGridFooter({
  selectedRowCount,
  onRefresh
}: {
  selectedRowCount: number;
  onRefresh?: () => void;
}) {
  const { t } = useLang();

  return (
    <GridFooterContainer
      sx={{
        display: "flex",
        alignItems: "center",
        px: 2,
      }}
    >
      {/* Ляво: избрани редове */}
      <Box sx={{ flexGrow: 1 }}>
        <GridSelectedRowCount selectedRowCount={selectedRowCount} />
      </Box>

      {/* Център: pagination */}
      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
        <GridPagination />
      </Box>

      {/* Дясно: refresh */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "flex-end",
          flexShrink: 0,
        }}
      >
        {onRefresh && (
          <Tooltip title={t("refresh")}>
            <Button
              variant="text"
              size="small"
              onClick={onRefresh}
              sx={{
                minWidth: "auto",
                padding: "4px",
                color: "text.secondary",
              }}
            >
              <RefreshIcon fontSize="small" />
            </Button>
          </Tooltip>
        )}
      </Box>
    </GridFooterContainer>
  );
}

export function AppDataGrid(props: AppDataGridProps) {
    const { t } = useLang();
    const selection = props.rowSelectionModel as GridRowSelectionModel | undefined;
    const selectedRowCount = selection?.ids?.size ?? 0;

  return (
    <div
      style={{
        height: props.height ?? 600,
        width: props.width ?? "95%",
        padding: "20px",
        background: "#fafafa",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <DataGrid
        {...props}
        rowHeight={48}
        columnHeaderHeight={48}
        pageSizeOptions={[20, 50, 100]}
        sx={{
          border: "1px solid #ddd",
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #eee",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f0f0f0",
            borderBottom: "1px solid #ddd",
          },
        }}
        initialState={{
            filter: { filterModel: { items: [] } },
            pagination: {
                paginationModel: { pageSize: 20 }
            }
        }}
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
        rowSelectionModel={props.rowSelectionModel}
        onRowSelectionModelChange={props.onRowSelectionModelChange}
        slots={{
            footer: () => (
                <AppDataGridFooter
                selectedRowCount={selectedRowCount}
                onRefresh={props.onRefresh}
                />
            ),
        }}
      />
    </div>
  );
}

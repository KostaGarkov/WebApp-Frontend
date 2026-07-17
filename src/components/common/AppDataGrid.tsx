import { 
  DataGrid,
  DataGridProps,
  GridFooterContainer,
  GridPagination,
  GridSelectedRowCount,
  GridRowSelectionModel,
  GridFilterModel,
  GridSortModel
} from "@mui/x-data-grid";
import { useLang } from "../../i18n/LanguageContext";
import { Button, Box, Tooltip, TextField } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useState } from "react";

interface AppDataGridProps extends DataGridProps {
  height?: number;
  width?: number | string;
  page?: number;
  pageSize?: number;
  rowCount?: number;
  singleSelect?: boolean;

  onRefresh?: () => void;
  onFilterModelChange?: (model: GridFilterModel) => void;
  onSortModelChange?: (model: GridSortModel) => void;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
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
      <Box sx={{ flexGrow: 1 }}>
        <GridSelectedRowCount selectedRowCount={selectedRowCount} />
      </Box>

      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
        <GridPagination />
      </Box>

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

  const [quickFilter, setQuickFilter] = useState("");

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
      {/* Quick Filter над таблицата */}
      <TextField
        size="small"
        placeholder="Търсене..."
        value={quickFilter}
        onChange={(e) => setQuickFilter(e.target.value)}
        sx={{ mb: 1 }}
      />

      <DataGrid
        {...props}
        rowHeight={36}
        columnHeaderHeight={36}
        pageSizeOptions={[20, 50, 100]}
        paginationMode="server"
        sx={{
          border: "1px solid #ddd",
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #eee",
            borderRight: "1px solid #eee"
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f0f0f0",
            borderBottom: "1px solid #ddd",
            "& .MuiDataGrid-columnHeader": {
              borderRight: "1px solid #ddd"
            }
          }
        }}
        initialState={{
          filter: { filterModel: { items: [] } }
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

        // Скриваме toolbar-а напълно
        showToolbar={false}

        // Оставяме Column Selector
        disableColumnSelector={false}

        // Скриваме Filter Panel
        disableColumnFilter={true}

        // Подаваме quick filter към DataGrid
        filterModel={{
          items: [
            {
              field: props.columns[0].field,
              operator: "contains",
              value: quickFilter
            }
          ]
        }}

        checkboxSelection={props.singleSelect === true}
        disableMultipleRowSelection={props.singleSelect !== true}
        filterMode="client"

        onFilterModelChange={(model) => {
          props.onFilterModelChange?.(model);
        }}
        onSortModelChange={(model) => {
          props.onSortModelChange?.(model);
        }}
      />
    </div>
  );
}

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
import { Button, Box, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

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

export function AppDataGrid(props: AppDataGridProps) {
  const { t } = useLang();

  const selection = props.rowSelectionModel as GridRowSelectionModel | undefined;
  const selectedRowCount = selection?.ids?.size ?? 0;

  // ---------------------------------------------------------
  // Footer – вътрешна функция, има достъп до props и selectedRowCount
  // ---------------------------------------------------------
  function AppDataGridFooter() {
    return (
      <GridFooterContainer sx={{ display: "flex", alignItems: "center", px: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <GridSelectedRowCount selectedRowCount={selectedRowCount} />
        </Box>

        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <GridPagination />
        </Box>

        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
          {props.onRefresh && (
            <Tooltip title={t("refresh")}>
              <Button
                variant="text"
                size="small"
                onClick={props.onRefresh}
                sx={{ minWidth: "auto", padding: "4px", color: "text.secondary" }}
              >
                <RefreshIcon fontSize="small" />
              </Button>
            </Tooltip>
          )}
        </Box>
      </GridFooterContainer>
    );
  }

  // ---------------------------------------------------------
  // Основен компонент
  // ---------------------------------------------------------
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
        rowHeight={36}
        columnHeaderHeight={36}
        pageSizeOptions={[20, 50, 100]}
        paginationMode="server"

        // Връщаме footer-а
        slots={{
          footer: AppDataGridFooter
        }}

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
          paginationRowsPerPage: t("rowsPerPage"),

          columnMenuSortAsc: t("sortAsc"),
          columnMenuSortDesc: t("sortDesc"),
          columnMenuFilter: t("filter"),
          columnMenuHideColumn: t("hideColumn"),
          columnMenuManageColumns: t("manageColumns"),
          columnMenuShowColumns: t("showColumn"),
          filterOperatorContains: t("contains"),
          filterOperatorDoesNotContain: t("notContains"),
          filterOperatorEquals: t("equals"),
          filterOperatorDoesNotEqual: t("notEquals"),
          filterOperatorStartsWith: t("startsWith"),
          filterOperatorEndsWith: t("endsWith"),
          filterOperatorIsEmpty: t("isEmpty"),
          filterOperatorIsNotEmpty: t("isNotEmpty"),
          filterOperatorIsAnyOf: t("isAnyOf"),
          filterPanelColumn: t("column"),
          filterPanelOperator: t("operator"),
          filterPanelInputLabel: t("value"),
          filterPanelInputPlaceholder: t("valuePlaceholder"),
          noRowsLabel: t("noRows"),
          noResultsOverlayLabel: t("noResults"),
        }}

        rowSelectionModel={props.rowSelectionModel}
        onRowSelectionModelChange={props.onRowSelectionModelChange}

        showToolbar={false}
        disableColumnSelector={false}
        disableColumnFilter={false}

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

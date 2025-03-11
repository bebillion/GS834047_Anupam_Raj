import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { updatePlanningData } from "../../slices/planningSlice";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { ColDef, CellValueChangedEvent } from "ag-grid-community"; // Import AG-Grid Types

ModuleRegistry.registerModules([AllCommunityModule]);

const Planning: React.FC = () => {
  const stores = useSelector((state: RootState) => state.stores.stores);
  const skus = useSelector((state: RootState) => state.skus.skus);
  const planningData = useSelector((state: RootState) => state.planning.planning);
  const dispatch = useDispatch();

  const [rowData, setRowData] = useState<PlanningRow[]>([]);

  // Define Weeks dynamically
  const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];
  const months = ["January", "February", "March", "April","May","June","July","August","September","October","November","December"]; // Example months

  // Define Interface for Row Data
  interface PlanningRow {
    storeId: number; // Add this line
    skuId: number; // Add this line
    storeName: string;
    skuName: string;
    price: number;
    cost: number;
    salesUnits: number;
    week: string;
  }

  useEffect(() => {
    // Generate row data (cross-join of stores & SKUs)
    const data: PlanningRow[] = stores.flatMap((store) =>
      skus.flatMap((sku) =>
        weeks.map((week) => {
          const existingData = planningData.find(
            (p) => p.storeId === store.id && p.skuId === sku.id && p.week === week
          );
          return {
            storeId: store.id, // Add this line
            skuId: sku.id, // Add this line
            storeName: store.name,
            skuName: sku.name,
            price: sku.price,
            cost: sku.cost,
            salesUnits: existingData?.salesUnits || 0,
            week,
          };
        })
      )
    );
    setRowData(data);
  }, [stores, skus, planningData]);

  // Column definitions with Type
  const columnDefs: ColDef<PlanningRow>[] = [
    { headerName: "Store", field: "storeName", pinned: "left" },
    { headerName: "SKU", field: "skuName", pinned: "left" },
    ...months.flatMap((month) =>
      weeks.map((week) => ({
        headerName: `${month} ${week}`,
        children: [
          {
            headerName: "Sales Units",
            field: `${month}_${week}_salesUnits`,
            editable: true,
            valueParser: (params: { newValue: string }) => Number(params.newValue) || 0,
            valueGetter: (params: { data: PlanningRow }) => {
              const data = planningData.find(
                (p) =>
                  p.storeId === params.data.storeId &&
                  p.skuId === params.data.skuId &&
                  p.week === week
              );
              return data ? data.salesUnits : 0;
            },
          },
          {
            headerName: "Sales $",
            valueGetter: (params: { data: PlanningRow }) =>
              params.data ? params.data.salesUnits * params.data.price : 0,
            valueFormatter: (params: { value: number }) =>
              `$${((params.value as number) || 0).toFixed(2)}`,
          },
          {
            headerName: "GM $",
            valueGetter: (params: { data: PlanningRow }) =>
              params.data
                ? params.data.salesUnits * (params.data.price - params.data.cost)
                : 0,
            valueFormatter: (params: { value: number }) =>
              `$${((params.value as number) || 0).toFixed(2)}`,
          },
          {
            headerName: "GM %",
            valueGetter: (params: { data: PlanningRow }) => {
              if (!params.data) return 0;
              const salesDollars = params.data.salesUnits * params.data.price;
              const gmDollars =
                params.data.salesUnits * (params.data.price - params.data.cost);
              return salesDollars > 0 ? (gmDollars / salesDollars) * 100 : 0;
            },
            valueFormatter: (params: { value: number }) =>
              `${((params.value as number) || 0).toFixed(2)}%`,
            cellStyle: (params: { value: number }) => {
              const value = (params.value as number) || 0;
              if (value >= 40) return { backgroundColor: "green", color: "white" };
              if (value >= 10) return { backgroundColor: "yellow", color: "black" };
              if (value >= 5) return { backgroundColor: "orange", color: "black" };
              return { backgroundColor: "red", color: "white" };
            },
          },
        ],
      }))
    ),
  ];

  // Handle Cell Edit with Proper Type
  const onCellValueChanged = (params: CellValueChangedEvent<PlanningRow>) => {
    if (!params.data) return;

    const store = stores.find((store) => store.name === params.data.storeName);
    const sku = skus.find((sku) => sku.name === params.data.skuName);

    if (!store || !sku) return; // Prevent errors if store or SKU is not found

    dispatch(
      updatePlanningData({
        storeId: store.id,
        skuId: sku.id,
        week: params.data.week,
        salesUnits: params.newValue,
        price: sku.price, // Include price
        cost: sku.cost, // Include cost
      })
    );
  };

  return (
    <div className="ag-theme-alpine p-4" style={{ height: 500 }}>
      <h2 className="text-2xl font-bold">Planning</h2>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        onCellValueChanged={onCellValueChanged}
        defaultColDef={{
          resizable: true,
          sortable: true,
        }}
      />
    </div>
  );
};

export default Planning;

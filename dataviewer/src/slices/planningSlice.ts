import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlanningData {
  storeId: number;
  skuId: number;
  week: string;
  salesUnits: number;
  price: number;
  cost: number;
}

interface PlanningState {
  planning: PlanningData[];
}

const initialState: PlanningState = {
  planning: [],
};

export const planningSlice = createSlice({
  name: "planning",
  initialState,
  reducers: {
    addPlanningData: (state, action: PayloadAction<PlanningData>) => {
      state.planning.push(action.payload);
    },
    updatePlanningData: (state, action: PayloadAction<PlanningData>) => {
      const index = state.planning.findIndex(
        (p) => p.storeId === action.payload.storeId && p.skuId === action.payload.skuId && p.week === action.payload.week
      );
      if (index !== -1) {
        state.planning[index] = action.payload;
      }
    },
  },
});

export const { addPlanningData, updatePlanningData } = planningSlice.actions;
export default planningSlice.reducer;

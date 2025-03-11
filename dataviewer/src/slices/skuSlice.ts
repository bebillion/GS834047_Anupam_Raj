import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SKU {
  id: number;
  name: string;
  price: number;
  cost: number;
}

interface SKUState {
  skus: SKU[];
}

const initialState: SKUState = {
  skus: [],
};

export const skuSlice = createSlice({
  name: "skus",
  initialState,
  reducers: {
    addSKU: (state, action: PayloadAction<SKU>) => {
      state.skus.push(action.payload);
    },
    removeSKU: (state, action: PayloadAction<number>) => {
      state.skus = state.skus.filter((sku) => sku.id !== action.payload);
    },
    updateSKU: (state, action: PayloadAction<SKU>) => {
      const index = state.skus.findIndex((sku) => sku.id === action.payload.id);
      if (index !== -1) {
        state.skus[index] = action.payload;
      }
    },
    updateSKUOrder: (state, action: PayloadAction<SKU[]>) => {
      state.skus = action.payload;
    },
  },
});

export const { addSKU, removeSKU, updateSKU, updateSKUOrder } = skuSlice.actions;
export default skuSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import storeReducer from '../slices/storeSlice'
import skuReducer from "../slices/skuSlice";
import planningReducer from "../slices/planningSlice";

export const store = configureStore({
  reducer: {
    stores: storeReducer,
    skus: skuReducer,
    planning: planningReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // Enables type-safe useSelector()
export type AppDispatch = typeof store.dispatch; // Enables type-safe useDispatch()

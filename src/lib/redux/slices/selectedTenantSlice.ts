import { createSlice } from "@reduxjs/toolkit";
import type { Slice } from "@reduxjs/toolkit";

export interface SelectedTenant {
  selectedTenant: string | null;
}

const initialState: SelectedTenant = {
  selectedTenant: null,
};

export const selectedTenantSlice: Slice = createSlice({
  name: "tenant",
  initialState,
  reducers: {
    selectTenant: (state, action) => {
      state.selectedTenant = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectTenant } = selectedTenantSlice.actions;

export default selectedTenantSlice.reducer;

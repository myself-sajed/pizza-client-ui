import { Tenant } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { Slice } from "@reduxjs/toolkit";

export interface SelectedTenant {
  selectedTenant: Tenant | null;
}

const initialState: SelectedTenant = {
  selectedTenant: null,
};

export const selectedTenantSlice: Slice = createSlice({
  name: "tenant",
  initialState,
  reducers: {
    selectTenant: (state, action) => {
      window.localStorage.setItem(
        "selectedTenant",
        JSON.stringify(action.payload)
      );
      state.selectedTenant = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectTenant } = selectedTenantSlice.actions;

export default selectedTenantSlice.reducer;

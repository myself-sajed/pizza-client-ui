import { Product, Topping } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction, Slice } from "@reduxjs/toolkit";

export interface ProductConfiguration {
  [key: string]: string;
}

export interface CartItem {
  product: Product | null;
  productConfiguration: ProductConfiguration | null;
  toppings: Topping[] | [];
}

export interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

export const cartSlice: Slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      return {
        cartItems: [
          ...state.cartItems,
          {
            product: action.payload.product,
            productConfiguration: action.payload.productConfiguration,
            toppings: action.payload.toppings,
          },
        ],
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;

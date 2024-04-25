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
  qty: number;
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
            qty: action.payload.qty,
          },
        ],
      };
    },

    updateCart: (state, action) => {
      return {
        cartItems: action.payload,
      };
    },

    clearCart: () => {
      return {
        cartItems: [],
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, updateCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

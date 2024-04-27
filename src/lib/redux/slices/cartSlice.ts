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
      const newItem = {
        product: action.payload.product,
        productConfiguration: action.payload.productConfiguration,
        toppings: action.payload.toppings,
        qty: action.payload.qty,
      };

      window.localStorage.setItem(
        "cartItems",
        JSON.stringify([...state.cartItems, newItem])
      );

      return {
        cartItems: [...state.cartItems, newItem],
      };
    },

    updateCart: (state, action) => {
      window.localStorage.setItem("cartItems", JSON.stringify(action.payload));
      return {
        cartItems: action.payload,
      };
    },

    clearCart: () => {
      window.localStorage.setItem("cartItems", JSON.stringify([]));
      return {
        cartItems: [],
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, updateCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

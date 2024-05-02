import { Product, Topping } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction, Slice } from "@reduxjs/toolkit";

export interface ProductConfiguration {
  [key: string]: string;
}

export interface CartItem
  extends Pick<Product, "_id" | "name" | "image" | "tenantId"> {
  _id: string;
  name: string;
  image: string;
  tenantId: string;
  productConfiguration: ProductConfiguration | null;
  toppings: Topping[] | [];
  qty: number;
  totalPrice: number;
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
        _id: action.payload._id,
        name: action.payload.name,
        image: action.payload.image,
        tenantId: action.payload.tenantId,
        productConfiguration: action.payload.productConfiguration,
        toppings: action.payload.toppings,
        qty: action.payload.qty,
        totalPrice: action.payload.totalPrice,
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
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, updateCart } = cartSlice.actions;

export default cartSlice.reducer;

import { CartItem } from "@/lib/redux/slices/cartSlice";
import { hashTheItem } from "@/lib/utils";

export const checkIfItemExistsInCart = (
  cartItems: CartItem[],
  itemToCheck: CartItem
) => {
  let itemIndex: number | null = null;
  const isExists = cartItems.some((cartItem, index) => {
    const cartItemHash = hashTheItem({ ...cartItem, qty: undefined });
    const itemToCheckHash = hashTheItem({ ...itemToCheck, qty: undefined });

    if (cartItemHash === itemToCheckHash) {
      itemIndex = index;
      return true;
    } else {
      return false;
    }
  });

  return { isExists, itemIndex };
};

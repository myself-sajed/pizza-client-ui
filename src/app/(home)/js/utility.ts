import { CartItem } from "@/lib/redux/slices/cartSlice";
import { Topping } from "@/types";

// we need to check three things before we judge weather the item is same as we chosen
// 1. same product id, 2. same product configuration 3. same toppings
export const isProductAlreadyExistsInCart = (
  productCartData: CartItem,
  cartItems: CartItem[]
) => {
  return cartItems.some((item) => {
    return (
      item.product?._id === productCartData.product?._id &&
      deepCompare(
        productCartData.productConfiguration,
        item.productConfiguration
      ) &&
      areToppingsSame(item.toppings, productCartData.toppings)
    );
  });
};

function deepCompare(obj1: any, obj2: any): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}

function areToppingsSame(toppings1: Topping[], toppings2: Topping[]): boolean {
  if (toppings1.length !== toppings2.length) {
    return false;
  }
  for (let topping1 of toppings1) {
    if (!toppings2.some((topping2) => topping2._id === topping1._id)) {
      return false;
    }
  }
  return true;
}

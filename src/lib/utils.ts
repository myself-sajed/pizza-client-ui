import { Product } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import CryptoJS from "crypto-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const showMinimumPrice = (product: Product) => {
  const basePrices = Object.values(product.priceConfiguration).filter(
    ({ priceType }) => priceType === "base"
  );

  const startingPrice = basePrices.reduce((acc, availableOptions) => {
    return acc + Math.min(...Object.values(availableOptions.availableOptions));
  }, 0);

  return startingPrice;
};

export const hashTheItem = (item: any) => {
  return CryptoJS.SHA256(JSON.stringify(item)).toString();
};

import { Product } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const showMinimumPrice = (product: Product) => {
  const obj = {
    _id: "662b360d456e4b1d3baf8d4d",
    name: "Coca Cola Fanta",
    description: "Thanda Thanda Cool Cool",
    image:
      "https://pizza-catalog-service.s3.ap-south-1.amazonaws.com/3fb5653d-a06a-4d39-adff-4c6d32c91456",
    priceConfiguration: {
      Size: {
        priceType: "base",
        availableOptions: {
          "100ml": 25,
          "300ml": 30,
          "500ml": 35,
        },
        _id: "6613e5bd068cc529d38c072b",
      },
      Chilling: {
        priceType: "additional",
        availableOptions: {
          Warm: 0,
          Cold: 25,
        },
        _id: "6613e5bd068cc529d38c072c",
      },
    },
  };

  const basePrices = Object.values(product.priceConfiguration).filter(
    ({ priceType }) => priceType === "base"
  );

  const startingPrice = basePrices.reduce((acc, availableOptions) => {
    return acc + Math.min(...Object.values(availableOptions.availableOptions));
  }, 0);

  return startingPrice;
};

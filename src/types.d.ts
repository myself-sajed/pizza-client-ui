export interface Tenant {
  id: string;
  name: string;
  address: string;
}

export type priceType = "base" | "additional";
export type widgetType = "switch" | "radio";

export interface Attributes {
  name: string;
  widgetType: widgetType;
  defaultValue: string;
  availableOptions: string[];
}

export interface AvailableOptions {
  [key: string]: number;
}

export interface PriceConfiguration {
  [key: string]: {
    priceType: priceType;
    availableOptions: AvailableOptions;
  };
}

export interface Category {
  _id: string;
  name: string;
  price: PriceConfiguration;
  attributes: Attributes[];
  hasToppings: boolean;
}

export interface Product {
  _id: string;
  key: string;
  name: string;
  isPublish: number;
  createdAt: string;
  description: string;
  image: string;
  tenantId: string;
  categoryId: string;
  priceConfiguration: PriceConfiguration;
  attributes: Attributes[];
}

export interface Topping {
  _id: string;
  name: string;
  price: number;
  image: string;
}

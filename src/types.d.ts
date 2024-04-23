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

export interface PriceConfiguration {
  [key: string]: {
    priceType: priceType;
    availableOptions: string[];
  };
}

export interface Category {
  _id: string;
  name: string;
  price: PriceConfiguration;
  attributes: Attributes[];
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

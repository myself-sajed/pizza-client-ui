import { ICoupon } from "./app/checkout/components/OrderSummary";

export interface Tenant {
  id: string;
  name: string;
  address: string;
}

export interface Address {
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
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
  category: Category;
  priceConfiguration: PriceConfiguration;
  attributes: Attributes[];
}

export interface Topping {
  _id: string;
  name: string;
  price: number;
  image: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  tenant: Tenant | null;
}
export interface Customer {
  _id: string;
  name: string;
  email: string;
  role: string;
  address: Address[];
}

export interface Address {
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

export interface Order {
  cartItems: CartItems[];
  customerId: string;
  tenantId: string;
  address: Address;
  comment: string;
  coupon: ICoupon;
  paymentMode: string;
}

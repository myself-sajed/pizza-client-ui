import { Address, Order } from "@/types";
import { api } from "./api";

export const getCustomer = () => {
  return api.get("/order/customer/");
};

export const addAddress = (address: Address, customerId: string) => {
  return api.patch(`/order/customer/address/${customerId}`, { ...address });
};

export const verifyCoupon = (code: string, tenantId: string) => {
  return api.post(`/order/coupon/verify`, {
    code,
    tenantId: tenantId.toString(),
  });
};

export const createOrder = (orderData: Order, idemKey: string) => {
  return api.post(`/order/order/createOrder`, orderData, {
    headers: {
      "Idem-Key": idemKey,
    },
  });
};

export const getOrder = (orderId: string, tenantId: string) => {
  return api.get(`/order/order/${orderId}/${tenantId}`);
};

export const deleteOrder = (orderId: string, tenantId: string) => {
  return api.delete(`/order/order/${orderId}/${tenantId}`);
};

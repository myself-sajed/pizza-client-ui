import { api } from "./api";

export const getCustomer = () => {
  return api.get("/order/customer/");
};

export const addAddress = (address: string, customerId: string) => {
  return api.patch(`/order/customer/address/${customerId}`, { address });
};

export const verifyCoupon = (code: string, tenantId: string) => {
  return api.post(`/order/coupon/verify`, {
    code,
    tenantId: tenantId.toString(),
  });
};

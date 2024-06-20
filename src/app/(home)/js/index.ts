import { apiURL, clientAPIURL } from "@/constants";
import axios from "axios";
// import { cookies } from "next/headers";

export const getTenants = async () => {
  const link = `${apiURL}/auth/tenant/getAllTenantList`;

  const res = await fetch(link, {
    next: {
      revalidate: 3600,
    },
  });

  const data = res.ok ? await res.json() : null;

  return { status: res.ok, data };
};

export const getCategories = async () => {
  const link = `${apiURL}/catalog/categories/getList`;

  const res = await fetch(link, {
    next: {
      revalidate: 3600,
    },
  });

  const data = res.ok ? await res.json() : null;

  return { status: res.ok, data };
};

export const getProducts = async (tenantId: string | null, limit = 100) => {
  const link = `${clientAPIURL}/catalog/products/getProducts?tenantId=${tenantId}&limit=${limit}`;
  return axios.get(link);
};

export const getToppings = async (tenantId: string) => {
  const link = `${clientAPIURL}/catalog/toppings/getToppings?tenantId=${tenantId}`;
  return axios.get(link);
};

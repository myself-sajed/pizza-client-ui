import { apiURL, clientAPIURL } from "@/constants";
import axios from "axios";

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

export const getProducts = async () => {
  const link = `${apiURL}/catalog/products/getProducts`;

  const res = await fetch(link, {
    next: {
      revalidate: 3600,
    },
  });

  const data = res.ok ? await res.json() : null;

  return { status: res.ok, data };
};

export const getToppings = async () => {
  const link = `${clientAPIURL}/catalog/toppings/getToppings`;
  return axios.get(link);
};

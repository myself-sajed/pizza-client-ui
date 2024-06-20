"use server";

import { apiURL } from "@/constants";
import { cookies } from "next/headers";

const logoutAction = async () => {
  const link = `${apiURL}/auth/auth/logout`;
  const accessToken = cookies().get("accessToken")?.value;
  const refreshToken = cookies().get("refreshToken")?.value;

  const res = await fetch(link, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      cookie: `refreshToken=${refreshToken}`,
    },
  });

  const isLoggedOut = res.ok ? await res.json() : null;

  if (!isLoggedOut) {
    return {
      status: "error",
      message: "Logout failed.",
    };
  }

  cookies().delete("accessToken");
  cookies().delete("refreshToken");

  return {
    status: "success",
    message: "Logged out successfully",
  };
};

export default logoutAction;

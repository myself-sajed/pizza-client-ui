"use server";

import { apiURL } from "@/constants";
import cookie from "cookie";
import { cookies } from "next/headers";

const loginAction = async (prevState: any, formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return {
      status: "error",
      message: "Please fill all the fields",
    };
  }

  try {
    const link = `${apiURL}/auth/auth/login`;
    const res = await fetch(link, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error = await res.json();
      return {
        status: "error",
        message: error.errors[0].msg,
      };
    }

    const cookiesFromServer = res.headers.getSetCookie();
    const accessTokenStr = cookiesFromServer.find((cookie) =>
      cookie.includes("accessToken")
    );
    const refreshTokenStr = cookiesFromServer.find((cookie) =>
      cookie.includes("refreshToken")
    );

    if (!accessTokenStr || !refreshTokenStr) {
      return {
        status: "error",
        message: "Login failed",
      };
    }

    const accessToken = cookie.parse(accessTokenStr!);
    const refreshToken = cookie.parse(refreshTokenStr!);

    cookies().set({
      name: "accessToken",
      value: accessToken.accessToken,
      httpOnly: (accessToken.httpOnly as unknown as boolean) || true,
      expires: new Date(accessToken.Expires),
      sameSite: accessToken.SameSite as "strict",
      path: accessToken.path,
      domain: accessToken.Domain,
    });
    cookies().set({
      name: "refreshToken",
      value: refreshToken.refreshToken,
      httpOnly: (refreshToken.httpOnly as unknown as boolean) || true,
      expires: new Date(refreshToken.Expires),
      sameSite: refreshToken.SameSite as "strict",
      path: refreshToken.path,
      domain: refreshToken.Domain,
    });

    return {
      status: "success",
      message: "Login successful",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong, try again later.",
    };
  }
};

export default loginAction;

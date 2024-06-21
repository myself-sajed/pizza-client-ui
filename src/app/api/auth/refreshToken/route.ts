import { apiURL } from "@/constants";
import { cookies } from "next/headers";
import cookie from "cookie";

async function GET() {
  const refreshTokenAuth = cookies().get("refreshToken")?.value;
  const link = `${apiURL}/auth/auth/refresh`;
  const res = await fetch(link, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${refreshTokenAuth}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    return Response.json({ status: "error", message: error.errors[0].msg });
  }

  const cookiesFromServer = res.headers.getSetCookie();
  const accessTokenStr = cookiesFromServer.find((cookie) =>
    cookie.includes("accessToken")
  );
  const refreshTokenStr = cookiesFromServer.find((cookie) =>
    cookie.includes("refreshToken")
  );

  if (!accessTokenStr || !refreshTokenStr) {
    return Response.json({ status: "error" });
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

  return Response.json({ status: "success" });
}

export { GET };

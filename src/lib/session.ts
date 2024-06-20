import { apiURL } from "@/constants";
import { User } from "@/types";
import { cookies } from "next/headers";

const getSession = async () => {
  const link = `${apiURL}/auth/auth/self`;
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  const res = await fetch(link, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const session = res.ok ? await res.json() : null;

  return session as User;
};

export default getSession;

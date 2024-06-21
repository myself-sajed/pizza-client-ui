import { cookies } from "next/headers";

async function GET() {
  return Response.json({ token: cookies().get("accessToken") });
}

export { GET };

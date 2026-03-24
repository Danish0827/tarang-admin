import { cookies } from "next/headers";
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getContact() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${BASE_URL}/api/contact/?page=1&limit=10`, {
    next: { revalidate: 60 },
    headers: {
      "Cookie": `access_token=${accessToken}`,
    },
  });

  return res.json();
}

export async function deleteContact(id: number) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${BASE_URL}/api/contact/${id}`, {
    method: "DELETE",
    headers: {
      "Cookie": `access_token=${accessToken}`,
    },
  });

  return res.json();
}

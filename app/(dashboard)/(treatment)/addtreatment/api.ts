import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


// ✅ GET SINGLE (by slug)
export async function getSingleTreatment(slug: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const res = await fetch(`${BASE_URL}/api/treatment/${slug}`, {
    next: { revalidate: 60 },
    headers: {
      "Cookie": `access_token=${accessToken}`,
    },
  });

  return res.json();
}


// ✅ ADD
export async function addTreatment(data: any) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const res = await fetch(`${BASE_URL}/api/treatment/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cookie": `access_token=${accessToken}`,
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return res.json();
}


// ✅ UPDATE
export async function updateTreatment(id: number, data: any) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const res = await fetch(`${BASE_URL}/api/treatment/update/${id}`, {
    method: "POST", // ⚠️ backend me POST use kiya hai
    headers: {
      "Content-Type": "application/json",
      "Cookie": `access_token=${accessToken}`,
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return res.json();
}


// ✅ DELETE
export async function deleteTreatment(id: number) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const res = await fetch(`${BASE_URL}/api/treatment/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Cookie": `access_token=${accessToken}`,
    },
  });

  return res.json();
}


// ✅ GET ALL
export async function getAllTreatments() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const res = await fetch(`${BASE_URL}/api/treatment/all`, {
    next: { revalidate: 60 },
    headers: {
      "Cookie": `access_token=${accessToken}`,
    },
  });

  return res.json();
}
import { cookies } from "next/headers";
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getBlog() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${BASE_URL}/api/blogs`, {
    next: { revalidate: 60 },
    headers: {
      "Cookie": `access_token=${accessToken}`,
    },
  });

  return res.json();
}

export async function addBlogCategory(data: any) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${BASE_URL}/api/blogcategories`, {
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

export async function updateBlogCategory(id: number, data: any) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${BASE_URL}/api/blogcategories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Cookie": `access_token=${accessToken}`,
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  
  return res.json();
}

export async function deleteBlogCategory(id: number) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${BASE_URL}/api/blogcategories/${id}`, {
    method: "DELETE",
    headers: {
      "Cookie": `access_token=${accessToken}`,
    },
  });

  return res.json();
}

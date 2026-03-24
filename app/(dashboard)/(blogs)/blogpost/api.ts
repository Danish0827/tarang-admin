import { cookies } from "next/headers";
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getSingleBlog(slug:string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${BASE_URL}/api/blogs/${slug}`, {
    next: { revalidate: 60 },
    headers: {
      "Cookie": `access_token=${accessToken}`,
    },
  });

  return res.json();
}

export async function addBlog(data: any) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${BASE_URL}/api/blogs`, {
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

export async function updateBlog(id: number, data: any) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${BASE_URL}/api/blogs/${id}`, {
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

export async function deleteBlog(id: number) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${BASE_URL}/api/blogs/${id}`, {
    method: "DELETE",
    headers: {
      "Cookie": `access_token=${accessToken}`,
    },
  });

  return res.json();
}

import { cookies } from "next/headers";
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getImages(
  page: number,
  limit: number
) {
  const res = await fetch(
    `${BASE_URL}/api/images?page=${page}&limit=${limit}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  return res.json();
}
// export async function addBlogCategory(data: any) {
//   const cookieStore = await cookies();
//   const accessToken = cookieStore.get("access_token")?.value;
//   const res = await fetch(`${BASE_URL}/api/blogcategories`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Cookie": `access_token=${accessToken}`,
//     },
//     credentials: "include",
//     body: JSON.stringify(data),
//   });

//   return res.json();
// }

export async function updateImage(id: number, data: any) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${BASE_URL}/api/images/${id}`, {
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

export async function deleteImage(id: string | null) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${BASE_URL}/api/images/${id}`, {
    method: "DELETE",
    headers: {
      "Cookie": `access_token=${accessToken}`,
    },
  });

  return res.json();
}

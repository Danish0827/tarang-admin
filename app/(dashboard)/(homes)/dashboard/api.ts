
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


export async function getAllTreatments() {

  const res = await fetch(
    `${BASE_URL}/api/treatment/all?page=1&limit=1000`,
    {
      cache: "no-store"
    }
  );

  return res.json();
}

export async function getBlogDashboard() {
  const res = await fetch(`${BASE_URL}/api/blogs`, {
    next: { revalidate: 60 },
  });

  return res.json();
}

export async function getContactDashboard() {
  const res = await fetch(`${BASE_URL}/api/contact/?page=1&limit=1000`, {
    next: { revalidate: 60 },
  });

  return res.json();
}

export async function getImagesDashboard() {
  const res = await fetch(
    `${BASE_URL}/api/images?page=1&limit=1000`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  return res.json();
}
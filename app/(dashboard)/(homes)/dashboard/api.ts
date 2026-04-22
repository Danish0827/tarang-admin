
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


export async function getAllTreatments() {

  const res = await fetch(
    `${BASE_URL}/api/treatment/dashboard-count`,
    {
      cache: "no-store"
    }
  );

  return res.json();
}

// export async function getBlogDashboard() {
//   const res = await fetch(`${BASE_URL}/api/blogs/count`, {
//     next: { revalidate: 60 },
//   });

//   return res.json();
// }

// export async function getContactDashboard() {
//   const res = await fetch(`${BASE_URL}/api/contact/count`, {
//     next: { revalidate: 60 },
//   });

//   return res.json();
// }

// export async function getImagesDashboard() {
//   const res = await fetch(
//     `${BASE_URL}/api/images/count`,
//     {
//       method: "GET",
//       cache: "no-store",
//     }
//   );

//   return res.json();
// }
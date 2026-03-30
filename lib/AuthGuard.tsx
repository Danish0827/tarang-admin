// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { logout } from "./api";
// import { useUser } from "./user-context";

// const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

// export default function AuthGuard({ children }: { children: React.ReactNode }) {
// const { setUser } = useUser();
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const verifyUser = async () => {
//       try {
//         let res = await fetch(`${BASE_URL}/api/auth/me`, {
//           method: "GET",
//           credentials: "include",
//         });
//         if (res.status === 401 || res.status === 403) {
//           const refreshRes = await fetch(`${BASE_URL}/api/auth/refresh_token`, {
//             method: "POST",
//             credentials: "include",
//           });
//           if (!refreshRes.ok) {
//             await logout();
//             router.replace("/auth/login");
//             return;
//           }
//           res = await fetch(`${BASE_URL}/api/auth/me`, {
//             method: "GET",
//             credentials: "include",
//           });
//         }

//         if (!res.ok) {
//           await logout();
//           router.replace("/auth/login");
//           return;
//         }
//         setLoading(false);
//       } catch (err) {
//         console.error("AuthGuard error:", err);
//         await logout();
//         router.replace("/auth/login");
//       }
//     };
//     verifyUser();

//   }, [router]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return children;
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "./user-context";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export default function AuthGuard({ children }: any) {

  const { setUser } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const verify = async () => {

      let res = await fetch(`${BASE_URL}/api/auth/me`, {
        credentials: "include",
      });

      if (res.status === 401) {

        const refresh = await fetch(`${BASE_URL}/api/auth/refresh_token`, {
          method: "POST",
          credentials: "include",
        });

        if (!refresh.ok) {
          router.replace("/auth/login");
          return;
        }

        res = await fetch(`${BASE_URL}/api/auth/me`, {
          credentials: "include",
        });
      }

      if (!res.ok) {
        router.replace("/auth/login");
        return;
      }

      const user = await res.json();

      setUser(user);

      setLoading(false);
    };

    verify();

  }, []);

  if (loading) return <div>Loading...</div>;

  return children;
}
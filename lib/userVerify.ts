// lib/userVerify.ts
import "server-only";
import { cookies } from "next/headers";
import { logout } from "./api";

export const userVerify = async () => {
  try {
    // ✅ Server-side cookies
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    const refreshToken = cookieStore.get("refresh_token")?.value;

    console.log("accessToken:", accessToken, "refreshToken:", refreshToken);

    if (!accessToken && !refreshToken) return await logout();

    // Function to fetch user data with access token
    const fetchMe = async (token: string) => {
      return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // send token in header
        },
        cache: "no-store",
      });
    };

    // Try fetching user info with current access token
    let res = accessToken ? await fetchMe(accessToken) : null;

    // If access token invalid, try refreshing
    if (!res || res.status === 401 || res.status === 403) {
      if (!refreshToken) return await logout();

      // Refresh token request
      const refreshRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/refresh_token`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${refreshToken}`, // send refresh token in header
          },
          cache: "no-store",
        }
      );

      if (!refreshRes.ok) return await logout();

      const data = await refreshRes.json();
      const newAccessToken = data?.accessToken;
      if (!newAccessToken) return await logout();

      // Retry fetching user with new access token
      res = await fetchMe(newAccessToken);
    }

    if (!res || !res.ok) return await logout();

    return await res.json();
  } catch (err) {
    console.error("userVerify error:", err);
    await logout();
  }
};
import { logout } from "./api";

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

async function refreshToken() {
  if (!isRefreshing) {
    isRefreshing = true;

    refreshPromise = fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/refresh_token`,
      {
        method: "POST",
        credentials: "include",
      }
    )
      .then(res => {
        if (!res.ok) {
          throw new Error("Refresh failed");
        }
      })
      .finally(() => {
        isRefreshing = false;
      });
  }

  return refreshPromise;
}

export async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
) {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
  });
  if (response.status !== 401) {
    return response;
  }
  try {
    await refreshToken();
    return fetch(url, {
      ...options,
      credentials: "include",
    });
  } catch (err) {
    await logout();
    window.location.href = "/auth/login";
    throw err;
  }
}

"use server";

import { logout } from "@/lib/api";
import { cookies } from "next/headers";

export type LogoutResponse = { success: true } | { error: string };

export async function doLogout(): Promise<LogoutResponse> {
  try {
   

    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { error: "Logout failed. Please try again." };
  }
}

"use server";

import { revalidatePath } from "next/cache";
import { deleteContact } from "./api";

export async function handleContactAction(
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const id = formData.get("id")?.toString();

  if (!id) {
    return { success: false, message: "Id is required" };
  }

  await deleteContact(Number(id));
  revalidatePath("/contactdetails");

  return { success: true, message: "Contact Deleted successfully" };
}
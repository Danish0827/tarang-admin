"use server";

import {
  updateImage,
  deleteImage,
} from "./api";
import { revalidatePath } from "next/cache";

export async function handleImageAction(
  prevState: { success: boolean; message: string },
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const actionType = formData.get("action")?.toString();
  const id = formData.get("id")?.toString();
  const title = formData.get("title")?.toString();
  const alt_text = formData.get("alt_text")?.toString();
  const caption = formData.get("caption")?.toString();
  const file_key = formData.get("file_key")?.toString(); // 🔥 new
  
  console.log("FORM DATA:", Object.fromEntries(formData.entries()));
  if (actionType === "update") {
    if (!id) return { success: false, message: "Id is required" };
    const res = await updateImage(Number(id), {
      title,
      alt_text,
      caption,
      is_featured : false
    });
    revalidatePath("/allmedia");
    if (res.error) {
      return { success: false, message: res.error };
    }
    return { success: true, message: "Data Updated Successfully!" };
  }

  if (actionType === "delete") {
    if (!file_key) return { success: false, message: "file_key is required" };
    const res = await deleteImage(file_key);
    console.log(res,"delete data ");
    revalidatePath("/allmedia");
    return { success: true, message: "Image Deleted successfully!" };
  }
  return { success: false, message: "Invalid action" };
}

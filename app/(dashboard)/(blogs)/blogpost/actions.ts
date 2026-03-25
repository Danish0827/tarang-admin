"use server";

import { revalidatePath } from "next/cache";
import { addBlog, deleteBlog, updateBlog } from "./api";
import { redirect } from "next/navigation";

export async function handleBlogAction(
  formData: FormData
): Promise<{ success: boolean; message: string }> {

  console.log(formData,"formDataformDataformDataformDataformData");
  
  // 🔹 STEP 1: Clean FormData keys (remove prefixes like 1_)
 const cleanedData: Record<string, any> = {};

for (const [key, value] of formData.entries()) {
  cleanedData[key] = value;
}
  // 🔹 STEP 2: Map frontend keys to backend expected keys
  cleanedData.slug = cleanedData.slug || cleanedData.url || "";
  cleanedData.short_description = cleanedData.short_description || cleanedData.description || "";
  cleanedData.featured_image = cleanedData.featured_image || cleanedData.image || "";
  cleanedData.featured_image_alt = cleanedData.featured_image_alt || cleanedData.image_alt || "";
  cleanedData.author_name = cleanedData.author_name || cleanedData.name || "";
  cleanedData.meta_title = cleanedData.meta_title || "";
  cleanedData.meta_description = cleanedData.meta_description || "";
  cleanedData.meta_keywords = cleanedData.meta_keywords || cleanedData.keywords || "";
  cleanedData.canonical_url = cleanedData.canonical_url || cleanedData.url || "";
  cleanedData.content = cleanedData.content || "";
  
  // 🔹 STEP 3: Parse JSON arrays properly
 try {
  cleanedData.category_ids = cleanedData.category_ids
    ? JSON.parse(cleanedData.category_ids as string)
    : [];
} catch {
  cleanedData.category_ids = [];
}
  
  cleanedData.faqs = cleanedData.faqs
    ? (typeof cleanedData.faqs === "string" ? JSON.parse(cleanedData.faqs) : cleanedData.faqs)
    : [];

  // 🔹 STEP 4: Ensure required fields
  const actionType = cleanedData.action;
  const id = cleanedData.id;

  if (actionType === "add") {
    if (!cleanedData.title) return { success: false, message: "Title is required" };
    if (!cleanedData.slug) return { success: false, message: "Slug is required" };

    const res = await addBlog(cleanedData);
    revalidatePath("/blogs");
    revalidatePath("/blogpost");
    redirect("/blogs")
    return { success: true, message: "Blog Added successfully!" };
  }

  if (actionType === "edit") {
    if (!id) return { success: false, message: "Id is required" };

    const res = await updateBlog(Number(id), cleanedData);
    if (res?.error) return { success: false, message: res.error };
    revalidatePath("/blogs");
    revalidatePath("/blogpost");
    redirect("/blogs")
    return { success: true, message: "Blog Updated Successfully!" };
  }

  if (actionType === "delete") {
    if (!id) return { success: false, message: "Id is required" };
    await deleteBlog(Number(id));
    revalidatePath("/blogs");
    return { success: true, message: "Blog Deleted successfully!" };
  }

  return { success: false, message: "Invalid action" };
}
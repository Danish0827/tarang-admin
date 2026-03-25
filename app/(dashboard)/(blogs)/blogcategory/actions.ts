"use server";

import {
  addBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
} from "./api";
import { revalidatePath } from "next/cache";

export async function handleBlogCategoryAction(
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const actionType = formData.get("action")?.toString();
  const id = formData.get("id")?.toString();
  const title = formData.get("title")?.toString();
  const slug = formData.get("slug")?.toString();
  const description = formData.get("description")?.toString();

  console.log("FORM DATA:", Object.fromEntries(formData.entries()));

  if (actionType === "add") {
    if (!title) {
      return { success: false, message: "Title is required" };
    }
    if (!slug) {
      return { success: false, message: "Slug is required" };
    }

    await addBlogCategory({
      name: title,
      slug,
      description,
    });

    revalidatePath("/blogcategory");

    return { success: true, message: "Category Added successfully!" };
  }

  if (actionType === "update") {
    if (!id) return { success: false, message: "Id is required" };
    const res = await updateBlogCategory(Number(id), {
      name: title,
      slug,
      description,
    });
    revalidatePath("/blogcategory");
    if (res.error) {
      return { success: false, message: res.error };
    }
    return { success: true, message: "Category Updated Successfully!" };
  }

  if (actionType === "delete") {
    if (!id) return { success: false, message: "Id is required" };

    await deleteBlogCategory(Number(id));
    revalidatePath("/blogcategory");

    return { success: true, message: "Category Deleted successfully!" };
  }

  return { success: false, message: "Invalid action" };
}

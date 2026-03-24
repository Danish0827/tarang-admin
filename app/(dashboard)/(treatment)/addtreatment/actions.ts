"use server";

import { revalidatePath } from "next/cache";
import { addTreatment, deleteTreatment, updateTreatment } from "./api";
import { redirect } from "next/navigation";

export async function handleTreatmentAction(
  prevState: { success: boolean; message: string },
  formData: FormData
): Promise<{ success: boolean; message: string }> {

  console.log(formData, "formDataformDataformDataformDataformData");

  const cleanedData: Record<string, any> = {};

  for (const [key, value] of formData.entries()) {
    cleanedData[key] = value;
  }

  const actionType = cleanedData.action;
  console.log(actionType);
  
  const id = cleanedData.id;

  if (actionType === "add") {
    if (!cleanedData.title) return { success: false, message: "Title is required" };
    if (!cleanedData.slug) return { success: false, message: "Slug is required" };

    const res = await addTreatment(cleanedData);
    revalidatePath("/alltreatment");
    revalidatePath("/addtreatment");
    redirect("/alltreatment")
    return { success: true, message: "Treatment Added successfully!" };
  }

  if (actionType === "edit") {
    if (!id) return { success: false, message: "Id is required" };

    const res = await updateTreatment(Number(id), cleanedData);
    if (res?.error) return { success: false, message: res.error };
    revalidatePath("/alltreatment");
    revalidatePath("/addtreatment");
    redirect("/alltreatment")
    return { success: true, message: "Treatment Updated Successfully!" };
  }

  if (actionType === "delete") {
    if (!id) return { success: false, message: "Id is required" };
    await deleteTreatment(Number(id));
    revalidatePath("/alltreatment");
    return { success: true, message: "Treatment Deleted successfully!" };
  }

  return { success: false, message: "Invalid action" };
}
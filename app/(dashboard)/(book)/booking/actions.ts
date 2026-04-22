"use server";

import { revalidatePath } from "next/cache";
import { bookingCancel, bookingReschedule } from "./api";

export async function handleBookingAction(
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const bookingId = formData.get("id")?.toString();
  const actionType = formData.get("action")?.toString();
  const newDate = formData.get("newDate")?.toString();
  const newTime = formData.get("newTime")?.toString();
  const note = formData.get("note")?.toString();
  const cancelNote = formData.get("cancelNote")?.toString();
  console.log(bookingId,"bookingId");
  
    
  if (!bookingId) {
    return { success: false, message: "Id is required" };
  }

  if (actionType === "edit") {
    if (!newDate && !newTime) {
      return { success: false, message: "Date & Time is required" };
    }
    if (!note) {
      return { success: false, message: "Reason is required" };
    }
    await bookingReschedule({
      bookingId:bookingId,
      newDate,
      newTime,
      note
    });
    revalidatePath("/booking");
    revalidatePath("/history");
    return { success: true, message: "Booking Reschedule successfully!" };
  }

  if (actionType === "cancel") {
    if (!bookingId) return { success: false, message: "Id is required" };

    await bookingCancel({ bookingId:bookingId, cancelNote });
    revalidatePath("/booking");
    revalidatePath("/history");


    return { success: true, message: "Booking Cancelled successfully!" };
  }



  return { success: true, message: "Contact Deleted successfully" };
}
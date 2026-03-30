import { userVerify } from "@/lib/api";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("access_token")?.value;
        if (!accessToken) {
          throw new UploadThingError("No token found");
        }
        const decoded: any = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);
        return { userId: decoded.user_id };
      } catch (err) {
        console.error("UPLOADTHING ERROR:", err);
        throw err;
      }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // console.log("Upload complete for userId:", metadata.userId);
      // console.log("file url:", file.ufsUrl);
      // ${process.env.NEXT_PUBLIC_BACKEND_URL}
      try {
        const res = await fetch(`/api/images`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: metadata.userId,
            url: file.ufsUrl,
            fileKey: file.key,
            title: '',
            alt_text: '',
            caption: file.name,
            is_featured: false,
          }),
        });
        const data = await res.json();
        // console.log("DB Saved:", data);
      } catch (error) {
        console.error("DB save error:", error);
      }

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function POST(req: Request) {
  try {
    const { key } = await req.json();

    if (!key) {
      return Response.json({ error: "Key missing" }, { status: 400 });
    }

    await utapi.deleteFiles(key);

    return Response.json({ success: true });

  } catch (error) {
    return Response.json({ error: "Delete failed" }, { status: 500 });
  }
}

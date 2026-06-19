import { getImage } from "@/lib/rustfs/s3-server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const key = path.join("/");
  const result = await getImage(key);

  if (!result) {
    return new Response(null, { status: 404 });
  }

  return new Response(result.data.buffer as ArrayBuffer, {
    headers: {
      "Content-Type": result.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

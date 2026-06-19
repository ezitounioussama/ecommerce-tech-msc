import type { Readable } from "node:stream";

const RUSTFS_URL = process.env.RUSTFS_URL || "http://localhost:9000";
const RUSTFS_ACCESS_KEY = process.env.RUSTFS_ACCESS_KEY || "rustfsadmin";
const RUSTFS_SECRET_KEY = process.env.RUSTFS_SECRET_KEY || "rustfsadmin";

const BUCKET = "msc-storage";

let s3Module: Awaited<ReturnType<typeof loadS3>> | null = null;

async function loadS3() {
  return eval(`import("@aws-sdk/client-s3")`);
}

async function getS3Module() {
  if (!s3Module) {
    s3Module = await loadS3();
  }
  return s3Module;
}

async function createClient() {
  const { S3Client } = await getS3Module();
  return new S3Client({
    endpoint: RUSTFS_URL,
    region: "us-east-1",
    credentials: {
      accessKeyId: RUSTFS_ACCESS_KEY,
      secretAccessKey: RUSTFS_SECRET_KEY,
    },
    forcePathStyle: true,
  });
}

export async function ensureBucket(): Promise<void> {
  const client = await createClient();
  const { CreateBucketCommand } = await getS3Module();
  try {
    await client.send(new CreateBucketCommand({ Bucket: BUCKET }));
  } catch {
    // bucket already exists
  }
}

export async function uploadImage(
  key: string,
  buffer: Buffer,
  contentType: string,
): Promise<string> {
  const client = await createClient();
  const { PutObjectCommand } = await getS3Module();
  await client.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: `msc-website-public-images/${key}`,
      Body: buffer,
      ContentType: contentType,
    }),
  );
  return `/api/images/msc-website-public-images/${key}`;
}

export async function getImage(
  key: string,
): Promise<{ data: Buffer; contentType: string } | null> {
  const client = await createClient();
  const { GetObjectCommand } = await getS3Module();
  try {
    const result = await client.send(
      new GetObjectCommand({
        Bucket: BUCKET,
        Key: key,
      }),
    );

    const stream = result.Body as Readable;
    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk as Buffer);
    }
    const data = Buffer.concat(chunks);

    return {
      data,
      contentType: result.ContentType || "application/octet-stream",
    };
  } catch {
    return null;
  }
}

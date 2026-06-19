import { S3Client, CreateBucketCommand, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import type { Readable } from "node:stream";

const RUSTFS_URL = process.env.RUSTFS_URL || "http://localhost:9000";
const RUSTFS_ACCESS_KEY = process.env.RUSTFS_ACCESS_KEY || "rustfsadmin";
const RUSTFS_SECRET_KEY = process.env.RUSTFS_SECRET_KEY || "rustfsadmin";

const BUCKET = "msc-storage";

let client: S3Client | null = null;

function getClient(): S3Client {
  if (!client) {
    client = new S3Client({
      endpoint: RUSTFS_URL,
      region: "us-east-1",
      credentials: {
        accessKeyId: RUSTFS_ACCESS_KEY,
        secretAccessKey: RUSTFS_SECRET_KEY,
      },
      forcePathStyle: true,
    });
  }
  return client;
}

export async function ensureBucket(): Promise<void> {
  try {
    await getClient().send(new CreateBucketCommand({ Bucket: BUCKET }));
  } catch {
    // bucket already exists
  }
}

export async function uploadImage(
  key: string,
  buffer: Buffer,
  contentType: string,
): Promise<string> {
  await getClient().send(
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
  try {
    const result = await getClient().send(
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

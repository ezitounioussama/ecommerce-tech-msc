const RUSTFS_URL = process.env.RUSTFS_URL;
const RUSTFS_SECRET_KEY = process.env.RUSTFS_SECRET_KEY;

if (!RUSTFS_URL || !RUSTFS_SECRET_KEY) {
  throw new Error("RUSTFS_URL and RUSTFS_SECRET_KEY environment variables are required");
}

export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${RUSTFS_URL}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RUSTFS_SECRET_KEY}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload file");
  }

  const data = await response.json();
  return data.url;
}

export async function deleteFile(url: string): Promise<void> {
  const response = await fetch(`${RUSTFS_URL}/delete`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${RUSTFS_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete file");
  }
}

import { auth, currentUser } from "@clerk/nextjs/server";

export async function getAuthUserId(): Promise<string | null> {
  const session = await auth();
  return session.userId;
}

export async function getCurrentUser() {
  return currentUser();
}

export async function isAdmin(): Promise<boolean> {
  const user = await currentUser();
  if (!user) return false;
  return user.publicMetadata.role === "admin";
}

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user || user.publicMetadata?.role !== "admin") {
    redirect("/");
  }

  return <AdminSidebar>{children}</AdminSidebar>;
}

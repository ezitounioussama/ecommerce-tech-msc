import { NavbarWrapper } from "@/components/store/navbar-wrapper";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarWrapper />
      {children}
    </>
  );
}

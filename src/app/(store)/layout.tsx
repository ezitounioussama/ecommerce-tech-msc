import { NavbarWrapper } from "@/components/store/navbar-wrapper";
import { Footer } from "@/components/store/footer";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarWrapper />
      {children}
      <Footer />
    </>
  );
}

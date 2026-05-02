"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingActions from "./FloatingActions";

export default function LayoutWrapper({ 
  children, 
  initialData 
}: { 
  children: React.ReactNode;
  initialData: any;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar initialData={initialData} />
      <main className="flex-1 pt-20 lg:pt-32">{children}</main>
      <Footer />
      <FloatingActions />
    </>
  );
}

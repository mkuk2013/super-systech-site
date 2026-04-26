import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  title: "Super Sys-Tech Computers Centre Umerkot | Since 1997",
  description:
    "STC Umerkot - Where Dreams Are Polished Into Skills. SBTE, NAVTTC, STEVTA certified programs in IT, Graphic Design, Web Development, E-Commerce, Freelancing and more.",
  keywords: "STC Umerkot, Super Sys-Tech, computer institute, DIT, SBTE, NAVTTC, Umerkot, computer courses, freelancing, ecommerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white antialiased">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}

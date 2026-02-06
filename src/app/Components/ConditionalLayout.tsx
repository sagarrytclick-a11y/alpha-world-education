"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthRoute = pathname === '/login' || pathname === '/sign-up';
  const shouldShowNavbarFooter = !isAuthRoute;

  return (
    <>
      {shouldShowNavbarFooter && <Navbar />}
      <div className={shouldShowNavbarFooter ? "pt-20 lg:pt-28" : ""}>
        {children}
      </div>
      {shouldShowNavbarFooter && <Footer />}
    </>
  );
}

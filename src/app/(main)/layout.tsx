"use client";

import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="viewport-fix">
      <Navbar />
      <div className="pt-20 lg:pt-28">
        {children}
      </div>
      <Footer />
    </div>
  );
}

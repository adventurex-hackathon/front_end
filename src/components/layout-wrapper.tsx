"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/sections/navbar";
import { HomeNavbar } from "@/components/sections/home-navbar";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth");
  const isAppPage = pathname === "/home" || pathname === "/dashboard";
  const isGraphPage = pathname === "/graph";

  if (isAuthPage) {
    return <>{children}</>;
  }

  if (isGraphPage) {
    return (
      <>
        <HomeNavbar />
        {children}
      </>
    );
  }

  return (
    <div className="max-w-7xl mx-auto border-x relative">
      <div className="block w-px h-full border-l border-border absolute top-0 left-6 z-10"></div>
      <div className="block w-px h-full border-r border-border absolute top-0 right-6 z-10"></div>
      {isAppPage ? <HomeNavbar /> : <Navbar />}
      {children}
    </div>
  );
}

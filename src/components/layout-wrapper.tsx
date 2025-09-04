"use client";

import { HomeNavbar } from "@/components/sections/home-navbar";
import { Navbar } from "@/components/sections/navbar";
import { usePathname } from "next/navigation";

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
    <div className="relative mx-auto max-w-7xl border-x">
      <div className="border-border absolute top-0 left-6 z-10 block h-full w-px border-l"></div>
      <div className="border-border absolute top-0 right-6 z-10 block h-full w-px border-r"></div>
      {isAppPage ? <HomeNavbar /> : <Navbar />}
      {children}
    </div>
  );
}

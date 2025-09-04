import { siteConfig } from "@/lib/config";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CompanyShowcase() {
  const { companyShowcase } = siteConfig;
  return (
    <section
      id="company"
      className="relative flex w-full flex-col items-center justify-center gap-10 px-6 py-10 pt-20"
    >
      <p className="text-muted-foreground font-medium">
        Trusted by the world's top universities
      </p>
      <div className="border-border z-20 grid w-full max-w-7xl grid-cols-2 items-center justify-center overflow-hidden border-y md:grid-cols-4">
        {companyShowcase.companyLogos.map((logo) => (
          <Link
            href="#"
            className="group before:bg-border after:bg-border relative flex h-28 w-full items-center justify-center p-4 before:absolute before:top-0 before:-left-1 before:z-10 before:h-screen before:w-px before:content-[''] after:absolute after:-top-1 after:left-0 after:z-10 after:h-px after:w-screen after:content-['']"
            key={logo.id}
          >
            <div className="[cubic-bezier(0.165, 0.84, 0.44, 1)] flex h-full w-full translate-y-0 items-center justify-center transition-all duration-200 group-hover:-translate-y-4">
              {logo.logo}
            </div>
            <div className="ease-[cubic-bezier(0.165, 0.84, 0.44, 1)] absolute inset-0 flex translate-y-8 items-center justify-center opacity-0 transition-all duration-300 group-hover:translate-y-4 group-hover:opacity-100">
              <span className="flex items-center gap-2 text-sm font-medium">
                Learn More <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

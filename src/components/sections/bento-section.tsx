"use client";

import { SectionHeader } from "@/components/section-header";
import { siteConfig } from "@/lib/config";

export function BentoSection() {
  const { title, description, items } = siteConfig.bentoSection;

  return (
    <section
      id="bento"
      className="relative flex w-full flex-col items-center justify-center px-5 md:px-10"
    >
      <div className="relative mx-5 border-x md:mx-10">
        <div className="text-primary/5 absolute top-0 -left-4 h-full w-4 [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] bg-[size:10px_10px] md:-left-14 md:w-14"></div>
        <div className="text-primary/5 absolute top-0 -right-4 h-full w-4 [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)] bg-[size:10px_10px] md:-right-14 md:w-14"></div>

        <SectionHeader>
          <h2 className="pb-1 text-center text-3xl font-medium tracking-tighter text-balance md:text-4xl">
            {title}
          </h2>
          <p className="text-muted-foreground text-center font-medium text-balance">
            {description}
          </p>
        </SectionHeader>

        <div className="grid grid-cols-1 overflow-hidden md:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="before:bg-border after:bg-border group group relative flex max-h-[400px] min-h-[600px] cursor-pointer flex-col items-start justify-end p-0.5 before:absolute before:top-0 before:-left-0.5 before:z-10 before:h-screen before:w-px before:content-[''] after:absolute after:-top-0.5 after:left-0 after:z-10 after:h-px after:w-screen after:content-[''] md:min-h-[500px]"
            >
              <div className="relative flex size-full h-full items-center justify-center overflow-hidden">
                {item.content}
              </div>
              <div className="flex-1 flex-col gap-2 p-6">
                <h3 className="text-lg font-semibold tracking-tighter">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

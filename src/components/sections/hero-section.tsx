import { HeroVideoSection } from "@/components/sections/hero-video-section";
import { siteConfig } from "@/lib/config";
import Link from "next/link";

export function HeroSection() {
  const { hero } = siteConfig;

  return (
    <section id="hero" className="relative w-full">
      <div className="relative flex w-full flex-col items-center px-6">
        <div className="absolute inset-0">
          <div className="absolute inset-0 -z-10 h-[600px] w-full rounded-b-xl [background:radial-gradient(125%_125%_at_50%_10%,var(--background)_40%,var(--secondary)_100%)] md:h-[800px]"></div>
        </div>
        <div className="relative z-10 mx-auto flex h-full w-full max-w-3xl flex-col items-center justify-center gap-10 pt-32">
          <p className="border-border bg-accent flex h-8 items-center gap-2 rounded-full border px-3 text-sm">
            {hero.badgeIcon}
            {hero.badge}
          </p>
          <div className="flex flex-col items-center justify-center gap-5">
            <h1 className="text-primary text-center text-3xl font-medium tracking-tighter text-balance md:text-4xl lg:text-5xl xl:text-6xl">
              {hero.title}
            </h1>
            <p className="text-muted-foreground text-center text-base leading-relaxed font-medium tracking-tight text-balance md:text-lg">
              {hero.description}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Link
              href={hero.cta.primary.href}
              className="bg-secondary text-primary-foreground dark:text-secondary-foreground hover:bg-secondary/80 flex h-9 w-32 items-center justify-center rounded-full border border-white/[0.12] px-4 text-sm font-normal tracking-wide shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_3px_3px_-1.5px_rgba(16,24,40,0.06),0_1px_1px_rgba(16,24,40,0.08)] transition-all ease-out active:scale-95"
            >
              {hero.cta.primary.text}
            </Link>
            <Link
              href={hero.cta.secondary.href}
              className="text-primary dark:bg-background dark:hover:bg-background/80 flex h-10 w-32 items-center justify-center rounded-full border border-[#E5E7EB] bg-white px-5 text-sm font-normal tracking-wide transition-all ease-out hover:bg-white/80 active:scale-95 dark:border-[#27272A]"
            >
              {hero.cta.secondary.text}
            </Link>
          </div>
        </div>
      </div>
      <HeroVideoSection />
    </section>
  );
}

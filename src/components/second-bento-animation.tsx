import { Icons } from "@/components/icons";
import { OrbitingCircles } from "@/components/ui/orbiting-circle";

export function SecondBentoAnimation() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="from-background pointer-events-none absolute bottom-0 left-0 z-20 h-20 w-full bg-gradient-to-t to-transparent"></div>
      <div className="from-background pointer-events-none absolute top-0 left-0 z-20 h-20 w-full bg-gradient-to-b to-transparent"></div>

      <div className="bg-secondary absolute top-1/2 left-1/2 z-30 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 rounded-full p-2 md:top-auto md:bottom-0">
        <Icons.logo className="size-10 fill-white" />
      </div>
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
        <div className="relative flex h-full w-full translate-y-0 items-center justify-center md:translate-y-32">
          <OrbitingCircles
            index={0}
            iconSize={60}
            radius={100}
            reverse
            speed={1}
          >
            <Icons.boat />
            <Icons.supabase />
            <Icons.figma />
          </OrbitingCircles>

          <OrbitingCircles index={1} iconSize={60} speed={0.5}>
            <Icons.workos />
            <Icons.runwayml />
            <Icons.gemini />
          </OrbitingCircles>

          <OrbitingCircles
            index={2}
            iconSize={60}
            radius={230}
            reverse
            speed={0.5}
          >
            <Icons.vercel />
            <Icons.replit />
            <Icons.posthog />
          </OrbitingCircles>
        </div>
      </div>
    </div>
  );
}

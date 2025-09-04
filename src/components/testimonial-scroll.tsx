/* eslint-disable @next/next/no-img-element */
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

export interface TestimonialCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  role: string;
  img?: string;
  description: React.ReactNode;
  className?: string;
}

export const TestimonialCard = ({
  description,
  name,
  img,
  role,
  className,
  ...props
}: TestimonialCardProps) => (
  <div
    className={cn(
      "flex w-full cursor-pointer break-inside-avoid flex-col items-center justify-between gap-6 rounded-xl p-4",
      // light styles
      "bg-accent",
      "shadow-[0px_0px_0px_1px_rgba(0,0,0,0.04),0px_8px_12px_-4px_rgba(15,12,12,0.08),0px_1px_2px_0px_rgba(15,12,12,0.10)] dark:shadow-[0px_0px_0px_1px_rgba(250,250,250,0.1),0px_0px_0px_1px_#18181B,0px_8px_12px_-4px_rgba(15,12,12,0.3),0px_1px_2px_0px_rgba(15,12,12,0.3)]",
      className,
    )}
    {...props}
  >
    <div className="text-primary/90 leading-relaxed font-normal select-none">
      {description}
    </div>

    <div className="flex w-full items-center justify-start gap-3.5 select-none">
      <img src={img} alt={name} className="size-8 rounded-full" />

      <div>
        <p className="text-primary/90 font-medium">{name}</p>
        <p className="text-primary/50 text-xs font-normal">{role}</p>
      </div>
    </div>
  </div>
);

interface Testimonial {
  id: string;
  name: string;
  role: string;
  img: string;
  description: React.ReactNode;
}

export function SocialProofTestimonials({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  return (
    <div className="h-full">
      <div className="px-10">
        <div className="relative max-h-[750px] overflow-hidden">
          <div className="gap-0 md:columns-2 xl:columns-3">
            {Array(Math.ceil(testimonials.length / 3))
              .fill(0)
              .map((_, i) => (
                <Marquee
                  vertical
                  key={i}
                  className={cn({
                    "[--duration:60s]": i === 1,
                    "[--duration:30s]": i === 2,
                    "[--duration:70s]": i === 3,
                  })}
                >
                  {testimonials.slice(i * 3, (i + 1) * 3).map((card, idx) => (
                    <TestimonialCard {...card} key={idx} />
                  ))}
                </Marquee>
              ))}
          </div>
          <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/6 w-full bg-gradient-to-t from-20% md:h-1/5"></div>
          <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/6 w-full bg-gradient-to-b from-20% md:h-1/5"></div>
        </div>
      </div>
    </div>
  );
}

import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";

export function HeroVideoSection() {
  return (
    <div className="relative mt-10 px-6">
      <div className="relative size-full overflow-hidden rounded-2xl shadow-xl">
        <HeroVideoDialog
          className="block dark:hidden"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/fAlVM0YS02w?si=tWBtEw02W8NwVz66"
          thumbnailSrc="/thumbnail.jpg"
          thumbnailAlt="Hero Video"
        />
        <HeroVideoDialog
          className="hidden dark:block"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/fAlVM0YS02w?si=tWBtEw02W8NwVz66"
          thumbnailSrc="/thumbnail.jpg"
          thumbnailAlt="Hero Video"
        />
      </div>
    </div>
  );
}

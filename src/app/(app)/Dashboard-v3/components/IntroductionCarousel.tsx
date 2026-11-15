"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

type IntroductionCarouselProps = {
  bullets: string[];
};

export default function IntroductionCarousel({
  bullets,
}: IntroductionCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const id = window.setInterval(() => {
      api.scrollNext();
    }, 2800);
    return () => window.clearInterval(id);
  }, [api]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#2d4a3e]"
        />

        <Carousel
          opts={{ loop: true, align: "start" }}
          setApi={setApi}
          className="min-w-0 flex-1"
        >
          <CarouselContent className="-ml-0">
            {bullets.map((bullet, index) => (
              <CarouselItem key={index} className="basis-full pl-0">
                <p className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.16em] text-[#4a554c]">
                  {bullet}
                </p>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div
        className="flex items-center gap-2 pl-[0.875rem]"
        role="tablist"
        aria-label="Roles"
      >
        {bullets.map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={current === index}
            aria-label={`Show ${bullets[index]}`}
            onClick={() => api?.scrollTo(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              current === index
                ? "w-5 bg-[#2d4a3e]"
                : "w-1.5 bg-[#1c2430]/25 hover:bg-[#1c2430]/45"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

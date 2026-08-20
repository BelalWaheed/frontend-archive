"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselPlugin() {
  const autoplayRef = React.useRef(
    Autoplay({
      delay: 1000,
      stopOnInteraction: true,
    }),
  );

  React.useEffect(() => {
    const stopTimer = setTimeout(() => {
      autoplayRef.current.stop();
    }, 9000);

    return () => clearTimeout(stopTimer);
  }, []);

  return (
    <Carousel
      plugins={[autoplayRef.current]}
      className="w-full max-w-xs"
      onMouseEnter={() => autoplayRef.current.stop()}
      onMouseLeave={() => autoplayRef.current.play()}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

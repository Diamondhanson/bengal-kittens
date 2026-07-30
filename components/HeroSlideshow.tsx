"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Full-bleed crossfading background slideshow with a soft cream overlay so the
 * hero copy stays readable on top of it.
 */
export function HeroSlideshow({
  images,
  interval = 5500,
}: {
  images: string[];
  interval?: number;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((current) => (current + 1) % images.length),
      interval
    );
    return () => clearInterval(id);
  }, [images.length, interval]);

  return (
    <>
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        {images.map((src, i) => (
          <div
            key={src}
            className={`hero-slide absolute inset-0 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover ${i === active ? "animate-slow-zoom" : ""}`}
            />
          </div>
        ))}
        {/* Readability overlays: strong on the text side, airy on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-cream-50 via-cream-50/85 to-cream-50/25" />
        <div className="absolute inset-0 bg-cream-50/50 sm:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cream-50 to-transparent" />
      </div>

      <div className="absolute bottom-6 right-6 z-10 hidden sm:flex gap-2">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            aria-label={`Show photo ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === active
                ? "w-7 bg-clay-500"
                : "w-2.5 bg-ink-300/60 hover:bg-clay-400"
            }`}
          />
        ))}
      </div>
    </>
  );
}

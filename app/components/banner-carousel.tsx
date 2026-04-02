"use client";

import { useEffect, useState } from "react";

export type BannerImage = {
  id: number;
  src: string;
  alt: string;
};

type BannerCarouselProps = {
  images: BannerImage[];
};

export default function BannerCarousel({ images }: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    if (!hasMultipleImages) return;

    const interval = window.setInterval(() => {
      setCurrentIndex((previousIndex) => (previousIndex + 1) % images.length);
    }, 10000);

    return () => window.clearInterval(interval);
  }, [hasMultipleImages, images.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((previousIndex) => (previousIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((previousIndex) => (previousIndex + 1) % images.length);
  };

  return (
    <section className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image) => (
          <div key={image.id} className="w-full shrink-0">
            <img src={image.src} alt={image.alt} className="h-[260px] w-full object-cover md:h-[420px]" />
          </div>
        ))}
      </div>

      {hasMultipleImages && (
        <>
          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Imagem anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-slate-900/65 px-4 py-3 text-xl font-bold text-white transition hover:bg-slate-900"
          >
            {"<"}
          </button>

          <button
            type="button"
            onClick={goToNext}
            aria-label="Proxima imagem"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-slate-900/65 px-4 py-3 text-xl font-bold text-white transition hover:bg-slate-900"
          >
            {">"}
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-slate-900/50 px-3 py-2">
            {images.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Ir para banner ${index + 1}`}
                className={`h-3 w-3 rounded-full transition ${
                  currentIndex === index ? "bg-white" : "bg-white/45"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

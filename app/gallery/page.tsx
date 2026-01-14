"use client";
import { useEffect, useRef, useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { supabase } from "@/lib/supabaseClient"
import MainShell from "@/components/layout/MainShell";

export default function GalleryPage() {
  return (
    <MainShell enableScrollNav={false}>
      <section className="pb-20">
        <GallerySection />
      </section>
    </MainShell>
  );
}


const GallerySection = () => {
  const galleryImages = [
    "/gallery1.jpg",
    "/gallery2.jpg",
    "/gallery3.jpg",
    "/gallery4.JPG",
    "/gallery5.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () =>
    setCurrentIndex((p) => (p + 1) % galleryImages.length);
  const prevSlide = () =>
    setCurrentIndex((p) => (p - 1 + galleryImages.length) % galleryImages.length);

  // Auto-play effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  return (
    <section id="gallery" className="relative z-10 w-full min-h-fit py-8 md:py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-pixel text-3xl md:text-5xl mb-8 text-green-400 tracking-wide">
          GALLERY
        </h2>

        {/* Carousel container */}
        <div className="relative overflow-hidden rounded-xl border border-green-500/40 bg-black/30 backdrop-blur-sm shadow-xl">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {galleryImages.map((img, i) => (
              <div key={i} className="w-full flex-shrink-0">
                <img
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-60 sm:h-80 md:h-[450px] object-cover"
                />
              </div>
            ))}
          </div>

          {/* --- Navigation Arrows --- */}
          <button
            onClick={prevSlide}
            aria-label="Previous"
            className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 z-30 h-10 w-10 sm:h-12 sm:w-12 
                       rounded-full bg-green-500/80 text-black text-xl font-bold shadow-lg 
                       hover:bg-green-400 transition-all flex items-center justify-center cursor-pointer"
          >
            ←
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next"
            className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 z-30 h-10 w-10 sm:h-12 sm:w-12 
                       rounded-full bg-green-500/80 text-black text-xl font-bold shadow-lg 
                       hover:bg-green-400 transition-all flex items-center justify-center cursor-pointer"
          >
            →
          </button>
        </div>

        {/* --- Dots Mapping --- */}
        <div className="mt-6 flex justify-center gap-3 relative z-20">
          {galleryImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-3 w-3 sm:h-4 sm:w-4 rounded-full border border-white/20 transition-all duration-300 ${currentIndex === i
                ? "bg-green-400 scale-125 shadow-[0_0_10px_rgba(74,222,128,0.8)]"
                : "bg-gray-700 hover:bg-gray-500"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

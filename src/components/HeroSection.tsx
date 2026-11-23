import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { HERO_SLIDES } from '../data/catalog';
import { BrandFilter, NavCategory } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { Navbar } from './Navbar';

interface HeroSectionProps {
  activeCategory: NavCategory;
  onSelectCategory: (category: NavCategory) => void;
  onShopNow: (category: NavCategory, brand: BrandFilter) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
}

export function HeroSection({
  activeCategory,
  onSelectCategory,
  onShopNow,
  cartCount,
  wishlistCount,
  onOpenSearch,
  onOpenAccount,
  onOpenWishlist,
  onOpenCart,
}: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentSlide = HERO_SLIDES[activeIndex];
  const nextSlide = HERO_SLIDES[(activeIndex + 1) % HERO_SLIDES.length];

  useEffect(() => {
    if (isPaused) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section
      id="top"
      aria-label="Featured sneaker campaign"
      className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[680px] flex flex-col justify-between overflow-hidden"
      style={{ backgroundColor: currentSlide.backdropHex }}
    >
      {/* Background Campaign Photography */}
      <div className="absolute inset-0">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-out ${
              idx === activeIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <ImageWithFallback
              src={slide.image}
              alt={slide.imageAlt}
              fallbackTitle={slide.headlineLines.join(' ')}
              className="w-full h-full object-cover object-center sm:object-[70%_center]"
            />
          </div>
        ))}

        {/* Contrast scrims ensuring WCAG AA text contrast on left and top */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#4A3B2B]/75 via-[#5F4D39]/30 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/30 to-transparent"
        />
      </div>

      {/* Integrated Transparent Header */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={onSelectCategory}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onOpenSearch={onOpenSearch}
        onOpenAccount={onOpenAccount}
        onOpenWishlist={onOpenWishlist}
        onOpenCart={onOpenCart}
      />

      {/* Hero Headline & Bottom Controls */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 pb-12 sm:pb-16 lg:pb-20 pt-10 flex flex-col justify-end flex-1">
        <div className="max-w-xl lg:max-w-2xl">
          <h1 className="font-display-soft font-extrabold text-[44px] sm:text-[58px] lg:text-[68px] leading-[0.98] tracking-[-0.02em] text-[#F5EFE6] [text-wrap:balance]">
            {currentSlide.headlineLines.map((line, idx) => (
              <span key={idx} className="block">
                {line}
              </span>
            ))}
          </h1>

          <div className="mt-8">
            <button
              type="button"
              onClick={() => onShopNow(currentSlide.targetCategory, currentSlide.targetBrand)}
              className="inline-flex items-center justify-center bg-[#F2ECE1] hover:bg-white text-[#181614] px-7 py-3.5 rounded-xl text-[13.5px] font-semibold tracking-[-0.01em] transition-all duration-150 shadow-sm hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap"
            >
              {currentSlide.ctaLabel}
            </button>
          </div>
        </div>

        {/* Bottom-Right Carousel Controls */}
        <div className="mt-8 sm:mt-0 sm:absolute sm:bottom-8 sm:right-10 lg:right-14 flex items-center gap-2.5 self-end">
          {/* Circular Preview / Play-Pause Ring */}
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            aria-label={isPaused ? 'Resume campaign slideshow' : 'Pause campaign slideshow'}
            title={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
            className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/85 bg-[#2A221A] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shrink-0"
          >
            <ImageWithFallback
              src={nextSlide.image}
              alt={`Next slide preview: ${nextSlide.headlineLines.join(' ')}`}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />
            <span className="absolute inset-0 bg-black/30 flex items-center justify-center text-white">
              {isPaused ? (
                <Play className="w-3.5 h-3.5 fill-white" />
              ) : (
                <Pause className="w-3.5 h-3.5 fill-white" />
              )}
            </span>
          </button>

          {/* Previous Slide Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous campaign slide"
            className="w-10 h-10 rounded-full bg-[#161513] hover:bg-black text-white inline-flex items-center justify-center transition-transform duration-150 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shrink-0"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={2} />
          </button>

          {/* Next Slide Arrow */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next campaign slide"
            className="w-10 h-10 rounded-full bg-[#161513] hover:bg-black text-white inline-flex items-center justify-center transition-transform duration-150 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shrink-0"
          >
            <ChevronRight className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}

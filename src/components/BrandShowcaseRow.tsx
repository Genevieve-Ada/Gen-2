import React from 'react';
import { SHOWCASE_CARDS } from '../data/catalog';
import { BrandFilter, NavCategory } from '../types';
import { NikeSwooshMark, PumaSilhouetteMark } from './Icons';
import { ImageWithFallback } from './ImageWithFallback';

interface BrandShowcaseRowProps {
  onSelectShowcase: (category: NavCategory, brand: BrandFilter) => void;
}

export function BrandShowcaseRow({ onSelectShowcase }: BrandShowcaseRowProps) {
  return (
    <section
      aria-label="Featured brand and style edits"
      className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 pt-12 pb-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
        {SHOWCASE_CARDS.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={() => onSelectShowcase(card.filterCategory, card.filterBrand)}
            className="group relative aspect-[4/3.1] w-full rounded-[20px] overflow-hidden bg-[#EAE4DA] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#181614] focus-visible:ring-offset-2"
          >
            <ImageWithFallback
              src={card.image}
              alt={card.imageAlt}
              fallbackTitle={card.title}
              className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            />

            {/* Top Brand Silhouettes for Card 1 & Card 2 */}
            {card.brandLogo === 'puma' && (
              <div className="absolute top-6 inset-x-0 flex justify-center pointer-events-none text-[#141311]">
                <PumaSilhouetteMark className="w-12 h-8" />
              </div>
            )}

            {card.brandLogo === 'nike' && (
              <div className="absolute top-7 inset-x-0 flex justify-center pointer-events-none text-[#141311]">
                <NikeSwooshMark className="w-14 h-5" />
              </div>
            )}

            {/* Condensed Bold Overlay for Style Stack Card */}
            {card.displayHeadline ? (
              <>
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/75 via-black/35 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-4 px-5 flex flex-col items-center text-center">
                  <span className="font-condensed font-extrabold text-[40px] sm:text-[46px] leading-[0.88] tracking-[0.02em] text-white drop-shadow-sm">
                    {card.displayHeadline}
                  </span>
                </div>
              </>
            ) : (
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-between px-5 pb-4"
              >
                <span className="text-xs font-medium text-white tracking-wide">
                  {card.title}
                </span>
                <span className="text-xs font-semibold text-white">Explore</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}

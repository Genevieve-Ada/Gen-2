import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PRODUCTS } from '../data/catalog';
import { Product } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface StorySectionProps {
  onSelectFeatured: (product: Product) => void;
}

export function StorySection({ onSelectFeatured }: StorySectionProps) {
  const featured = PRODUCTS[0];

  return (
    <section
      aria-labelledby="craft-heading"
      className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 pb-16"
    >
      <div className="rounded-[24px] bg-[#F5F2EC] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Copy Column */}
        <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 flex flex-col justify-between gap-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#7A6B5A]">
              Materials & Lasting
            </p>
            <h2
              id="craft-heading"
              className="mt-3 font-display-soft font-bold text-3xl sm:text-4xl leading-[1.06] tracking-[-0.015em] text-[#181614] [text-wrap:balance]"
            >
              Built Around Honest Leather and Gum Soles
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#574E44]">
              Every silhouette in our seasonal rotation pairs full-grain tumbled leather,
              unlined pigskin suede, and natural crepe or gum cupsoles engineered to break in
              with character rather than wear out.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onSelectFeatured(featured)}
              className="inline-flex items-center gap-2 bg-[#181614] hover:bg-[#312C26] text-white px-6 py-3.5 rounded-xl text-[13.5px] font-semibold transition-colors whitespace-nowrap"
            >
              Inspect Court Checker 88
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <span className="text-xs font-medium text-[#665C50]">
              Complimentary shipping over $150
            </span>
          </div>
        </div>

        {/* Media Column */}
        <div className="lg:col-span-7 min-h-[300px] lg:min-h-[420px]">
          <ImageWithFallback
            src="/src/assets/images/product_bone_court_1795423672693.jpg"
            alt="Bone-white tumbled leather and sand suede court sneakers with natural gum soles on travertine stone"
            fallbackTitle="Studio Bone Court"
            className="w-full h-full lg:h-full object-cover"
          />
        </div>
      </div>

      {/* Full-width service highlights strip below split */}
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-[#E7E1D7]">
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-[#7A6B5A]">Dispatch</p>
          <p className="mt-1 text-sm font-semibold text-[#181614] tabular-nums">
            Same-Day Before 2 PM
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-[#7A6B5A]">Sizing Guarantee</p>
          <p className="mt-1 text-sm font-semibold text-[#181614] tabular-nums">
            30-Day Free Exchanges
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-[#7A6B5A]">Authenticity</p>
          <p className="mt-1 text-sm font-semibold text-[#181614] tabular-nums">
            100% Verified Archive
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-[#7A6B5A]">Care Included</p>
          <p className="mt-1 text-sm font-semibold text-[#181614] tabular-nums">
            Spare Cotton Laces
          </p>
        </div>
      </div>
    </section>
  );
}

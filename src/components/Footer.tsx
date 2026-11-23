import React from 'react';
import { BrandFilter, NavCategory } from '../types';
import { ConwerseLogoMark } from './Icons';

interface FooterProps {
  onSelectCategory: (category: NavCategory, brand?: BrandFilter) => void;
}

export function Footer({ onSelectCategory }: FooterProps) {
  const jumpToCatalog = (category: NavCategory, brand: BrandFilter = 'All') => {
    onSelectCategory(category, brand);
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="border-t border-[#E7E1D7] bg-white">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <div className="inline-flex items-center gap-2.5 text-[#181614]">
            <span className="w-7 h-7 rounded-full bg-[#181614] inline-flex items-center justify-center">
              <ConwerseLogoMark className="w-5 h-5" />
            </span>
            <span className="font-display-soft font-bold text-xl tracking-[-0.015em]">
              Conwerse
            </span>
          </div>
          <p className="mt-2 text-xs text-[#665C50]">
            Curated studio sneakers and everyday outerwear.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#574E44]">
          <button
            type="button"
            onClick={() => jumpToCatalog('Women')}
            className="hover:text-[#181614] transition-colors"
          >
            Women
          </button>
          <button
            type="button"
            onClick={() => jumpToCatalog('Men')}
            className="hover:text-[#181614] transition-colors"
          >
            Men
          </button>
          <button
            type="button"
            onClick={() => jumpToCatalog('Kids')}
            className="hover:text-[#181614] transition-colors"
          >
            Kids
          </button>
          <button
            type="button"
            onClick={() => jumpToCatalog('Collection')}
            className="hover:text-[#181614] transition-colors"
          >
            Style Stack
          </button>
          <button
            type="button"
            onClick={() => jumpToCatalog('Brands', 'Nike')}
            className="hover:text-[#181614] transition-colors"
          >
            Nike Edit
          </button>
          <button
            type="button"
            onClick={() => jumpToCatalog('Brands', 'Puma')}
            className="hover:text-[#181614] transition-colors"
          >
            Puma Archive
          </button>
        </nav>

        <p className="text-xs text-[#7A6B5A]">© 2026 Conwerse Footwear. All rights reserved.</p>
      </div>
    </footer>
  );
}

import React, { useState } from 'react';
import { Heart, Menu, Search, ShoppingCart, User, X } from 'lucide-react';
import { NAV_LINKS } from '../data/catalog';
import { NavCategory } from '../types';
import { ConwerseLogoMark } from './Icons';

interface NavbarProps {
  activeCategory: NavCategory;
  onSelectCategory: (category: NavCategory) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
}

export function Navbar({
  activeCategory,
  onSelectCategory,
  cartCount,
  wishlistCount,
  onOpenSearch,
  onOpenAccount,
  onOpenWishlist,
  onOpenCart,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (cat: NavCategory) => {
    onSelectCategory(cat);
    setMobileMenuOpen(false);
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="relative z-30 w-full">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 h-20 flex items-center justify-between gap-6 lg:gap-8">
        {/* Zone 1: Brand wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onSelectCategory('All');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2.5 text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-lg py-1"
        >
          <ConwerseLogoMark className="w-7 h-7 shrink-0" />
          <span className="font-display-soft font-bold text-[22px] tracking-[-0.015em] leading-none">
            Conwerse
          </span>
        </a>

        {/* Zone 2: Single-line navigation links */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-6 lg:gap-8 text-[13.5px] font-medium text-white/90"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeCategory === link;
            return (
              <button
                key={link}
                type="button"
                onClick={() => handleNavClick(link)}
                className={`relative py-2 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded ${
                  isActive ? 'text-white' : 'text-white/85'
                }`}
              >
                {link}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 bottom-1 h-[1.5px] bg-white transition-transform duration-150 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Utility icon actions */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search sneakers"
            className="w-10 h-10 inline-flex items-center justify-center rounded-full text-white/95 hover:text-white hover:bg-white/10 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Search className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </button>

          <button
            type="button"
            onClick={onOpenAccount}
            aria-label="Member account"
            className="w-10 h-10 inline-flex items-center justify-center rounded-full text-white/95 hover:text-white hover:bg-white/10 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <User className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </button>

          <button
            type="button"
            onClick={onOpenWishlist}
            aria-label={`Saved items (${wishlistCount})`}
            className="relative w-10 h-10 inline-flex items-center justify-center rounded-full text-white/95 hover:text-white hover:bg-white/10 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Heart className="w-[18px] h-[18px]" strokeWidth={1.75} />
            {wishlistCount > 0 && (
              <span className="absolute top-1.5 right-1 min-w-[16px] h-[16px] px-1 rounded-full bg-white/95 text-[#181614] text-[10px] font-bold leading-none inline-flex items-center justify-center tabular-nums">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Shopping bag (${cartCount} items)`}
            className="relative w-10 h-10 inline-flex items-center justify-center rounded-full text-white/95 hover:text-white hover:bg-white/10 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ShoppingCart className="w-[18px] h-[18px]" strokeWidth={1.75} />
            {cartCount > 0 && (
              <span className="absolute top-1.5 right-0.5 min-w-[17px] h-[17px] px-1 rounded-full bg-white text-[#181614] text-[10px] font-bold leading-none inline-flex items-center justify-center tabular-nums shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden w-11 h-11 inline-flex items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#2A221A]/95 backdrop-blur-md border-t border-white/15 px-6 py-4">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                type="button"
                onClick={() => handleNavClick(link)}
                className={`text-left py-2.5 px-2 text-sm font-medium rounded-lg transition-colors ${
                  activeCategory === link
                    ? 'text-white bg-white/10'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                {link}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

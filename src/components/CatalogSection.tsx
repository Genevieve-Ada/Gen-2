import React, { useMemo, useState } from 'react';
import { Heart, Plus } from 'lucide-react';
import { PRODUCTS } from '../data/catalog';
import { BrandFilter, NavCategory, Product } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface CatalogSectionProps {
  activeCategory: NavCategory;
  activeBrand: BrandFilter;
  onChangeCategory: (category: NavCategory) => void;
  onChangeBrand: (brand: BrandFilter) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onQuickAdd: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

const CATEGORY_TABS: NavCategory[] = [
  'All',
  'Women',
  'Men',
  'Kids',
  'Accessories',
  'Collection',
];

const BRAND_FILTERS: BrandFilter[] = ['All', 'Conwerse', 'Nike', 'Puma'];

export function CatalogSection({
  activeCategory,
  activeBrand,
  onChangeCategory,
  onChangeBrand,
  wishlistIds,
  onToggleWishlist,
  onQuickAdd,
  onSelectProduct,
}: CatalogSectionProps) {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const filteredProducts = useMemo(() => {
    const base = PRODUCTS.filter((product) => {
      const matchesCat =
        activeCategory === 'All' ||
        activeCategory === 'Brands' ||
        product.categories.includes(activeCategory);
      const matchesBrand = activeBrand === 'All' || product.brand === activeBrand;
      return matchesCat && matchesBrand;
    });

    if (sortBy === 'price-asc') {
      return [...base].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...base].sort((a, b) => b.price - a.price);
    }
    return base;
  }, [activeCategory, activeBrand, sortBy]);

  return (
    <section
      id="catalog"
      aria-labelledby="catalog-heading"
      className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-12 lg:py-16"
    >
      {/* Header & Interactive Filters */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E7E1D7]">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#7A6B5A]">
            Seasonal Rotation
          </p>
          <h2
            id="catalog-heading"
            className="mt-1.5 font-display-soft font-bold text-3xl sm:text-4xl tracking-[-0.015em] text-[#181614]"
          >
            Curated Footwear Edit
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Category Segmented Tabs */}
          <div
            role="tablist"
            aria-label="Filter by category"
            className="flex flex-wrap items-center gap-1 p-1 bg-[#F5F2EC] rounded-xl"
          >
            {CATEGORY_TABS.map((cat) => {
              const selected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={selected}
                  type="button"
                  onClick={() => onChangeCategory(cat)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-colors duration-150 ${
                    selected
                      ? 'bg-white text-[#181614] shadow-sm'
                      : 'text-[#665C50] hover:text-[#181614]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Brand Filter */}
          <div className="flex items-center gap-1 p-1 bg-[#F5F2EC] rounded-xl">
            {BRAND_FILTERS.map((brand) => {
              const selected = activeBrand === brand;
              return (
                <button
                  key={brand}
                  type="button"
                  onClick={() => onChangeBrand(brand)}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-colors duration-150 ${
                    selected
                      ? 'bg-[#181614] text-white'
                      : 'text-[#665C50] hover:text-[#181614]'
                  }`}
                >
                  {brand === 'All' ? 'All Brands' : brand}
                </button>
              );
            })}
          </div>

          {/* Sort Select */}
          <label className="sr-only" htmlFor="catalog-sort">
            Sort products
          </label>
          <select
            id="catalog-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="h-10 px-3.5 rounded-xl border border-[#E2DDD3] bg-white text-xs font-semibold text-[#181614] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#181614]"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Active Filter Summary + Reset */}
      {(activeCategory !== 'All' || activeBrand !== 'All') && (
        <div className="mt-5 flex items-center justify-between text-xs text-[#665C50]">
          <span>
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
            {activeCategory !== 'All' ? ` · ${activeCategory}` : ''}
            {activeBrand !== 'All' ? ` · ${activeBrand}` : ''}
          </span>
          <button
            type="button"
            onClick={() => {
              onChangeCategory('All');
              onChangeBrand('All');
            }}
            className="font-semibold text-[#181614] underline underline-offset-4 hover:text-[#6F5A44]"
          >
            Reset filters
          </button>
        </div>
      )}

      {/* 3-Column Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-base font-medium text-[#181614]">
            No silhouettes match that combination yet.
          </p>
          <button
            type="button"
            onClick={() => {
              onChangeCategory('All');
              onChangeBrand('All');
            }}
            className="mt-4 px-5 py-2.5 rounded-xl bg-[#181614] text-white text-xs font-semibold hover:bg-[#312C26] transition-colors"
          >
            View All Footwear
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);

            return (
              <article
                key={product.id}
                className="group flex flex-col justify-between transition-transform duration-150 hover:-translate-y-0.5"
              >
                <div>
                  {/* Card Visual Surface */}
                  <div className="relative aspect-[4/3] w-full rounded-[20px] overflow-hidden bg-[#F5F2EC]">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="block w-full h-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#181614]"
                    >
                      <ImageWithFallback
                        src={product.image}
                        alt={`${product.brand} ${product.name} in ${product.colorway}`}
                        fallbackTitle={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                      />
                    </button>

                    {/* Wishlist Toggle */}
                    <button
                      type="button"
                      onClick={() => onToggleWishlist(product.id)}
                      aria-label={
                        isWishlisted
                          ? `Remove ${product.name} from saved items`
                          : `Save ${product.name}`
                      }
                      className="absolute top-3.5 right-3.5 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#181614] inline-flex items-center justify-center shadow-sm transition-transform duration-150 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#181614]"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isWishlisted ? 'fill-[#9E2329] text-[#9E2329]' : 'text-[#181614]'
                        }`}
                        strokeWidth={1.75}
                      />
                    </button>

                    {/* Quick Add Action */}
                    <button
                      type="button"
                      onClick={() => onQuickAdd(product)}
                      className="absolute bottom-3.5 right-3.5 h-10 px-4 rounded-xl bg-[#181614]/90 hover:bg-[#181614] text-white text-xs font-semibold inline-flex items-center gap-1.5 backdrop-blur-sm opacity-95 lg:opacity-0 lg:group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Quick Add
                    </button>
                  </div>

                  {/* Clean Metadata (Zero Pill Spam) */}
                  <div className="mt-4 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-[12px] uppercase tracking-[0.06em] text-[#7A6B5A]">
                        <span>{product.brand}</span>
                        <span aria-hidden="true">·</span>
                        <span>{product.availability}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => onSelectProduct(product)}
                        className="mt-1 text-left text-[16px] font-semibold text-[#181614] hover:text-[#6F5A44] transition-colors block truncate"
                      >
                        {product.name}
                      </button>
                      <p className="mt-0.5 text-[13px] text-[#6E6458] truncate">
                        {product.colorway}
                      </p>
                    </div>
                    <span className="text-[15px] font-semibold text-[#181614] tabular-nums shrink-0 self-start pt-5">
                      ${product.price}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

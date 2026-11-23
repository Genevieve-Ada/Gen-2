/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import { BrandShowcaseRow } from './components/BrandShowcaseRow';
import { CartDrawer } from './components/CartDrawer';
import { CatalogSection } from './components/CatalogSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { ProductModal } from './components/ProductModal';
import { StorySection } from './components/StorySection';
import { AccountModal, SearchModal, WishlistDrawer } from './components/UtilityOverlays';
import { INITIAL_CART_ITEMS } from './data/catalog';
import { BrandFilter, CartItem, NavCategory, Product } from './types';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<NavCategory>('All');
  const [activeBrand, setActiveBrand] = useState<BrandFilter>('All');
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['cw-court-checker-88']);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 2400);
  };

  const handleSelectNavCategory = (category: NavCategory, brand: BrandFilter = 'All') => {
    setActiveCategory(category);
    setActiveBrand(brand);
  };

  const handleShopFromHero = (category: NavCategory, brand: BrandFilter) => {
    setActiveCategory(category);
    setActiveBrand(brand);
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectShowcase = (category: NavCategory, brand: BrandFilter) => {
    setActiveCategory(category);
    setActiveBrand(brand);
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAddToCart = (product: Product, size: string, colorway: string) => {
    setCartItems((prev) => {
      const idx = prev.findIndex(
        (item) => item.productId === product.id && item.size === size,
      );
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
        return next;
      }
      return [...prev, { productId: product.id, size, colorway, quantity: 1 }];
    });
    showToast(`Added ${product.name} (${size}) to bag`);
  };

  const handleQuickAdd = (product: Product) => {
    const defaultSize = product.sizes[Math.min(2, product.sizes.length - 1)] || product.sizes[0];
    handleAddToCart(product, defaultSize, product.colorway);
  };

  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleRemoveCartItem = (productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.productId === productId && item.size === size)),
    );
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  return (
    <div className="min-h-screen bg-white text-[#181614] flex flex-col">
      <HeroSection
        activeCategory={activeCategory}
        onSelectCategory={handleSelectNavCategory}
        onShopNow={handleShopFromHero}
        cartCount={cartCount}
        wishlistCount={wishlistIds.length}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAccount={() => setAccountOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenCart={() => setCartOpen(true)}
      />

      <main className="flex-1">
        <BrandShowcaseRow onSelectShowcase={handleSelectShowcase} />

        <CatalogSection
          activeCategory={activeCategory}
          activeBrand={activeBrand}
          onChangeCategory={setActiveCategory}
          onChangeBrand={setActiveBrand}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onQuickAdd={handleQuickAdd}
          onSelectProduct={setSelectedProduct}
        />

        <StorySection onSelectFeatured={setSelectedProduct} />
      </main>

      <Footer onSelectCategory={handleSelectNavCategory} />

      {/* Overlays & Drawers */}
      <ProductModal
        product={selectedProduct}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onClose={() => setSelectedProduct(null)}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={setSelectedProduct}
      />

      <WishlistDrawer
        isOpen={wishlistOpen}
        wishlistIds={wishlistIds}
        onClose={() => setWishlistOpen(false)}
        onRemove={handleToggleWishlist}
        onSelectProduct={setSelectedProduct}
      />

      <AccountModal isOpen={accountOpen} onClose={() => setAccountOpen(false)} />

      {/* Subtle Add-to-Bag Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-xl bg-[#181614] text-white px-4 py-3 text-xs font-medium shadow-lg"
        >
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => {
              setToastMessage(null);
              setCartOpen(true);
            }}
            className="underline underline-offset-2 font-semibold text-[#F2ECE1] hover:text-white"
          >
            View Bag
          </button>
        </div>
      )}
    </div>
  );
}

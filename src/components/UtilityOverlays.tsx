import React, { useEffect, useMemo, useState } from 'react';
import { Heart, Search, Trash2, X } from 'lucide-react';
import { PRODUCTS } from '../data/catalog';
import { Product } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export function SearchModal({ isOpen, onClose, onSelectProduct }: SearchModalProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS;
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.colorway.toLowerCase().includes(q),
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search footwear catalog"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/50 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-[24px] bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 border-b border-[#E7E1D7] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#7A6B5A] shrink-0" />
          <input
            type="search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sneakers, brands, or colorways..."
            className="flex-1 text-sm text-[#181614] placeholder:text-[#8E8274] focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="w-9 h-9 rounded-full hover:bg-[#F5F2EC] text-[#181614] inline-flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {results.length === 0 ? (
            <p className="py-10 text-center text-sm text-[#665C50]">
              No matching silhouettes found for "{query}".
            </p>
          ) : (
            results.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="w-full flex items-center gap-4 p-2.5 rounded-xl hover:bg-[#F5F2EC] text-left transition-colors"
              >
                <div className="w-16 h-12 rounded-lg overflow-hidden bg-[#EAE4DA] shrink-0">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] uppercase tracking-[0.06em] text-[#7A6B5A]">
                    {product.brand}
                  </p>
                  <p className="text-sm font-semibold text-[#181614] truncate">{product.name}</p>
                </div>
                <span className="text-sm font-semibold text-[#181614] tabular-nums">
                  ${product.price}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

interface WishlistDrawerProps {
  isOpen: boolean;
  wishlistIds: string[];
  onClose: () => void;
  onRemove: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
}

export function WishlistDrawer({
  isOpen,
  wishlistIds,
  onClose,
  onRemove,
  onSelectProduct,
}: WishlistDrawerProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const savedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Saved items"
      className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 border-b border-[#E7E1D7] flex items-center justify-between">
          <div>
            <h2 className="font-display-soft font-bold text-xl text-[#181614]">Saved Rotation</h2>
            <p className="text-xs text-[#665C50] tabular-nums">
              {savedProducts.length} {savedProducts.length === 1 ? 'pair' : 'pairs'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close saved items"
            className="w-10 h-10 rounded-full hover:bg-[#F5F2EC] text-[#181614] inline-flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {savedProducts.length === 0 ? (
            <div className="py-16 text-center">
              <Heart className="w-8 h-8 mx-auto text-[#B5AA9B]" strokeWidth={1.5} />
              <p className="mt-3 text-sm font-medium text-[#181614]">No saved items yet</p>
              <p className="mt-1 text-xs text-[#665C50]">
                Tap the heart on any silhouette to save it for later.
              </p>
            </div>
          ) : (
            savedProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 pb-4 border-b border-[#EFEAE0]"
              >
                <button
                  type="button"
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="w-24 h-20 rounded-xl overflow-hidden bg-[#F5F2EC] shrink-0"
                >
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </button>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] uppercase tracking-[0.06em] text-[#7A6B5A]">
                    {product.brand}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="text-sm font-semibold text-[#181614] hover:text-[#6F5A44] truncate block text-left"
                  >
                    {product.name}
                  </button>
                  <p className="mt-1 text-sm font-semibold text-[#181614] tabular-nums">
                    ${product.price}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(product.id)}
                  aria-label={`Remove ${product.name} from saved items`}
                  className="w-9 h-9 rounded-full hover:bg-[#F5F2EC] text-[#7A6B5A] hover:text-[#9E2329] inline-flex items-center justify-center"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccountModal({ isOpen, onClose }: AccountModalProps) {
  const [email, setEmail] = useState('member@conwerse.store');
  const [preferredSize, setPreferredSize] = useState('US 9.5');
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    window.setTimeout(() => setSavedNotice(false), 1800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Member preferences"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-[24px] bg-white p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display-soft font-bold text-2xl text-[#181614]">
            Member Profile
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close member profile"
            className="w-10 h-10 rounded-full hover:bg-[#F5F2EC] text-[#181614] inline-flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="mt-2 text-xs text-[#665C50]">
          Save your default footwear size for faster drop checkout.
        </p>

        <form onSubmit={handleSave} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="member-email"
              className="block text-xs font-semibold text-[#181614] mb-1.5"
            >
              Email Address
            </label>
            <input
              id="member-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-[#DCD4C6] text-sm text-[#181614] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#181614]"
            />
          </div>

          <div>
            <label
              htmlFor="member-size"
              className="block text-xs font-semibold text-[#181614] mb-1.5"
            >
              Default Footwear Size
            </label>
            <select
              id="member-size"
              value={preferredSize}
              onChange={(e) => setPreferredSize(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-[#DCD4C6] text-sm text-[#181614] bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#181614]"
            >
              {['US 6', 'US 7', 'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 11', 'US 12'].map(
                (sz) => (
                  <option key={sz} value={sz}>
                    {sz}
                  </option>
                ),
              )}
            </select>
          </div>

          <button
            type="submit"
            className="w-full h-11 rounded-xl bg-[#181614] hover:bg-[#312C26] text-white text-xs font-semibold transition-colors"
          >
            {savedNotice ? 'Preferences Saved' : 'Save Preferences'}
          </button>
        </form>
      </div>
    </div>
  );
}

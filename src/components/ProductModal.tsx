import React, { useEffect, useState } from 'react';
import { Check, Heart, X } from 'lucide-react';
import { Product } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface ProductModalProps {
  product: Product | null;
  isWishlisted: boolean;
  onClose: () => void;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, size: string, colorway: string) => void;
}

export function ProductModal({
  product,
  isWishlisted,
  onClose,
  onToggleWishlist,
  onAddToCart,
}: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[Math.min(2, product.sizes.length - 1)] || product.sizes[0]);
      setSelectedColor(product.colors[0]?.name || product.colorway);
      setAddedFeedback(false);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [product, onClose]);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setAddedFeedback(true);
    window.setTimeout(() => setAddedFeedback(false), 1400);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl rounded-[24px] bg-white overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-[#F5F2EC] text-[#181614] inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#181614]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Image Surface */}
        <div className="md:col-span-6 bg-[#F5F2EC] flex items-center justify-center min-h-[280px]">
          <ImageWithFallback
            src={product.image}
            alt={`${product.brand} ${product.name}`}
            fallbackTitle={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Contiguous Purchase Module */}
        <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.08em] text-[#7A6B5A]">
              <span>{product.brand}</span>
              <span aria-hidden="true">·</span>
              <span>{product.availability}</span>
            </div>

            <div className="mt-2 flex items-baseline justify-between gap-4">
              <h2
                id="pdp-title"
                className="font-display-soft font-bold text-2xl sm:text-3xl text-[#181614]"
              >
                {product.name}
              </h2>
              <span className="text-xl font-semibold text-[#181614] tabular-nums shrink-0">
                ${product.price}
              </span>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-[#574E44]">{product.description}</p>
            <p className="mt-3 text-xs text-[#7A6B5A]">
              <strong className="font-semibold text-[#181614]">Construction:</strong>{' '}
              {product.material}
            </p>

            {/* Colorway Selector */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#181614]">Colorway</span>
                <span className="text-[#665C50]">{selectedColor}</span>
              </div>
              <div className="mt-2.5 flex items-center gap-2.5">
                {product.colors.map((color) => {
                  const active = selectedColor === color.name;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color.name)}
                      aria-label={`Select colorway ${color.name}`}
                      className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-transform ${
                        active
                          ? 'border-[#181614] scale-105'
                          : 'border-transparent hover:border-[#C9BFA9]'
                      }`}
                    >
                      <span
                        className="w-6 h-6 rounded-full border border-black/10"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#181614]">Select Size</span>
                <span className="text-[#665C50]">True to size</span>
              </div>
              <div className="mt-2.5 grid grid-cols-4 gap-2">
                {product.sizes.map((size) => {
                  const active = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`h-10 rounded-xl text-xs font-semibold tabular-nums transition-colors ${
                        active
                          ? 'bg-[#181614] text-white'
                          : 'bg-[#F5F2EC] text-[#181614] hover:bg-[#EAE4DA]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Primary Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-[#E7E1D7]">
            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 h-12 rounded-xl bg-[#181614] hover:bg-[#312C26] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors"
            >
              {addedFeedback ? (
                <>
                  <Check className="w-4 h-4" />
                  Added to Bag
                </>
              ) : (
                `Add to Bag — $${product.price}`
              )}
            </button>

            <button
              type="button"
              onClick={() => onToggleWishlist(product.id)}
              aria-label={isWishlisted ? 'Remove from saved items' : 'Save item'}
              className="w-12 h-12 rounded-xl border border-[#E2DDD3] hover:bg-[#F5F2EC] text-[#181614] inline-flex items-center justify-center transition-colors shrink-0"
            >
              <Heart
                className={`w-5 h-5 ${
                  isWishlisted ? 'fill-[#9E2329] text-[#9E2329]' : 'text-[#181614]'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { CheckCircle2, Minus, Plus, Trash2, X } from 'lucide-react';
import { PRODUCTS } from '../data/catalog';
import { CartItem } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<'bag' | 'verify' | 'confirmed'>('bag');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [confirmedTotal, setConfirmedTotal] = useState(0);
  const [orderNumber, setOrderNumber] = useState('CW-1042');

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen && checkoutStep === 'confirmed') {
      setCheckoutStep('bag');
    }
  }, [isOpen, checkoutStep]);

  if (!isOpen) return null;

  const enrichedItems = items
    .map((item) => {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      return product ? { ...item, product } : null;
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  const subtotal = enrichedItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const freeShippingThreshold = 150;
  const shippingCost = subtotal === 0 || subtotal >= freeShippingThreshold ? 0 : 12;
  const total = subtotal + shippingCost;
  const totalCount = enrichedItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmedTotal(total);
    setOrderNumber(`CW-${Math.floor(1040 + Math.random() * 8900)}`);
    onClearCart();
    setCheckoutStep('confirmed');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping bag"
      className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#E7E1D7] flex items-center justify-between">
          <div>
            <h2 className="font-display-soft font-bold text-xl text-[#181614]">
              Shopping Bag
            </h2>
            <p className="text-xs text-[#665C50] tabular-nums">
              {totalCount} {totalCount === 1 ? 'item' : 'items'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping bag"
            className="w-10 h-10 rounded-full hover:bg-[#F5F2EC] text-[#181614] inline-flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {checkoutStep === 'confirmed' ? (
            <div className="py-12 text-center">
              <CheckCircle2 className="w-12 h-12 mx-auto text-[#3B6B46]" strokeWidth={1.75} />
              <h3 className="mt-4 font-display-soft font-bold text-2xl text-[#181614]">
                Order #{orderNumber} Confirmed
              </h3>
              <p className="mt-2 text-sm text-[#574E44]">
                Preparing shipment for {customerName || 'Guest'}. Receipt total:{' '}
                <span className="font-semibold text-[#181614] tabular-nums">
                  ${confirmedTotal}
                </span>
                .
              </p>
              <button
                type="button"
                onClick={() => {
                  setCheckoutStep('bag');
                  onClose();
                }}
                className="mt-6 px-6 py-3 rounded-xl bg-[#181614] text-white text-xs font-semibold hover:bg-[#312C26] transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          ) : enrichedItems.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-sm font-medium text-[#181614]">Your shopping bag is empty.</p>
              <p className="mt-1 text-xs text-[#665C50]">
                Explore the seasonal footwear edit to add pairs.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-5 px-5 py-2.5 rounded-xl bg-[#181614] text-white text-xs font-semibold hover:bg-[#312C26] transition-colors"
              >
                Shop Footwear
              </button>
            </div>
          ) : checkoutStep === 'verify' ? (
            <form id="checkout-form" onSubmit={handleConfirmOrder} className="space-y-4">
              <div className="p-4 rounded-xl bg-[#F5F2EC] text-xs text-[#574E44]">
                <p className="font-semibold text-[#181614]">Delivery & Order Verification</p>
                <p className="mt-1">
                  Total due including shipping:{' '}
                  <span className="font-semibold text-[#181614] tabular-nums">${total}</span>
                </p>
              </div>

              <div>
                <label
                  htmlFor="checkout-name"
                  className="block text-xs font-semibold text-[#181614] mb-1.5"
                >
                  Full Name
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Jordan Lee"
                  className="w-full h-11 px-3.5 rounded-xl border border-[#DCD4C6] text-sm text-[#181614] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#181614]"
                />
              </div>

              <div>
                <label
                  htmlFor="checkout-phone"
                  className="block text-xs font-semibold text-[#181614] mb-1.5"
                >
                  Phone Number
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+1 (555) 234-8910"
                  className="w-full h-11 px-3.5 rounded-xl border border-[#DCD4C6] text-sm text-[#181614] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#181614]"
                />
              </div>

              <div>
                <label
                  htmlFor="checkout-address"
                  className="block text-xs font-semibold text-[#181614] mb-1.5"
                >
                  Shipping Address & Postal Code
                </label>
                <textarea
                  id="checkout-address"
                  required
                  rows={3}
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="412 Mercer St, Apt 4B, New York, NY 10013"
                  className="w-full p-3.5 rounded-xl border border-[#DCD4C6] text-sm text-[#181614] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#181614]"
                />
              </div>
            </form>
          ) : (
            <div className="space-y-5">
              {/* Free Shipping Status */}
              <div className="p-3.5 rounded-xl bg-[#F5F2EC] text-xs text-[#574E44]">
                {subtotal >= freeShippingThreshold ? (
                  <span>Complimentary express shipping unlocked.</span>
                ) : (
                  <span className="tabular-nums">
                    Add ${freeShippingThreshold - subtotal} more for complimentary express
                    shipping.
                  </span>
                )}
              </div>

              {enrichedItems.map((item) => (
                <div
                  key={`${item.productId}-${item.size}`}
                  className="flex gap-4 pb-5 border-b border-[#EFEAE0]"
                >
                  <div className="w-24 h-20 rounded-xl overflow-hidden bg-[#F5F2EC] shrink-0">
                    <ImageWithFallback
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[11px] uppercase tracking-[0.06em] text-[#7A6B5A]">
                          {item.product.brand}
                        </p>
                        <h3 className="text-sm font-semibold text-[#181614] truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-[#665C50]">
                          {item.size} · {item.colorway}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-[#181614] tabular-nums shrink-0">
                        ${item.product.price * item.quantity}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-lg border border-[#E2DDD3]">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.productId, item.size, -1)}
                          aria-label={`Decrease quantity of ${item.product.name}`}
                          className="w-8 h-8 inline-flex items-center justify-center text-[#181614] hover:bg-[#F5F2EC] rounded-l-lg"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.productId, item.size, 1)}
                          aria-label={`Increase quantity of ${item.product.name}`}
                          className="w-8 h-8 inline-flex items-center justify-center text-[#181614] hover:bg-[#F5F2EC] rounded-r-lg"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.productId, item.size)}
                        aria-label={`Remove ${item.product.name}`}
                        className="text-xs text-[#7A6B5A] hover:text-[#9E2329] inline-flex items-center gap-1 py-1 px-2"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Totals */}
        {enrichedItems.length > 0 && checkoutStep !== 'confirmed' && (
          <div className="px-6 py-5 border-t border-[#E7E1D7] bg-[#FAF8F5] space-y-3">
            <div className="flex items-center justify-between text-xs text-[#665C50]">
              <span>Shipping</span>
              <span className="tabular-nums">
                {shippingCost === 0 ? 'Complimentary' : `$${shippingCost}`}
              </span>
            </div>
            <div className="flex items-center justify-between text-base font-semibold text-[#181614]">
              <span>Total</span>
              <span className="tabular-nums">${total}</span>
            </div>

            {checkoutStep === 'bag' ? (
              <button
                type="button"
                onClick={() => setCheckoutStep('verify')}
                className="w-full h-12 rounded-xl bg-[#181614] hover:bg-[#312C26] text-white text-sm font-semibold transition-colors"
              >
                Proceed to Checkout
              </button>
            ) : (
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('bag')}
                  className="px-4 h-12 rounded-xl border border-[#DCD4C6] text-xs font-semibold text-[#181614] hover:bg-[#EFEAE0]"
                >
                  Back
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  className="flex-1 h-12 rounded-xl bg-[#181614] hover:bg-[#312C26] text-white text-sm font-semibold transition-colors"
                >
                  Confirm Order — ${total}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export type NavCategory =
  | 'All'
  | 'Women'
  | 'Men'
  | 'Kids'
  | 'Accessories'
  | 'Collection'
  | 'Brands';

export type BrandFilter = 'All' | 'Conwerse' | 'Nike' | 'Puma';

export interface Product {
  id: string;
  name: string;
  brand: 'Conwerse' | 'Nike' | 'Puma';
  categories: NavCategory[];
  price: number;
  image: string;
  colorway: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  material: string;
  description: string;
  availability: string;
}

export interface HeroSlide {
  id: string;
  headlineLines: string[];
  ctaLabel: string;
  targetCategory: NavCategory;
  targetBrand: BrandFilter;
  featuredProductId: string;
  image: string;
  imageAlt: string;
  backdropHex: string;
}

export interface ShowcaseCard {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  brandLogo?: 'puma' | 'nike';
  displayHeadline?: string;
  filterBrand: BrandFilter;
  filterCategory: NavCategory;
}

export interface CartItem {
  productId: string;
  size: string;
  colorway: string;
  quantity: number;
}

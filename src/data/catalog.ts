import { HeroSlide, NavCategory, Product, ShowcaseCard } from '../types';

export const NAV_LINKS: NavCategory[] = [
  'Women',
  'Men',
  'Kids',
  'Accessories',
  'Collection',
  'Brands',
];

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-everyday-look',
    headlineLines: ['Sneakers That', 'Defy Your Every', 'day Look'],
    ctaLabel: 'Shop Now',
    targetCategory: 'All',
    targetBrand: 'All',
    featuredProductId: 'cw-court-checker-88',
    image: '/src/assets/images/hero_sneaker_model_1795423673439.jpg',
    imageAlt:
      'Model crouching in warm taupe studio wearing retro cream, crimson, and checkerboard court sneakers',
    backdropHex: '#6F5A44',
  },
  {
    id: 'slide-amber-suede',
    headlineLines: ['Warm Suede', 'Crafted For The', 'City Pace'],
    ctaLabel: 'Shop Suede',
    targetCategory: 'Collection',
    targetBrand: 'Nike',
    featuredProductId: 'nk-amber-suede-low',
    image: '/src/assets/images/card_amber_sneaker_1795423672971.jpg',
    imageAlt: 'Caramel suede low-top sneaker on a warm amber studio backdrop',
    backdropHex: '#7A552C',
  },
  {
    id: 'slide-archive-hoops',
    headlineLines: ['Archive Court', 'Icons Built', 'For Today'],
    ctaLabel: 'Explore Drop',
    targetCategory: 'Men',
    targetBrand: 'Conwerse',
    featuredProductId: 'cw-court-checker-88',
    image: '/src/assets/images/product_cream_checker_1795423673517.jpg',
    imageAlt: 'Cream leather retro basketball sneakers with crimson heel and checkerboard panels',
    backdropHex: '#766756',
  },
];

export const SHOWCASE_CARDS: ShowcaseCard[] = [
  {
    id: 'showcase-puma',
    title: 'Archive Suede & Track',
    subtitle: 'Retro low-profile terrace classics',
    image: '/src/assets/images/card_retro_runner_1795423673745.jpg',
    imageAlt: 'Overhead studio shot of cream and burgundy retro terrace sneaker',
    brandLogo: 'puma',
    filterBrand: 'Puma',
    filterCategory: 'Brands',
  },
  {
    id: 'showcase-nike',
    title: 'Warm Caramel Edition',
    subtitle: 'Sculpted suede and court tooling',
    image: '/src/assets/images/card_amber_sneaker_1795423672971.jpg',
    imageAlt: 'Caramel tan suede sneaker against warm amber backdrop',
    brandLogo: 'nike',
    filterBrand: 'Nike',
    filterCategory: 'Brands',
  },
  {
    id: 'showcase-style-stack',
    title: 'Layered Utility & Denim',
    subtitle: 'Seasonal pairings for everyday rotation',
    image: '/src/assets/images/card_style_stack_1795423672923.jpg',
    imageAlt: 'Golden hour street editorial featuring plaid overshirt jacket and olive cargo pants',
    displayHeadline: 'STYLE STACK',
    filterBrand: 'All',
    filterCategory: 'Collection',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'cw-court-checker-88',
    name: 'Court Checker 88 Low',
    brand: 'Conwerse',
    categories: ['All', 'Men', 'Women', 'Collection', 'Brands'],
    price: 148,
    image: '/src/assets/images/product_cream_checker_1795423673517.jpg',
    colorway: 'Chalk / Crimson / Check',
    colors: [
      { name: 'Chalk / Crimson', hex: '#EDE7DB' },
      { name: 'Crimson Accent', hex: '#9E2329' },
      { name: 'Obsidian Check', hex: '#1E1D1B' },
    ],
    sizes: ['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    material: 'Full-grain tumbled leather, woven canvas check, gum cupsole',
    description:
      'Anchored in late-80s hardwood heritage, the Court Checker 88 pairs supple off-white tumbled leather with breathable checkerboard side panels and a rich crimson suede heel counter.',
    availability: 'In Stock',
  },
  {
    id: 'nk-amber-suede-low',
    name: 'Caramel Terrace Low',
    brand: 'Nike',
    categories: ['All', 'Men', 'Collection', 'Brands'],
    price: 165,
    image: '/src/assets/images/card_amber_sneaker_1795423672971.jpg',
    colorway: 'Caramel / Espresso / Sail',
    colors: [
      { name: 'Caramel Tan', hex: '#AE763E' },
      { name: 'Espresso', hex: '#3B281E' },
    ],
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    material: 'Brushed calfskin suede, waxed cotton laces, natural rubber sole',
    description:
      'Cut from heavyweight brushed suede in warm amber tones, finished with contrasting espresso leather overlays and a low-profile vulcanized cream midsole.',
    availability: 'Limited Run',
  },
  {
    id: 'pm-palermo-terrace',
    name: 'Palermo Archive Runner',
    brand: 'Puma',
    categories: ['All', 'Women', 'Men', 'Kids', 'Brands'],
    price: 124,
    image: '/src/assets/images/card_retro_runner_1795423673745.jpg',
    colorway: 'Oatmeal / Burgundy / Ink',
    colors: [
      { name: 'Oatmeal Cream', hex: '#E5DEC9' },
      { name: 'Burgundy Tongue', hex: '#7A2730' },
    ],
    sizes: ['US 5', 'US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
    material: 'Nubuck T-toe, breathable leather lining, herringbone tread',
    description:
      'An overhead favorite built for effortless daily rotation. Slim proportions meet a plush burgundy suede tongue and crisp black lateral stripes.',
    availability: 'In Stock',
  },
  {
    id: 'cw-espresso-trail',
    name: 'Avenue Espresso Runner',
    brand: 'Conwerse',
    categories: ['All', 'Men', 'Women', 'Collection', 'Brands'],
    price: 158,
    image: '/src/assets/images/product_espresso_runner_1795423673579.jpg',
    colorway: 'Espresso / Stone / Bone',
    colors: [
      { name: 'Espresso Brown', hex: '#3D312A' },
      { name: 'Sandstone', hex: '#D8CDBF' },
    ],
    sizes: ['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    material: 'Ballistic open-cell mesh, pigskin suede mudguard, sculpted EVA',
    description:
      'Engineered cushioning wrapped in tonal espresso suede and open-weave mesh. Balanced geometry delivers all-day comfort from studio to street.',
    availability: 'In Stock',
  },
  {
    id: 'nk-bone-court-gum',
    name: 'Studio Bone Court',
    brand: 'Nike',
    categories: ['All', 'Women', 'Kids', 'Collection', 'Brands'],
    price: 138,
    image: '/src/assets/images/product_bone_court_1795423672693.jpg',
    colorway: 'Bone White / Warm Sand / Gum',
    colors: [
      { name: 'Bone White', hex: '#EFECE4' },
      { name: 'Warm Sand', hex: '#C7B8A1' },
    ],
    sizes: ['US 5', 'US 6', 'US 7', 'US 8', 'US 9', 'US 10'],
    material: 'Pebbled leather upper, tonal suede T-toe, raw gum cupsole',
    description:
      'Minimalist tailoring for your feet. Supple pebbled leather paired with sand suede accents atop a durable natural gum rubber sole.',
    availability: 'In Stock',
  },
  {
    id: 'cw-plaid-utility-stack',
    name: 'Style Stack Wool Overshirt',
    brand: 'Conwerse',
    categories: ['All', 'Women', 'Men', 'Accessories', 'Collection'],
    price: 192,
    image: '/src/assets/images/card_style_stack_1795423672923.jpg',
    colorway: 'Oat Plaid / Olive',
    colors: [
      { name: 'Oat Plaid', hex: '#B9A389' },
      { name: 'Field Olive', hex: '#4B5338' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    material: 'Brushed Italian wool blend, horn buttons, reinforced utility seams',
    description:
      'Part of our seasonal Style Stack apparel pairing. Relaxed boxy silhouette cut from heavy brushed plaid wool designed to layer cleanly over tees and denim.',
    availability: 'In Stock',
  },
];

export const INITIAL_CART_ITEMS = [
  {
    productId: 'cw-court-checker-88',
    size: 'US 9',
    colorway: 'Chalk / Crimson / Check',
    quantity: 2,
  },
  {
    productId: 'pm-palermo-terrace',
    size: 'US 8',
    colorway: 'Oatmeal / Burgundy / Ink',
    quantity: 2,
  },
  {
    productId: 'nk-amber-suede-low',
    size: 'US 10',
    colorway: 'Caramel / Espresso / Sail',
    quantity: 1,
  },
];

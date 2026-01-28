import type { Product, NewsItem, Activity, PortfolioData, MenuItem, Asset, Transaction, PortfolioSummary } from '../types';

// Portfolio mock data
export const portfolioData: PortfolioData = {
  totalValue: 1000000,
  priceChange: 6.18,
  priceChangePercent: 5.10,
  chartData: [
    { date: '2024-01-01', value: 850000 },
    { date: '2024-01-15', value: 880000 },
    { date: '2024-02-01', value: 920000 },
    { date: '2024-02-15', value: 950000 },
    { date: '2024-03-01', value: 910000 },
    { date: '2024-03-15', value: 940000 },
    { date: '2024-04-01', value: 1000000 },
  ],
};

// Portfolio page specific data
export const portfolioSummary: PortfolioSummary = {
  totalValue: 1000000,
  priceChange: 6.18,
  priceChangePercent: 5.10,
  cashAvailable: 400000,
  holdings: 600000,
  chartData: [
    { date: '2024-01-01', value: 850000 },
    { date: '2024-01-15', value: 880000 },
    { date: '2024-02-01', value: 920000 },
    { date: '2024-02-15', value: 950000 },
    { date: '2024-03-01', value: 910000 },
    { date: '2024-03-15', value: 940000 },
    { date: '2024-04-01', value: 1000000 },
  ],
  allocation: [
    { label: 'Cash avail', value: 35, color: '#EABC65' },
    { label: 'Card holding', value: 32, color: '#47E3FF' },
    { label: 'Pod investment', value: 33, color: '#C5FF8A' },
  ],
};

export const myAssets: Asset[] = [
  {
    id: '1',
    name: 'Here is the title of the product. This title area is limited to two lines.',
    image: 'https://images.pokemontcg.io/base1/4_hires.png',
    price: 99.90,
    priceChange: 9.70,
    priceChangePercent: 8.70,
    ownership: 78,
    type: 'pod',
  },
  {
    id: '2',
    name: 'Here is the title of the product. This title area is limited to two lines.',
    image: 'https://images.pokemontcg.io/swsh35/74_hires.png',
    price: 99.90,
    priceChange: -9.70,
    priceChangePercent: -8.70,
    ownership: 45,
    type: 'pod',
  },
  {
    id: '3',
    name: 'Here is the title of the product. This title area is limited to two lines.',
    image: 'https://images.pokemontcg.io/base1/2_hires.png',
    price: 78.90,
    priceChange: 8.70,
    priceChangePercent: 9.20,
    type: 'card',
  },
  {
    id: '4',
    name: 'Here is the title of the product. This title area is limited to two lines.',
    image: 'https://images.pokemontcg.io/smp/SM77_hires.png',
    price: 78.90,
    priceChange: 8.70,
    priceChangePercent: 9.20,
    type: 'card',
  },
  {
    id: '5',
    name: 'Here is the title of the product. This title area is limited to two lines.',
    image: 'https://images.pokemontcg.io/basep/1_hires.png',
    price: 78.90,
    priceChange: 8.70,
    priceChangePercent: 9.20,
    type: 'card',
  },
];

export const watchlistAssets: Asset[] = [
  {
    id: '6',
    name: 'Charizard VMAX Rainbow Rare',
    image: 'https://images.pokemontcg.io/swsh35/74_hires.png',
    price: 350.00,
    priceChange: 12.50,
    priceChangePercent: 3.70,
    type: 'card',
  },
  {
    id: '7',
    name: 'Pikachu Illustrator Promo Card',
    image: 'https://images.pokemontcg.io/basep/1_hires.png',
    price: 5420.00,
    priceChange: -120.00,
    priceChangePercent: -2.17,
    type: 'card',
  },
];

export const transactions: Transaction[] = [
  {
    id: '1',
    assetId: '1',
    title: 'The Crown of the Undying Monarch Who Refuses the Cycle of Death 2026',
    date: '01/01/2025 09:30',
    amount: 78.90,
    type: 'invest_in_kind',
  },
  {
    id: '2',
    assetId: '1',
    title: 'The Crown of the Undying Monarch Who Refuses the Cycle of Death 2026',
    date: '01/01/2025 09:30',
    amount: 78.90,
    type: 'invest_in_cash',
  },
  {
    id: '3',
    assetId: '1',
    title: 'The Crown of the Undying Monarch Who Refuses the Cycle of Death 2026',
    date: '01/01/2025 09:30',
    amount: 78.90,
    type: 'withdrawal',
  },
  {
    id: '4',
    assetId: '1',
    title: 'The Crown of the Undying Monarch Who Refuses the Cycle of Death 2026',
    date: '01/01/2025 09:30',
    amount: 78.90,
    type: 'cash_out',
  },
  // Card item transactions
  {
    id: '5',
    assetId: '3',
    title: 'The Crown of the Undying Monarch Who Refuses the Cycle of Death 2026',
    date: '01/01/2025 09:30',
    amount: 78.90,
    type: 'invest_in_kind',
  },
  {
    id: '6',
    assetId: '3',
    title: 'The Crown of the Undying Monarch Who Refuses the Cycle of Death 2026',
    date: '01/01/2025 09:30',
    amount: 78.90,
    type: 'cash_out',
  },
  {
    id: '7',
    assetId: '3',
    title: 'The Crown of the Undying Monarch Who Refuses the Cycle of Death 2026',
    date: '01/01/2025 09:30',
    amount: 78.90,
    type: 'cash_out',
  },
  {
    id: '8',
    assetId: '3',
    title: 'The Crown of the Undying Monarch Who Refuses the Cycle of Death 2026',
    date: '01/01/2025 09:30',
    amount: 78.90,
    type: 'cash_out',
  },
  // Watchlist item transactions
  {
    id: '9',
    assetId: '6',
    title: 'The Crown of the Undying Monarch Who Refuses the Cycle of Death 2026',
    date: '01/01/2025 09:30',
    amount: 78.90,
    type: 'invest_in_kind',
  },
  {
    id: '10',
    assetId: '6',
    title: 'The Crown of the Undying Monarch Who Refuses the Cycle of Death 2026',
    date: '01/01/2025 09:30',
    amount: 78.90,
    type: 'invest_in_cash',
  },
  {
    id: '11',
    assetId: '6',
    title: 'The Crown of the Undying Monarch Who Refuses the Cycle of Death 2026',
    date: '01/01/2025 09:30',
    amount: 78.90,
    type: 'withdrawal',
  },
  {
    id: '12',
    assetId: '6',
    title: 'The Crown of the Undying Monarch Who Refuses the Cycle of Death 2026',
    date: '01/01/2025 09:30',
    amount: 78.90,
    type: 'withdrawal',
  },
  {
    id: '13',
    assetId: '6',
    title: 'The Crown of the Undying Monarch Who Refuses the Cycle of Death 2026',
    date: '01/01/2025 09:30',
    amount: 78.90,
    type: 'withdrawal',
  },
];

// Trending products mock data
export const trendingProducts: Product[] = [
  {
    id: '1',
    name: 'The New Pokémon 1st Edition Booster Pack 2026',
    image: 'https://images.pokemontcg.io/base1/logo.png',
    price: 125.80,
    priceChange: 6.18,
    priceChangePercent: 5.10,
  },
  {
    id: '2',
    name: 'Charizard VMAX Rainbow Rare',
    image: 'https://images.pokemontcg.io/swsh35/74_hires.png',
    price: 350.00,
    priceChange: 12.50,
    priceChangePercent: 3.70,
  },
  {
    id: '3',
    name: 'Pikachu Illustrator Promo Card',
    image: 'https://images.pokemontcg.io/basep/1_hires.png',
    price: 5420.00,
    priceChange: -120.00,
    priceChangePercent: -2.17,
  },
  {
    id: '4',
    name: 'Mewtwo GX Secret Rare',
    image: 'https://images.pokemontcg.io/smp/SM77_hires.png',
    price: 89.99,
    priceChange: 4.20,
    priceChangePercent: 4.90,
  },
  {
    id: '5',
    name: 'Blastoise Base Set Holo',
    image: 'https://images.pokemontcg.io/base1/2_hires.png',
    price: 275.00,
    priceChange: 8.75,
    priceChangePercent: 3.28,
  },
];

// News items mock data
export const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'The New Pokémon 1st Edition Booster Pack 2026',
    image: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=800',
    date: '2024-04-01',
  },
  {
    id: '2',
    title: 'Rare Pokémon Cards Breaking Records at Auction',
    image: 'https://images.unsplash.com/photo-1542779283-429940ce8336?w=800',
    date: '2024-03-28',
  },
  {
    id: '3',
    title: 'Top 10 Most Valuable Pokémon Cards in 2024',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800',
    date: '2024-03-25',
  },
  {
    id: '4',
    title: 'Investing in Pokémon: A Beginner\'s Guide',
    image: 'https://images.unsplash.com/photo-1628960991985-c81c1a9fc130?w=800',
    date: '2024-03-20',
  },
  {
    id: '5',
    title: 'New Pokémon TCG Expansion Announced',
    image: 'https://images.unsplash.com/photo-1609372332255-611485350f25?w=800',
    date: '2024-03-15',
  },
];

// Activities mock data
export const activities: Activity[] = [
  {
    id: '1',
    type: 'price_alert',
    title: 'Price is the title of this product - This title area is limited to 2 lines',
    description: 'The price of this product has increased by 5.10%',
    price: 645.00,
    priceChange: 6.18,
    priceChangePercent: 5.10,
    timestamp: '2024-04-01T10:30:00Z',
    image: 'https://images.pokemontcg.io/base1/4_hires.png',
  },
  {
    id: '2',
    type: 'buy',
    title: 'The cost of the living blenny blahblah to you is Check Out',
    description: 'The price of this product has changed',
    price: 645.00,
    priceChange: 6.18,
    priceChangePercent: 5.10,
    timestamp: '2024-04-01T09:15:00Z',
    image: 'https://images.pokemontcg.io/base1/2_hires.png',
  },
  {
    id: '3',
    type: 'sell',
    title: 'Price is the title of the product in the Pod. This title area is limited to 2 lines',
    description: 'Transaction completed',
    price: 320.00,
    priceChange: -12.50,
    priceChangePercent: -3.76,
    timestamp: '2024-03-31T16:45:00Z',
    image: 'https://images.pokemontcg.io/swsh35/74_hires.png',
  },
  {
    id: '4',
    type: 'price_alert',
    title: 'The cost of the living blenny blahblah to you is Check Out',
    description: 'Price threshold reached',
    price: 890.00,
    priceChange: 45.00,
    priceChangePercent: 5.32,
    timestamp: '2024-03-31T14:20:00Z',
    image: 'https://images.pokemontcg.io/smp/SM77_hires.png',
  },
];

// Menu items for sidebar
export const menuItems: MenuItem[] = [
  { id: 'home', label: 'Home', icon: 'home', path: '/', active: true },
  { id: 'search', label: 'Search', icon: 'search', path: '/search' },
  { id: 'explore', label: 'Explore', icon: 'compass', path: '/explore' },
  { id: 'news', label: 'News', icon: 'globe', path: '/news' },
  { id: 'portfolio', label: 'Portfolio', icon: 'inbox', path: '/portfolio' },
];

export const bottomMenuItems: MenuItem[] = [
  { id: 'settings', label: 'Setting', icon: 'gear', path: '/settings' },
];

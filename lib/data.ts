export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "#products" },
  { label: "Collections", href: "#collections" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const navCTA = {
  label: "Shop Now",
  href: "#products",
};

export const APP_NAME = "Lumière";
export const APP_TAGLINE = "Curated for the discerning eye.";

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  description: string;
};

export type Category = {
  id: string;
  label: string;
};
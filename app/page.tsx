"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Star, ShoppingBag, ArrowRight, Check, Truck, RefreshCw, Shield, Heart, ChevronRight, Sparkles } from 'lucide-react';
import { APP_NAME, APP_TAGLINE } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const products = [
  {
    id: 1,
    name: "Maison Ceramic Vase",
    category: "Home Decor",
    price: 128,
    originalPrice: 160,
    rating: 4.9,
    reviewCount: 214,
    image: "https://www.candlestock.com/cdn/shop/files/maisoncollection_1.jpg?v=1745348902",
    badge: "Best Seller",
    description: "Hand-thrown stoneware with a matte glaze finish. Each piece is unique.",
  },
  {
    id: 2,
    name: "Linen Throw Blanket",
    category: "Textiles",
    price: 89,
    rating: 4.8,
    reviewCount: 178,
    image: "https://www.linenme.com/sites/default/files/styles/product_catalog/public/products/08917.jpg?itok=_CTnd_5M",
    badge: "New",
    description: "Woven from 100% European flax. Soft, breathable, and endlessly cozy.",
  },
  {
    id: 3,
    name: "Walnut Serving Board",
    category: "Kitchen",
    price: 74,
    originalPrice: 95,
    rating: 4.7,
    reviewCount: 132,
    image: "https://picsum.photos/seed/586f9101dd56/800/600",
    badge: "Sale",
    description: "Sustainably sourced American walnut with a food-safe oil finish.",
  },
  {
    id: 4,
    name: "Brass Table Lamp",
    category: "Lighting",
    price: 215,
    rating: 4.9,
    reviewCount: 96,
    image: "https://www.ironaccents.com/cdn/shop/files/19-NDE1372_1200x.jpg?v=1719424145",
    description: "Solid brushed brass with a linen shade. Warm, sculptural, timeless.",
  },
  {
    id: 5,
    name: "Merino Wool Cushion",
    category: "Textiles",
    price: 62,
    rating: 4.6,
    reviewCount: 203,
    image: "https://cb2.scene7.com/is/image/CB2/AdleyChcGyMrnWlPllwCvr20SHF25?$web_pdp_main_carousel_med$",
    badge: "New",
    description: "Extra-fine merino in a palette of muted, earthy tones.",
  },
  {
    id: 6,
    name: "Smoked Glass Carafe",
    category: "Kitchen",
    price: 48,
    originalPrice: 60,
    rating: 4.8,
    reviewCount: 157,
    image: "http://casaamarosa.com/cdn/shop/files/3f6048d6-ac65-4c50-bc1f-1e7cb07563f8.webp?v=1739945721&width=2048",
    badge: "Sale",
    description: "Mouth-blown borosilicate glass with a subtle smoke tint.",
  },
];

const collections = [
  {
    id: "living",
    title: "Living Room",
    count: 48,
    image: "https://hips.hearstapps.com/hmg-prod/images/pamela-forman-living-room-694963058722c.jpg?crop=0.667xw:0.998xh;0.0112xw,0&resize=1200:*",
    accent: "Serene spaces, thoughtfully composed.",
  },
  {
    id: "kitchen",
    title: "Kitchen & Dining",
    count: 36,
    image: "https://hips.hearstapps.com/hmg-prod/images/pamela-forman-living-room-694963058722c.jpg?crop=0.667xw:0.998xh;0.0112xw,0&resize=1200:*",
    accent: "Where meals become memories.",
  },
  {
    id: "bedroom",
    title: "Bedroom",
    count: 29,
    image: "https://hips.hearstapps.com/hmg-prod/images/greer-interior-1529347631.jpg",
    accent: "Rest, restored.",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Margot L.",
    location: "Paris, France",
    rating: 5,
    text: "Every piece I've ordered from Lumière has exceeded my expectations. The ceramic vase is a conversation starter in every gathering.",
    product: "Maison Ceramic Vase",
    avatar: "https://m.media-amazon.com/images/I/912lIKSQigL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: 2,
    name: "James T.",
    location: "London, UK",
    rating: 5,
    text: "The quality is genuinely exceptional. Packaging was beautiful, delivery was fast, and the linen blanket is softer than anything I've owned.",
    product: "Linen Throw Blanket",
    avatar: "https://s3.amazonaws.com/arc-authors/cmg/8adde958-cd42-477c-9467-0ee150778a71.png",
  },
  {
    id: 3,
    name: "Sofia R.",
    location: "Milan, Italy",
    rating: 5,
    text: "I've been searching for a lamp with this exact aesthetic for years. The brass table lamp is perfect. Worth every cent.",
    product: "Brass Table Lamp",
    avatar: "https://images.squarespace-cdn.com/content/v1/5bca3226797f74553944d84c/1543699767633-CPZ09BGACD5ZA30M7FC4/9JRmSaxA.jpg",
  },
];

const valueProps = [
  {
    icon: Truck,
    title: "Free Worldwide Shipping",
    description: "Complimentary delivery on all orders over $120. Tracked and insured.",
  },
  {
    icon: RefreshCw,
    title: "30-Day Returns",
    description: "Not in love? Return it within 30 days for a full refund, no questions asked.",
  },
  {
    icon: Shield,
    title: "Authenticity Guaranteed",
    description: "Every product is verified for quality and sourced from trusted artisans.",
  },
  {
    icon: Heart,
    title: "Ethically Sourced",
    description: "We partner only with makers who share our commitment to fair trade and sustainability.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const badgeColors: Record<string, string> = {
  "Best Seller": "bg-indigo-600 text-white",
  New: "bg-emerald-500 text-white",
  Sale: "bg-rose-500 text-white",
};

function StarRow({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i <= Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-slate-200 text-slate-200"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-slate-500">({count})</span>
    </div>
  );
}

const cardHover: Variants = {
  rest: { y: 0, boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px -4px rgba(0,0,0,0.08)" },
  hover: { y: -6, boxShadow: "0 4px 8px rgba(0,0,0,0.06), 0 20px 40px -12px rgba(0,0,0,0.18)" },
};

function ProductCard({ product }: { product: (typeof products)[0] }) {
  const [wished, setWished] = useState(false);

  return (
    <motion.div
      variants={scaleIn}
      initial="rest"
      whileHover="hover"
      animate="rest"
      custom={cardHover}
      className="group relative bg-white rounded-2xl overflow-hidden border border-black/5 cursor-pointer"
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px -4px rgba(0,0,0,0.08)" }}
    >
      <motion.div variants={cardHover} className="flex flex-col h-full">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.badge && (
            <span
              className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
                badgeColors[product.badge] ?? "bg-slate-700 text-white"
              }`}
            >
              {product.badge}
            </span>
          )}
          <button
            onClick={() => setWished((w) => !w)}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-black/5 hover:bg-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <Heart
              className={`w-4 h-4 transition-colors duration-200 ${
                wished ? "fill-rose-500 text-rose-500" : "text-slate-400"
              }`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          <span className="text-xs font-medium text-indigo-600 uppercase tracking-wider mb-1">
            {product.category}
          </span>
          <h3 className="font-playfair text-lg font-semibold text-slate-900 leading-snug mb-1">
            {product.name}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed mb-3 flex-1">
            {product.description}
          </p>
          <StarRow rating={product.rating} count={product.reviewCount} />

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-slate-900">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-slate-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Add
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center bg-[#F7F5F2] overflow-hidden">
        {/* Subtle radial glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 65% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-6"
            >
              <Sparkles className="w-3.5 h-3.5" />
              New Collection 2025
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.08] tracking-tight text-balance mb-6"
            >
              Objects worth
              <br />
              <span className="text-indigo-600">living with.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-slate-600 leading-relaxed max-w-md mb-10 text-pretty"
            >
              {APP_NAME} brings together the world's finest artisan homeware. Every piece is chosen for its craft, its story, and its ability to make a space feel like home.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <motion.a
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors duration-200 shadow-[0_4px_14px_rgba(99,102,241,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                Shop the Collection
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#collections"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#collections")?.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-7 py-3.5 rounded-xl border border-black/8 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                Browse Rooms
              </motion.a>
            </motion.div>

            {/* Trust bar */}
            <motion.div
              variants={fadeInUp}
              className="mt-12 flex flex-wrap items-center gap-6 text-sm text-slate-500"
            >
              {["Free shipping over $120", "30-day returns", "Ethically sourced"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-indigo-500" />
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right image collage */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative hidden lg:grid grid-cols-2 gap-4 h-[540px]"
          >
            <motion.div
              variants={slideInRight}
              className="col-span-1 row-span-2 rounded-2xl overflow-hidden shadow-[0_4px_8px_rgba(0,0,0,0.06),0_20px_40px_-12px_rgba(0,0,0,0.16)]"
            >
              <img
                src="https://www.candlestock.com/cdn/shop/files/maisoncollection_1.jpg?v=1745348902"
                alt="Maison Ceramic Vase"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              variants={scaleIn}
              className="rounded-2xl overflow-hidden shadow-[0_4px_8px_rgba(0,0,0,0.06),0_20px_40px_-12px_rgba(0,0,0,0.16)]"
            >
              <img
                src="https://www.ironaccents.com/cdn/shop/files/19-NDE1372_1200x.jpg?v=1719424145"
                alt="Brass Table Lamp"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              variants={scaleIn}
              className="rounded-2xl overflow-hidden shadow-[0_4px_8px_rgba(0,0,0,0.06),0_20px_40px_-12px_rgba(0,0,0,0.16)]"
            >
              <img
                src="https://www.linenme.com/sites/default/files/styles/product_catalog/public/products/08917.jpg?itok=_CTnd_5M"
                alt="Linen Throw Blanket"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Value Props ──────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-black/5 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {valueProps.map(({ icon: Icon, title, description }) => (
              <motion.div
                key={title}
                variants={fadeInUp}
                className="flex flex-col items-start gap-3"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-900 text-sm">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────────────────────────── */}
      <section id="products" className="bg-[#F7F5F2] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-14"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-3"
            >
              Curated Selection
            </motion.span>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <motion.h2
                variants={fadeInUp}
                className="font-playfair text-4xl md:text-5xl font-bold text-slate-900 tracking-tight text-balance"
              >
                Featured Pieces
              </motion.h2>
              <motion.a
                variants={fadeInUp}
                href="#products"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200 group"
              >
                View all products
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Collections ───────────────────────────────────────────────────── */}
      <section id="collections" className="bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-14"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-3"
            >
              Shop by Room
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-playfair text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
            >
              Our Collections
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {collections.map((col, i) => (
              <motion.div
                key={col.id}
                variants={i === 1 ? scaleIn : i === 0 ? slideInLeft : slideInRight}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`relative overflow-hidden rounded-2xl cursor-pointer group shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] ${
                  i === 1 ? "md:mt-8" : ""
                }`}
              >
                <div className="aspect-[3/4] relative">
                  <img
                    src={col.image}
                    alt={col.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-xs font-medium text-indigo-300 mb-1">{col.count} pieces</p>
                    <h3 className="font-playfair text-2xl font-bold text-white mb-1">{col.title}</h3>
                    <p className="text-sm text-slate-300 mb-4">{col.accent}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white border border-white/30 hover:bg-white/10 px-4 py-2 rounded-xl transition-colors duration-200">
                      Explore
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── About / Brand Story ───────────────────────────────────────────── */}
      <section id="about" className="bg-slate-900 py-24 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_4px_8px_rgba(0,0,0,0.2),0_24px_48px_-12px_rgba(0,0,0,0.5)]">
                <img
                  src="https://images.pexels.com/photos/19208268/pexels-photo-19208268/free-photo-of-elderly-artisan-working-in-a-workshop.jpeg"
                  alt="Artisan at work in the workshop"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating stat card */}
              <motion.div
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-[0_4px_8px_rgba(0,0,0,0.08),0_20px_40px_-12px_rgba(0,0,0,0.2)]"
              >
                <p className="font-playfair text-3xl font-bold text-slate-900">200+</p>
                <p className="text-sm text-slate-500 mt-0.5">Artisan partners worldwide</p>
              </motion.div>
            </motion.div>

            {/* Copy side */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col"
            >
              <motion.span
                variants={fadeInUp}
                className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-4"
              >
                Our Story
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                className="font-playfair text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-6 text-balance"
              >
                Craft that outlasts trends.
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-slate-400 leading-relaxed mb-5 text-pretty"
              >
                {APP_NAME} was founded on a single belief: that the objects we surround ourselves with should be made to last. We travel the world to find makers who share that conviction, from ceramic studios in Kyoto to linen weavers in Brittany.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-slate-400 leading-relaxed mb-10 text-pretty"
              >
                Every product in our collection is chosen by hand. We visit the workshops, meet the makers, and only bring home what we'd be proud to live with ourselves.
              </motion.p>

              <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-6 mb-10">
                {[
                  { stat: "2016", label: "Founded" },
                  { stat: "40+", label: "Countries sourced" },
                  { stat: "98%", label: "Customer satisfaction" },
                ].map(({ stat, label }) => (
                  <div key={label} className="flex flex-col">
                    <span className="font-playfair text-3xl font-bold text-white">{stat}</span>
                    <span className="text-xs text-slate-500 mt-1">{label}</span>
                  </div>
                ))}
              </motion.div>

              <motion.a
                variants={fadeInUp}
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="self-start inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors duration-200 shadow-[0_4px_14px_rgba(99,102,241,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                Get in touch
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="bg-[#F7F5F2] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-14 text-center"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-3"
            >
              What Customers Say
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-playfair text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
            >
              Loved by thousands.
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`bg-white rounded-2xl p-7 border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] flex flex-col ${
                  i === 1 ? "md:mt-6" : ""
                }`}
              >
                <div className="flex items-center gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 leading-relaxed flex-1 mb-6 text-pretty">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-black/5">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-100"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.location}</p>
                  </div>
                  <span className="ml-auto text-xs text-indigo-600 font-medium bg-indigo-50 px-2.5 py-1 rounded-full">
                    {t.product}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Newsletter / Contact CTA ──────────────────────────────────────── */}
      <section id="contact" className="bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-indigo-600 rounded-3xl overflow-hidden px-8 py-16 md:px-16 md:py-20">
            {/* Background texture */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 80% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)",
              }}
            />
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                variants={slideInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo-200 mb-4">
                  Stay in the loop
                </span>
                <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4 text-balance">
                  New arrivals, first.
                </h2>
                <p className="text-indigo-200 leading-relaxed text-pretty max-w-md">
                  Join 28,000 subscribers who get early access to new collections, exclusive offers, and stories from our makers.
                </p>
              </motion.div>

              <motion.div
                variants={slideInRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                <NewsletterForm />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── Newsletter Form (isolated to keep state clean) ───────────────────────────

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20"
      >
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20">
          <Check className="w-6 h-6 text-white" />
        </div>
        <p className="font-semibold text-white text-lg">You're on the list.</p>
        <p className="text-indigo-200 text-sm">
          Welcome to the {APP_NAME} community. Watch your inbox.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-indigo-300 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="bg-white text-indigo-700 font-semibold px-7 py-3.5 rounded-xl hover:bg-indigo-50 transition-colors duration-200 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-600 whitespace-nowrap"
        >
          Subscribe
        </motion.button>
      </div>
      <p className="text-xs text-indigo-300">
        No spam, ever. Unsubscribe at any time.
      </p>
    </form>
  );
}
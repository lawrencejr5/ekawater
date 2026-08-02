export interface Product {
  id: string;
  name: string;
  flavor: string;
  tagline: string;
  description: string;
  price: number;
  image: string;
  color: string;
  colorLight: string;
  colorDark: string;
  badge?: string;
  features: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: "eka-lemon-lime",
    name: "EKA Water Enhancer",
    flavor: "Lemon Lime",
    tagline: "Zesty & Refreshing",
    description:
      "Crisp lemon meets tangy lime in every squeeze. A burst of citrus that makes your daily water intake feel like a treat. No sugar, no calories — just pure, refreshing flavor.",
    price: 4000,
    image: "/images/banner.jpeg",
    color: "#6b8f6b",
    colorLight: "#eef4ee",
    colorDark: "#4a6b4a",
    badge: "Best Seller",
    features: ["50 mL"],
  },
  {
    id: "eka-mango",
    name: "EKA Water Enhancer",
    flavor: "Mango",
    tagline: "Tropical & Sweet",
    description:
      "Taste the tropics with every squeeze. Luscious, sun-ripened mango flavor that transforms plain water into a vacation in a bottle. Zero sugar, zero calories.",
    price: 4000,
    image: "/images/product2.jpeg",
    color: "#c4822a",
    colorLight: "#fdf3e7",
    colorDark: "#9a5a0a",
    badge: "New",
    features: ["50 mL"],
  },
  {
    id: "eka-mixed-berry",
    name: "EKA Water Enhancer",
    flavor: "Mixed Berry",
    tagline: "Sweet & Bold",
    description:
      "A vibrant medley of strawberries, blueberries, raspberries, and blackberries. Rich, fruity, and completely guilt-free. Perfect for those who love a sweet sip.",
    price: 4000,
    image: "/images/product1.jpeg",
    color: "#7a5a8f",
    colorLight: "#f2eef8",
    colorDark: "#5a3a6f",
    features: ["50 mL"],
  },
  {
    id: "eka-orange",
    name: "EKA Water Enhancer",
    flavor: "Orange",
    tagline: "Bright & Citrusy",
    description:
      "Sun-kissed orange that brightens every glass. Fresh, natural orange flavor that adds a vitamin-C inspired feel to your hydration routine — without the sugar.",
    price: 4000,
    image: "/images/product3.jpeg",
    color: "#d4721a",
    colorLight: "#fef4ea",
    colorDark: "#a04a00",
    features: ["50 mL"],
  },
  {
    id: "eka-strawberry",
    name: "EKA Water Enhancer",
    flavor: "Strawberry",
    tagline: "Light & Fruity",
    description:
      "Garden-fresh strawberry sweetness that turns every sip into summer. Light, floral, and delightfully fruity. Your favorite flavor, with absolutely zero guilt.",
    price: 4000,
    image: "/images/product4.jpeg",
    color: "#c45a6a",
    colorLight: "#fdf0f2",
    colorDark: "#9a2a3a",
    features: ["50 mL"],
  },
  {
    id: "eka-water-bottle-1",
    name: "EKA Water Bottle",
    flavor: "Olive Green (750mL)",
    tagline: "Eco-friendly & Durable",
    description:
      "Premium, BPA-free, leak-proof water bottle custom-designed to match your EKA style. Complete with convenient carry strap and measurement marks to track your intake.",
    price: 5000,
    image: "/images/waterbottle1.jpeg",
    color: "#5a7a5a",
    colorLight: "#f0f4f0",
    colorDark: "#3e573e",
    badge: "Must Have",
    features: ["750 mL", "BPA Free", "Leak Proof"],
  },
];

export const BUNDLES = [
  {
    id: "eka-starter-bundle",
    name: "Starter Bundle",
    description: "Pick any 3 flavors and save",
    price: 15000,
    originalPrice: 18500,
    image: "/images/eka-full-set.jpeg",
    includes: ["Any 3 Flavors of Your Choice"],
    badge: "Save ₦3,500",
  },
];

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

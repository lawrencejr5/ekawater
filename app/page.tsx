"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "./cart-context";
import { PRODUCTS, BUNDLES, formatPrice } from "./products";
import type { Product } from "./products";
import Link from "next/link";

// ─── Navbar ──────────────────────────────────────────────────────────────────

export function Navbar({ onCartOpen }: { onCartOpen: () => void }) {
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="navbar"
      style={{
        background: scrolled
          ? "rgba(248, 245, 240, 0.96)"
          : "rgba(248, 245, 240, 0.80)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: scrolled ? "0 1px 0 rgba(107, 143, 107, 0.15)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <div className="navbar-inner container">
        <a href="#" className="logo" aria-label="EKA Home">
          <span className="logo-text">EKA</span>
          <span className="logo-leaf">🌿</span>
        </a>

        <div className="nav-links">
          <a href="#products" className="nav-link">
            Flavors
          </a>
          <a href="#bundles" className="nav-link">
            Bundles
          </a>
          <a href="#why" className="nav-link">
            Why EKA
          </a>
          <a href="#faq" className="nav-link">
            FAQ
          </a>
        </div>

        <button
          id="cart-button"
          className="cart-btn"
          onClick={onCartOpen}
          aria-label={`Open cart with ${totalItems} items`}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          {totalItems > 0 && (
            <span className="cart-badge" aria-live="polite">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero({ onShopNow }: { onShopNow: () => void }) {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <Image
          src="/images/waterbottle2.jpeg"
          alt="EKA Water Enhancer lifestyle"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div className="hero-overlay" />
      </div>

      <div className="hero-content container">
        <div className="hero-text">
          <p className="hero-eyebrow">Water Enhancer</p>
          <h1 className="hero-title">
            Make Every Sip
            <br />
            <span className="hero-accent">Irresistible.</span>
          </h1>
          <p className="hero-desc">
            If drinking water feels like a chore, EKA changes that. One squeeze
            of natural flavor — zero sugar, zero calories — and suddenly,
            staying hydrated is the best part of your day.
          </p>
          <div className="hero-pills">
            <span className="pill">0 Sugar</span>
            <span className="pill">0 Calories</span>
            <span className="pill">100% Vegan</span>
            <span className="pill">Gluten Free</span>
          </div>
          <div className="hero-ctas">
            <button
              id="hero-shop-btn"
              className="btn-primary"
              onClick={onShopNow}
            >
              Shop Flavors
            </button>
            <a href="#why" className="btn-ghost">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      flavor: product.flavor,
      price: product.price,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="product-card"
      style={
        {
          "--card-color": product.color,
          "--card-light": product.colorLight,
          display: "block",
        } as React.CSSProperties
      }
      aria-label={`View ${product.flavor} flavor`}
    >
      {product.badge && (
        <span className="product-badge" style={{ background: product.color }}>
          {product.badge}
        </span>
      )}
      <div
        className="product-img-wrap"
        style={{ background: product.colorLight }}
      >
        <Image
          src={product.image}
          alt={`EKA ${product.flavor} Water Enhancer`}
          fill
          style={{ objectFit: "contain", padding: "8px" }}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 280px"
        />
      </div>
      <div className="product-body">
        <p className="product-tagline" style={{ color: product.color }}>
          {product.tagline}
        </p>
        <h3 className="product-flavor">{product.flavor}</h3>
        <div className="product-features">
          {product.features.map((f) => (
            <span key={f} className="feature-tag">
              {f}
            </span>
          ))}
        </div>
        <div className="product-footer">
          <span className="product-price">{formatPrice(product.price)}</span>
          <button
            id={`add-to-cart-${product.id}`}
            className={`add-btn ${added ? "added" : ""}`}
            onClick={handleAdd}
            aria-label={`Add ${product.flavor} to cart`}
            style={{ background: added ? "#4a6b4a" : product.color }}
          >
            {added ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}

// ─── Product Modal ────────────────────────────────────────────────────────────

function ProductModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        flavor: product.flavor,
        price: product.price,
        image: product.image,
      });
    }
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal
      aria-label={`${product.flavor} details`}
    >
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="modal-grid">
          <div
            className="modal-img-wrap"
            style={{ background: product.colorLight }}
          >
            <Image
              src={product.image}
              alt={`EKA ${product.flavor}`}
              fill
              style={{ objectFit: "contain", padding: "24px" }}
              sizes="(max-width: 768px) 90vw, 45vw"
            />
          </div>

          <div className="modal-info">
            {product.badge && (
              <span
                className="product-badge mb"
                style={{ background: product.color }}
              >
                {product.badge}
              </span>
            )}
            <p className="modal-brand">EKA Water Enhancer</p>
            <h2 className="modal-flavor">{product.flavor}</h2>
            <p className="modal-tagline" style={{ color: product.color }}>
              {product.tagline}
            </p>
            <p className="modal-desc">{product.description}</p>

            <div className="modal-features">
              {product.features.map((f) => (
                <span
                  key={f}
                  className="feature-pill"
                  style={{ borderColor: product.color, color: product.color }}
                >
                  {f}
                </span>
              ))}
            </div>

            <div className="modal-how">
              <p className="modal-how-title">How to enjoy</p>
              <ol className="modal-steps">
                <li>Squeeze into 250–500 mL of water</li>
                <li>Stir or shake until dissolved</li>
                <li>Enjoy anytime, anywhere!</li>
              </ol>
            </div>

            <div className="modal-purchase">
              <div className="modal-price">{formatPrice(product.price)}</div>
              <div className="modal-qty">
                <button
                  className="qty-btn"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="qty-val">{qty}</span>
                <button
                  className="qty-btn"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <button
                id={`modal-add-${product.id}`}
                className={`btn-primary modal-add-btn ${added ? "success" : ""}`}
                onClick={handleAdd}
                style={{ background: added ? "#4a6b4a" : product.color }}
              >
                {added ? "Added to Cart! ✓" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Products Section ─────────────────────────────────────────────────────────

function ProductsSection() {
  return (
    <section className="section reveal" id="products">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">Choose Your Flavor</p>
          <h2 className="section-title">5 Flavors. Endless Possibilities.</h2>
          <p className="section-subtitle">
            Every bottle is 50 mL and packed with natural flavor. One squeeze is
            all it takes.
          </p>
        </div>

        <div className="products-grid">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Bundles Section ──────────────────────────────────────────────────────────

function BundlesSection() {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAdd = (bundle: (typeof BUNDLES)[0]) => {
    addToCart({
      id: bundle.id,
      name: bundle.name,
      flavor: bundle.description,
      price: bundle.price,
      image: bundle.image,
    });
    setAddedId(bundle.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section className="section bundles-section reveal" id="bundles">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">Bundle & Save</p>
          <h2 className="section-title">More Flavor, More Value</h2>
          <p className="section-subtitle">
            Stock up and save. Our bundles are the smartest way to keep your
            water game strong.
          </p>
        </div>

        <div className="bundles-grid">
          {BUNDLES.map((bundle, i) => (
            <article
              key={bundle.id}
              className={`bundle-card ${i === 2 ? "featured" : ""}`}
            >
              {bundle.badge && (
                <span className="bundle-badge">{bundle.badge}</span>
              )}
              <div className="bundle-img-wrap">
                <Image
                  src={bundle.image}
                  alt={bundle.name}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 90vw, 33vw"
                />
              </div>
              <div className="bundle-body">
                <h3 className="bundle-name">{bundle.name}</h3>
                <p className="bundle-desc">{bundle.description}</p>
                <ul className="bundle-includes">
                  {bundle.includes.map((item) => (
                    <li key={item}>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="bundle-pricing">
                  <span className="bundle-price">
                    {formatPrice(bundle.price)}
                  </span>
                  <span className="bundle-original">
                    {formatPrice(bundle.originalPrice)}
                  </span>
                </div>
                <button
                  id={`bundle-add-${bundle.id}`}
                  className={`btn-primary bundle-cta ${addedId === bundle.id ? "success" : ""}`}
                  onClick={() => handleAdd(bundle)}
                >
                  {addedId === bundle.id ? "Added! ✓" : "Add Bundle to Cart"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why EKA Section ─────────────────────────────────────────────────────────

function WhySection() {
  const features = [
    {
      icon: "💧",
      title: "Beat the Water Bore",
      desc: "If you struggle to drink plain water, EKA makes it something you actually look forward to. No more forcing yourself.",
    },
    {
      icon: "🌿",
      title: "Zero Guilt, Full Flavor",
      desc: "Zero sugar, zero calories, 100% vegan and gluten-free. Flavor should never come at a cost to your health.",
    },
    {
      icon: "✈️",
      title: "Go Anywhere",
      desc: "Pocket-sized at 50 mL. Toss it in your bag, gym kit, or travel pouch. Hydration that travels with you.",
    },
    {
      icon: "🤸",
      title: "Fuel Your Lifestyle",
      desc: "Whether you're at work, the gym, or on the go — EKA fits every moment and every routine.",
    },
  ];

  return (
    <section className="section why-section reveal" id="why">
      <div className="container">
        <div className="why-grid">
          <div className="why-visual">
            <div className="why-img-wrap">
              <Image
                src="/images/waterbottle1.jpeg"
                alt="EKA water bottle lifestyle"
                fill
                style={{ objectFit: "cover", borderRadius: "20px" }}
                sizes="(max-width: 768px) 90vw, 45vw"
              />
            </div>
            <div className="why-float-card">
              <p className="why-stat">50 mL</p>
              <p className="why-stat-label">= up to 25 servings</p>
            </div>
          </div>

          <div className="why-content">
            <p className="section-eyebrow">Why EKA?</p>
            <h2 className="section-title left">
              Make Drinking Water
              <br />
              the Highlight of Your Day
            </h2>
            <p className="why-intro">
              Most people don&apos;t drink enough water — not because
              they&apos;re lazy, but because plain water is, well, plain. EKA
              changes that with natural, sugar-free flavor in a squeeze.
            </p>
            <div className="why-features">
              {features.map((f) => (
                <div key={f.title} className="why-item">
                  <span className="why-icon">{f.icon}</span>
                  <div>
                    <h4 className="why-item-title">{f.title}</h4>
                    <p className="why-item-desc">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function Testimonials() {
  const reviews = [
    {
      name: "Adaeze O.",
      location: "Lagos",
      text: "I used to drink barely 1 litre a day. Since I started using EKA, I'm hitting 2.5 litres without even thinking about it. The Lemon Lime is insane!",
      rating: 5,
      flavor: "Lemon Lime",
    },
    {
      name: "Emeka T.",
      location: "Abuja",
      text: "The Mango flavor is so good, my kids keep stealing my water bottle. Had to get them their own. Zero sugar and they don't even notice!",
      rating: 5,
      flavor: "Mango",
    },
    {
      name: "Simi A.",
      location: "Port Harcourt",
      text: "As a fitness person, I needed something to make my water interesting post-workout. EKA Mixed Berry is literally perfect. Can't go back to plain water.",
      rating: 5,
      flavor: "Mixed Berry",
    },
  ];

  return (
    <section className="section testimonials-section reveal">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">What People Say</p>
          <h2 className="section-title">Real People. Real Results.</h2>
        </div>
        <div className="reviews-grid">
          {reviews.map((r) => (
            <div key={r.name} className="review-card">
              <div className="review-stars">{"★".repeat(r.rating)}</div>
              <p className="review-text">&ldquo;{r.text}&rdquo;</p>
              <div className="review-author">
                <div className="review-avatar">{r.name[0]}</div>
                <div>
                  <p className="review-name">{r.name}</p>
                  <p className="review-meta">
                    {r.location} · {r.flavor}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    {
      q: "How much EKA do I use per glass?",
      a: "One squeeze (about 2–3 mL) into 250–500 mL of water is perfect. Adjust to your taste preference — you're in control!",
    },
    {
      q: "Is EKA safe for children?",
      a: "EKA is made with natural flavors and is vegan, gluten-free, and has zero sugar. However, we recommend consulting your pediatrician before giving it to children under 12.",
    },
    {
      q: "Does EKA have any artificial sweeteners?",
      a: "EKA uses a touch of stevia glycosides (a plant-derived sweetener) and sucralose to achieve its great taste with zero calories and zero sugar.",
    },
    {
      q: "How long does one bottle last?",
      a: "Each 50 mL bottle gives you approximately 20–25 servings depending on how much you use. That's weeks of enhanced hydration!",
    },
    {
      q: "Do I need to refrigerate EKA?",
      a: "Shake well before use. Refrigerate after opening for best freshness. Unopened bottles can be stored at room temperature.",
    },
    {
      q: "Can I get free delivery?",
      a: "Yes! We offer free delivery within Lagos on orders over ₦10,000. Nationwide delivery is available at a flat rate.",
    },
  ];

  return (
    <section className="section faq-section reveal" id="faq">
      <div className="container">
        <div className="faq-layout">
          <div className="section-header left-align">
            <p className="section-eyebrow">Got Questions?</p>
            <h2 className="section-title left">Frequently Asked Questions</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
                <button
                  className="faq-question"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  id={`faq-q-${i}`}
                >
                  {faq.q}
                  <span className="faq-icon">{open === i ? "−" : "+"}</span>
                </button>
                <div className="faq-answer" aria-hidden={open !== i}>
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Cart Drawer ──────────────────────────────────────────────────────────────

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } =
    useCart();
  const [checkout, setCheckout] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) setCheckout(false);
  }, [open]);

  return (
    <>
      {open && <div className="drawer-backdrop" onClick={onClose} />}
      <aside
        className={`cart-drawer ${open ? "open" : ""}`}
        aria-label="Shopping cart"
        role="complementary"
      >
        <div className="drawer-header">
          <h2 className="drawer-title">Your Cart</h2>
          <button
            className="drawer-close"
            onClick={onClose}
            aria-label="Close cart"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="drawer-body">
          {items.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-icon">🛒</div>
              <p className="empty-title">Your cart is empty</p>
              <p className="empty-sub">Add some flavors to get started!</p>
              <button className="btn-primary" onClick={onClose}>
                Shop Flavors
              </button>
            </div>
          ) : (
            <>
              {!checkout ? (
                <div className="cart-items">
                  {items.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-img">
                        <Image
                          src={item.image}
                          alt={item.flavor}
                          fill
                          style={{ objectFit: "contain" }}
                          sizes="64px"
                        />
                      </div>
                      <div className="cart-item-info">
                        <p className="cart-item-name">{item.flavor}</p>
                        <p className="cart-item-sub">EKA Water Enhancer</p>
                        <p className="cart-item-price">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      <div className="cart-item-controls">
                        <div className="cart-qty">
                          <button
                            className="qty-btn sm"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            aria-label="Decrease"
                          >
                            −
                          </button>
                          <span className="qty-val sm">{item.quantity}</span>
                          <button
                            className="qty-btn sm"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            aria-label="Increase"
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="remove-btn"
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.flavor}`}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <CheckoutForm
                  onBack={() => setCheckout(false)}
                  onDone={() => {
                    clearCart();
                    onClose();
                  }}
                />
              )}
            </>
          )}
        </div>

        {items.length > 0 && !checkout && (
          <div className="drawer-footer">
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span className="free-tag">
                  {totalPrice >= 10000 ? "Free 🎉" : formatPrice(1500)}
                </span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>
                  {formatPrice(totalPrice + (totalPrice >= 10000 ? 0 : 1500))}
                </span>
              </div>
            </div>
            {totalPrice < 10000 && (
              <p className="free-hint">
                Add {formatPrice(10000 - totalPrice)} more for free delivery!
              </p>
            )}
            <button
              id="checkout-btn"
              className="btn-primary full"
              onClick={() => setCheckout(true)}
            >
              Checkout —{" "}
              {formatPrice(totalPrice + (totalPrice >= 10000 ? 0 : 1500))}
            </button>
            <button className="clear-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

// ─── Checkout Form ────────────────────────────────────────────────────────────

function CheckoutForm({
  onBack,
  onDone,
}: {
  onBack: () => void;
  onDone: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "Lagos",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(onDone, 2500);
  };

  if (submitted) {
    return (
      <div className="order-success">
        <div className="success-icon">🎉</div>
        <h3>Order Placed!</h3>
        <p>
          Thank you, {form.name}! Your EKA order is confirmed. We&apos;ll reach
          you at {form.phone} shortly.
        </p>
      </div>
    );
  }

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <button type="button" className="back-btn" onClick={onBack}>
        ← Back to Cart
      </button>
      <h3 className="checkout-title">Delivery Details</h3>

      <div className="form-group">
        <label htmlFor="checkout-name">Full Name</label>
        <input
          id="checkout-name"
          type="text"
          required
          placeholder="Adaeze Johnson"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="checkout-phone">Phone Number</label>
        <input
          id="checkout-phone"
          type="tel"
          required
          placeholder="0801 234 5678"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="checkout-address">Delivery Address</label>
        <input
          id="checkout-address"
          type="text"
          required
          placeholder="123 Marina Street, VI"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="checkout-city">City</label>
        <select
          id="checkout-city"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        >
          <option>Lagos</option>
          <option>Abuja</option>
          <option>Port Harcourt</option>
          <option>Kano</option>
          <option>Ibadan</option>
          <option>Other</option>
        </select>
      </div>

      <p className="payment-note">
        💳 Payment on delivery. We&apos;ll call to confirm your order.
      </p>

      <button id="place-order-btn" type="submit" className="btn-primary full">
        Place Order
      </button>
    </form>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <p className="footer-logo">EKA 🌿</p>
            <p className="footer-tagline">One Squeeze. Endless Flavor.</p>
            <p className="footer-about">
              EKA Water Enhancer is your daily hydration companion. Natural
              flavors, zero sugar, and made for people who want to live better.
            </p>
          </div>
          <div className="footer-links">
            <h4>Products</h4>
            <a href="#products">Lemon Lime</a>
            <a href="#products">Mixed Berry</a>
            <a href="#products">Mango</a>
            <a href="#products">Orange</a>
            <a href="#products">Strawberry</a>
          </div>
          <div className="footer-links">
            <h4>Company</h4>
            <a href="#why">About EKA</a>
            <a href="#bundles">Bundles</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="footer-contact">
            <h4>Get in Touch</h4>
            <p>📧 hello@ekawater.ng</p>
            <p>📞 +234 800 EKA WATER</p>
            <p>🚚 Free delivery over ₦10,000</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 EKA Water Enhancer. All rights reserved.</p>
          <div className="footer-badges">
            <span>🌱 Vegan</span>
            <span>🌾 Gluten Free</span>
            <span>🐰 Cruelty Free</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

function EkaApp() {
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar onCartOpen={() => setCartOpen(true)} />
      <main>
        <Hero onShopNow={scrollToProducts} />
        <ProductsSection />
        <WhySection />
        <BundlesSection />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

export default function HomePage() {
  return <EkaApp />;
}

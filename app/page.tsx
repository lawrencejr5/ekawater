"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CartProvider, useCart } from "./cart-context";
import { PRODUCTS, BUNDLES, formatPrice } from "./products";
import type { Product } from "./products";

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar({ onCartOpen }: { onCartOpen: () => void }) {
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

function ProductCard({
  product,
  onSelect,
}: {
  product: Product;
  onSelect: (p: Product) => void;
}) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
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
    <article
      className="product-card"
      style={
        {
          "--card-color": product.color,
          "--card-light": product.colorLight,
        } as React.CSSProperties
      }
      onClick={() => onSelect(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect(product)}
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
    </article>
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
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <section className="section" id="products">
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
            <ProductCard key={p.id} product={p} onSelect={setSelected} />
          ))}
        </div>
      </div>

      {selected && (
        <ProductModal product={selected} onClose={() => setSelected(null)} />
      )}
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
    <section className="section bundles-section" id="bundles">
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
    <section className="section why-section" id="why">
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
    <section className="section testimonials-section">
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
    <section className="section faq-section" id="faq">
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

function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
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

function Footer() {
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
            <a href="#">Contact Us</a>
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
  return (
    <CartProvider>
      <EkaApp />
      <style>{`
        /* ══════════════════════════════════════
           LAYOUT
        ══════════════════════════════════════ */
        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ══════════════════════════════════════
           NAVBAR
        ══════════════════════════════════════ */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
        }
        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 68px;
          gap: 16px;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 4px;
          text-decoration: none;
        }
        .logo-text {
          font-size: 24px;
          font-weight: 900;
          color: var(--sage-dark);
          letter-spacing: -1px;
        }
        .logo-leaf {
          font-size: 18px;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .nav-link {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-muted);
          padding: 8px 14px;
          border-radius: 999px;
          transition: all 0.2s ease;
        }
        .nav-link:hover {
          background: var(--sage-mist);
          color: var(--sage-dark);
        }
        .cart-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--sage-mist);
          color: var(--sage-dark);
          border: 1.5px solid var(--sage-pale);
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .cart-btn:hover {
          background: var(--sage-pale);
          transform: scale(1.05);
        }
        .cart-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          min-width: 20px;
          height: 20px;
          border-radius: 10px;
          background: var(--sage-dark);
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 5px;
          border: 2px solid var(--cream);
          animation: badge-pop 0.3s var(--ease-bounce);
        }
        @keyframes badge-pop {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }

        /* ══════════════════════════════════════
           HERO
        ══════════════════════════════════════ */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding-top: 68px;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(30, 42, 30, 0.88) 0%,
            rgba(20, 30, 20, 0.75) 50%,
            rgba(10, 15, 10, 0.60) 100%
          );
        }
        .hero-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          max-width: 720px;
          margin: 0 auto;
          padding-top: 60px;
          padding-bottom: 80px;
        }
        .hero-eyebrow {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--sage-pale);
          margin-bottom: 16px;
        }
        .hero-title {
          font-size: clamp(40px, 5vw, 64px);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -2px;
          color: var(--white);
          margin-bottom: 20px;
        }
        .hero-accent {
          color: #a3c0a3;
        }
        .hero-desc {
          font-size: 17px;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.9);
          max-width: 600px;
          margin: 0 auto 24px;
        }
        .hero-pills {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          margin-bottom: 32px;
        }
        .pill {
          font-size: 12px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.12);
          color: var(--white);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .hero-ctas {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .hero .btn-ghost {
          color: var(--white);
          border-color: rgba(255, 255, 255, 0.3);
        }
        .hero .btn-ghost:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--white);
        }

        /* ══════════════════════════════════════
           BUTTONS
        ══════════════════════════════════════ */
        .btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 28px;
          background: var(--sage-dark);
          color: #fff;
          font-size: 15px;
          font-weight: 600;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          transition: all 0.25s var(--ease);
          white-space: nowrap;
        }
        .btn-primary:hover {
          background: var(--charcoal);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(74, 107, 74, 0.3);
        }
        .btn-primary:active {
          transform: translateY(0);
        }
        .btn-primary.full {
          width: 100%;
        }
        .btn-primary.success {
          background: #4a6b4a !important;
        }
        .btn-ghost {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 28px;
          color: var(--sage-dark);
          font-size: 15px;
          font-weight: 600;
          border-radius: 999px;
          border: 1.5px solid var(--sage-pale);
          background: transparent;
          transition: all 0.25s var(--ease);
        }
        .btn-ghost:hover {
          background: var(--sage-mist);
          border-color: var(--sage);
        }

        /* ══════════════════════════════════════
           SECTIONS
        ══════════════════════════════════════ */
        .section {
          padding: var(--space-3xl) 0;
        }
        .section-header {
          text-align: center;
          max-width: 600px;
          margin: 0 auto 56px;
        }
        .section-header.left-align {
          text-align: left;
          margin: 0 0 40px;
        }
        .section-eyebrow {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--sage);
          margin-bottom: 12px;
        }
        .section-title {
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 800;
          letter-spacing: -1px;
          color: var(--charcoal);
          line-height: 1.2;
          margin-bottom: 16px;
        }
        .section-title.left {
          text-align: left;
        }
        .section-subtitle {
          font-size: 16px;
          color: var(--text-muted);
          line-height: 1.6;
        }

        /* ══════════════════════════════════════
           PRODUCTS GRID
        ══════════════════════════════════════ */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 24px;
        }
        .product-card {
          position: relative;
          background: var(--white);
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid var(--cream-dark);
          cursor: pointer;
          transition: all 0.3s var(--ease);
          box-shadow: var(--shadow-sm);
        }
        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-lg);
          border-color: var(--card-color, var(--sage-pale));
        }
        .product-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 2;
          font-size: 11px;
          font-weight: 700;
          color: #fff;
          padding: 4px 10px;
          border-radius: 999px;
          letter-spacing: 0.5px;
        }
        .product-badge.mb {
          position: static;
          display: inline-block;
          margin-bottom: 12px;
        }
        .product-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 3/4;
          overflow: hidden;
        }
        .product-body {
          padding: 20px;
        }
        .product-tagline {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .product-flavor {
          font-size: 20px;
          font-weight: 800;
          color: var(--charcoal);
          margin-bottom: 12px;
          letter-spacing: -0.5px;
        }
        .product-features {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 16px;
        }
        .feature-tag {
          font-size: 10px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 999px;
          background: var(--sage-mist);
          color: var(--sage-dark);
          border: 1px solid var(--sage-pale);
        }
        .product-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .product-price {
          font-size: 18px;
          font-weight: 800;
          color: var(--charcoal);
          letter-spacing: -0.5px;
        }
        .add-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          color: #fff;
          border: none;
          cursor: pointer;
          transition: all 0.25s var(--ease);
          flex-shrink: 0;
        }
        .add-btn:hover {
          transform: scale(1.08);
          filter: brightness(0.9);
        }
        .add-btn.added {
          transform: scale(1.08);
        }

        /* ══════════════════════════════════════
           MODAL
        ══════════════════════════════════════ */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 2000;
          background: rgba(30, 42, 30, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fade-in 0.2s ease;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .modal-box {
          background: var(--white);
          border-radius: var(--radius-lg);
          width: 100%;
          max-width: 800px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: slide-up 0.3s var(--ease);
          box-shadow: var(--shadow-xl);
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 1;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--cream);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          transition: all 0.2s;
        }
        .modal-close:hover {
          background: var(--cream-dark);
          color: var(--charcoal);
        }
        .modal-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 480px;
        }
        .modal-img-wrap {
          position: relative;
          border-radius: var(--radius-lg) 0 0 var(--radius-lg);
          overflow: hidden;
          min-height: 380px;
        }
        .modal-info {
          padding: 36px 32px;
          overflow-y: auto;
        }
        .modal-brand {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--text-light);
          margin-bottom: 8px;
        }
        .modal-flavor {
          font-size: 32px;
          font-weight: 900;
          color: var(--charcoal);
          letter-spacing: -1px;
          margin-bottom: 6px;
        }
        .modal-tagline {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .modal-desc {
          font-size: 15px;
          line-height: 1.7;
          color: var(--text-muted);
          margin-bottom: 24px;
        }
        .modal-features {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }
        .feature-pill {
          font-size: 12px;
          font-weight: 600;
          padding: 5px 12px;
          border-radius: 999px;
          border: 1.5px solid;
          background: transparent;
        }
        .modal-how {
          margin-bottom: 28px;
          padding: 16px;
          background: var(--sage-mist);
          border-radius: var(--radius-md);
        }
        .modal-how-title {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--sage-dark);
          margin-bottom: 10px;
        }
        .modal-steps {
          padding-left: 18px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .modal-steps li {
          font-size: 14px;
          color: var(--text-muted);
        }
        .modal-purchase {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .modal-price {
          font-size: 24px;
          font-weight: 900;
          color: var(--charcoal);
          letter-spacing: -0.5px;
        }
        .modal-add-btn {
          flex: 1;
          min-width: 140px;
          padding: 12px 20px;
          font-size: 14px;
        }

        /* ══════════════════════════════════════
           QUANTITY CONTROLS
        ══════════════════════════════════════ */
        .modal-qty, .cart-qty {
          display: flex;
          align-items: center;
          gap: 4px;
          background: var(--cream);
          border-radius: 999px;
          padding: 4px;
          border: 1px solid var(--cream-dark);
        }
        .qty-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          font-size: 16px;
          font-weight: 500;
          color: var(--text-muted);
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
        }
        .qty-btn:hover {
          background: var(--sage-pale);
          color: var(--sage-dark);
        }
        .qty-btn.sm { width: 26px; height: 26px; font-size: 14px; }
        .qty-val {
          font-size: 15px;
          font-weight: 700;
          color: var(--charcoal);
          min-width: 28px;
          text-align: center;
        }
        .qty-val.sm { font-size: 13px; min-width: 22px; }

        /* ══════════════════════════════════════
           WHY SECTION
        ══════════════════════════════════════ */
        .why-section {
          background: var(--white);
        }
        .why-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        .why-visual {
          position: relative;
        }
        .why-img-wrap {
          position: relative;
          aspect-ratio: 4/5;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }
        .why-float-card {
          position: absolute;
          bottom: -20px;
          right: -20px;
          background: var(--white);
          border-radius: var(--radius-md);
          padding: 16px 24px;
          box-shadow: var(--shadow-lg);
          text-align: center;
          border: 1px solid var(--cream-dark);
        }
        .why-stat {
          font-size: 28px;
          font-weight: 900;
          color: var(--sage-dark);
          letter-spacing: -1px;
        }
        .why-stat-label {
          font-size: 12px;
          color: var(--text-muted);
          font-weight: 500;
        }
        .why-intro {
          font-size: 16px;
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 32px;
        }
        .why-features {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .why-item {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }
        .why-icon {
          font-size: 24px;
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          background: var(--sage-mist);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .why-item-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--charcoal);
          margin-bottom: 4px;
        }
        .why-item-desc {
          font-size: 14px;
          color: var(--text-muted);
          line-height: 1.6;
        }

        /* ══════════════════════════════════════
           BUNDLES
        ══════════════════════════════════════ */
        .bundles-section {
          background: var(--cream);
        }
        .bundles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }
        .bundle-card {
          position: relative;
          background: var(--white);
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1.5px solid var(--cream-dark);
          transition: all 0.3s var(--ease);
          box-shadow: var(--shadow-sm);
        }
        .bundle-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-lg);
        }
        .bundle-card.featured {
          border-color: var(--sage);
          box-shadow: 0 0 0 2px var(--sage-pale), var(--shadow-md);
        }
        .bundle-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          z-index: 2;
          font-size: 11px;
          font-weight: 700;
          color: #fff;
          padding: 4px 10px;
          border-radius: 999px;
          background: var(--sage-dark);
        }
        .bundle-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          overflow: hidden;
        }
        .bundle-body {
          padding: 24px;
        }
        .bundle-name {
          font-size: 20px;
          font-weight: 800;
          color: var(--charcoal);
          margin-bottom: 6px;
          letter-spacing: -0.5px;
        }
        .bundle-desc {
          font-size: 14px;
          color: var(--text-muted);
          margin-bottom: 16px;
        }
        .bundle-includes {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
        }
        .bundle-includes li {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--text-muted);
          font-weight: 500;
        }
        .bundle-includes li svg {
          color: var(--sage);
          flex-shrink: 0;
        }
        .bundle-pricing {
          display: flex;
          align-items: baseline;
          gap: 10px;
          margin-bottom: 16px;
        }
        .bundle-price {
          font-size: 24px;
          font-weight: 900;
          color: var(--charcoal);
          letter-spacing: -0.5px;
        }
        .bundle-original {
          font-size: 15px;
          color: var(--text-light);
          text-decoration: line-through;
        }
        .bundle-cta {
          width: 100%;
        }

        /* ══════════════════════════════════════
           TESTIMONIALS
        ══════════════════════════════════════ */
        .testimonials-section {
          background: var(--white);
        }
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }
        .review-card {
          background: var(--cream);
          border-radius: var(--radius-lg);
          padding: 28px;
          border: 1px solid var(--cream-dark);
          transition: all 0.3s;
        }
        .review-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }
        .review-stars {
          font-size: 18px;
          color: #f4b942;
          letter-spacing: 2px;
          margin-bottom: 16px;
        }
        .review-text {
          font-size: 15px;
          line-height: 1.7;
          color: var(--text-muted);
          margin-bottom: 20px;
          font-style: italic;
        }
        .review-author {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .review-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--sage-pale);
          color: var(--sage-dark);
          font-weight: 700;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .review-name {
          font-size: 14px;
          font-weight: 700;
          color: var(--charcoal);
        }
        .review-meta {
          font-size: 12px;
          color: var(--text-light);
        }

        /* ══════════════════════════════════════
           FAQ
        ══════════════════════════════════════ */
        .faq-section {
          background: var(--cream);
        }
        .faq-layout {
          max-width: 720px;
          margin: 0 auto;
        }
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .faq-item {
          background: var(--white);
          border-radius: var(--radius-md);
          border: 1px solid var(--cream-dark);
          overflow: hidden;
          transition: all 0.2s;
        }
        .faq-item.open {
          border-color: var(--sage-pale);
          box-shadow: var(--shadow-sm);
        }
        .faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 18px 20px;
          font-size: 15px;
          font-weight: 600;
          color: var(--charcoal);
          text-align: left;
          background: none;
          border: none;
          cursor: pointer;
          transition: background 0.15s;
        }
        .faq-question:hover {
          background: var(--cream);
        }
        .faq-icon {
          font-size: 20px;
          color: var(--sage);
          font-weight: 400;
          flex-shrink: 0;
          transition: transform 0.2s;
        }
        .faq-item.open .faq-icon {
          transform: rotate(180deg);
        }
        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease, padding 0.3s ease;
        }
        .faq-item.open .faq-answer {
          max-height: 200px;
          padding: 0 20px 18px;
        }
        .faq-answer p {
          font-size: 14px;
          color: var(--text-muted);
          line-height: 1.7;
        }

        /* ══════════════════════════════════════
           CART DRAWER
        ══════════════════════════════════════ */
        .drawer-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1100;
          background: rgba(30, 42, 30, 0.35);
          backdrop-filter: blur(2px);
          animation: fade-in 0.2s ease;
        }
        .cart-drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          z-index: 1200;
          width: 400px;
          max-width: 100vw;
          background: var(--white);
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.35s var(--ease);
          box-shadow: -8px 0 40px rgba(74, 107, 74, 0.15);
        }
        .cart-drawer.open {
          transform: translateX(0);
        }
        .drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid var(--cream-dark);
          flex-shrink: 0;
        }
        .drawer-title {
          font-size: 18px;
          font-weight: 800;
          color: var(--charcoal);
        }
        .drawer-close {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--cream);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          transition: all 0.2s;
        }
        .drawer-close:hover {
          background: var(--cream-dark);
        }
        .drawer-body {
          flex: 1;
          overflow-y: auto;
          padding: 20px 24px;
        }
        .empty-cart {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          text-align: center;
          gap: 12px;
          padding: 40px 0;
        }
        .empty-icon {
          font-size: 48px;
          margin-bottom: 8px;
        }
        .empty-title {
          font-size: 20px;
          font-weight: 700;
          color: var(--charcoal);
        }
        .empty-sub {
          font-size: 14px;
          color: var(--text-muted);
          margin-bottom: 8px;
        }
        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .cart-item {
          display: flex;
          gap: 12px;
          align-items: center;
          padding: 12px;
          background: var(--cream);
          border-radius: var(--radius-md);
          border: 1px solid var(--cream-dark);
        }
        .cart-item-img {
          position: relative;
          width: 64px;
          height: 64px;
          flex-shrink: 0;
          background: var(--sage-mist);
          border-radius: var(--radius-sm);
          overflow: hidden;
        }
        .cart-item-info {
          flex: 1;
          min-width: 0;
        }
        .cart-item-name {
          font-size: 14px;
          font-weight: 700;
          color: var(--charcoal);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .cart-item-sub {
          font-size: 11px;
          color: var(--text-light);
          margin-bottom: 4px;
        }
        .cart-item-price {
          font-size: 14px;
          font-weight: 700;
          color: var(--sage-dark);
        }
        .cart-item-controls {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }
        .remove-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-light);
          padding: 4px;
          border-radius: 6px;
          transition: all 0.15s;
          display: flex;
          align-items: center;
        }
        .remove-btn:hover {
          color: #e55;
          background: #fef0f0;
        }
        .drawer-footer {
          padding: 20px 24px;
          border-top: 1px solid var(--cream-dark);
          flex-shrink: 0;
          background: var(--white);
        }
        .cart-summary {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 12px;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: var(--text-muted);
        }
        .summary-row.total {
          font-size: 16px;
          font-weight: 800;
          color: var(--charcoal);
          padding-top: 8px;
          border-top: 1px solid var(--cream-dark);
          margin-top: 4px;
        }
        .free-tag {
          color: var(--sage-dark);
          font-weight: 600;
        }
        .free-hint {
          font-size: 12px;
          color: var(--sage);
          text-align: center;
          margin-bottom: 12px;
          font-weight: 500;
        }
        .clear-btn {
          width: 100%;
          padding: 10px;
          margin-top: 8px;
          font-size: 13px;
          color: var(--text-light);
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s;
        }
        .clear-btn:hover { color: #e55; }

        /* ══════════════════════════════════════
           CHECKOUT FORM
        ══════════════════════════════════════ */
        .checkout-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .back-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 13px;
          color: var(--text-muted);
          font-weight: 500;
          text-align: left;
          padding: 0;
          margin-bottom: 4px;
          transition: color 0.2s;
        }
        .back-btn:hover { color: var(--sage-dark); }
        .checkout-title {
          font-size: 20px;
          font-weight: 800;
          color: var(--charcoal);
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-group label {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .form-group input,
        .form-group select {
          padding: 12px 14px;
          border: 1.5px solid var(--cream-dark);
          border-radius: var(--radius-sm);
          font-size: 14px;
          color: var(--charcoal);
          background: var(--cream);
          transition: border-color 0.2s;
          outline: none;
        }
        .form-group input:focus,
        .form-group select:focus {
          border-color: var(--sage);
          background: var(--white);
        }
        .payment-note {
          font-size: 13px;
          color: var(--text-muted);
          background: var(--sage-mist);
          padding: 12px 14px;
          border-radius: var(--radius-sm);
          border-left: 3px solid var(--sage);
        }
        .order-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 12px;
          padding: 40px 20px;
        }
        .success-icon {
          font-size: 56px;
          animation: bounce 0.5s var(--ease-bounce);
        }
        @keyframes bounce {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }
        .order-success h3 {
          font-size: 24px;
          font-weight: 800;
          color: var(--sage-dark);
        }
        .order-success p {
          font-size: 14px;
          color: var(--text-muted);
          max-width: 280px;
          line-height: 1.6;
        }

        /* ══════════════════════════════════════
           FOOTER
        ══════════════════════════════════════ */
        .footer {
          background: var(--charcoal);
          color: #cdd8cd;
          padding: 64px 0 0;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 48px;
          margin-bottom: 48px;
        }
        .footer-logo {
          font-size: 28px;
          font-weight: 900;
          color: var(--white);
          letter-spacing: -1px;
          margin-bottom: 8px;
        }
        .footer-tagline {
          font-size: 13px;
          color: var(--sage-light);
          font-style: italic;
          margin-bottom: 12px;
        }
        .footer-about {
          font-size: 13px;
          color: #8a9e8a;
          line-height: 1.7;
        }
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer-links h4 {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--white);
          margin-bottom: 6px;
        }
        .footer-links a {
          font-size: 13px;
          color: #8a9e8a;
          transition: color 0.2s;
        }
        .footer-links a:hover { color: var(--sage-pale); }
        .footer-contact {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer-contact h4 {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--white);
          margin-bottom: 6px;
        }
        .footer-contact p {
          font-size: 13px;
          color: #8a9e8a;
        }
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 20px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .footer-bottom p {
          font-size: 12px;
          color: #6a7e6a;
        }
        .footer-badges {
          display: flex;
          gap: 12px;
        }
        .footer-badges span {
          font-size: 11px;
          color: #6a7e6a;
          background: rgba(255,255,255,0.05);
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.08);
        }

        /* ══════════════════════════════════════
           RESPONSIVE
        ══════════════════════════════════════ */
        @media (max-width: 768px) {
          .nav-links { display: none; }

          .hero-content {
            padding-top: 32px;
            padding-bottom: 48px;
          }

          .why-grid { grid-template-columns: 1fr; gap: 40px; }
          .why-float-card { right: 0; bottom: -16px; }

          .modal-grid { grid-template-columns: 1fr; }
          .modal-img-wrap {
            border-radius: var(--radius-lg) var(--radius-lg) 0 0;
            min-height: 240px;
          }
          .modal-info { padding: 24px 20px; }
          .modal-purchase { flex-direction: column; align-items: stretch; }

          .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
          .footer-brand { grid-column: 1 / -1; }
        }

        @media (max-width: 480px) {
          .container { padding: 0 16px; }
          .section { padding: 64px 0; }
          .products-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .product-body { padding: 12px; }
          .product-flavor { font-size: 16px; }
          .product-price { font-size: 15px; }
          .add-btn { font-size: 11px; padding: 6px 10px; }
          .bundles-grid { grid-template-columns: 1fr; }
          .reviews-grid { grid-template-columns: 1fr; }
          .footer-grid { grid-template-columns: 1fr; }
          .hero-title { letter-spacing: -1px; }
        }
      `}</style>
    </CartProvider>
  );
}

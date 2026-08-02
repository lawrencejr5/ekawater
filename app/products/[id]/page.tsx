"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCart } from "../../cart-context";
import { PRODUCTS, formatPrice } from "../../products";
import { Navbar, Footer, CartDrawer } from "../../page";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [cartOpen, setCartOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const product = PRODUCTS.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleAdd = () => {
    if (!product) return;
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
    setTimeout(() => setAdded(false), 1500);
  };

  if (!product) {
    return (
      <>
        <Navbar onCartOpen={() => setCartOpen(true)} />
        <main
          className="section"
          style={{
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "16px",
            paddingTop: "120px",
          }}
        >
          <h2>Product Not Found</h2>
          <p>The product you are looking for does not exist.</p>
          <Link href="/" className="btn-primary" style={{ textDecoration: "none" }}>
            Back to Home
          </Link>
        </main>
        <Footer />
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      </>
    );
  }

  return (
    <>
      <Navbar onCartOpen={() => setCartOpen(true)} />

      <main
        style={{
          minHeight: "80vh",
          paddingTop: "120px",
          paddingBottom: "80px",
          background: "var(--cream)",
        }}
      >
        <div className="container">
          {/* Breadcrumb */}
          <div style={{ marginBottom: "32px" }}>
            <Link
              href="/"
              style={{
                color: "var(--text-muted)",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Home
            </Link>
            <span style={{ margin: "0 8px", color: "var(--text-light)" }}>/</span>
            <span
              style={{
                color: "var(--charcoal)",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              {product.flavor}
            </span>
          </div>

          <div
            className="modal-grid"
            style={{
              background: "var(--white)",
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid var(--cream-dark)",
              boxShadow: "var(--shadow-md)",
            }}
          >
            {/* Image panel */}
            <div
              className="modal-img-wrap"
              style={{
                background: product.colorLight,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "80%",
                  height: "80%",
                  minHeight: "300px",
                }}
              >
                <Image
                  src={product.image}
                  alt={`EKA ${product.flavor}`}
                  fill
                  style={{ objectFit: "contain", padding: "24px" }}
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Info panel */}
            <div className="modal-info" style={{ padding: "48px 40px" }}>
              {product.badge && (
                <span className="product-badge mb" style={{ background: product.color }}>
                  {product.badge}
                </span>
              )}
              <p className="modal-brand">EKA Water Enhancer</p>
              <h1
                className="modal-flavor"
                style={{ fontSize: "36px", marginBottom: "12px" }}
              >
                {product.flavor}
              </h1>
              <p
                className="modal-tagline"
                style={{
                  color: product.color,
                  fontSize: "16px",
                  fontWeight: 700,
                  marginBottom: "24px",
                }}
              >
                {product.tagline}
              </p>
              <p
                className="modal-desc"
                style={{ fontSize: "16px", lineHeight: "1.7", marginBottom: "32px" }}
              >
                {product.description}
              </p>

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

              <div className="modal-how" style={{ marginBottom: "36px" }}>
                <p className="modal-how-title">How to enjoy</p>
                <ol className="modal-steps">
                  <li>Squeeze into 250–500 mL of water</li>
                  <li>Stir or shake until dissolved</li>
                  <li>Enjoy anytime, anywhere!</li>
                </ol>
              </div>

              <div
                className="modal-purchase"
                style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}
              >
                <div className="modal-price" style={{ fontSize: "28px" }}>
                  {formatPrice(product.price)}
                </div>
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
                  id={`details-add-${product.id}`}
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
      </main>

      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

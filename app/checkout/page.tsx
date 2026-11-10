"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "../../store/cartStore";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const [customer, setCustomer] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [discountCode, setDiscountCode] = useState("");
  const [discountMessage, setDiscountMessage] = useState("");
  const [discountRate, setDiscountRate] = useState(0);

  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const subtotal = items.reduce(
    (total, item) => total + item.book.price * item.quantity,
    0
  );

  const discount = subtotal * discountRate;
  const shippingCost = shippingMethod === "express" ? 800 : 400;
  const total = subtotal - discount + shippingCost;

  function applyDiscount() {
    if (discountCode.trim().toUpperCase() === "READ10") {
      setDiscountRate(0.1);
      setDiscountMessage("Discount applied! You saved 10%.");
    } else {
      setDiscountRate(0);
      setDiscountMessage("Invalid discount code. Please try again.");
    }
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setCustomer((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Prevent checkout when the cart is empty.
    if (items.length === 0) {
      return;
    }

    const newErrors: Record<string, string> = {};

    if (!customer.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }

    if (!customer.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!customer.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    }

    if (!customer.address.trim()) {
      newErrors.address = "Please enter your delivery address.";
    }

    if (!customer.city.trim()) {
      newErrors.city = "Please enter your town or city.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const order = {
      customer,
      items,
      subtotal,
      discount,
      shippingMethod,
      shippingCost,
      paymentMethod,
      total,
      orderDate: new Date().toLocaleDateString(),
    };

    sessionStorage.setItem("marginalia-order", JSON.stringify(order));

    clearCart();
    router.push("/order-confirmation");
  }

  if (items.length === 0) {
    return (
      <section className="empty-state page-container">
        <p className="eyebrow">Almost yours</p>
        <h1>Your checkout is waiting.</h1>
        <p className="muted">
          Add some books to your cart before checking out.
        </p>
        <Link href="/shop" className="primary-button">
          Explore the bookshop
        </Link>
      </section>
    );
  }

  return (
    <section className="section page-container">
      <p className="eyebrow">Almost yours</p>
      <h1 className="section-heading">Checkout</h1>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <div className="checkout-section">
            <h2>Contact Information</h2>

            <div className="checkout-fields">
              <div>
                <label htmlFor="fullName">Full name</label>
                <input
                  id="fullName"
                  name="fullName"
                  value={customer.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                  aria-invalid={!!errors.fullName}
                />
                {errors.fullName && <p role="alert">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={customer.email}
                  onChange={handleChange}
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                />
                {errors.email && <p role="alert">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone">Phone number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={customer.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && <p role="alert">{errors.phone}</p>}
              </div>
            </div>
          </div>

          <div className="checkout-section">
            <h2>Shipping Information</h2>

            <div className="checkout-fields">
              <div>
                <label htmlFor="address">Delivery address</label>
                <textarea
                  id="address"
                  name="address"
                  value={customer.address}
                  onChange={handleChange}
                  autoComplete="street-address"
                  aria-invalid={!!errors.address}
                />
                {errors.address && <p role="alert">{errors.address}</p>}
              </div>

              <div>
                <label htmlFor="city">Town or city</label>
                <input
                  id="city"
                  name="city"
                  value={customer.city}
                  onChange={handleChange}
                  autoComplete="address-level2"
                  aria-invalid={!!errors.city}
                />
                {errors.city && <p role="alert">{errors.city}</p>}
              </div>
            </div>
          </div>

          <div className="checkout-section">
            <h2>Delivery Method</h2>

            <div className="checkout-options">
              <label className="checkout-option">
                <input
                  type="radio"
                  name="shippingMethod"
                  value="standard"
                  checked={shippingMethod === "standard"}
                  onChange={() => setShippingMethod("standard")}
                />
                <span>
                  <strong>Standard Delivery</strong>
                  <small>3–5 business days · $400.00</small>
                </span>
              </label>

              <label className="checkout-option">
                <input
                  type="radio"
                  name="shippingMethod"
                  value="express"
                  checked={shippingMethod === "express"}
                  onChange={() => setShippingMethod("express")}
                />
                <span>
                  <strong>Express Delivery</strong>
                  <small>1–2 business days · $800.00</small>
                </span>
              </label>
            </div>
          </div>

          <div className="checkout-section">
            <h2>Payment Method</h2>

            <div className="checkout-options">
              <label className="checkout-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={() => setPaymentMethod("cash")}
                />
                <span>
                  <strong>Cash on Delivery</strong>
                  <small>Pay when your order arrives.</small>
                </span>
              </label>

              <label className="checkout-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank"
                  checked={paymentMethod === "bank"}
                  onChange={() => setPaymentMethod("bank")}
                />
                <span>
                  <strong>Bank Transfer</strong>
                  <small>
                    Simulated payment option for this demonstration.
                  </small>
                </span>
              </label>
            </div>
          </div>

          <button type="submit" className="primary-button">
            Place mock order · ${total.toFixed(2)}
          </button>
        </form>

        <aside className="checkout-sidebar">
          <div className="checkout-summary">
            <h2>Your Order</h2>

            {items.map((item) => (
              <div className="checkout-product" key={item.book.id}>
                {item.book.image && (
                  <div className="checkout-product-image">
                    <img src={item.book.image} alt={item.book.title} />
                  </div>
                )}

                <div className="checkout-product-details">
                  <h3>{item.book.title}</h3>
                  <p className="muted">By {item.book.author}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>
                    ${(item.book.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}

            <div className="checkout-totals">
              <p>Subtotal: ${subtotal.toFixed(2)}</p>
              <p>Discount: -${discount.toFixed(2)}</p>
              <p>Shipping: ${shippingCost.toFixed(2)}</p>
              <h3>Total: ${total.toFixed(2)}</h3>
            </div>
          </div>

          <div className="discount-section">
            <label htmlFor="discount-code">Discount code</label>

            <div className="discount-input-group">
              <input
                id="discount-code"
                type="text"
                value={discountCode}
                onChange={(event) => setDiscountCode(event.target.value)}
                placeholder="Enter discount code"
              />

              <button
                type="button"
                className="secondary-button"
                onClick={applyDiscount}
              >
                Apply
              </button>
            </div>

            {discountMessage && <p role="status">{discountMessage}</p>}
          </div>
        </aside>
      </div>

      <p>
        <Link href="/cart" className="text-link">
          Return to cart
        </Link>
      </p>
    </section>
  );
}

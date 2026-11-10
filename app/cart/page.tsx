"use client";
import Link from "next/link";
import { useCartStore } from "../../store/cartStore";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity
  );
  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity
  );
  const removeFromCart = useCartStore(
    (state) => state.removeFromCart
  );

  const subtotal = items.reduce(
    (total, item) => total + item.book.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <section className="empty-state page-container">
        <p className="eyebrow">Your reading basket</p>

        <h1>Your cart is waiting for a story.</h1>

        <p className="muted">
          You haven't added anything to your cart yet.
        </p>

        <Link href="/shop" className="primary-button">
          Explore the bookshop
        </Link>
      </section>
    );
  }

  return (
    <section className="section page-container">
      <p className="eyebrow">Your reading basket</p>
      <h1 className="section-heading">Your Cart</h1>

      <div className="cart-items">
        {items.map((item) => (
          <article className="cart-item" key={item.book.id}>

            <div className="cart-item-image">
              {item.book.image && (
                <img
                  src={item.book.image}
                  alt={item.book.title}
                />
              )}
            </div>

            <div className="cart-item-details">
              <h2>{item.book.title}</h2>
              <p className="muted">By {item.book.author}</p>
              <p>${item.book.price.toFixed(2)} each</p>
            </div>

            <div className="cart-item-controls">
              <button
                type="button"
                onClick={() => decreaseQuantity(item.book.id)}
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span>{item.quantity}</span>

              <button
                type="button"
                onClick={() => increaseQuantity(item.book.id)}
                aria-label="Increase quantity"
              >
                +
              </button>

              <button
              type="button"
              className="remove-item"
              onClick={() => removeFromCart(item.book.id)}
            >
               Remove
              </button>
              </div>

            <p className="cart-item-total">
              ${(item.book.price * item.quantity).toFixed(2)}
            </p>

          </article>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Subtotal: ${subtotal.toFixed(2)}</h2>

        <p className="muted">
          Shipping and any applicable discounts will be calculated later.
        </p>

        <Link href="/checkout" className="primary-button">
          Proceed to checkout
        </Link>
      </div>

      <p>
        <Link href="/shop" className="text-link">
          Continue shopping
        </Link>
      </p>
    </section>
  );
}

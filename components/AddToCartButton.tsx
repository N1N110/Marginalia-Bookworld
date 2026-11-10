"use client";
import { useEffect, useState } from "react";
import { useCartStore } from "../store/cartStore";
import type { Book } from "../data/products";

type AddToCartButtonProps = {
  book: Book;
};

export default function AddToCartButton({
  book,
}: AddToCartButtonProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  const [showToast, setShowToast] = useState(false);
  const [toastKey, setToastKey] = useState(0);

  useEffect(() => {
    if (!showToast) return;

    const timer = setTimeout(() => {
      setShowToast(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showToast, toastKey]);

  function handleAddToCart() {
    addToCart(book);
    setToastKey((previous) => previous + 1);
    setShowToast(true);
  }

  return (
    <>
      <button
        className="primary-button"
        type="button"
        disabled={book.availability === "Out of stock"}
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>

      {showToast && (
        <div
          key={toastKey}
          className="cart-toast"
          role="status"
          aria-live="polite"
        >
          <span className="cart-toast-icon">✓</span>
          <p>Congrats, you've added a new purchase.</p>
        </div>
      )}
    </>
  );
}

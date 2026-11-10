"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Order = {
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
  };
  items: {
    book: {
      id: string;
      title: string;
      price: number;
    };
    quantity: number;
  }[];
  subtotal: number;
  discount: number;
  shippingMethod: string;
  shippingCost: number;
  paymentMethod: string;
  total: number;
  orderDate: string;
};

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const savedOrder = sessionStorage.getItem("marginalia-order");

    if (savedOrder) {
      setOrder(JSON.parse(savedOrder) as Order);
    }
  }, []);

  if (!order) {
    return (
      <section className="empty-state page-container">
        <h1>No recent order found.</h1>
        <p className="muted">
          Once you complete checkout, confirmation of your order will appear here.
        </p>
        <Link href="/shop" className="primary-button">
          Return to the bookshop
        </Link>
      </section>
    );
  }

  return (
    <section className="section page-container order-page">
      <div className="order-header">
        <div className="order-success-icon">✓</div>
        <p className="eyebrow">A new chapter begins</p>
        <h1 className="section-heading">
          Thank you, {order.customer.fullName}!
        </h1>
        <p>Your order has been placed successfully.</p>
        <p className="muted">
          This is a demonstration order. No payment has been collected.
        </p>
      </div>

      <div className="checkout-summary">
        <h2>Order Confirmation</h2>

        <p>Order date: {order.orderDate}</p>
        <p>Email: {order.customer.email}</p>
        <p>
          Delivery address: {order.customer.address}, {order.customer.city}
        </p>

        <p>
          Delivery method:{" "}
          {order.shippingMethod === "express"
            ? "Express Delivery"
            : "Standard Delivery"}
        </p>

        <p>
          Payment method:{" "}
          {order.paymentMethod === "cash"
            ? "Cash on Delivery"
            : "Bank Transfer"}
        </p>

        <hr />

        <div className="order-items">
          {order.items.map((item) => (
            <div className="order-item" key={item.book.id}>
              <div className="order-item-details">
                <p className="order-item-title">{item.book.title}</p>
                <p className="muted">Quantity: {item.quantity}</p>
              </div>

              <p className="order-item-price">
                ${(item.book.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <hr />

        <div className="order-price-row">
          <span>Subtotal</span>
          <span>${order.subtotal.toFixed(2)}</span>
        </div>

        <div className="order-price-row">
          <span>Discount</span>
          <span>-${order.discount.toFixed(2)}</span>
        </div>

        <div className="order-price-row">
          <span>Shipping</span>
          <span>${order.shippingCost.toFixed(2)}</span>
        </div>

        <div className="order-total">
          <span>Total</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>

      <Link href="/shop" className="primary-button">
        Continue exploring
      </Link>
    </section>
  );
}

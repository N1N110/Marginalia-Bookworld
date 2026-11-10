import Link from "next/link";
import type { Book } from "../data/products";

type BookCardProps = {
  book: Book;
};

export default function BookCard({ book }: BookCardProps) {
  return (
    <article className="book-card">
      {book.image ? (
        <Link href={`/products/${book.id}`}>
          <img
            src={book.image}
            alt={`Cover of ${book.title}`}
            className="book-cover"
          />
        </Link>
      ) : (
        <Link
          href={`/products/${book.id}`}
          className="book-cover-placeholder"
          aria-label={`View ${book.title}`}
        >
          <span>{book.title}</span>
        </Link>
      )}

      {book.isNew && <span className="new-label">New addition</span>}

      <p className="book-category">{book.category}</p>
      <h3>{book.title}</h3>
      <p className="muted">{book.author}</p>
      <p className="book-price">${book.price.toFixed(2)}</p>

      <Link
        href={`/products/${book.id}`}
        className="text-link"
      >
        Explore book →
      </Link>
    </article>
  );
}

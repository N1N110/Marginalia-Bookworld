import Link from "next/link";
import type { Book } from "../data/products";

type BookCardProps = {
  book: Book;
};

export default function BookCard({ book }: BookCardProps) {
  // Bundles and accessories keep the original flat photo; books stand on the shelf
  const isFlatPhoto =
    book.category === "Bundles" || book.category === "Accessories";

  return (
    <article className="book-card">
      {book.image ? (
        isFlatPhoto ? (
          <Link
            href={`/products/${book.id}`}
            className="cover-link"
            aria-label={`View ${book.title}`}
          >
            <img
              src={book.image}
              alt={`Cover of ${book.title}`}
              className="book-cover cover-flat"
            />
          </Link>
        ) : (
          <Link
            href={`/products/${book.id}`}
            className="cover-link"
            aria-label={`View ${book.title}`}
          >
            <div className="cover-stand">
              <img src={book.image} alt={`Cover of ${book.title}`} />
            </div>
          </Link>
        )
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

      <p className="book-category">{book.category.split("|").pop()?.trim()}</p>
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

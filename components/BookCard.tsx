import Link from "next/link";
import type { Book } from "../data/products";

type BookCardProps = {
  book: Book;
};

export default function BookCard({ book }: BookCardProps) {
  // Bundles and accessories get their own "standing" look instead of a flat photo
  const isBundle = book.category === "Bundles";
  const isAccessory = book.category === "Accessories";

  return (
    <article className="book-card">
      {isBundle || book.image ? (
        <Link
          href={`/products/${book.id}`}
          className="cover-link"
          aria-label={`View ${book.title}`}
        >
          {isBundle ? (
            /* BUNDLE: a book-shaped kraft parcel with the contents peeking out */
            <div className="cover-stand cover-stand--bundle" aria-hidden="true">
              <span className="bundle-pen bundle-pen--sage" />
              <span className="bundle-pen bundle-pen--teal" />
              <span className="bundle-tabs">
                <i />
                <i />
                <i />
              </span>
              <div className="bundle-body">
                <span className="bundle-fold" />
                <span className="bundle-twine" />
                <span className="bundle-label">{book.title}</span>
              </div>
            </div>
          ) : (
            /* BOOK or ACCESSORY: the image becomes the cover of a standing book */
            <div
              className={`cover-stand${isAccessory ? " cover-stand--accessory" : ""}`}
            >
              {isAccessory && <span className="cover-ribbon" aria-hidden="true" />}
              <img
                src={book.image}
                alt={isAccessory ? book.title : `Cover of ${book.title}`}
              />
            </div>
          )}
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

import Link from "next/link";
import type { Book } from "../data/products";

type BookCardProps = {
  book: Book;
};

export default function BookCard({ book }: BookCardProps) {
  // Bundles and accessories get their own "standing" look instead of a flat photo
  const isBundle = book.category === "Bundles";
  const isAccessory = book.category === "Accessories";

  // Optional list of what a bundle contains, e.g. contents: ["Pastel gel pens", ...]
  const contents = (book as Book & { contents?: string[] }).contents;

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
          ) : isAccessory ? (
            /* ACCESSORY: a retail hang tag, clearly different from a book */
            <div className="cover-stand cover-stand--accessory">
              <span className="accessory-loop" aria-hidden="true" />
              <span className="accessory-hole" aria-hidden="true" />
              <img src={book.image} alt={book.title} />
              <span className="accessory-brand" aria-hidden="true">
                Marginalia
              </span>
            </div>
          ) : (
            /* BOOK: the image becomes the cover of a standing book */
            <div className="cover-stand">
              <img src={book.image} alt={`Cover of ${book.title}`} />
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

      {isBundle && contents && contents.length > 0 && (
        <div className="bundle-contents">
          <p className="bundle-contents-label">Inside the parcel</p>
          <ul>
            {contents.slice(0, 4).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {contents.length > 4 && (
            <p className="bundle-contents-more">
              + {contents.length - 4} more inside
            </p>
          )}
        </div>
      )}

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

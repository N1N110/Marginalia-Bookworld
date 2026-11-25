import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "../../../data/products";
import AddToCartButton from "../../../components/AddToCartButton";
import Book3D from "../../../components/Book3D";
import { Suspense } from "react";


type ProductPageProps = {
  params: Promise<{ id: string }>;

};


export default function ProductPage({
  params,
}: ProductPageProps) {
  return (
    <Suspense
  fallback={
    <p className="product-loading">
      Acquiring your product details...
    </p>
  }
>
  <ProductContent params={params} />
</Suspense>
  );
}


async function ProductContent({
  params,
}: ProductPageProps) {
  const { id } = await params;

  const book = products.find((item) => item.id === id);

  if (!book) {
    notFound();
  }

  const specs = book.specifications;

  // Museum-style catalogue number, built from the book's position in the collection
  const catalogueNo = String(
    products.findIndex((item) => item.id === id) + 1
  ).padStart(3, "0");

  const highlightSpecs = [
    { label: "Format", value: specs?.format },
    { label: "Pages", value: specs?.pages },
  ].filter((item) => item.value);

  const detailSpecs = [
    { label: "Publisher", value: specs?.publisher },
    { label: "ISBN", value: specs?.isbn },
    { label: "Publication Date", value: specs?.publicationDate },
    { label: "Language", value: specs?.language },
  ].filter((item) => item.value);

  // Bundles and accessories are photos of objects, not book covers,
  // so only real books get the 3D treatment.
  const isBook = book.category !== "Bundles" && book.category !== "Accessories";

  // Page count as a number, used to decide how thick the 3D book looks
  const pageCount = parseInt(String(specs?.pages ?? ""), 10);


  return (

    <section className="section page-container product-layout">

      <div
        className={`product-cover${
          book.image && isBook ? " product-cover--book" : ""
        }`}
      >
        {book.image && isBook ? (
          <Book3D
            title={book.title}
            author={book.author}
            image={book.image}
            pages={Number.isNaN(pageCount) ? undefined : pageCount}
            catalogueNo={catalogueNo}
          />
        ) : book.image ? (
          <img
            src={book.image}
            alt={`Cover of ${book.title}`}
            className="product-image"
          />
        ) : (
          <div className="book-cover-placeholder">
            <span>{book.title}</span>
          </div>
        )}
      </div>


      <div className="product-info">

        <p className="eyebrow">{book.category.split("|").pop()?.trim()}</p>
        <h1 className="section-heading">{book.title}</h1>
        <p className="muted">By {book.author}</p>
        <p className="product-price">${book.price.toFixed(2)}</p>
        <p>{book.description}</p>
        <p className="muted">Availability: {book.availability}</p>

        <AddToCartButton book={book}/>


        {book.specifications && (
          <div className="product-specifications">
            <div className="spec-header">
              <p className="eyebrow">Catalogue entry</p>
              <p className="spec-number">No. MG-{catalogueNo}</p>
            </div>

            <h2>Book Specifications</h2>

            {highlightSpecs.length > 0 && (
              <dl className="spec-highlights">
                {highlightSpecs.map((item) => (
                  <div key={item.label}>
                    <dt className="spec-label">{item.label}</dt>
                    <dd className="spec-value">{item.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <dl className="spec-list">
              {detailSpecs.map((item) => (
                <div className="spec-item" key={item.label}>
                  <dt className="spec-label">{item.label}</dt>
                  <dd className="spec-value">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}



        <p>
          <Link href="/shop" className="text-link">
            ← Back to the bookshop
          </Link>
        </p>

      </div>

    </section>

  );

}
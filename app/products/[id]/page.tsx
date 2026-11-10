import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "../../../data/products";
import AddToCartButton from "../../../components/AddToCartButton";
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


  return (

    <section className="section page-container product-layout">

      <div className="product-cover">
      <img
      src={book.image}
      alt={`Cover of ${book.title}`}
      className="product-image"
      />
      </div>


      <div className="product-info">

        <p className="eyebrow">{book.category}</p>
        <h1 className="section-heading">{book.title}</h1>
        <p className="muted">By {book.author}</p>
        <p className="product-price">${book.price.toFixed(2)}</p>
        <p>{book.description}</p>
        <p className="muted">Availability: {book.availability}</p>

  {book.specifications && (
    <div className="product-specifications">
      <h2>Book Specifications</h2>

      <p><strong>Publisher:</strong> {book.specifications.publisher}</p>
      <p><strong>ISBN:</strong> {book.specifications.isbn}</p>
      <p><strong>Publication Date:</strong> {book.specifications.publicationDate}</p>
      <p><strong>Format:</strong> {book.specifications.format}</p>
      <p><strong>Language:</strong> {book.specifications.language}</p>
      <p><strong>Pages:</strong> {book.specifications.pages}</p>
    </div>
  )}

        <AddToCartButton book={book}/>
        

        <p>
          <Link href="/shop" className="text-link">
            ← Back to the bookshop
          </Link>
        </p>

      </div>

    </section>

  );

}
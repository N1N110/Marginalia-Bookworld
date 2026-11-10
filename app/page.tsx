import Link from "next/link";
import BookCard from "../components/BookCard";
import { products } from "../data/products";

export default function HomePage() {

  const newBooks = products.filter((book) => book.isNew);
  return (

    <>

      <section className="hero">

        <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        >
          <source
          src="/videos/reading-on-a-hammock.mp4"
          type="video/mp4"
          />
        </video>


        <div className="page-container hero-content">
          <p className="quotation">“A room without books is like a body without a soul.” — Marcus Tullius Cicero</p>


          <h1>
            Find your next
            <br />
            <em>somewhere else.</em>
          </h1>

          <p className="hero-description">
            Books to get lost in and little things to make reading yours.</p>

          <div className="hero-actions">

            <Link href="/shop" className="primary-button">
              Explore the bookshop
            </Link>

            <Link href="/signup" className="secondary-button">
              Join our reading world
            </Link>
          </div>

        </div>
      </section>

      <section className="section page-container">
        <div className="section-intro">
          <p className="eyebrow">Fresh off the shelf</p>
          <h2 className="section-heading">New additions</h2>
          <p className="muted">
            Your next favourite story might be waiting here.
          </p>

        </div>


        <div className="book-shelf">
          {newBooks.map((book) => (
            <BookCard key={book.id} book={book} />

          ))}

        </div>

      </section>

      <section className="discover-section">

        <div className="page-container discover-inner">
          <div>

            <p className="eyebrow">More than a book</p>

            <h2 className="section-heading">
              Make room for your reading rituals.
            </h2>
            <p>

              Discover reading accessories and curated bundles designed
              to make your quiet moments feel a little more special.

            </p>
          </div>


          <Link href="/shop" className="secondary-button">
            Discover the collection
          </Link>
        </div>
      </section>


      <section className="section page-container signup-prompt">

        <p className="eyebrow">Your next chapter starts here</p>

        <h2 className="section-heading">
          A reading world of your own.
        </h2>

        <p className="muted">
          Create an account to begin exploring Marginalia.
        </p>

        <Link href="/signup" className="primary-button">
          Sign up now
        </Link>
      </section>


      <footer className="site-footer">
        <div className="page-container">

          <Link href="/" className="wordmark">
            MARGINALIA<span>.co</span>
          </Link>
          <p>I'd rather be between the pages.</p>
          <p className="muted">
            © Marginalia.co
          </p>
        </div>
      </footer>
    </>
  );
}
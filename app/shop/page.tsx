"use client";
import { useRef, useState } from "react";
import BookCard from "../../components/BookCard";
import { products } from "../../data/products";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState("All");
  const [selectedAvailability, setSelectedAvailability] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const clearFilters = () => {
    setSelectedCategory("All");
    setMaxPrice("All");
    setSelectedAvailability("All");
    setSearchQuery("");
  };

  const filteredProducts = products.filter((book) => {
    const matchesCategory =
      selectedCategory === "All" ||
      book.category === selectedCategory ||
      (selectedCategory === "Young Adult (YA) Fiction" &&
        book.category.startsWith("Young Adult (YA)"));

    const query = searchQuery.trim().toLowerCase();

    const matchesPrice =
      maxPrice === "All" || book.price <= Number(maxPrice);

    const matchesAvailability =
      selectedAvailability === "All" ||
      book.availability === selectedAvailability;

    const matchesSearch =
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.category.toLowerCase().includes(query);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPrice &&
      matchesAvailability
    );
  });

  return (
    <section className="section page-container">
      <p className="eyebrow">Take your time</p>
      <h1 className="section-heading">The Bookshop</h1>

      <p className="muted">
        Browse stories, discover new authors, and find your next
        addition to the shelf.
      </p>

      <div className="book-search">
        <input
          id="search-filter"
          ref={searchInputRef}
          type="search"
          aria-label="Search books, authors, and categories"
          placeholder="Search books, authors..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />

        <button
          type="button"
          aria-label="Search"
          onClick={() => searchInputRef.current?.focus()}
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m16 16 4 4" />
          </svg>
        </button>
      </div>

      {/* Catalog Filters */}
      <div className="filter-container">

        <div className="filter-group">
          <label htmlFor="category-filter">Category:</label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            <option value="All">All categories</option>
            <option value="New Adult Romance">
              New Adult Romance
            </option>
            <option value="Young Adult (YA) Fiction">
              All Young Adult
            </option>
            <option value="Young Adult (YA) | Contemporary Realistic Fiction">
              Contemporary Realistic Fiction
            </option>
            <option value="Young Adult (YA) | Family Drama">
              Family Drama
            </option>
            <option value="Young Adult (YA) | Trauma Recovery">
              Trauma Recovery
            </option>
            <option value="Young Adult (YA) | Psychological Fiction">
              Psychological Fiction
            </option>
            <option value="Mental Health Fiction">
              Mental Health Fiction
            </option>
            <option value="Accessories">Accessories</option>
            <option value="Bundles">Bundles</option>
          </select>
        </div>

        {/* Price Filter */}
        <div className="filter-group">
          <label htmlFor="price-filter">Price:</label>
          <select
            id="price-filter"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
          >
            <option value="All">Any price</option>
            <option value="10">$10 and under</option>
            <option value="15">$15 and under</option>
            <option value="20">$20 and under</option>
            <option value="25">$25 and under</option>
            <option value="35">$35 and under</option>
          </select>
        </div>

        {/* Availability Filter */}
        <div className="filter-group">
          <label htmlFor="availability-filter">Availability:</label>
          <select
            id="availability-filter"
            value={selectedAvailability}
            onChange={(event) =>
              setSelectedAvailability(event.target.value)
            }
          >
            <option value="All">Any availability</option>
            <option value="In stock">In stock</option>
            <option value="Out of stock">Out of stock</option>
          </select>
        </div>

      </div>

      {filteredProducts.length > 0 ? (
        <div className="catalog-grid">
          {filteredProducts.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p className="muted">
            No products match your search. Try changing your search or filters.
          </p>
          <button
            type="button"
            className="primary-button"
            onClick={clearFilters}
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}

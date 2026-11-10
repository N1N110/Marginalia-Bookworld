"use client";
import { useState } from "react";
import BookCard from "../../components/BookCard";
import { products } from "../../data/products";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState("All");
  const [selectedAvailability, setSelectedAvailability] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((book) => {
    const matchesCategory =
      selectedCategory === "All" || book.category === selectedCategory;

    const matchesPrice =
      maxPrice === "All" || book.price <= Number(maxPrice);

    const matchesAvailability =
      selectedAvailability === "All" ||
      book.availability === selectedAvailability;

    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase());

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
          type="search"
          aria-label="Search books, authors, and categories"
          placeholder="Search books, authors..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />

        <button type="button" aria-label="Search">
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
            <option value="All">All Products</option>
            <option value="New Adult Romance">
             New Adult Romance
            </option>
            <option value="Young Adult (YA) Fiction">
              Young Adult Fiction
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
          <select
            id="availability-filter"
            value={selectedAvailability}
            onChange={(event) =>
              setSelectedAvailability(event.target.value)
            }
          >
            <option value="All">All</option>
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
        <p className="muted">
          No products match your search. Try changing your search or filters.
        </p>
      )}
    </section>
  );
}

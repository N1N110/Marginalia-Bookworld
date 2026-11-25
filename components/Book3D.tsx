"use client";
import { useState } from "react";
import type { CSSProperties } from "react";

/*
  Book3D: a real-looking book built from plain HTML + CSS 3D transforms.

  WHY THIS IS A CLIENT COMPONENT ("use client" above)
  The product page itself is a server component. It can't remember whether the
  book is open or closed, because that needs React state (useState). So the
  interactive part lives in its own small client component, and the product
  page just drops it in.

  HOW THE BOOK IS BUILT
  A book is a box with six faces. Each face is a <div>:
    front cover (the image)  back cover  spine  page edge  top  bottom
  Plus two "inside" faces that only show when the cover is open:
    the inside of the cover (left page)  and  the title page (right page)
  All the styling and the 3D math lives in globals.css, in the section
  called "3D BOOK VIEWER". This file only describes the structure.
*/

type Book3DProps = {
  title: string;
  author: string;
  image: string;
  pages?: number; // used to make thicker books for longer page counts
  catalogueNo?: string; // e.g. "004", shown on the title page
  objectPosition?: string; // which part of the image to keep when cropping
};

export default function Book3D({
  title,
  author,
  image,
  pages,
  catalogueNo,
  objectPosition = "center",
}: Book3DProps) {
  // The only piece of state: is the cover open?
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((open) => !open);

  // THICKNESS: a 400-page book should look thicker than a 150-page one.
  // 0.11px per page, but never thinner than 24px or thicker than 60px.
  // If we don't know the page count, use a medium 36px.
  const depth = pages ? Math.min(Math.max(pages * 0.11, 24), 60) : 36;

  // Pass the thickness to the CSS as a custom property (--book-d).
  // Every face uses it to position itself, so the box always closes properly.
  const sceneStyle = { "--book-d": `${depth}px` } as CSSProperties;

  return (
    <div className="book-viewer">
      <div
        className={`book-scene${isOpen ? " is-open" : ""}`}
        style={sceneStyle}
      >
        {/* The book. Clicking or tapping it opens/closes it. */}
        <div className="book3d" onClick={toggle}>
          {/* COVER: a two-sided "door" that swings open on the spine hinge.
              Side one is the cover image. Side two is the inside of the cover. */}
          <div className="book3d-cover">
            <div className="book3d-cover-front">
              <img
                src={image}
                alt={`Cover of ${title}`}
                style={{ objectPosition }}
              />
            </div>

            <div className="book3d-cover-inside" aria-hidden="true">
              <p className="plate-brand">Marginalia</p>
              <p className="plate-title">Ex libris</p>
              <span className="plate-rule" />
              <p className="plate-note">This book belongs to a potential bibliophile...</p>
            </div>
          </div>

          {/* TITLE PAGE: the right-hand page you see once the cover opens */}
          <div className="book3d-titlepage" aria-hidden="true">
            <p className="titlepage-brand">Marginalia</p>
            <p className="titlepage-title">{title}</p>
            <span className="plate-rule" />
            <p className="titlepage-author">{author}</p>
            {catalogueNo && (
              <p className="titlepage-foot">Catalogue No. MG-{catalogueNo}</p>
            )}
          </div>

          {/* The other faces of the box */}
          <div className="book3d-back" />

          <div className="book3d-spine" aria-hidden="true">
            <span>{title}</span>
          </div>

          <div className="book3d-pages-edge" />
          <div className="book3d-top" />
          <div className="book3d-bottom" />
        </div>
      </div>

      {/* A real button: this is what keyboard and screen-reader users use.
          (The book itself is only a convenience for mouse and touch.) */}
      <button
        type="button"
        className="secondary-button book-toggle"
        onClick={toggle}
      >
        {isOpen ? "Close the book" : "Open the book"}
      </button>
    </div>
  );
}

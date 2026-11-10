import Link from "next/link";
export default function Navbar() {

  return (

    <header className="navbar">
      <div className="page-container navbar-inner">

        <Link href="/" className="wordmark">

          MARGINALIA<span>.co</span>

        </Link>



        <nav className="nav-links" aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/shop">The Bookshop</Link>
          <Link href="/cart">Cart</Link>
        </nav>



        <div className="nav-actions">
          <Link href="/login">Log in</Link>
          <Link href="/signup" className="nav-signup">
            Sign up
          </Link>

        </div>
      </div>
    </header>

  );
}
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";

type AuthMode = "login" | "signup";

type AuthSliderProps = {
  initialMode?: AuthMode;
};

export default function AuthSlider({ initialMode = "login" }: AuthSliderProps) {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const isSignup = mode === "signup";

  // Slide to the other form and keep the address bar in step with it.
  const switchMode = (next: AuthMode) => {
    setMode(next);
    window.history.replaceState(
      null,
      "",
      next === "login" ? "/login" : "/signup"
    );
  };

  // No backend: stop the page from reloading and send the visitor to the shop.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/shop");
  };

  return (
    <section className="section page-container auth-page auth-page--slider">
      <div className={`auth-card${isSignup ? " is-signup" : ""}`}>
        {/* LOGIN FORM (left half) */}
        <div
          className={`auth-panel auth-panel--login${!isSignup ? " is-active" : ""}`}
          aria-hidden={isSignup}
        >
          <p className="eyebrow">Welcome back, Bibliophile</p>
          <h1 className="section-heading">Return to your reading world.</h1>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />

            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />

            <button className="primary-button" type="submit">
              Log in
            </button>
          </form>
        </div>

        {/* SIGN UP FORM (right half) */}
        <div
          className={`auth-panel auth-panel--signup${isSignup ? " is-active" : ""}`}
          aria-hidden={!isSignup}
        >
          <p className="eyebrow">Begin a new chapter</p>
          <h1 className="section-heading">Make yourself at home.</h1>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="signup-name">Your name</label>
            <input
              id="signup-name"
              name="name"
              type="text"
              autoComplete="name"
              required
            />

            <label htmlFor="signup-email">Email address</label>
            <input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />

            <label htmlFor="signup-password">Create a password</label>
            <input
              id="signup-password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
            />

            <button className="primary-button" type="submit">
              Create account
            </button>
          </form>
        </div>

        {/* SLIDING OVERLAY */}
        <div className="auth-overlay">
          <div
            className={`auth-overlay-content${!isSignup ? " is-active" : ""}`}
            aria-hidden={isSignup}
          >
            <h2>New to Marginalia?</h2>
            <p className="auth-overlay-text">Begin a new chapter.</p>
            <button
              type="button"
              className="auth-ghost-button"
              onClick={() => switchMode("signup")}
            >
              Sign up
            </button>
          </div>

          <div
            className={`auth-overlay-content${isSignup ? " is-active" : ""}`}
            aria-hidden={!isSignup}
          >
            <h2>Already have an account?</h2>
            <p className="auth-overlay-text">Return to your reading world.</p>
            <button
              type="button"
              className="auth-ghost-button"
              onClick={() => switchMode("login")}
            >
              Log in
            </button>
          </div>
        </div>

        {/* MOBILE SWITCH (the overlay is hidden on small screens) */}
        <p className="auth-mobile-switch">
          {isSignup ? "Already have an account? " : "New to Marginalia? "}
          <button
            type="button"
            className="auth-text-button"
            onClick={() => switchMode(isSignup ? "login" : "signup")}
          >
            {isSignup ? "Log in" : "Create an account"}
          </button>
        </p>
      </div>
    </section>
  );
}

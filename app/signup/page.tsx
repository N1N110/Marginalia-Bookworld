import Link from "next/link";

export default function SignupPage() {
return (
<section className="section page-container auth-page">
<p className="eyebrow">Begin a new chapter</p>
<h1 className="section-heading">Make yourself at home.</h1>

<form className="auth-form">
<label htmlFor="name">Your name</label>
<input id="name" name="name" type="text" required />

<label htmlFor="email">Email address</label>
<input id="email" name="email" type="email" required />

<label htmlFor="password">Create a password</label>
<input
id="password"
name="password"
type="password"
minLength={8}
required
/>

<button className="primary-button" type="submit">
Create account
</button>
</form>

<p>
Already have an account? <Link href="/login">Log in</Link>
</p>
</section>
);
}
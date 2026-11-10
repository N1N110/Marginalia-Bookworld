import Link from "next/link";

export default function LoginPage() {
return (
<section className="section page-container auth-page">
<p className="eyebrow">Welcome back, Bibliophile</p>
<h1 className="section-heading">Return to your reading world.</h1>

<form className="auth-form">
<label htmlFor="email">Email address</label>
<input id="email" name="email" type="email" required />
<label htmlFor="password">Password</label>
<input id="password" name="password" type="password" required />
<button className="primary-button" type="submit">Log in</button>
</form>

<p>New to Marginalia? <Link href="/signup">Create an account</Link></p>

</section>
);}

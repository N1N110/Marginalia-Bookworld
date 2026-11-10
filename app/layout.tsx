import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Marginalia.co",
  description:
    "Discover books, reading accessories, and curated bundles for your reading life.",
};



export default function RootLayout({
  children,
}: Readonly<{

  children: React.ReactNode;

}>) {

  return (

    <html lang="en-US">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>

  );

}
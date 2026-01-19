import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AL MARMOOM - Drive-Through Photography Exhibition",
  description: "Al Marmoom Desert Conservation Reserve AR Experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
import type { Metadata } from "next";
import "./globals.css";
import "./page.css";

export const metadata: Metadata = {
  title: "EKA Water Enhancer — One Squeeze. Endless Flavor.",
  description:
    "EKA Water Enhancer makes hydration irresistible. Zero sugar, zero calories, 100% vegan. Add a squeeze to your water and enjoy delicious natural flavors anywhere.",
  keywords: "EKA water enhancer, water flavoring, sugar free, zero calories, vegan, hydration",
  openGraph: {
    title: "EKA Water Enhancer — One Squeeze. Endless Flavor.",
    description:
      "Makes hydration irresistible. Zero sugar, zero calories, 100% vegan.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

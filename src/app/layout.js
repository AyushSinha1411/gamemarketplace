import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "GAMEVAULT - Pre-owned Games Marketplace",
  description: "Your ultimate destination for buying and selling pre-owned games",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}

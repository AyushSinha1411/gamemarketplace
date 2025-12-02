import { Press_Start_2P } from "next/font/google";
import "./globals.css";

const pixelFont = Press_Start_2P({
  weight: "400",
  variable: "--font-pixel",
  subsets: ["latin"],
});

export const metadata = {
  title: "GAMEVAULT - Pre-owned Games Marketplace",
  description: "Your ultimate destination for buying and selling pre-owned games",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${pixelFont.variable} font-pixel`}>
        {children}
      </body>
    </html>
  );
}

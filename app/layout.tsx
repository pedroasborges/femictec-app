import type { Metadata } from "next";

import "./globals.css";
import Navbar from "./components/navbar";
import { Footer } from "./components/footer";

export const metadata: Metadata = {
  title: "FEMICTEC",
  description: "Portal institucional da FEMICTEC com noticias, eventos e informacoes da feira.",
};

const inter = { className: "font-sans" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-slate-50 text-slate-950`}>
        <Navbar />
        <main className="bg-[#eeeeee] text-[#909090]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}


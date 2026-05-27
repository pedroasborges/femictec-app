import type { Metadata } from "next";

import "./globals.css";
import Navbar from "./components/navbar";
import { Footer } from "./components/footer";
import "@fontsource/russo-one/latin.css";
import "@fontsource/saira/latin.css";

export const metadata: Metadata = {
  title: "FEMICTEC",
  description: "Portal institucional da FEMICTEC com noticias, eventos e informacoes da feira.",
};

const inter = { className: "font-sans" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body suppressHydrationWarning className={`bg-slate-50 text-slate-950`} style={{fontFamily: "'Russo One', sans-serif"}}>
        <Navbar />
        <main className="bg-slate-50 text-[#223d67]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}


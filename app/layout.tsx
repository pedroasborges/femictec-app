import type { Metadata } from "next";

import "./globals.css";
import Navbar from "./components/navbar";
import { Footer } from "./components/footer";
import UnavailableState from "./components/unavailable-state";
import { getNavbarContent } from "./navbar/navbar-data";
import "@fontsource/russo-one/latin.css";
import "@fontsource/saira/latin.css";
import { isSiteUnavailable } from "./lib/site-availability";

export const metadata: Metadata = {
  title: "FEMICTEC",
  description: "Portal institucional da FEMICTEC com noticias, eventos e informacoes da feira.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const siteUnavailable = isSiteUnavailable();
  const navbarContent = await getNavbarContent();

  return (
    <html lang="pt-br">
      <body suppressHydrationWarning className={`bg-white text-slate-950`} style={{fontFamily: "'Russo One', sans-serif"}}>
        {siteUnavailable ? (
          <main className="bg-white text-[#223d67]">
            <UnavailableState
              fullHeight
              title="Site em manutencao"
              description="Estamos realizando ajustes e o portal da FEMICTEC esta temporariamente indisponivel."
              detail="Tente novamente em instantes. Se precisar de atendimento imediato, use os canais institucionais do municipio."
            />
          </main>
        ) : (
          <>
            <Navbar logoUrl={navbarContent.logoUrl} logoAlt={navbarContent.logoAlt} />
            <main className="bg-white text-[#223d67]">{children}</main>
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}


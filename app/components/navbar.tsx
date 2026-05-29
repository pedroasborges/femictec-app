"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logoImg from "../../public/femictec.png";

const navLinks = [
  { label: "A Femictec", href: "/femictec" },
  { label: "A Feira", href: "/feira" },
  { label: "Eventos da Feira", href: "/eventos-da-feira" },
  { label: "Noticias", href: "/noticias" },
  { label: "Contato", href: "/contato" },
  { label: "Localizacao", href: "/localizacao" },
];

const desktopNavLinkClass =
  "flex h-full min-w-[86px] items-center justify-center px-5 text-center text-[12px] font-Saira leading-tight tracking-[0.04em] text-white transition-colors hover:bg-[#2a4776]";
const mobileNavLinkClass =
  "text-[15px] font-Saira leading-[1.2] tracking-[0.08em] text-white transition-colors hover:text-[#95c11f]";

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <path d="m21 21-4.35-4.35" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M3 12h18M12 3c2.2 2.4 3.3 5.4 3.3 9S14.2 18.6 12 21M12 3c-2.2 2.4-3.3 5.4-3.3 9s1.1 6.6 3.3 9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="9" cy="10" r="1.5" fill="currentColor" />
      <path
        d="m6.5 17 4.4-4.4 3.1 3.1 1.7-1.7 2.8 3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function CityMark() {
  return (
    <span aria-hidden="true" className="relative block h-7 w-7">
      <Image src={"/prefeituraMunicipal.png"} alt="Prefeitura Municipal" width={28} height={28} />
    </span>
  );
}

function HeaderIconLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className="flex h-full w-16 items-center justify-center border-0 border-[#1b365f] text-white transition-colors hover:bg-[#2a4776]"
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-y border-[#00b8c6] bg-[#223d67] text-white">
      <div className="mx-auto flex h-[62px] w-full max-w-[1320px] items-stretch justify-between bg-[#223d67] px-0">
        <Link href="/" className="flex w-[170px] shrink-0 items-center justify-center bg-[#35406e] px-3">
          <Image src={logoImg} alt="FEMICTEC" width={156} height={44} priority className="h-auto w-[156px]" />
        </Link>

        <div className="hidden flex-1 items-stretch justify-end lg:flex">
          <div className="flex items-stretch">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className={desktopNavLinkClass}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-stretch">
            <HeaderIconLink href="/noticias" label="Pesquisar">
              <SearchIcon />
            </HeaderIconLink>
            <HeaderIconLink href="/" label="Portal institucional">
              <GlobeIcon />
            </HeaderIconLink>
            <HeaderIconLink href="/" label="Galeria">
              <ImageIcon />
            </HeaderIconLink>
            <HeaderIconLink href="/" label="Novo Hamburgo">
              <CityMark />
            </HeaderIconLink>
          </div>
        </div>

        <button
          type="button"
          className="mr-2 flex h-full w-12 items-center justify-center text-white transition-colors hover:bg-[#2a4776] lg:hidden"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="sr-only">{isMenuOpen ? "Fechar menu" : "Abrir menu"}</span>
          <div className="flex flex-col gap-1.5">
            <span className={`h-0.5 w-5 bg-current transition-transform duration-300 ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-5 bg-current transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`h-0.5 w-5 bg-current transition-transform duration-300 ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-[#00b8c6] bg-[#223d67] px-4 py-5 lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className={mobileNavLinkClass} onClick={() => setIsMenuOpen(false)}>
                {link.label}
              </Link>
            ))}

            <div className="flex h-12 items-stretch border border-[#1b365f]">
              <HeaderIconLink href="/noticias" label="Pesquisar">
                <SearchIcon />
              </HeaderIconLink>
              <HeaderIconLink href="/" label="Portal institucional">
                <GlobeIcon />
              </HeaderIconLink>
              <HeaderIconLink href="/" label="Galeria">
                <ImageIcon />
              </HeaderIconLink>
              <HeaderIconLink href="/" label="Novo Hamburgo">
                <CityMark />
              </HeaderIconLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

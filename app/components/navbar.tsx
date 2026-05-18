"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import logoImg from "../../public/femictec.png";

const navLinks = [
  { label: "A FEMICTEC", href: "/femictec" },
  { label: "A FEIRA", href: "/feira" },
  { label: "EVENTOS DA FEIRA", href: "/eventos-da-feira" },
  { label: "REGULAMENTOS", href: "/regulamentos" },
  { label: "NOTICIAS", href: "/noticias" },
  { label: "CONTATO", href: "/contato" },
];

const desktopNavLinkClass =
  "text-[14px] font-medium leading-[1.2] tracking-[1.25px] text-[#ffffff] transition-colors hover:text-white";
const mobileNavLinkClass =
  "text-[14px] font-medium leading-[1.2] tracking-[1.25px] text-[#ffffff] transition-colors hover:text-white";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#223d67] text-[#eeeeee]">
      <div className="mx-auto flex min-h-20 w-full max-w-[1320px] items-center justify-between px-3 py-2 sm:px-4 md:min-h-24">
        <Link href="/" className="flex items-center gap-3 w-32">
          <Image src={logoImg} alt="logo" />
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          <div className="flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`${desktopNavLinkClass} ${
                  link.label === "A FEIRA" ? "inline-flex min-w-20 justify-center text-center" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <Link
          href="/#inscricoes"
          className="hidden bg-[#eeeeee] px-5 py-3 text-xs font-semibold tracking-[0.12em] text-[#909090] transition-colors hover:bg-white lg:block"
        >
          Inscricoes
        </Link>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center border border-[#d8d8d8] text-[#eeeeee] transition-colors hover:bg-[#9b9b9b] lg:hidden"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="sr-only">{isMenuOpen ? "Fechar menu" : "Abrir menu"}</span>
          <div className="flex flex-col gap-1.5">
            <span
              className={`h-0.5 w-5 bg-current transition-transform duration-300 ${
                isMenuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 bg-current transition-opacity duration-300 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-0.5 w-5 bg-current transition-transform duration-300 ${
                isMenuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-[#7f7f7f] bg-[#909090] px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={mobileNavLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#inscricoes"
              className="mt-2 bg-[#eeeeee] px-6 py-3 text-center text-xs font-semibold tracking-[0.12em] text-[#909090] transition-colors hover:bg-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Inscricoes
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}




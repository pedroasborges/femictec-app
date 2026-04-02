"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "A FEMICTEC", href: "/" },
  { label: "A FEIRA", href: "/feira" },
  { label: "EVENTOS DA FEIRA", href: "/teste" },
  { label: "NOTICIAS", href: "/#projetos" },
  { label: "LOCALIZACAO", href: "/#projetos" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-xl font-bold text-white">
            F
          </div>
          <span className="text-xl font-black tracking-tight text-primary sm:text-2xl">
            FEMICTEC
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          <div className="flex gap-8 font-medium text-slate-600">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-blue-600"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <Link
          href="/#projetos"
          className="hidden rounded-full bg-primary px-6 py-2 font-bold text-white shadow-md transition-all hover:bg-blue-800 lg:block"
        >
          Inscricoes
        </Link>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-100 lg:hidden"
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
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-4 font-medium text-slate-600">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#projetos"
              className="mt-2 rounded-full bg-primary px-6 py-3 text-center font-bold text-white shadow-md transition-all hover:bg-blue-800"
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

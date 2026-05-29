import Link from "next/link";

const feiraLinks = [
  { href: "/feira", label: "Visao Geral" },
  { href: "/feira/cronograma", label: "Cronograma" },
  { href: "/feira/programacao", label: "Programacao" },
];

export default function FeiraLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-[1320px] bg-white px-4 pb-14 pt-8 md:px-6 md:pt-10">
      <div className="mx-auto w-full max-w-5xl border border-[#223d67]/20 bg-white">
        <div className="border-b border-[#223d67]/20 px-4 py-4 md:px-8 md:py-5">
          <div className="flex flex-wrap items-center gap-2">
            {feiraLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-sm bg-[#223d67] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#eeeeee] transition hover:bg-[#4085c6]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

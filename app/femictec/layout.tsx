import Link from "next/link";

const femictecLinks = [
  { href: "/femictec", label: "Apresentacao" },
  { href: "/femictec/quem-realiza", label: "Quem Realiza" },
  { href: "/femictec/historico", label: "Historico" },
];

export default function FemictecLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-[1320px] px-4 pb-12 pt-8 md:px-6 md:pt-10">
      <div className="mx-auto w-full max-w-5xl bg-[#ece8ea] shadow-[0_0_0_1px_rgba(144,144,144,0.2)]">
        <div className="border-b border-[#b8b2b5] px-4 py-4 md:px-8 md:py-5">
          <div className="flex flex-wrap items-center gap-2">
            {femictecLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-sm bg-[#9a9095] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#eeeeee] transition hover:bg-[#878087]"
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


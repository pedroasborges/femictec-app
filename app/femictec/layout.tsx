import Link from "next/link";

import { getFemictecContent } from "./femictec-data";

type ItemMenuFemictec = {
  rotaDaPagina: string;
  tituloNoMenu: string;
};

export default async function FemictecLayout({ children }: { children: React.ReactNode }) {
  const content = await getFemictecContent();

  const itensMenuFemictec: ItemMenuFemictec[] = [
    { rotaDaPagina: "/femictec", tituloNoMenu: content.menuItemInicioLabel },
    { rotaDaPagina: "/femictec/quem-realiza", tituloNoMenu: content.menuItemQuemRealizaLabel },
    { rotaDaPagina: "/femictec/historico", tituloNoMenu: content.menuItemHistoricoLabel },
  ];

  return (
    <section className="mx-auto w-full max-w-[1320px] px-4 pb-12 pt-8 md:px-6 md:pt-10">
      <div className="mx-auto w-full max-w-5xl bg-[#ece8ea] shadow-[0_0_0_1px_rgba(144,144,144,0.2)]">
        <div className="border-b border-[#b8b2b5] px-4 py-4 md:px-8 md:py-5">
          <div className="flex flex-wrap items-center gap-2">
            {itensMenuFemictec.map((itemMenu) => (
              <Link
                key={itemMenu.rotaDaPagina}
                href={itemMenu.rotaDaPagina}
                className="rounded-sm bg-[#223d67] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#eeeeee] transition hover:bg-[#878087]"
              >
                {itemMenu.tituloNoMenu}
              </Link>
            ))}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

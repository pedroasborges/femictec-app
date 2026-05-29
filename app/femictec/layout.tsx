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
    <section className="bg-white pb-10 text-[#223d67]">
      <div className="mx-auto w-full max-w-[1120px] px-4 py-6 md:px-6">
        <nav className="flex flex-wrap justify-center gap-3">
          {itensMenuFemictec.map((itemMenu) => (
            <Link
              key={itemMenu.rotaDaPagina}
              href={itemMenu.rotaDaPagina}
              className="bg-[#223d67] px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-white transition hover:bg-[#95c11f] hover:text-[#223d67]"
            >
              {itemMenu.tituloNoMenu}
            </Link>
          ))}
        </nav>
      </div>
      {children}
    </section>
  );
}

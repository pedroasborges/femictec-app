import Link from "next/link";

import { getFeiraContent } from "./feira-data";

export default async function FeiraPage() {
  const content = await getFeiraContent();

  return (
    <>
      <section className="px-4 py-8 md:px-8 md:py-10">
        <h1 className="text-center text-3xl font-black uppercase tracking-[0.04em] text-[#223d67] md:text-4xl">{content.edicaoTitulo}</h1>
        <p className="mx-auto mt-6 max-w-4xl text-center text-sm leading-8 text-[#223d67]/75 md:text-base">{content.edicaoDescricao}</p>
      </section>

      <section className="px-4 py-6 md:px-8 md:py-8">
        {content.tematicaImagemUrl ? (
          <img src={content.tematicaImagemUrl} alt={content.tematicaImagemAlt} className="mx-auto w-full max-w-4xl border border-[#223d67]/20 object-cover" />
        ) : (
          <div className="mx-auto flex min-h-52 w-full max-w-4xl items-center justify-center border border-[#223d67]/20 bg-[#223d67] px-6 text-center text-xl font-black uppercase tracking-[0.08em] text-white md:text-3xl">
            Imagem da Tematica da Edicao
          </div>
        )}
      </section>

      <section className="px-4 py-8 md:px-8 md:py-10">
        <h2 className="text-center text-2xl font-black uppercase tracking-[0.04em] text-[#223d67] md:text-3xl">{content.objetivosTitulo}</h2>
        <p className="mx-auto mt-6 max-w-4xl text-center text-sm leading-8 text-[#223d67]/75 md:text-base">{content.objetivosDescricao}</p>
      </section>

      <section className="px-4 pb-12 pt-4 text-center md:px-8 md:pb-14">
        <h2 className="text-2xl font-black uppercase tracking-[0.04em] text-[#95c11f] md:text-3xl">{content.regulamentoTitulo}</h2>
        <Link
          href={content.regulamentoUrl}
          className="mx-auto mt-6 inline-flex rounded-sm bg-[#223d67] px-8 py-3 text-xs font-black uppercase tracking-[0.14em] text-[#eeeeee] transition hover:bg-[#4085c6]"
        >
          {content.regulamentoLabel}
        </Link>
      </section>
    </>
  );
}

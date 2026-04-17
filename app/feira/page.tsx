import Link from "next/link";

import { getFeiraContent } from "./feira-data";

export default async function FeiraPage() {
  const content = await getFeiraContent();

  return (
    <>
      <section className="px-4 py-8 md:px-8 md:py-10">
        <h1 className="text-center text-3xl font-light uppercase tracking-wide text-[#8c8288] md:text-4xl">{content.edicaoTitulo}</h1>
        <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-7 text-[#8f868b] md:text-base">{content.edicaoDescricao}</p>
      </section>

      <section className="bg-[#9b9297] px-4 py-16 text-center text-[#eeeeee] md:px-8 md:py-20">
        {content.tematicaImagemUrl ? (
          <img src={content.tematicaImagemUrl} alt={content.tematicaImagemAlt} className="mx-auto w-full max-w-4xl rounded-sm object-cover" />
        ) : (
          <div className="mx-auto max-w-3xl text-xl font-light uppercase tracking-[0.08em] md:text-3xl">Imagem da Tematica da Edicao</div>
        )}
      </section>

      <section className="px-4 py-8 md:px-8 md:py-10">
        <h2 className="text-center text-2xl font-light uppercase tracking-wide text-[#8c8288] md:text-3xl">{content.objetivosTitulo}</h2>
        <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-7 text-[#8f868b] md:text-base">{content.objetivosDescricao}</p>
      </section>

      <section className="px-4 pb-12 pt-4 text-center md:px-8 md:pb-14">
        <h2 className="text-2xl font-light uppercase tracking-wide text-[#8c8288] md:text-3xl">{content.regulamentoTitulo}</h2>
        <Link
          href={content.regulamentoUrl}
          className="mx-auto mt-6 inline-flex rounded-sm bg-[#9a9095] px-8 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#eeeeee] transition hover:bg-[#878087]"
        >
          {content.regulamentoLabel}
        </Link>
      </section>
    </>
  );
}

import Link from "next/link";

import { getFemictecContent } from "../femictec-data";

export default async function FemictecHistoricoPage() {
  const content = await getFemictecContent();

  return (
    <>
      <section className="px-4 py-8 md:px-8 md:py-10">
        <h1 className="text-4xl font-light uppercase tracking-wide text-[#8c8288] md:text-5xl">{content.historicoTitulo}</h1>
        <p className="mt-4 text-sm leading-7 text-[#8f868b] md:text-base">{content.historicoDescricao}</p>
      </section>

      <section className="bg-[#8f878b] px-4 py-14 text-center text-[#eeeeee] md:px-8 md:py-16">
        {content.trajetoriaImagemUrl ? (
          <img src={content.trajetoriaImagemUrl} alt={content.trajetoriaImagemAlt} className="mx-auto w-full max-w-4xl rounded-sm object-cover" />
        ) : (
          <div className="mx-auto max-w-3xl">
            <p className="text-sm uppercase tracking-[0.12em]">{content.trajetoriaTitulo}</p>
            <p className="mt-1 text-sm uppercase tracking-[0.12em]">{content.trajetoriaSubtitulo}</p>
            <p className="mt-3 text-xl uppercase tracking-[0.1em] text-[#73f3c7]">Comunicacao</p>
          </div>
        )}
      </section>

      <section className="px-4 py-8 md:px-8 md:py-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {content.edicoesCards.map((edicao, index) => (
            <article key={`${edicao.titulo}-${index}`} className="bg-[#8f878b] p-6 text-center text-[#eeeeee]">
              {edicao.imagemUrl ? (
                <img src={edicao.imagemUrl} alt={edicao.titulo} className="mx-auto h-40 w-full rounded-sm object-cover" />
              ) : (
                <div className="mx-auto flex h-40 w-full items-center justify-center rounded-sm bg-[#9f979b] text-xs uppercase tracking-[0.1em]">
                  {edicao.titulo}
                </div>
              )}
              <p className="mt-3 text-sm uppercase tracking-[0.08em] text-[#73f3c7]">{edicao.subtitulo}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link
            href={content.galeriaUrl}
            className="inline-flex rounded-sm bg-[#938a90] px-8 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#eeeeee] transition hover:bg-[#837b80]"
          >
            {content.galeriaLabel}
          </Link>
        </div>
      </section>

      <section className="px-4 pb-12 md:px-8 md:pb-14">
        <div className="overflow-hidden border border-[#b8b2b5]">
          <div className="border-b border-[#b8b2b5] bg-[#ddd7da] px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.12em] text-[#8c8288]">
            {content.historicoTabelaTitulo}
          </div>
          {content.historicoTabelaLinhas.map((linha) => (
            <div key={linha.label} className="grid grid-cols-2 border-b border-[#c9c2c6] bg-[#ece8ea] px-4 py-3 text-sm text-[#8f868b] last:border-b-0">
              <span>{linha.label}</span>
              <span className="text-right font-medium">{linha.valor}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}


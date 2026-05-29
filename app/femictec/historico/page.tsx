import Image from "next/image";
import Link from "next/link";

import { getFemictecContent } from "../femictec-data";

export default async function FemictecHistoricoPage() {
  const content = await getFemictecContent();

  return (
    <section className="bg-white px-4 pb-16 pt-8 md:px-6 md:pb-20">
      <div className="mx-auto max-w-[1000px]">
        <section className="grid gap-8 bg-[#223d67] p-6 text-white md:grid-cols-[0.92fr_1.08fr] md:p-10">
          <article>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#95c11f]">{content.trajetoriaTitulo}</p>
            <h1 className="mt-3 text-3xl font-black uppercase leading-tight tracking-[0.06em] md:text-5xl">{content.historicoTitulo}</h1>
            <p className="mt-6 text-justify text-base leading-8 text-white/88 md:text-lg md:leading-9">{content.historicoDescricao}</p>
          </article>

          <article className="relative min-h-[280px] overflow-hidden bg-[#1b365f] shadow-[10px_10px_0_rgba(149,193,31,0.75)] md:min-h-[360px]">
            {content.trajetoriaImagemUrl ? (
              <Image
                src={content.trajetoriaImagemUrl}
                alt={content.trajetoriaImagemAlt}
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 520px"
              />
            ) : (
              <div className="flex h-full min-h-[280px] items-center justify-center p-8 text-center text-xl font-black uppercase tracking-[0.08em] text-white/85 md:min-h-[360px]">
                {content.trajetoriaSubtitulo}
              </div>
            )}
          </article>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-2">
          {content.edicoesCards.map((edicao, index) => (
            <article key={`${edicao.titulo}-${index}`} className="bg-white p-4 shadow-[0_0_0_1px_rgba(34,61,103,0.12)]">
              <div className="relative h-56 overflow-hidden bg-[#223d67]">
                {edicao.imagemUrl ? (
                  <Image
                    src={edicao.imagemUrl}
                    alt={edicao.titulo}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center p-6 text-center text-lg font-black uppercase tracking-[0.08em] text-white/80">
                    {edicao.titulo}
                  </div>
                )}
              </div>
              <p className="mt-4 text-sm font-black uppercase tracking-[0.12em] text-[#95c11f]">{edicao.subtitulo}</p>
              <h2 className="mt-1 text-xl font-black uppercase tracking-[0.04em] text-[#223d67]">{edicao.titulo}</h2>
            </article>
          ))}
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-[1fr_0.7fr] md:items-start">
          <div className="overflow-hidden bg-white shadow-[0_0_0_1px_rgba(34,61,103,0.12)]">
            <div className="bg-[#95c11f] px-5 py-4 text-lg font-black uppercase tracking-[0.08em] text-[#223d67]">
              {content.historicoTabelaTitulo}
            </div>
            {content.historicoTabelaLinhas.map((linha) => (
              <div key={linha.label} className="grid grid-cols-[1fr_auto] gap-4 border-b border-[#223d67]/10 px-5 py-4 text-base text-[#223d67] last:border-b-0 md:text-lg">
                <span className="font-bold">{linha.label}</span>
                <span className="font-black text-[#95c11f]">{linha.valor}</span>
              </div>
            ))}
          </div>

          <div className="bg-[#223d67] p-6 text-white">
            <h2 className="text-2xl font-black uppercase tracking-[0.06em]">{content.trajetoriaTitulo}</h2>
            <p className="mt-4 text-base leading-8 text-white/80">{content.trajetoriaSubtitulo}</p>
            <Link
              href={content.galeriaUrl}
              className="mt-6 inline-flex bg-[#95c11f] px-6 py-3 text-sm font-black uppercase tracking-[0.1em] text-[#223d67] transition hover:bg-white"
            >
              {content.galeriaLabel}
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
}

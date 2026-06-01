import Image from "next/image";

import { getFemictecContent } from "../femictec-data";

const bodyFontStyle = {
  fontFamily: "'Saira', sans-serif",
};

function PartnerLogoPlaceholder() {
  return (
    <div className="flex h-full min-h-32 items-center justify-center bg-[#223d67] px-4 text-center text-sm font-black uppercase tracking-[0.08em] text-white/80">
      Logo dos parceiros
    </div>
  );
}

export default async function FemictecQuemRealizaPage() {
  const content = await getFemictecContent();

  return (
    <section className="bg-white px-4 pb-16 pt-8 md:px-6 md:pb-20">
      <div className="mx-auto max-w-[900px]">
        <h1 className="text-center text-3xl font-black uppercase tracking-[0.08em] text-[#223d67] md:text-5xl">{content.quemRealizaTitulo}</h1>

        <div className="mt-10 grid gap-9 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <div className="space-y-10">
            <article>
              <h2 className="text-xl font-black uppercase tracking-[0.08em] text-[#223d67] md:text-2xl">{content.organizacaoTitulo}</h2>
              <p className="mt-5 text-justify text-base leading-8 text-[#223d67]/75 md:text-lg md:leading-9" style={bodyFontStyle}>{content.organizacaoDescricao}</p>
            </article>

            <article>
              <h2 className="text-xl font-black uppercase tracking-[0.08em] text-[#223d67] md:text-2xl">{content.comissaoTitulo}</h2>
              <p className="mt-5 text-justify text-base leading-8 text-[#223d67]/75 md:text-lg md:leading-9" style={bodyFontStyle}>{content.comissaoDescricao}</p>
            </article>
          </div>

          <article className="relative min-h-[260px] overflow-hidden bg-[#223d67] shadow-[10px_10px_0_rgba(149,193,31,0.75)] md:min-h-[340px]">
            {content.imagemEntradaUrl ? (
              <Image
                src={content.imagemEntradaUrl}
                alt={content.imagemEntradaAlt}
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 520px"
              />
            ) : (
              <div className="flex h-full min-h-[260px] items-center justify-center p-8 text-center text-xl font-black uppercase tracking-[0.08em] text-white md:min-h-[340px]">
                {content.imagemEntradaLabel}
              </div>
            )}
          </article>
        </div>

        <section className="mt-20">
          <h2 className="text-xl font-black uppercase tracking-[0.08em] text-[#223d67] md:text-2xl">{content.parceirosTitulo}</h2>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.parceiros.map((parceiro, index) => (
              <a
                key={`${parceiro.nome}-${index}`}
                href={parceiro.siteUrl || "#"}
                className="block bg-white p-3 shadow-[0_0_0_1px_rgba(34,61,103,0.12)] transition hover:-translate-y-1 hover:shadow-[8px_8px_0_rgba(149,193,31,0.45)]"
              >
                <div className="relative min-h-32 overflow-hidden bg-[#223d67]">
                  {parceiro.logoUrl ? (
                    <Image
                      src={parceiro.logoUrl}
                      alt={parceiro.nome}
                      fill
                      unoptimized
                      className="object-contain p-4"
                      sizes="(max-width: 640px) 100vw, 25vw"
                    />
                  ) : (
                    <PartnerLogoPlaceholder />
                  )}
                </div>
                <p className="mt-3 text-center text-sm font-black uppercase tracking-[0.06em] text-[#223d67]" style={bodyFontStyle}>{parceiro.nome}</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

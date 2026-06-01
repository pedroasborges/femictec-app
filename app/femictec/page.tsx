import Image from "next/image";

import { getFemictecContent } from "./femictec-data";

const bodyFontStyle = {
  fontFamily: "'Saira', sans-serif",
};

export default async function FemictecPage() {
  const content = await getFemictecContent();

  return (
    <section className="bg-white pb-16 text-[#223d67]">
        <header className="mx-auto w-full max-w-[1120px] px-4 py-8 text-center md:px-6 md:py-10">
          <p className="text-5xl font-black uppercase leading-none tracking-[0.02em] text-[#4085c6] md:text-7xl lg:text-8xl">
            {content.tituloPrincipal}
          </p>
          <p className="mt-3 text-sm font-black uppercase tracking-[0.12em] text-[#95c11f] md:text-lg">
            {content.subtituloPrincipal}
          </p>
      </header>

      <div className="relative overflow-hidden border-t-8 border-[#95c11f] bg-[#223d67] px-4 py-10 md:px-8 md:py-14">
        <Image
          src="/apresentacao.svg"
          alt=""
          aria-hidden="true"
          fill
          unoptimized
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-100"
          sizes="100vw"
        />

        <div className="relative z-10 mx-auto w-full max-w-[1120px]">
          <div className="mx-auto max-w-[760px] px-6 py-8 text-white md:px-10 md:py-10">
            <article>
              <h1 className="text-xl font-black uppercase tracking-[0.08em] text-[#95c11f] md:text-2xl">{content.oQueTitulo}</h1>
              <p className="mt-5 text-justify text-base leading-8 text-white/90 md:text-lg md:leading-9" style={bodyFontStyle}>{content.oQueDescricao}</p>
            </article>

            <article className="mt-8 bg-white p-5 text-[#223d67] md:p-7">
              <h2 className="text-lg font-black uppercase tracking-[0.08em] text-[#95c11f] md:text-xl">{content.missaoTitulo}</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-[0.34fr_1fr]">
                <p className="text-base font-black uppercase tracking-[0.04em] text-[#95c11f]" style={bodyFontStyle}>{content.missaoDestaque}</p>
                <p className="text-justify text-base leading-8 text-[#223d67]/80 md:text-lg md:leading-9" style={bodyFontStyle}>{content.missaoDescricao}</p>
              </div>
            </article>

            <article className="mt-8">
              <h2 className="text-xl font-black uppercase tracking-[0.08em] text-[#95c11f] md:text-2xl">{content.impactoTitulo}</h2>
              <p className="mt-5 text-justify text-base leading-8 text-white/90 md:text-lg md:leading-9" style={bodyFontStyle}>{content.impactoDescricao}</p>
            </article>

            {content.estandesImagemUrl ? (
              <div className="relative mt-10 aspect-[16/7] overflow-hidden bg-[#1b365f]">
                <Image
                  src={content.estandesImagemUrl}
                  alt={content.estandesImagemAlt}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 760px"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

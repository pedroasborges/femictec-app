import Image from "next/image";
import { getFemictecContent } from "./femictec-data";

export default async function FemictecPage() {
  const content = await getFemictecContent();

  return (
    <>
      <section className="relative overflow-hidden bg-[#8f878b] px-4 py-16 text-center text-[#eeeeee] md:px-8 md:py-20">
        {content.bannerImagemUrl ? (
          <>
            <Image src={content.bannerImagemUrl} alt={content.bannerTitulo} fill className="object-cover" unoptimized />
            <div className="absolute inset-0 bg-[#6d6368]/65" />
          </>
        ) : null}

        <div className="relative z-10">
          <p className="text-4xl font-light uppercase tracking-wide md:text-5xl">{content.bannerTitulo}</p>
          <p className="mt-2 text-4xl font-light uppercase tracking-wide text-[#73f3c7] md:text-5xl">{content.bannerDestaque}</p>
        </div>
      </section>

      <section className="px-4 py-8 md:px-8 md:py-10">
        <h1 className="text-3xl font-light uppercase tracking-wide text-[#8c8288] md:text-4xl">{content.oQueTitulo}</h1>
        <p className="mt-4 text-sm leading-7 text-[#8f868b] md:text-base">{content.oQueDescricao}</p>
      </section>

      <section className="px-4 py-4 md:px-8 md:py-6">
        <h2 className="text-3xl font-light uppercase tracking-wide text-[#8c8288] md:text-4xl">{content.missaoTitulo}</h2>
        <p className="mt-4 text-sm leading-7 text-[#8f868b] md:text-base">{content.missaoDescricao}</p>
        <div className="mt-4 border border-[#78edd2] bg-[#e9e5e7] px-4 py-2 text-sm font-medium text-[#8b7f85]">{content.missaoDestaque}</div>
      </section>

      <section className="px-4 py-6 md:px-8 md:py-8">
        <h2 className="text-3xl font-light uppercase tracking-wide text-[#8c8288] md:text-4xl">{content.impactoTitulo}</h2>
        <p className="mt-4 text-sm leading-7 text-[#8f868b] md:text-base">{content.impactoDescricao}</p>
      </section>

      <section className="bg-[#8f878b] px-4 py-14 text-center text-[#eeeeee] md:px-8 md:py-16">
        {content.estandesImagemUrl ? (
          <img src={content.estandesImagemUrl} alt={content.estandesImagemAlt} className="mx-auto w-full max-w-4xl rounded-sm object-cover" />
        ) : (
          <div className="mx-auto max-w-3xl">
            <p className="text-sm uppercase tracking-[0.12em]">{content.estandesTitulo}</p>
            <p className="mt-1 text-sm uppercase tracking-[0.12em]">{content.estandesSubtitulo}</p>
            <p className="mt-3 text-xl uppercase tracking-[0.1em] text-[#73f3c7]">Comunicacao</p>
          </div>
        )}
      </section>
    </>
  );
}

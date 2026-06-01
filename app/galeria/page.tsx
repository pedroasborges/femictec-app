import type { Metadata } from "next";
import Link from "next/link";

import { getGaleriaEdicoes } from "./galeria-data";

const bodyFontStyle = {
  fontFamily: "'Saira', sans-serif",
};

export const metadata: Metadata = {
  title: "Galeria | FEMICTEC",
  description: "Galeria de imagens por edicoes da FEMICTEC.",
};

export default async function GaleriaPage() {
  const edicoes = await getGaleriaEdicoes();

  return (
    <section className="bg-white px-4 py-10 md:px-6 md:py-14">
      <div className="mx-auto w-full max-w-[1200px]">
        <h1 className="text-center text-3xl font-black uppercase tracking-[0.06em] text-[#223d67] md:text-5xl">
          Galeria FEMICTEC
        </h1>

        {edicoes.length === 0 ? (
          <div className="mx-auto mt-8 max-w-3xl rounded-md border border-[#223d67]/20 bg-white px-6 py-10 text-center text-sm font-semibold text-[#223d67]">
            Nenhuma edicao com imagens foi publicada no Strapi ainda.
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {edicoes.map((edicao) => (
              <section key={edicao.id} className="rounded-md border border-[#223d67]/15 bg-[#f8fbff] p-4 md:p-6">
                <header className="mb-5 border-b border-[#223d67]/10 pb-3">
                  <h2 className="text-2xl font-black uppercase tracking-[0.04em] text-[#223d67] md:text-3xl">{edicao.titulo}</h2>
                  <p className="mt-1 text-sm text-[#223d67]/80 md:text-base" style={bodyFontStyle}>
                    {edicao.dataEdicaoLabel}
                  </p>
                </header>

                <figure className="overflow-hidden rounded-sm border border-[#223d67]/15 bg-white">
                  <img src={edicao.imagens[0].url} alt={edicao.imagens[0].alt} className="h-64 w-full object-cover" loading="lazy" />
                </figure>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-[#223d67]/80" style={bodyFontStyle}>
                    {edicao.imagens.length} imagem(ns)
                  </p>
                  <Link
                    href={`/galeria/${edicao.slug}`}
                    className="inline-flex bg-[#223d67] px-4 py-2 text-xs font-black uppercase tracking-[0.08em] text-white transition hover:bg-[#4085c6]"
                  >
                    Ver edicao
                  </Link>
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

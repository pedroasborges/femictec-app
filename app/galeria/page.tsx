import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";

import UnavailableState from "../components/unavailable-state";
import { getGaleriaPageData } from "./galeria-data";

const bodyFontStyle = {
  fontFamily: "'Saira', sans-serif",
};

export const metadata: Metadata = {
  title: "Galeria | FEMICTEC",
  description: "Galeria de imagens por edicoes da FEMICTEC.",
};

export default async function GaleriaPage() {
  const data = await getGaleriaPageData();

  if (data.status !== "ready") {
    return (
      <UnavailableState
        title={data.status === "empty" ? "Galeria sem imagens" : "Galeria indisponivel"}
        description={
          data.status === "empty"
            ? "Nao ha edicoes com imagens publicadas no CMS no momento."
            : "Nao foi possivel carregar a galeria a partir do CMS neste momento."
        }
        detail="Assim que novas imagens forem publicadas, a galeria sera atualizada automaticamente."
        actionHref="/"
        actionLabel="Voltar para a home"
      />
    );
  }

  return (
    <section className="bg-white px-4 py-10 md:px-6 md:py-14">
      <div className="mx-auto w-full max-w-[1200px]">
        <h1 className="text-center text-3xl font-black uppercase tracking-[0.06em] text-[#223d67] md:text-5xl">
          Galeria FEMICTEC
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {data.edicoes.map((edicao) => (
            <section key={edicao.id} className="rounded-md border border-[#223d67]/15 bg-[#f8fbff] p-4 md:p-6">
              <header className="mb-5 border-b border-[#223d67]/10 pb-3">
                <h2 className="text-2xl font-black uppercase tracking-[0.04em] text-[#223d67] md:text-3xl">{edicao.titulo}</h2>
                <p className="mt-1 text-sm text-[#223d67]/80 md:text-base" style={bodyFontStyle}>
                  {edicao.dataEdicaoLabel}
                </p>
              </header>

              <figure className="relative aspect-[4/3] overflow-hidden rounded-sm border border-[#223d67]/15 bg-white">
                <Image
                  src={edicao.imagens[0].url}
                  alt={edicao.imagens[0].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
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
      </div>
    </section>
  );
}

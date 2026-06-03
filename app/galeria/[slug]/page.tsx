import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";

import UnavailableState from "../../components/unavailable-state";
import { getGaleriaEdicaoBySlug, getGaleriaEdicoes } from "../galeria-data";

const bodyFontStyle = {
  fontFamily: "'Saira', sans-serif",
};

type GaleriaEdicaoPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const edicoes = await getGaleriaEdicoes();
  return edicoes.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: GaleriaEdicaoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const edicao = await getGaleriaEdicaoBySlug(slug);
  if (!edicao) {
    return { title: "Edicao nao encontrada | Galeria FEMICTEC" };
  }
  return {
    title: `${edicao.titulo} | Galeria FEMICTEC`,
    description: `Galeria de imagens da edicao ${edicao.titulo}.`,
  };
}

export default async function GaleriaEdicaoPage({ params }: GaleriaEdicaoPageProps) {
  const { slug } = await params;
  const edicao = await getGaleriaEdicaoBySlug(slug);
  if (!edicao) {
    return (
      <UnavailableState
        title="Galeria indisponivel"
        description="Nao foi possivel localizar imagens para esta edicao no CMS no momento."
        detail="Se a edicao ainda nao foi publicada ou foi removida, a pagina permanecera indisponivel."
        actionHref="/galeria"
        actionLabel="Voltar para galeria"
      />
    );
  }

  return (
    <section className="bg-white px-4 py-10 md:px-6 md:py-14">
      <div className="mx-auto w-full max-w-[1200px]">
        <Link href="/galeria" className="inline-flex text-sm font-semibold text-[#223d67] hover:text-[#4085c6]" style={bodyFontStyle}>
          &lt; Voltar para edicoes
        </Link>

        <header className="mt-4 border-b border-[#223d67]/10 pb-4">
          <h1 className="text-3xl font-black uppercase tracking-[0.06em] text-[#223d67] md:text-5xl">{edicao.titulo}</h1>
          <p className="mt-2 text-sm text-[#223d67]/80 md:text-base" style={bodyFontStyle}>
            {edicao.dataEdicaoLabel}
          </p>
        </header>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {edicao.imagens.map((imagem, index) => (
            <figure key={`${imagem.url}-${index}`} className="relative aspect-[4/3] overflow-hidden rounded-sm border border-[#223d67]/15 bg-white">
              <Image
                src={imagem.url}
                alt={imagem.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

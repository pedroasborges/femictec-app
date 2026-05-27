import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getNoticiaWithNeighbors } from "../noticias-data";

type NoticiaDetalhePageProps = {
  params: Promise<{
    id: string;
  }>;
};

const bodyFontStyle = {
  fontFamily: "'Saira', sans-serif",
};

function splitParagraphs(text: string): string[] {
  return text
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export default async function NoticiaDetalhePage({
  params,
}: NoticiaDetalhePageProps) {
  const { id } = await params;
  const noticiaContext = await getNoticiaWithNeighbors(id);

  if (!noticiaContext) {
    notFound();
  }

  const { noticia, anterior, proxima } = noticiaContext;
  const paragrafos = splitParagraphs(noticia.descricao || noticia.miniDescricao);

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-50 px-4 py-10 text-[#223d67] md:py-14">
      <article className="relative z-10 mx-auto w-full max-w-[1080px]">
        <h1 className="mx-auto max-w-3xl text-center text-2xl font-black uppercase leading-tight tracking-wide text-[#223d67] md:text-4xl">
          {noticia.titulo}
        </h1>

        <div className="relative mt-8 h-[260px] overflow-hidden bg-[#909090] md:mt-10 md:h-[420px]">
          {noticia.imagemUrl ? (
            <Image
              src={noticia.imagemUrl}
              alt={noticia.titulo}
              fill
              unoptimized
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1080px"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm uppercase tracking-[0.2em] text-[#f8eef1]">
              Imagem
            </div>
          )}
        </div>

        <div
          className="mx-auto mt-8 max-w-[980px] space-y-4 text-justify text-sm leading-7 text-[#8f747c] md:mt-10 md:text-base md:leading-8"
          style={bodyFontStyle}
        >
          {paragrafos.length ? (
            paragrafos.map((paragrafo) => (
              <p key={paragrafo.slice(0, 48)}>{paragrafo}</p>
            ))
          ) : (
            <p>Conte&uacute;do indispon&iacute;vel no momento.</p>
          )}
        </div>

        <nav className="mx-auto mt-10 flex w-full max-w-[760px] flex-col justify-center gap-4 sm:flex-row">
          {anterior ? (
            <Link
              href={`/noticias/${anterior.id}`}
              className="inline-flex min-h-12 flex-1 items-center justify-center rounded-[6px] bg-[#223d67] px-6 py-3 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#f8eef1] transition hover:bg-[#304a80]"
            >
              &lt; Not&iacute;cia anterior
            </Link>
          ) : (
            <span className="inline-flex min-h-12 flex-1 cursor-not-allowed items-center justify-center rounded-[6px] bg-[#223d67]/55 px-6 py-3 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#f8eef1]/70">
              &lt; Not&iacute;cia anterior
            </span>
          )}

          {proxima ? (
            <Link
              href={`/noticias/${proxima.id}`}
              className="inline-flex min-h-12 flex-1 items-center justify-center rounded-[6px] bg-[#223d67] px-6 py-3 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#f8eef1] transition hover:bg-[#304a80]"
            >
              Pr&oacute;xima not&iacute;cia &gt;
            </Link>
          ) : (
            <span className="inline-flex min-h-12 flex-1 cursor-not-allowed items-center justify-center rounded-[6px] bg-[#223d67]/55 px-6 py-3 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-[#f8eef1]/70">
              Pr&oacute;xima not&iacute;cia &gt;
            </span>
          )}
        </nav>
      </article>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getNoticiaWithNeighbors } from "../noticias-data";

type NoticiaDetalhePageProps = {
  params: Promise<{
    id: string;
  }>;
};

function splitParagraphs(text: string): string[] {
  return text
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export default async function NoticiaDetalhePage({ params }: NoticiaDetalhePageProps) {
  const { id } = await params;
  const noticiaContext = await getNoticiaWithNeighbors(id);

  if (!noticiaContext) {
    notFound();
  }

  const { noticia, anterior, proxima } = noticiaContext;
  const paragrafos = splitParagraphs(noticia.descricao || noticia.miniDescricao);

  return (
    <section className="mx-auto w-full max-w-[1320px] px-4 py-10 md:px-6 md:py-14">
      <div className="rounded-xl bg-[#909090] p-5 text-[#eeeeee] shadow-sm md:p-10">
        <h1 className="mx-auto max-w-4xl text-center text-3xl font-light tracking-tight md:text-5xl">{noticia.titulo}</h1>

        <div className="relative mt-8 min-h-[280px] overflow-hidden rounded-lg border border-[#d4d4d4] bg-[#ececec] md:min-h-[420px]">
          {noticia.imagemUrl ? (
            <Image
              src={noticia.imagemUrl}
              alt={noticia.titulo}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-2xl text-[#8d8d8d]">IMAGEM</div>
          )}
        </div>

        <div className="mx-auto mt-8 max-w-4xl space-y-5 text-base leading-8 text-[#eeeeee] md:text-lg">
          {paragrafos.length ? (
            paragrafos.map((paragrafo) => <p key={paragrafo.slice(0, 24)}>{paragrafo}</p>)
          ) : (
            <p>Conteudo indisponivel no momento.</p>
          )}
        </div>

        <div className="mt-10 flex justify-between gap-4">
          {anterior ? (
            <Link
              href={`/noticias/${anterior.id}`}
              className="rounded-md border border-[#e2e2e2] px-4 py-2 text-xs font-medium uppercase tracking-[0.1em] text-[#eeeeee] transition hover:bg-[#9d9d9d]"
            >
              Noticia anterior
            </Link>
          ) : (
            <span className="cursor-not-allowed rounded-md border border-[#b9b9b9] px-4 py-2 text-xs font-medium uppercase tracking-[0.1em] text-[#c9c9c9]">
              Noticia anterior
            </span>
          )}

          {proxima ? (
            <Link
              href={`/noticias/${proxima.id}`}
              className="rounded-md border border-[#e2e2e2] px-4 py-2 text-xs font-medium uppercase tracking-[0.1em] text-[#eeeeee] transition hover:bg-[#9d9d9d]"
            >
              Proxima noticia
            </Link>
          ) : (
            <span className="cursor-not-allowed rounded-md border border-[#b9b9b9] px-4 py-2 text-xs font-medium uppercase tracking-[0.1em] text-[#c9c9c9]">
              Proxima noticia
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

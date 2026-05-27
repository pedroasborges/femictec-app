"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { Noticia } from "./noticias-data";

type NoticiasListClientProps = {
  noticias: Noticia[];
};

const bodyFontStyle = {
  fontFamily: "'Saira', sans-serif",
};

const cardLayouts = [
  {
    shell: "md:col-span-2 md:row-span-2 md:grid-cols-[50%_50%]",
    media: "h-48 md:h-full",
    body: "md:justify-center",
    text: "line-clamp-6",
  },
  {
    shell: "md:row-span-2 md:grid-cols-[46%_54%]",
    media: "h-44 md:h-full",
    body: "md:justify-center",
    text: "line-clamp-5",
  },
  {
    shell: "md:row-span-3",
    media: "h-52 md:h-[58%]",
    body: "",
    text: "line-clamp-6",
  },
  {
    shell: "md:row-span-2 md:grid-cols-[48%_52%]",
    media: "h-44 md:h-full",
    body: "md:justify-center",
    text: "line-clamp-5",
  },
  {
    shell: "md:row-span-3",
    media: "h-56 md:h-[50%]",
    body: "",
    text: "line-clamp-7",
  },
  {
    shell: "md:row-span-2 md:grid-cols-[54%_46%]",
    media: "h-44 md:h-full",
    body: "md:justify-center",
    text: "line-clamp-5",
  },
];

function formatDate(dateString: string | null): string {
  if (!dateString) return "Sem data";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "Sem data";

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export default function NoticiasListClient({
  noticias,
}: NoticiasListClientProps) {
  const [busca, setBusca] = useState("");
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");

  const noticiasFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    const inicioDate = inicio ? new Date(`${inicio}T00:00:00`) : null;
    const fimDate = fim ? new Date(`${fim}T23:59:59`) : null;

    return noticias.filter((item) => {
      const searchable =
        `${item.titulo} ${item.miniDescricao} ${item.descricao}`.toLowerCase();

      const matchTexto = !termo || searchable.includes(termo);

      if (!matchTexto) return false;
      if (!inicioDate && !fimDate) return true;

      if (!item.publishedAt) return false;

      const dataPublicacao = new Date(item.publishedAt);

      if (Number.isNaN(dataPublicacao.getTime())) return false;

      if (inicioDate && dataPublicacao < inicioDate) return false;
      if (fimDate && dataPublicacao > fimDate) return false;

      return true;
    });
  }, [busca, fim, inicio, noticias]);

  const limparFiltros = () => {
    setBusca("");
    setInicio("");
    setFim("");
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-50 px-4 py-10 text-[#f8eef1] md:py-14">
      <div className="relative z-10 mx-auto w-full max-w-[1080px] rounded-[8px] bg-[#223d67] px-4 py-8 shadow-[0_16px_36px_rgba(34,61,103,0.18)] md:px-8 md:py-10">
        <h1 className="text-center text-3xl font-black uppercase leading-tight tracking-wide text-[#f8eef1] md:text-4xl">
          Lista de not&iacute;cias
        </h1>

        <form
          className="mx-auto mt-8 w-full max-w-[980px]"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-stretch">
            <label className="flex min-h-12 items-center rounded-[6px] bg-[#95c11f] p-2">
              <span className="sr-only">Buscar not&iacute;cia</span>
              <input
                type="search"
                placeholder="Qual not&iacute;cia procura?"
                value={busca}
                onChange={(event) => setBusca(event.target.value)}
                className="h-8 w-full rounded-[4px] border-0 bg-[#fff5f7] px-4 text-sm text-[#223d67] outline-none placeholder:text-[#95a553]"
                style={bodyFontStyle}
              />
            </label>

            <button
              type="submit"
              className="min-h-12 rounded-[6px] bg-[#2a3b68] px-8 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#304a80]"
            >
              Pesquisar
            </button>

            <button
              type="button"
              onClick={limparFiltros}
              className="min-h-12 rounded-[6px] bg-[#95c11f] px-8 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#86ad1c]"
            >
              Limpar filtro
            </button>
          </div>

          <div className="mt-4 grid gap-3 text-[#223d67] md:grid-cols-[1fr_1fr_auto]">
            <label className="grid gap-1">
              <span className="rounded-t-[4px] bg-[#f8eef1] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em]">
                Publicado de
              </span>
              <input
                type="date"
                value={inicio}
                onChange={(event) => setInicio(event.target.value)}
                className="h-11 rounded-b-[4px] border-0 bg-[#fff9fb] px-3 text-sm outline-none"
                style={bodyFontStyle}
              />
            </label>

            <label className="grid gap-1">
              <span className="rounded-t-[4px] bg-[#f8eef1] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em]">
                Publicado at&eacute;
              </span>
              <input
                type="date"
                value={fim}
                onChange={(event) => setFim(event.target.value)}
                className="h-11 rounded-b-[4px] border-0 bg-[#fff9fb] px-3 text-sm outline-none"
                style={bodyFontStyle}
              />
            </label>

            <div className="flex items-end">
              <div className="w-full rounded-[4px] bg-[#f8eef1] px-5 py-3 text-center text-[10px] font-bold uppercase tracking-[0.14em] md:min-w-56">
                {noticiasFiltradas.length} not&iacute;cias
              </div>
            </div>
          </div>
        </form>

        {noticiasFiltradas.length === 0 ? (
          <div className="mt-10 rounded-[6px] border border-[#f8eef1]/70 bg-[#223d67]/75 px-6 py-12 text-center text-sm uppercase tracking-[0.14em] text-[#f8eef1]">
            Nenhuma not&iacute;cia encontrada.
          </div>
        ) : (
          <div className="mt-8 grid auto-rows-auto gap-4 md:grid-cols-2 md:auto-rows-[92px]">
            {noticiasFiltradas.map((noticia, index) => {
              const layout = cardLayouts[index % cardLayouts.length];
              const resumo =
                noticia.miniDescricao ||
                noticia.descricao ||
                "Conte\u00fado indispon\u00edvel no momento.";

              return (
                <Link
                  key={noticia.id}
                  href={`/noticias/${noticia.id}`}
                  className={`group grid overflow-hidden rounded-[6px] border border-[#f8eef1]/80 bg-[#223d67] shadow-[0_10px_24px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:border-[#95c11f] hover:shadow-[0_16px_28px_rgba(0,0,0,0.24)] ${layout.shell}`}
                >
                  <div
                    className={`relative min-h-44 overflow-hidden bg-[#f8eef1] ${layout.media}`}
                  >
                    {noticia.imagemUrl ? (
                      <Image
                        src={noticia.imagemUrl}
                        alt={noticia.titulo}
                        fill
                        unoptimized
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 540px"
                      />
                    ) : (
                      <div className="absolute inset-0" aria-hidden="true" />
                    )}
                  </div>

                  <article
                    className={`flex min-h-44 flex-col bg-[#223d67] p-5 text-[#f8eef1] ${layout.body}`}
                  >
                    <p
                      className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#bedb72]"
                      style={bodyFontStyle}
                    >
                      {formatDate(noticia.publishedAt)}
                    </p>

                    <h2 className="text-base font-black uppercase leading-tight md:text-lg">
                      {noticia.titulo}
                    </h2>

                    <p
                      className={`mt-3 text-sm leading-5 text-[#fff4f6] ${layout.text}`}
                      style={bodyFontStyle}
                    >
                      {resumo}
                    </p>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

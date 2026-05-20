"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { Noticia } from "./noticias-data";

type NoticiasListClientProps = {
  noticias: Noticia[];
};

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
    <section className="relative overflow-hidden bg-[#223d67] py-16">
      
      {/* SVG FUNDO DA NOTÍCIA*/}
      <div className="absolute inset-0 z-0">
        <svg
          viewBox="0 0 1921 900"
          preserveAspectRatio="none"
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* FUNDO AZUL */}
          <rect width="1921" height="900" fill="#223d67" />

          {/* FORMA VERDE */}
          <path
            d="
              M0,900
              L0,620
              C220,470 450,520 720,450
              C1040,360 1350,430 1600,220
              C1740,110 1840,40 1921,0
              L1921,900
              Z
            "
            fill="#9ac21c"
          />
        </svg>
      </div>
      
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4">
        {/* TITULO */}
        <h1 className="mb-10 text-center text-4xl font-black uppercase tracking-wide text-[#f2e8e8] md:text-5xl">
          Notícias
        </h1>

        {/* FILTROS */}
        <div className="mx-auto mb-10 grid max-w-5xl gap-4 rounded-2xl bg-[#3f78c9]/90 p-5 shadow-2xl md:grid-cols-4">
          <input
            type="text"
            placeholder="Buscar notícia"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="h-12 rounded-lg border border-white/20 bg-white px-4 text-sm text-[#333] outline-none"
          />

          <input
            type="date"
            value={inicio}
            onChange={(e) => setInicio(e.target.value)}
            className="h-12 rounded-lg border border-white/20 bg-white px-4 text-sm text-[#333] outline-none"
          />

          <input
            type="date"
            value={fim}
            onChange={(e) => setFim(e.target.value)}
            className="h-12 rounded-lg border border-white/20 bg-white px-4 text-sm text-[#333] outline-none"
          />

          <button
            type="button"
            onClick={limparFiltros}
            className="h-12 rounded-lg border border-white bg-transparent text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-[#223d67]"
          >
            Limpar
          </button>
        </div>

        {/* GRID DE NOTÍCIAS */}
        {noticiasFiltradas.length === 0 ? (
          <div className="text-center text-white">
            Nenhuma notícia encontrada.
          </div>
        ) : (
          <>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {noticiasFiltradas.map((noticia) => (
                <article
                  key={noticia.id}
                  className="overflow-hidden rounded-2xl bg-[#4a8de6] shadow-[0_12px_25px_rgba(0,0,0,0.25)] transition duration-300 hover:-translate-y-2"
                >
                  {/* IMAGEM */}
                  <div className="relative h-[340px] overflow-hidden">
                    {noticia.imagemUrl ? (
                      <Image
                        src={noticia.imagemUrl}
                        alt={noticia.titulo}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="(max-width:768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[#cfcfcf] text-2xl font-bold text-[#777]">
                        IMAGEM
                      </div>
                    )}

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  </div>

                  {/* CONTEUDO */}
                  <div className="p-5">
                    <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#dbe8ff]">
                      {formatDate(noticia.publishedAt)}
                    </p>

                    <h2 className="mb-4 text-3xl font-black uppercase leading-none text-[#f7eaea]">
                      {noticia.titulo}
                    </h2>

                    <p className="line-clamp-5 text-sm leading-5 text-white">
                      {noticia.miniDescricao ||
                        noticia.descricao ||
                        "Sem descrição disponível."}
                    </p>

                    <Link
                      href={`/noticias/${noticia.id}`}
                      className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#38467c] px-5 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white transition hover:bg-[#2a355f]"
                    >
                      Ver mais
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* CONTADOR */}
            <div className="mt-10 text-center text-sm uppercase tracking-[0.2em] text-white">
              {noticiasFiltradas.length} notícias encontradas
            </div>
          </>
        )}
      </div>

      {/* CSS CUSTOM */}
      <style jsx>{`
        .clip-diagonal {
          clip-path: polygon(0 100%, 0 45%, 100% 0, 100% 100%);
        }
      `}</style>
    </section>
  );
}
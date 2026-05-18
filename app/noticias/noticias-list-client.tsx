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

export default function NoticiasListClient({ noticias }: NoticiasListClientProps) {
  const [busca, setBusca] = useState("");
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");

  const noticiasFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    const inicioDate = inicio ? new Date(`${inicio}T00:00:00`) : null;
    const fimDate = fim ? new Date(`${fim}T23:59:59`) : null;

    return noticias.filter((item) => {
      const searchable = `${item.titulo} ${item.miniDescricao} ${item.descricao}`.toLowerCase();
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
    <section className="mx-auto w-full max-w-[1320px] px-4 py-10 md:px-6 md:py-14">
      <div className="rounded-xl bg-[#223d67] px-5 py-8 text-[#eeeeee] shadow-sm md:px-10">
        <h1 className="text-center text-3xl font-light tracking-tight md:text-5xl">LISTA DE NOTICIAS</h1>

        <div className="mt-8 grid gap-3 rounded-lg bg-[#4085c6] p-4 md:grid-cols-[2fr_1fr_1fr]">
          <input
            type="text"
            placeholder="Selecionar filtros"
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
            className="h-12 rounded-md border border-[#b8b8b8] bg-[#eeeeee] px-4 text-sm text-[#707070] outline-none transition focus:border-[#707070]"
          />

          <input
            type="date"
            value={inicio}
            onChange={(event) => setInicio(event.target.value)}
            className="h-12 rounded-md border border-[#b8b8b8] bg-[#eeeeee] px-4 text-sm text-[#707070] outline-none transition focus:border-[#707070]"
            aria-label="Data inicial"
          />

          <input
            type="date"
            value={fim}
            onChange={(event) => setFim(event.target.value)}
            className="h-12 rounded-md border border-[#b8b8b8] bg-[#eeeeee] px-4 text-sm text-[#707070] outline-none transition focus:border-[#707070]"
            aria-label="Data final"
          />

          <button
            type="button"
            onClick={limparFiltros}
            className="h-12 rounded-md border border-[#b8b8b8] bg-[#eeeeee] px-4 text-sm font-medium text-[#707070] transition hover:bg-white md:col-start-3"
          >
            Limpar filtro
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.12em] text-[#e0e0e0]">
          <span>{noticiasFiltradas.length} noticias encontradas</span>
          <span>
            {inicio || "--/--/----"} ate {fim || "--/--/----"}
          </span>
        </div>

        {noticiasFiltradas.length === 0 ? (
          <div className="mt-8 rounded-lg border border-dashed border-[#d7d7d7] px-6 py-10 text-center text-[#f2f2f2]">
            Nenhuma noticia encontrada com os filtros informados.
          </div>
        ) : (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {noticiasFiltradas.map((noticia, index) => {
              const isDestacada = index % 5 === 0;

              return (
                <article
                  key={noticia.id}
                  className={`overflow-hidden rounded-lg border border-[#d6d6d6] bg-[#4085c6] ${
                    isDestacada ? "md:col-span-2" : ""
                  }`}
                >
                  <div className={`grid gap-0 ${isDestacada ? "md:grid-cols-[1.1fr_1fr]" : "md:grid-cols-[0.9fr_1fr]"}`}>
                    <div className="relative min-h-[220px] bg-[#ececec]">
                      {noticia.imagemUrl ? (
                        <Image
                          src={noticia.imagemUrl}
                          alt={noticia.titulo}
                          fill
                          unoptimized
                          sizes={isDestacada ? "(max-width: 768px) 100vw, 58vw" : "(max-width: 768px) 100vw, 35vw"}
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xl text-[#8d8d8d]">IMAGEM</div>
                      )}
                    </div>

                    <div className="flex flex-col p-5">
                      <h2 className="text-xl font-light text-[#eeeeee] md:text-2xl">{noticia.titulo}</h2>
                      <p className="mt-2 text-xs tracking-wide text-[#d5d5d5]">
                        Publicado em {formatDate(noticia.publishedAt)}
                      </p>
                      <p className="mt-4 line-clamp-6 text-sm leading-6 text-[#ededed]">
                        {noticia.miniDescricao || noticia.descricao || "Sem descricao disponivel."}
                      </p>

                      <Link
                        href={`/noticias/${noticia.id}`}
                        className="mt-5 inline-flex w-fit rounded-md border border-[#e2e2e2] px-4 py-2 text-xs font-medium uppercase tracking-[0.1em] text-[#eeeeee] transition hover:bg-[#9d9d9d]"
                      >
                        Ler noticia
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import type { EventoItem } from "./events-data";

type EventosListClientProps = {
  eventos: EventoItem[];
};

export default function EventosListClient({ eventos }: EventosListClientProps) {
  const [filtro, setFiltro] = useState("");
  const [filtroAplicado, setFiltroAplicado] = useState("");

  const eventosFiltrados = useMemo(() => {
    const termo = filtroAplicado.trim().toLowerCase();
    if (!termo) return eventos;

    return eventos.filter((evento) =>
      `${evento.nomeEvento} ${evento.dados} ${evento.miniDescricao}`.toLowerCase().includes(termo),
    );
  }, [eventos, filtroAplicado]);

  const handleFiltrar = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFiltroAplicado(filtro);
  };

  const handleLimparFiltro = () => {
    setFiltro("");
    setFiltroAplicado("");
  };

  return (
    <>
      <form
        onSubmit={handleFiltrar}
        className="mb-4 grid grid-cols-1 gap-3 rounded bg-[#223d67] p-3 md:grid-cols-[1fr_auto_auto] md:items-center md:p-4"
      >
        <label htmlFor="filtro-eventos" className="text-sm text-[#eeeeee]">
          Selecionar filtros:
        </label>
        <input
          id="filtro-eventos"
          type="text"
          value={filtro}
          onChange={(event) => setFiltro(event.target.value)}
          placeholder="Digite nome, data ou palavra-chave"
          className="h-10 rounded border border-[#b7aeb3] bg-[#efefef] px-3 text-sm text-[#6f666b] outline-none placeholder:text-[#9f989c] focus:border-[#7f777b]"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="h-10 rounded bg-[#7f777b] px-4 text-sm font-medium text-[#eeeeee] transition hover:bg-[#71686d]"
          >
            Filtrar
          </button>
          <button
            type="button"
            onClick={handleLimparFiltro}
            className="h-10 rounded bg-[#8a8286] px-4 text-sm font-medium text-[#eeeeee] transition hover:bg-[#787175]"
          >
            Limpar Filtro
          </button>
        </div>
      </form>

      <div className="mb-3 grid grid-cols-1 gap-3 px-1 text-2xl font-light md:grid-cols-[0.55fr_0.45fr] md:text-3xl">
        <p>Evento</p>
        <p>Descricao</p>
      </div>

      <div className="space-y-3">
        {eventosFiltrados.length > 0 ? (
          eventosFiltrados.map((evento) => (
            <Link
              key={evento.id}
              href={`/eventos-da-feira/${evento.slug}`}
              className="grid grid-cols-1 gap-3 md:grid-cols-[0.55fr_0.45fr]"
            >
              <article className="flex min-h-[110px] items-center gap-5 rounded bg-[#223d67] px-4 py-5 transition hover:bg-[#4085c6] md:px-6">
                <div className="relative h-14 w-14 overflow-hidden rounded bg-[#ece8ea]">
                  {evento.imagemEvento ? (
                    <Image src={evento.imagemEvento} alt={evento.nomeEvento} fill className="object-cover" unoptimized />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] font-medium uppercase tracking-wide text-[#8f8388]">
                      Imagem
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-medium text-[#eeeeee] md:text-3xl">{evento.nomeEvento.toUpperCase()}</h2>
                  <p className="mt-1 text-sm text-[#ece8ea]">{evento.dados}</p>
                </div>
              </article>

              <article className="min-h-[110px] rounded bg-[#223d67] px-4 py-5 transition hover:bg-[#4085c6] md:px-6">
                <p className="text-sm text-[#eeeeee]">{evento.dados}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#ece8ea] md:text-base">{evento.miniDescricao}</p>
              </article>
            </Link>
          ))
        ) : (
          <div className="rounded bg-[#9c8f95] px-4 py-6 text-[#eeeeee]">Nenhum evento encontrado para o filtro informado.</div>
        )}
      </div>
    </>
  );
}

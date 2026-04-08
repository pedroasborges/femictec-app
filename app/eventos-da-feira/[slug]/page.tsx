import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { findEventoBySlug } from "../events-data";

type EventoDetalhePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function EventoDetalhePage({ params }: EventoDetalhePageProps) {
  const { slug } = await params;
  const evento = await findEventoBySlug(slug);

  if (!evento) {
    notFound();
  }

  return (
    <main className="bg-[#eeeeee] py-10 text-[#909090] md:py-14">
      <div className="mx-auto w-full max-w-[1320px] px-4 md:px-6">
        <div className="mb-6">
          <Link
            href="/eventos-da-feira"
            className="text-sm font-medium uppercase tracking-[0.08em] text-[#8b8287] transition hover:text-[#6e666a]"
          >
            Voltar para a lista de eventos
          </Link>
        </div>

        <h1 className="mb-8 text-center text-4xl font-light tracking-tight md:text-5xl">{evento.nomeEvento.toUpperCase()}</h1>

        <section className="relative overflow-hidden rounded bg-[#9c8f95] p-8 md:p-10">
          {evento.imagemEvento ? (
            <>
              <Image src={evento.imagemEvento} alt={evento.nomeEvento} fill className="object-cover" unoptimized />
              <div className="absolute inset-0 bg-[#6d6368]/60" />
            </>
          ) : null}

          <div className="relative z-10">
            <h2 className="max-w-4xl text-3xl font-light uppercase leading-tight text-[#eeeeee] md:text-5xl">
              {evento.nomeEvento}
            </h2>
            <p className="mt-4 max-w-3xl text-base text-[#ece8ea] md:text-lg">{evento.miniDescricao}</p>
            <p className="mt-2 text-sm font-medium text-[#ece8ea]">{evento.dados}</p>

            <a
              href={evento.linkInscricao}
              className="mt-10 inline-flex rounded bg-[#eeeeee] px-8 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#8b8287] transition hover:bg-white"
            >
              Link para plataforma de inscricao
            </a>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-[1fr_0.85fr]">
          <article>
            <h3 className="text-4xl font-light uppercase leading-tight md:text-5xl">Sobre o evento</h3>
            <p className="mt-3 text-xl font-light md:text-2xl">{evento.dados}</p>
            <p className="mt-4 text-base leading-relaxed text-[#7e767a] md:text-lg">{evento.descricao}</p>
          </article>

          {evento.imagemEvento ? (
            <article className="relative min-h-[280px] overflow-hidden rounded bg-[#9c8f95] md:min-h-[340px]">
              <Image src={evento.imagemEvento} alt={evento.nomeEvento} fill className="object-cover" unoptimized />
            </article>
          ) : (
            <article className="flex min-h-[280px] items-center justify-center rounded bg-[#9c8f95] p-6 text-center text-xl font-medium uppercase text-[#eeeeee] md:min-h-[340px] md:text-2xl">
              Imagem do evento
            </article>
          )}
        </section>

        <section className="mt-12 pb-4 text-center">
          <h3 className="text-4xl font-light uppercase leading-tight md:text-5xl">Consulte o regulamento</h3>
          <a
            href={evento.linkRegulamento}
            className="mx-auto mt-6 inline-flex rounded bg-[#9c8f95] px-8 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#eeeeee] transition hover:bg-[#8c8085]"
          >
            Acessar plataforma
          </a>
        </section>
      </div>
    </main>
  );
}

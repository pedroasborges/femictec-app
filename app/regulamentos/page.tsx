import Link from "next/link";

import UnavailableState from "../components/unavailable-state";
import { getRegulamento } from "./regulamentos-data";

function splitParagraphs(text: string): string[] {
  return text
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export default async function RegulamentosPage() {
  const regulamento = await getRegulamento();
  if (!regulamento.isAvailable) {
    return (
      <UnavailableState
        title="Regulamentos indisponiveis"
        description="Os regulamentos ainda nao foram publicados no CMS ou estao temporariamente indisponiveis."
        detail="Quando houver conteudo no Strapi, esta pagina passara a exibir o texto e o PDF normalmente."
        actionHref="/"
        actionLabel="Voltar para a home"
      />
    );
  }
  const paragraphs = splitParagraphs(regulamento.conteudo);

  return (
    <section className="mx-auto w-full max-w-[1320px] px-4 py-10 md:px-6 md:py-14">
      <div className="rounded-xl bg-[#223d67] p-5 text-[#eeeeee] shadow-sm md:p-10">
        <h1 className="text-center text-3xl font-light tracking-tight md:text-5xl">{regulamento.titulo}</h1>
        <p className="mt-3 text-center text-sm uppercase tracking-[0.12em] text-[#f0f0f0] md:text-base">{regulamento.subtitulo}</p>

        <div className="mx-auto mt-8 max-w-4xl space-y-5 text-base leading-8 text-[#eeeeee] md:text-lg">
          {paragraphs.length ? (
            paragraphs.map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)
          ) : (
            <p>Conteudo indisponivel no momento.</p>
          )}
        </div>

        <div className="mt-10 rounded-lg border border-[#d7d7d7] bg-[#eeeeee] p-4 text-[#909090]">
          <h2 className="text-lg font-semibold">Regulamento em PDF</h2>
          {regulamento.pdfUrl ? (
            <>
              <iframe
                src={regulamento.pdfUrl}
                title="Visualizacao do regulamento em PDF"
                className="mt-4 h-[560px] w-full rounded-md border border-[#d4d4d4] bg-white"
              />
              <div className="mt-4">
                <Link
                  href={regulamento.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-md bg-[#909090] px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#eeeeee] transition hover:bg-[#7f7f7f]"
                >
                  {regulamento.pdfLabel}
                </Link>
              </div>
            </>
          ) : (
            <p className="mt-3 text-sm">O PDF ainda nao foi publicado no CMS.</p>
          )}
        </div>
      </div>
    </section>
  );
}

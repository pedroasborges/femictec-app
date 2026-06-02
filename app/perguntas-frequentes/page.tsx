import type { Metadata } from "next";

import UnavailableState from "../components/unavailable-state";
import { getPerguntasFrequentesContent } from "./perguntas-frequentes-data";

const bodyFontStyle = {
  fontFamily: "'Saira', sans-serif",
};

export const metadata: Metadata = {
  title: "Perguntas Frequentes | FEMICTEC",
  description: "Perguntas frequentes sobre a FEMICTEC e o funcionamento do site.",
};

export default async function PerguntasFrequentesPage() {
  const content = await getPerguntasFrequentesContent();

  if (!content.isAvailable) {
    return (
      <UnavailableState
        title="Perguntas frequentes indisponiveis"
        description="Ainda nao ha perguntas frequentes publicadas no CMS."
        detail="Assim que o conteudo for publicado no Strapi, esta pagina sera exibida normalmente."
        actionHref="/contato"
        actionLabel="Voltar para contato"
      />
    );
  }

  return (
    <section className="mx-auto w-full max-w-[1320px] px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-center text-3xl font-black uppercase tracking-tight text-[#223d67] md:text-4xl">{content.titulo}</h1>
        <p className="mt-3 text-center text-sm text-slate-600 md:text-base" style={bodyFontStyle}>
          {content.subtitulo}
        </p>

        <div className="mt-10 border-t border-[#223d67]/15">
          {content.perguntas.map((item, index) => (
            <details key={`${index}-${item.pergunta}`} className="group border-b border-[#223d67]/15 py-2">
              <summary
                className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-[#223d67] outline-none [&::-webkit-details-marker]:hidden"
                style={bodyFontStyle}
              >
                <span className="text-sm font-black uppercase tracking-[0.05em] md:text-base">{item.pergunta}</span>
                <span className="text-xl font-light leading-none text-[#223d67]/70 transition group-open:rotate-180">+</span>
              </summary>
              <div className="pb-4">
                <p className="text-sm leading-7 text-[#223d67]/80 md:text-base md:leading-8" style={bodyFontStyle}>
                  {item.resposta}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";

import { getPoliticaPrivacidadeContent } from "./politica-de-privacidade-data";

export const metadata: Metadata = {
  title: "Politica de Privacidade | FEMICTEC",
  description: "Politica de Privacidade do site da FEMICTEC.",
};

type Bloco = {
  titulo: string | null;
  linhas: string[];
};

const bodyFontStyle = {
  fontFamily: "'Saira', sans-serif",
};

function parseConteudo(raw: string): Bloco[] {
  return raw
    .split(/\n\s*\n/g)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const lines = chunk.split("\n").map((line) => line.trim()).filter(Boolean);
      if (!lines.length) return { titulo: null, linhas: [] };
      const first = lines[0];
      if (first.startsWith("## ")) {
        return { titulo: first.replace(/^##\s*/, ""), linhas: lines.slice(1) };
      }
      return { titulo: null, linhas: lines };
    })
    .filter((item) => item.titulo || item.linhas.length > 0);
}

export default async function PoliticaDePrivacidadePage() {
  const content = await getPoliticaPrivacidadeContent();
  const blocos = parseConteudo(content.conteudo);

  return (
    <section className="mx-auto w-full max-w-[1320px] px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-center text-3xl font-black uppercase tracking-tight text-[#223d67] md:text-4xl">{content.titulo}</h1>
        <p className="mt-2 text-center text-sm text-slate-600">{content.subtitulo}</p>

        <div
          className="mx-auto mt-8 max-w-[980px] space-y-6 text-justify text-sm leading-7 text-[#223d67] md:mt-10 md:text-base md:leading-8"
          style={bodyFontStyle}
        >
          {blocos.map((bloco, index) => (
            <div key={`${index}-${bloco.titulo ?? "paragrafo"}`}>
              {bloco.titulo ? <h2 className="text-lg font-bold text-[#223d67] md:text-xl">{bloco.titulo}</h2> : null}
              <div className={bloco.titulo ? "mt-2 space-y-2" : "space-y-2"}>
                {bloco.linhas.map((linha, linhaIndex) => (
                  <p key={`${index}-${linhaIndex}`}>{linha}</p>
                ))}
              </div>
            </div>
          ))}

          <p className="pt-2 text-sm leading-7 text-[#223d67] md:text-base md:leading-8">Atualizado em: {content.atualizadoEm}.</p>
        </div>
      </div>
    </section>
  );
}

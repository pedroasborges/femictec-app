type ProjetoItem = {
  id: number;
  Titulo?: string;
  attributes?: {
    Titulo?: string;
  };
};

type ProjetoResponse = {
  data: ProjetoItem[];
};

import Banner from "./components/banner";
import { fetchStrapiJson } from "./lib/strapi";

async function getProjetos(): Promise<ProjetoResponse> {
  return fetchStrapiJson<ProjetoResponse>("/api/projetos?populate=*", { data: [] });
}

function getProjetoTitulo(projeto: ProjetoItem): string {
  return projeto.attributes?.Titulo ?? projeto.Titulo ?? "Projeto FEMICTEC";
}

export default async function Page() {
  const responseProjetos = await getProjetos();
  const projetos = responseProjetos.data ?? [];
  const noticias = projetos.slice(0, 3);

  return (
    <main className="bg-[#eeeeee] py-8 text-[#909090] md:py-12">
      <section className="bg-[#909090] px-0 py-16 text-center text-[#eeeeee] md:py-24 lg:py-0">
        <Banner />
      </section>
      <div className="mx-auto w-full max-w-[1320px] px-4 md:px-6">
        <section className="py-16 text-center md:py-20">
          <h2 className="text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">FACA SUA INSCRICAO</h2>

          <div className="mx-auto mt-10 max-w-5xl bg-[#909090] p-6 md:p-10">
            <div className="flex h-40 items-center justify-center bg-[#b3a9ad] text-xs font-medium tracking-wide text-[#eeeeee] md:h-52">
              IMAGEM COM TEXTO
            </div>
            <div className="mx-auto mt-8 w-fit bg-[#8d8589] px-8 py-3 text-xs font-medium tracking-[0.2em] text-[#eeeeee]">
              LINK PARA PLATAFORMA DE INSCRICAO
            </div>
          </div>

          <p className="mt-8 text-2xl font-normal">[DATA LIMITE]</p>
        </section>

        <section className="bg-[#909090] px-4 py-10 md:px-8 md:py-14">
          <div className="mx-auto max-w-5xl bg-[#eeeeee] p-8 text-center md:p-14">
            <h3 className="text-2xl font-normal md:text-4xl">RESUMO DA FEIRA</h3>
            <div className="mx-auto mt-8 flex h-56 max-w-3xl items-center justify-center border-4 border-[#909090] bg-white md:h-72">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#909090] text-3xl text-[#eeeeee]">
                ▶
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 text-center md:py-20">
          <h3 className="text-3xl font-normal tracking-tight md:text-5xl">CONFIRA AS DATAS</h3>

          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 overflow-hidden border-[6px] border-[#909090] md:grid-cols-[0.75fr_1.25fr]">
            <div className="bg-[#eeeeee]">
              <div className="border-b-[6px] border-[#909090] px-6 py-8 text-xl md:text-3xl">DATA</div>
              <div className="border-b-[6px] border-[#909090] px-6 py-8 text-xl md:text-3xl">DATA</div>
              <div className="px-6 py-8 text-xl md:text-3xl">DATA</div>
            </div>
            <div className="bg-[#eeeeee]">
              <div className="border-b-[6px] border-[#909090] px-6 py-8 text-xl md:text-3xl">INSCRICAO</div>
              <div className="border-b-[6px] border-[#909090] px-6 py-8 text-xl md:text-3xl">SUBMISSAO</div>
              <div className="px-6 py-8 text-xl md:text-3xl">AVALIACAO</div>
            </div>
          </div>
        </section>

        <section id="projetos" className="bg-[#909090] px-4 py-12 md:px-8 md:py-16">
          <h3 className="pb-8 text-center text-3xl font-light tracking-tight md:text-5xl">NOTICIAS</h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-[2fr_1fr]">
            <article className="rounded-md border-4 border-[#eeeeee] bg-[#eeeeee] p-4">
              <div className="flex h-44 items-center justify-center bg-[#b3a9ad] text-lg font-medium tracking-wide text-[#eeeeee]">
                IMAGEM
              </div>
              <p className="mt-4 text-left text-sm leading-relaxed text-[#909090] md:text-base">
                {noticias[0] ? getProjetoTitulo(noticias[0]) : "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum"}
              </p>
            </article>

            <div className="grid gap-6">
              <article className="rounded-md border-4 border-[#eeeeee] bg-[#eeeeee] p-4">
                <div className="flex h-24 items-center justify-center bg-[#b3a9ad] text-sm font-medium tracking-wide text-[#eeeeee]">
                  IMAGEM
                </div>
                <p className="mt-3 text-left text-sm text-[#909090]">
                  {noticias[1] ? getProjetoTitulo(noticias[1]) : "lorem ipsum lorem ipsum lorem ipsum"}
                </p>
              </article>
              <article className="rounded-md border-4 border-[#eeeeee] bg-[#eeeeee] p-4">
                <div className="flex h-24 items-center justify-center bg-[#b3a9ad] text-sm font-medium tracking-wide text-[#eeeeee]">
                  IMAGEM
                </div>
                <p className="mt-3 text-left text-sm text-[#909090]">
                  {noticias[2] ? getProjetoTitulo(noticias[2]) : "lorem ipsum lorem ipsum lorem ipsum"}
                </p>
              </article>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 border-t border-[#d7d7d7] pt-6 text-xs tracking-wide text-[#eeeeee] sm:grid-cols-4">
            <span>ENDERECO</span>
            <span>EMAIL E TELEFONE</span>
            <span>REDES SOCIAIS</span>
            <span>WHATSAPP</span>
          </div>
        </section>
      </div>
    </main>
  );
}

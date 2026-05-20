import Image from "next/image";
import Link from "next/link";

import Banner from "./components/banner";
import { getNoticias } from "./noticias/noticias-data";
import { getProjetos } from "./projetos/projetos-data";

export default async function Page() {
  const noticias = (await getNoticias()).slice(0, 3);
  const projetos = (await getProjetos()).slice(0, 6);

  return (
    <>
      {/* BANNER */}
      <section className="w-full bg-[#909090] px-0 py-16 text-center text-[#eeeeee] md:py-24 lg:py-0">
        <Banner />
      </section>

      {/* INSCRIÇÕES */}
      <section id="inscricoes" className="w-full py-16 text-center md:py-20">
        <div className="mx-auto w-full max-w-[1320px] px-4 md:px-6">
          <h2 className="text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">FAÇA SUA INSCRICAO</h2>

          <div className="mx-auto mt-10 max-w-5xl bg-[#223d67] p-6 md:p-10">
            <div className="flex h-40 items-center justify-center bg-[#b3a9ad] text-xs font-medium tracking-wide text-[#eeeeee] md:h-52">
              IMAGEM COM TEXTO
            </div>
            <div className="mx-auto mt-8 w-fit bg-[#95c11f] px-8 py-3 text-xs font-medium tracking-[0.2em] text-[#eeeeee]">
              LINK PARA PLATAFORMA DE INSCRICAO
            </div>
          </div>

          <p className="mt-8 text-2xl font-normal">[DATA LIMITE]</p>
        </div>
      </section>

      {/* RESUMO DA FEIRA */}
      <section className="w-full bg-[#223d67] px-4 py-10 md:px-8 md:py-14">
        <div className="mx-auto w-full max-w-[1320px] px-4 md:px-6">
          <div className="mx-auto max-w-5xl bg-[#eeeeee] p-8 text-center md:p-14">
            <h3 className="text-2xl font-normal md:text-4xl">RESUMO DA FEIRA</h3>
            <div className="mx-auto mt-8 flex h-56 max-w-3xl items-center justify-center border-4 border-[#909090] bg-white md:h-72">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#909090] text-3xl text-[#eeeeee]">
                PLAY
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DATAS */}
      <section className="w-full py-16 text-center md:py-20">
        <div className="mx-auto w-full max-w-[1320px] px-4 md:px-6">
          <h3 className="text-3xl font-normal tracking-tight md:text-5xl">CONFIRA AS DATAS</h3>

          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 overflow-hidden border-[6px] border-[#223d67] md:grid-cols-[0.75fr_1.25fr]">
            <div className="bg-[#eeeeee]">
              <div className="border-b-[6px] border-[#223d67] px-6 py-8 text-xl md:text-3xl">DATA</div>
              <div className="border-b-[6px] border-[#223d67] px-6 py-8 text-xl md:text-3xl">DATA</div>
              <div className="px-6 py-8 text-xl md:text-3xl">DATA</div>
            </div>
            <div className="bg-[#eeeeee]">
              <div className="border-b-[6px] border-[#223d67] px-6 py-8 text-xl md:text-3xl">INSCRICAO</div>
              <div className="border-b-[6px] border-[#223d67] px-6 py-8 text-xl md:text-3xl">SUBMISSAO</div>
              <div className="px-6 py-8 text-xl md:text-3xl">AVALIACAO</div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJETOS */}
      <section id="projetos" className="w-full bg-[#223d67] text-white px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto w-full max-w-[1320px] px-4 md:px-6">
          <h3 className="pb-8 text-center text-3xl font-light tracking-tight md:text-5xl">PROJETOS</h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projetos.length > 0 ? (
              projetos.map((projeto) => (
                <article key={projeto.id} className="rounded-md border-4 border-[#eeeeee] bg-[#eeeeee] p-5">
                  <h4 className="text-left text-lg font-medium text-[#909090]">{projeto.titulo}</h4>
                  <p className="mt-3 text-sm text-[#909090]">
                    <span className="font-semibold">Escola:</span> {projeto.escola}
                  </p>
                  <p className="mt-1 text-sm text-[#909090]">
                    <span className="font-semibold">Area:</span> {projeto.area}
                  </p>
                  <p className="mt-1 text-sm text-[#909090]">
                    <span className="font-semibold">Participantes:</span> {projeto.participantes}
                  </p>
                </article>
              ))
            ) : (
              <article className="rounded-md border-4 border-[#eeeeee] bg-[#eeeeee] p-5 md:col-span-2 lg:col-span-3">
                <p className="text-sm leading-relaxed text-[#909090]">Nenhum projeto publicado no momento.</p>
              </article>
            )}
          </div>
        </div>
      </section>

      {/* NOTÍCIAS */}
      <section className="relative w-full overflow-hidden py-20">
        {/* SVG FUNDO */}
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

        {/* CONTEÚDO */}
        <div className="relative z-10 mx-auto w-full max-w-[1320px] px-4 md:px-6">
          <h3 className="mb-14 text-center text-4xl font-black uppercase tracking-wide text-[#f2e8e8] md:text-5xl">
            Notícias
          </h3>

          {noticias.length > 0 ? (
            <>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {noticias.map((noticia) => (
                  <article
                    key={noticia.id}
                    className="
                      overflow-hidden
                      rounded-[22px]
                      bg-[#4a8de6]
                      shadow-[0_15px_35px_rgba(0,0,0,0.35)]
                      transition-all
                      duration-300
                      hover:-translate-y-2
                    "
                  >
                    {/* IMAGEM */}
                    <div className="relative h-[360px] overflow-hidden">
                      {noticia.imagemUrl ? (
                        <Image
                          src={noticia.imagemUrl}
                          alt={noticia.titulo}
                          fill
                          unoptimized
                          className="object-cover transition duration-500 hover:scale-105"
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

                    {/* TEXTO */}
                    <div className="p-6">
                      <h4 className="mb-4 text-3xl font-black uppercase leading-none text-[#f7eaea]">
                        {noticia.titulo}
                      </h4>

                      <p className="line-clamp-5 text-sm leading-6 text-white">
                        {noticia.miniDescricao || "Sem descrição disponível."}
                      </p>

                      <Link
                        href={`/noticias/${noticia.id}`}
                        className="
                          mt-6
                          inline-flex
                          w-full
                          items-center
                          justify-center
                          rounded-xl
                          bg-[#38467c]
                          px-5
                          py-4
                          text-sm
                          font-bold
                          uppercase
                          tracking-[0.15em]
                          text-white
                          transition
                          hover:bg-[#2a355f]
                        "
                      >
                        Ver mais
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {/* BOTÃO */}
              <div className="mt-14 flex justify-center">
                <Link
                  href="/noticias"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white
                    bg-[#38467c]
                    px-10
                    py-4
                    text-sm
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-white
                    transition
                    hover:bg-white
                    hover:text-[#223d67]
                  "
                >
                  Ver todas as notícias
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center text-white">
              Nenhuma notícia publicada no momento.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
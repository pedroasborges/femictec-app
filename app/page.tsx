import Image from "next/image";
import Link from "next/link";

import Banner from "./components/banner";
import { getNoticias } from "./noticias/noticias-data";
import { getProjetos } from "./projetos/projetos-data";
import PointsIcon from "../public/points.svg"

export default async function Page() {
  const noticias = (await getNoticias()).slice(0, 3);
  const projetos = (await getProjetos()).slice(0, 6);

  return (
    <>
      <section className="bg-[#909090] px-0 py-16 text-center text-[#eeeeee] md:py-24 lg:py-0">
        <Banner />
      </section>
      <div className="mx-auto w-full max-w-[1320px] px-4 md:px-6">
        <section id="inscricoes" className="py-16 text-center md:py-20">
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
        </section>

        <section className="bg-[#223d67] px-4 py-10 md:px-8 md:py-14">
          <div className="mx-auto max-w-5xl bg-[#eeeeee] p-8 text-center md:p-14">
            <h3 className="text-2xl font-normal md:text-4xl">RESUMO DA FEIRA</h3>
            <div className="mx-auto mt-8 flex h-56 max-w-3xl items-center justify-center border-4 border-[#909090] bg-white md:h-72">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#909090] text-3xl text-[#eeeeee]">
                PLAY
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 text-center md:py-20">
          <h3 className="text-3xl font-normal tracking-tight md:text-5xl">CONFIRA AS DATAS</h3>

          <div className="flex justify-center">
            <div className="mr-8 text-white mt-10 grid max-w-5xl grid-cols-1 overflow-hidden md:grid-cols-[0.75fr_1.25fr] w-full">
              <div className="bg-[#eeeeee]">
                <div className="bg-[#95c11f] mb-14 px-6 py-8 text-xl md:text-3xl  scale-101 [clip-path:polygon(25%_0%,_100%_0%,_100%_100%,_25%_100%,_10%_50%)]">INSCRIÇÃO</div>
                <div className="bg-[#4085c6] mb-14 px-6 py-8 text-xl md:text-3xl scale-101 [clip-path:polygon(25%_0%,_100%_0%,_100%_100%,_25%_100%,_10%_50%)]">SUBMISSÃO</div>
                <div className="bg-[#223d67] px-6 py-8 text-xl md:text-3xl scale-101 [clip-path:polygon(25%_0%,_100%_0%,_100%_100%,_25%_100%,_10%_50%)]">AVALIAÇÃO</div>
              </div>
              <div className="bg-[#eeeeee]">
                <div className="bg-[#95c11f] mb-14 px-12 py-8 text-xl text-right md:text-3xl [clip-path:polygon(100%_50%,_90%_90%,_80%_90%,_77%_100%,_0%_100%,_0%_0%,_77%_0%,_80%_10%,_90%_10%)]">XX/XX</div>
                <div className="bg-[#4085c6] mb-14 px-12 py-8 text-xl text-right md:text-3xl [clip-path:polygon(100%_50%,_90%_90%,_80%_90%,_77%_100%,_0%_100%,_0%_0%,_77%_0%,_80%_10%,_90%_10%)]">XX/XX</div>
                <div className="bg-[#223d67] px-12 py-8 text-xl text-right md:text-3xl [clip-path:polygon(100%_50%,_90%_90%,_80%_90%,_77%_100%,_0%_100%,_0%_0%,_77%_0%,_80%_10%,_90%_10%)]">XX/XX</div>
              </div>
            </div>
            <Image className="mt-12" alt="icone" src={ PointsIcon } width={45} height={100}/>
          </div>

        </section>

        <section id="projetos" className="bg-[#223d67] text-white px-4 py-12 md:px-8 md:py-16">
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
        </section>

        <section className="bg-[#223d67] text-white px-4 py-12 md:px-8 md:py-16">
          <h3 className="pb-8 text-center text-3xl font-light tracking-tight md:text-5xl">NOTICIAS</h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-[2fr_1fr]">
            <article className="rounded-md border-4 border-[#eeeeee] bg-[#eeeeee] p-4">
              {noticias[0] ? (
                <Link href={`/noticias/${noticias[0].id}`} className="block">
                  <div className="relative h-44 overflow-hidden bg-[#b3a9ad]">
                    {noticias[0].imagemUrl ? (
                      <Image src={noticias[0].imagemUrl} alt={noticias[0].titulo} fill unoptimized className="object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-lg font-medium tracking-wide text-[#eeeeee]">IMAGEM</div>
                    )}
                  </div>
                  <h4 className="mt-4 text-left text-lg font-medium text-[#909090]">{noticias[0].titulo}</h4>
                  <p className="mt-2 text-left text-sm leading-relaxed text-[#909090] md:text-base">
                    {noticias[0].miniDescricao || "Sem descricao disponivel."}
                  </p>
                </Link>
              ) : (
                <>
                  <div className="flex h-44 items-center justify-center bg-[#b3a9ad] text-lg font-medium tracking-wide text-[#eeeeee]">
                    IMAGEM
                  </div>
                  <p className="mt-4 text-left text-sm leading-relaxed text-[#909090] md:text-base">Nenhuma noticia publicada no momento.</p>
                </>
              )}
            </article>

            <div className="grid gap-6">
              <article className="rounded-md border-4 border-[#eeeeee] bg-[#eeeeee] p-4">
                {noticias[1] ? (
                  <Link href={`/noticias/${noticias[1].id}`} className="block">
                    <div className="relative h-24 overflow-hidden bg-[#b3a9ad]">
                      {noticias[1].imagemUrl ? (
                        <Image src={noticias[1].imagemUrl} alt={noticias[1].titulo} fill unoptimized className="object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm font-medium tracking-wide text-[#eeeeee]">IMAGEM</div>
                      )}
                    </div>
                    <p className="mt-3 text-left text-sm font-medium text-[#909090]">{noticias[1].titulo}</p>
                  </Link>
                ) : (
                  <>
                    <div className="flex h-24 items-center justify-center bg-[#b3a9ad] text-sm font-medium tracking-wide text-[#eeeeee]">IMAGEM</div>
                    <p className="mt-3 text-left text-sm text-[#909090]">Sem noticia adicional.</p>
                  </>
                )}
              </article>
              <article className="rounded-md border-4 border-[#eeeeee] bg-[#eeeeee] p-4">
                {noticias[2] ? (
                  <Link href={`/noticias/${noticias[2].id}`} className="block">
                    <div className="relative h-24 overflow-hidden bg-[#b3a9ad]">
                      {noticias[2].imagemUrl ? (
                        <Image src={noticias[2].imagemUrl} alt={noticias[2].titulo} fill unoptimized className="object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm font-medium tracking-wide text-[#eeeeee]">IMAGEM</div>
                      )}
                    </div>
                    <p className="mt-3 text-left text-sm font-medium text-[#909090]">{noticias[2].titulo}</p>
                  </Link>
                ) : (
                  <>
                    <div className="flex h-24 items-center justify-center bg-[#b3a9ad] text-sm font-medium tracking-wide text-[#eeeeee]">IMAGEM</div>
                    <p className="mt-3 text-left text-sm text-[#909090]">Sem noticia adicional.</p>
                  </>
                )}
              </article>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/noticias"
              className="rounded-md border border-[#eeeeee] px-6 py-3 text-xs font-medium uppercase tracking-[0.12em] text-[#eeeeee] transition hover:bg-[#9d9d9d]"
            >
              Ver todas as noticias
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

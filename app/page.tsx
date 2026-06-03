import Image from "next/image";
import Link from "next/link";

import Banner from "./components/banner";
import UnavailableState from "./components/unavailable-state";
import { getHomeDatasContent } from "./home-datas/home-datas-data";
import { extractText, resolveMediaUrl } from "./lib/content-utils";
import { normalizeStrapiItem } from "./lib/strapi-normalize";
import { toStrapiUrl } from "./lib/strapi";
import { getNoticiasPageData } from "./noticias/noticias-data";
import PointsIcon from "../public/points.svg";
import BackgroundOndaSuperior from "../public/bgwavetop.svg";
import BackgroundOndaInferior from "../public/bgwavebottom.svg";

interface InscricaoFeiraData {
  imagemEstudanteUrl: string;
  textoInscricao: string;
  linkPlataforma: string;
  dataLimite: string;
  tituloResumo: string;
  textoResumo: string;
  urlVideo: string;
}

type DadoInstitucionalAttributes = {
  imagemEstudanteUrl?: unknown;
  textoInscricao?: unknown;
  linkPlataforma?: unknown;
  dataLimite?: unknown;
  tituloResumo?: unknown;
  textoResumo?: unknown;
  urlVideo?: unknown;
};

type DadoInstitucionalResponse = {
  data?: unknown;
};

async function getDadoInstitucional(): Promise<InscricaoFeiraData | null> {
  try {
    const res = await fetch(toStrapiUrl("/api/dado-institucional?populate=*"), {
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn(
        `Strapi respondeu com ${res.status} ao buscar /api/dado-institucional`,
      );
      return null;
    }

    const json = (await res.json()) as DadoInstitucionalResponse;
    const dados = normalizeStrapiItem<DadoInstitucionalAttributes>(json.data);
    if (!dados) return null;

    const imagemEstudanteUrl = resolveMediaUrl(dados.imagemEstudanteUrl) || "";

    return {
      imagemEstudanteUrl,
      textoInscricao: extractText(dados.textoInscricao),
      linkPlataforma: extractText(dados.linkPlataforma),
      dataLimite: extractText(dados.dataLimite),
      tituloResumo: extractText(dados.tituloResumo),
      textoResumo: extractText(dados.textoResumo),
      urlVideo: extractText(dados.urlVideo),
    };
  } catch (error) {
    console.error("Erro na requisicao do Strapi:", error);
    return null;
  }
}

function getYoutubeEmbedUrl(urlOriginal: string): string {
  try {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = urlOriginal.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }

    return urlOriginal;
  } catch {
    return urlOriginal;
  }
}

export default async function Page() {
  const homeDatas = await getHomeDatasContent();
  const noticiasData = await getNoticiasPageData();
  const noticias = noticiasData.noticias.slice(0, 3);
  const dadosCms = await getDadoInstitucional();
  const videoUrl = dadosCms?.urlVideo
    ? getYoutubeEmbedUrl(dadosCms.urlVideo.trim())
    : "";

  return (
    <>
      <section className="w-full bg-[#909090] px-0 text-center text-[#eeeeee]">
        <Banner />
      </section>

      <div className="relative mx-auto h-16 w-full max-w-[1920px] bg-white md:h-20">
        <div className="absolute left-1/2 top-1/2 h-1 w-32 -translate-x-1/2 -translate-y-1/2 bg-[#95c11f]" />
      </div>

      <section className="w-full bg-white">
        <div className="relative mx-auto w-full max-w-[1920px] overflow-hidden bg-[#223d67] text-white">
          <Image
            src={BackgroundOndaSuperior}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[255px] z-20 h-[160px] w-full max-w-none origin-center -translate-x-1/2 scale-x-[2.65] select-none object-fill sm:top-[310px] sm:h-[190px] md:top-[300px] md:h-[230px] lg:top-[335px] lg:h-[260px]"
            priority
          />
          <Image
            src={BackgroundOndaInferior}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 bottom-0 z-0 h-[58%] w-full max-w-none origin-center -translate-x-1/2 scale-x-[1.45] select-none object-fill md:h-[64%]"
          />

          <div className="relative mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="relative grid grid-cols-1 gap-0 pb-24 md:grid-cols-[1.05fr_0.95fr] md:pb-36">
              <div className="relative z-10 -mx-4 aspect-[4/3] overflow-hidden bg-slate-700 sm:mx-0 md:min-h-[390px]">
                {dadosCms?.imagemEstudanteUrl ? (
                  <Image
                    src={dadosCms.imagemEstudanteUrl}
                    alt="Estudante em atividade laboratorial"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-slate-700 text-sm text-slate-400">
                    Nenhuma imagem cadastrada no Strapi
                  </div>
                )}
              </div>

              <div className="relative z-30 flex flex-col justify-center px-0 py-8 md:px-10 md:py-12">
                <h2 className="text-left text-3xl font-extrabold uppercase leading-tight tracking-tight text-[#95c11f] sm:text-4xl">
                  Fa&ccedil;a sua inscri&ccedil;&atilde;o
                  <br />
                  <span className="text-white">
                    atrav&eacute;s da nossa
                    <br />
                    plataforma digital
                  </span>
                </h2>

                <p className="mt-4 max-w-md font-texto whitespace-pre-line text-justify text-sm leading-relaxed text-slate-200">
                  {dadosCms?.textoInscricao ||
                    "Nenhum texto de inscricao cadastrado."}
                </p>

                {dadosCms?.dataLimite && (
                  <p className="mt-3 text-sm font-semibold tracking-wide">
                    {dadosCms.dataLimite}
                  </p>
                )}

                <div className="mt-6 text-left">
                  <Link
                    href={dadosCms?.linkPlataforma || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-[6px] bg-[#223d67] px-8 py-4 text-xs font-bold uppercase tracking-widest text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-[#2c4a7d]"
                  >
                    Acessar Plataforma
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative z-30 -mt-10 grid grid-cols-1 items-center gap-8 pb-20 md:-mt-16 md:grid-cols-12 md:pb-28">
              <div className="flex items-center justify-between gap-4 md:col-span-5 md:justify-start">
                <h3 className="border-b-4 border-white pb-2 text-3xl font-black uppercase tracking-wide text-white">
                  {dadosCms?.tituloResumo || "Sobre o evento"}
                </h3>
                <svg
                  className="mt-4 hidden h-12 w-12 flex-shrink-0 animate-bounce text-white sm:block"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 13l-5 5m0 0l-5-5m5 5V6"
                  />
                </svg>
              </div>

              <div className="space-y-2 text-justify text-sm leading-relaxed text-white md:col-span-7">
                <p className="text-base font-semibold text-[#95c11f]">
                  SOBRE A NOSSA FEIRA
                </p>
                <p className="whitespace-pre-line font-texto text-slate-200">
                  {dadosCms?.textoResumo ||
                    "Conteudo resumido institucional pendente de publicacao no painel."}
                </p>
              </div>

              <div className="col-span-1 mt-3 md:col-span-12">
                <div className="relative mx-auto aspect-video w-full max-w-4xl overflow-hidden bg-[#1a1a1a] shadow-2xl">
                  {videoUrl ? (
                    <iframe
                      className="absolute inset-0 h-full w-full border-0"
                      src={videoUrl}
                      title="Video de apresentacao da feira"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/60 bg-white/20 text-white backdrop-blur-sm">
                        <svg
                          className="ml-1 h-10 w-10"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 text-center md:py-20">
        <div className="mx-auto w-full max-w-[1320px] px-4 md:px-6">
          <h3 className="text-3xl font-normal tracking-tight md:text-5xl">{homeDatas.tituloSecao}</h3>
          <div className="flex justify-center">
            {homeDatas.isAvailable ? (
              <div className="mr-8 mt-10 grid w-full max-w-5xl grid-flow-col grid-cols-1 overflow-hidden text-white md:grid-cols-[0.75fr_1.25fr]">
                <div className="">
                  {homeDatas.etapas.map((etapa, index) => (
                    <div
                      key={etapa.data}
                      className={`px-6 py-8 text-xl md:text-3xl ${
                        index === 0 ? "mb-14 bg-[#95c11f]" : index === 1 ? "mb-14 bg-[#4085c6]" : "bg-[#223d67]"
                      } [clip-path:polygon(25%_0%,_100%_0%,_100%_100%,_25%_100%,_10%_50%)]`}
                    >
                      {etapa.data}
                    </div>
                  ))}
                </div>
                <div className="">
                  {homeDatas.etapas.map((etapa, index) => (
                    <div
                      key={`${etapa.titulo}-data`}
                      className={`px-12 py-8 text-right text-xl md:text-3xl ${
                        index === 0 ? "mb-14 bg-[#95c11f]" : index === 1 ? "mb-14 bg-[#4085c6]" : "bg-[#223d67]"
                      } [clip-path:polygon(100%_50%,_90%_90%,_80%_90%,_77%_100%,_0%_100%,_0%_0%,_77%_0%,_80%_10%,_90%_10%)]`}
                    >
                      {etapa.titulo}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <UnavailableState
                compact
                title="Datas em atualizacao"
                description="A secao de datas da home ainda nao foi publicada no Strapi."
                detail="Assim que o conteudo for salvo no CMS, a home passara a exibir as datas automaticamente."
              />
            )}
            <Image
              className="mt-12"
              alt="icone"
              src={PointsIcon}
              width={45}
              height={100}
            />
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden bg-[#223d67] py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 z-0">
          <svg
            viewBox="0 0 1921 900"
            preserveAspectRatio="none"
            className="h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="1921" height="900" fill="#223d67" />
            <path
              d="M0,900 L0,620 C220,470 450,520 720,450 C1040,360 1350,430 1600,220 C1740,110 1840,40 1921,0 L1921,900 Z"
              fill="#9ac21c"
            />
          </svg>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1320px] px-4 md:px-6">
          <h3 className="mb-8 text-center text-4xl font-black uppercase tracking-wider text-white sm:mb-28 md:mb-36 md:text-5xl">
            Not&iacute;cias
          </h3>

          {noticiasData.status === "ready" && noticias.length > 0 ? (
            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 sm:gap-y-20 lg:grid-cols-3">
              {noticias.map((noticia) => (
                <Link
                  key={noticia.id}
                  href={`/noticias/${noticia.id}`}
                  className="group flex h-full flex-col transition-all duration-300 hover:-translate-y-2 sm:pt-12"
                >
                  <article className="relative flex h-full w-full flex-grow flex-col overflow-hidden rounded-[24px] bg-[#4a8de6] shadow-[0_15px_35px_rgba(0,0,0,0.35)] sm:overflow-visible sm:rounded-[32px] sm:px-6 sm:pb-8 sm:pt-52 md:pt-56 lg:pt-60">
                    <div
                      className="relative h-64 w-full overflow-hidden bg-slate-700 shadow-md sm:absolute sm:left-6 sm:right-6 sm:top-0 sm:z-20 sm:-mt-28 sm:h-auto sm:w-auto sm:aspect-[4/5] sm:rounded-t-[24px] md:-mt-32"
                      style={{
                        clipPath:
                          "polygon(0% 0%, 100% 0%, 100% 88%, 100% 88%, 90% 100%, 80% 88%, 6% 88%, 1.8% 87%, 0% 84%)",
                      }}
                    >
                      {noticia.imagemUrl ? (
                        <Image
                          src={noticia.imagemUrl}
                          alt={noticia.titulo}
                          fill
                          priority
                          unoptimized
                          className="object-cover transition duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-slate-600 font-bold text-slate-400">
                          SEM IMAGEM
                        </div>
                      )}
                    </div>

                    <div className="flex flex-grow flex-col justify-between p-5 text-left sm:mt-10 sm:p-0">
                      <div>
                        <h4 className="mb-4 w-full font-sans text-xl font-black uppercase leading-tight tracking-wide text-white sm:mb-5 sm:w-5/6 sm:text-2xl">
                          {noticia.titulo}
                        </h4>
                        <p className="line-clamp-6 font-texto text-justify text-sm font-normal leading-relaxed text-blue-50 opacity-90">
                          {noticia.miniDescricao ||
                            "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet."}
                        </p>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-6">
              <UnavailableState
                compact
                title={noticiasData.status === "empty" ? "Nenhuma noticia publicada" : "Noticias indisponiveis"}
                description={
                  noticiasData.status === "empty"
                    ? "Ainda nao existem noticias publicadas no CMS."
                    : "Nao foi possivel carregar as noticias neste momento."
                }
                detail="Assim que houver publicacoes, esta secao sera atualizada automaticamente."
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}


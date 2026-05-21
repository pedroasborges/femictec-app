import Image from "next/image";
import Link from "next/link";

import Banner from "./components/banner";
import { getNoticias } from "./noticias/noticias-data";
import { getProjetos } from "./projetos/projetos-data";
import PointsIcon from "../public/points.svg";

// Importações dos backgrounds orgânicos fornecidos
import BackgroundOndaSuperior from "../public/bgwavetop.svg";
import BackgroundOndaInferior from "../public/bgwavebottom.svg";
import BackgroundOnda from "../public/bgwave.svg";

// 1. Definição da estrutura de campos para o Strapi
interface InscricaoFeiraData {
  // Campos da Seção de Inscrição
  imagemEstudanteUrl: string; // URL da imagem (Media no Strapi)
  textoInscricao: string;     // Texto descritivo (Rich Text ou Text no Strapi)
  linkPlataforma: string;     // URL do botão (Text no Strapi)
  dataLimite: string;         // Data limite (Date ou Text no Strapi)

  // Campos da Seção Resumo da Feira
  tituloResumo: string;       // Título customizado (Text no Strapi)
  textoResumo: string;        // Texto descritivo do resumo (Rich Text ou Text no Strapi)
  urlVideo: string;           // URL do vídeo/embed (Text no Strapi)
}

// Função simulada para buscar os dados do Strapi (substitua pela sua chamada real da API)
async function getDadoInstitucional(): Promise<InscricaoFeiraData> {
  // Retorno temporário (Mock) com dados idênticos aos do layout enviado
  return {
    imagemEstudanteUrl: "/estudante-microscopio.png", // Altere para a rota correta enquanto testa localmente
    textoInscricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
    linkPlataforma: "https://plataforma.suafeira.com.br",
    dataLimite: "Inscrições até 15 de Outubro",
    
    tituloResumo: "Conheça mais sobre o evento",
    textoResumo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    urlVideo: "https://www.youtube.com/embed/exemplo" // Exemplo de URL para o iframe/player
  };
}

export default async function Page() {
  const noticias = (await getNoticias()).slice(0, 3);
  const projetos = (await getProjetos()).slice(0, 6);
  
  // Chamada dos dados dinâmicos do Strapi
  const dadosCms = await getDadoInstitucional();

  return (
    <>
      {/* BANNER */}
      <section className="w-full bg-[#909090] px-0 py-16 text-center text-[#eeeeee] md:py-24 lg:py-0">
        <Banner />
      </section>

      {/* FAIXA BRANCA DE TRANSIÇÃO (Igual ao espaçamento antes do footer) */}
      <div className="w-full h-16 bg-white md:h-24" />

      {/* SEÇÃO INTEGRADA: INSCRIÇÕES E SOBRE A FEIRA */}
      <div className="bg-[#223d67] w-full">

      
        <div className="relative w-full bg-[#223d67]">
          
          {/* VETORES DE FUNDO ORGÂNICOS (SVGs) */}

          {/* CONTEÚDO DA SEÇÃO: CAMADA SUPERIOR */}
          <div className="relative z-10">
            
            {/* BLOCO SUPERIOR: FAÇA SUA INSCRIÇÃO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-8 pb-16 bg-[url('/bgwavetop.svg')] bg-cover">
              
              {/* Lado Esquerdo: Imagem do Estudante (Vinda do Strapi) */}
              <div className="relative w-full aspect-[4/3] rounded-tl-[40px] rounded-br-[40px] overflow-hidden shadow-xl border-4 border-white/10">
                {dadosCms.imagemEstudanteUrl ? (
                  <Image
                    src={dadosCms.imagemEstudanteUrl}
                    alt="Estudante em atividade laboratorial"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-slate-700 text-slate-400">
                    Carregando imagem do Strapi...
                  </div>
                )}
              </div>

              {/* Lado Direito: Conteúdo da Inscrição */}
              <div className="flex flex-col justify-center text-white pt-4 md:pt-0 ">
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-left leading-tight text-[#95c11f] uppercase">
                  Faça sua inscrição<br />
                  <span className="text-white">através da nossa<br />plataforma digital</span>
                </h2>
                
                {/* Texto descritivo do Strapi */}
                <p className="mt-4 text-sm leading-relaxed text-slate-200 text-justify max-w-md whitespace-pre-line">
                  {dadosCms.textoInscricao}
                </p>

                {/* Data Limite do Strapi */}
                {dadosCms.dataLimite && (
                  <p className="mt-3 text-sm font-semibold tracking-wide text-[#95c11f]">
                    {dadosCms.dataLimite}
                  </p>
                )}

                {/* Botão com link do Strapi */}
                <div className="mt-6 text-left">
                  <Link
                    href={dadosCms.linkPlataforma || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#223d67] border-2 border-white/20 hover:border-white text-white text-xs font-bold tracking-widest uppercase px-8 py-4 rounded-md shadow-lg transition duration-300 transform hover:-translate-y-0.5"
                  >
                    Acessar Plataforma
                  </Link>
                </div>
              </div>
            </div>

          {/* BLOCO INFERIOR: SOBRE A NOSSA FEIRA */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-12 bg-[url('/bgwavebottom.svg')] bg-cover">
              
              {/* Título Lateral Dinâmico */}
              <div className="md:col-span-5 flex items-center justify-between md:justify-start gap-4">
                <h3 className="text-3xl font-black tracking-wide text-white uppercase border-b-4 border-white pb-2 whitespace-pre-line">
                  {dadosCms.tituloResumo}
                </h3>
                <svg 
                  className="w-12 h-12 text-white animate-bounce mt-4 hidden sm:block flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6"></path>
                </svg>
              </div>

              {/* Resumo da Feira Dinâmico */}
              <div className="md:col-span-7 text-white text-sm leading-relaxed text-justify space-y-2">
                <p className="font-semibold text-[#95c11f] text-base">SOBRE A NOSSA FEIRA</p>
                <p className="text-slate-200 whitespace-pre-line">
                  {dadosCms.textoResumo}
                </p>
              </div>

              {/* Player de Vídeo Dinâmico */}
              <div className="col-span-1 md:col-span-12 mt-8">
                <div className="relative mx-auto w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-[#1a1a1a] shadow-2xl border-4 border-slate-800">
                  {dadosCms.urlVideo ? (
                    /* Iframe preparado para receber embeds (YouTube/Vimeo) de forma responsiva */
                    <iframe
                      className="w-full h-full"
                      src={dadosCms.urlVideo}
                      title="Vídeo de apresentação da feira"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/60 text-white">
                        <svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 24 24">
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
        </div>
      {/* DATAS */}
      <section className="w-full py-16 text-center md:py-20">
        <div className="mx-auto w-full max-w-[1320px] px-4 md:px-6">
          <h3 className="text-3xl font-normal tracking-tight md:text-5xl">CONFIRA AS DATAS</h3>

          <div className="flex justify-center">
            <div className="mr-8 text-white mt-10 grid max-w-5xl grid-cols-1 overflow-hidden md:grid-cols-[0.75fr_1.25fr] w-full grid-flow-col">
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
        </div>
      </section>

      {/* PROJETOS */}
      {/* Comentado porque não aparece no layout atual, mas está funcional
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
      */}  
      {/* NOTÍCIAS */}
      <section className="relative w-full overflow-hidden py-24 bg-[#223d67]">
        {/* SVG FUNDO */}
        <div className="absolute inset-0 z-0 pointer-events-none">
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
          <h3 className="mb-36 text-center text-4xl font-black uppercase tracking-wider text-white md:text-5xl">
            Notícias
          </h3>

          {noticias.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {noticias.map((noticia) => (
                <Link 
                  key={noticia.id} 
                  href={`/noticias/${noticia.id}`}
                  className="group relative flex flex-col pt-12 transition-all duration-300 hover:-translate-y-2"
                >
                  {/* O CARD AZUL (pt-14 expande o topo para acomodar a imagem que estrapolou) */}
                  <article className="relative w-full bg-[#4a8de6] rounded-[32px] pt-60 px-6 pb-8 shadow-[0_15px_35px_rgba(0,0,0,0.35)] flex flex-col flex-grow">
                    
                    {/* CONTAINER DA IMAGEM ESTRAPOLANDO COM QUINAS ARREDONDADAS */}
                    <div 
                      className="absolute top-0 left-6 right-6 -mt-32 aspect-[4/5] rounded-t-[24px] overflow-hidden z-20 shadow-md bg-slate-700"
                      style={{
                        // Adicionamos pontos extras no início e no fim para simular o arredondamento de 24px (~6%) na quina inferior esquerda
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 88%, 100% 88%, 90% 100%, 80% 88%, 6% 88%, 1.8% 86.8%, 0% 84%)"
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
                          sizes="(max-width:768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-slate-600 text-slate-400 font-bold">
                          SEM IMAGEM
                        </div>
                      )}
                    </div>

                    {/* CONTEÚDO DO TEXTO */}
                    <div className="mt-10 flex flex-col flex-grow justify-between text-left">
                      <div>
                        {/* Título */}
                        <h4 className="mb-5 text-2xl font-black uppercase tracking-wide leading-tight text-white font-sans  w-5/6">
                          {noticia.titulo}
                        </h4>

                        {/* Descrição */}
                        <p className="line-clamp-6 text-sm font-normal leading-relaxed text-blue-50 text-justify opacity-90">
                          {noticia.miniDescricao || "Lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet."}
                        </p>
                      </div>
                    </div>

                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-white text-lg font-medium py-12">
              Nenhuma notícia publicada no momento.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
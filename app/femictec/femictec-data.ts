import { extractText, resolveMediaUrl } from "../lib/content-utils";
import {
  normalizeStrapiList,
  normalizeStrapiRoot,
  pickStrapiSection,
} from "../lib/strapi-normalize";
import { fetchStrapiJson } from "../lib/strapi";

type UnknownRecord = Record<string, unknown>;

type Parceiro = {
  nome: string;
  logoUrl: string | null;
  siteUrl: string;
};

type EdicaoCard = {
  titulo: string;
  subtitulo: string;
  imagemUrl: string | null;
};

type TabelaHistorico = {
  label: string;
  valor: string;
};

type FemictecStats = {
  totalProjects: number;
  totalSchools: number;
  totalParticipants: number;
  totalAreas: number;
};

export type FemictecContent = {
  menuItemInicioLabel: string;
  menuItemQuemRealizaLabel: string;
  menuItemHistoricoLabel: string;
  tituloPrincipal: string;
  subtituloPrincipal: string;

  bannerTitulo: string;
  bannerDestaque: string;
  bannerImagemUrl: string | null;

  oQueTitulo: string;
  oQueDescricao: string;
  missaoTitulo: string;
  missaoDescricao: string;
  missaoDestaque: string;
  impactoTitulo: string;
  impactoDescricao: string;

  estandesTitulo: string;
  estandesSubtitulo: string;
  estandesImagemUrl: string | null;
  estandesImagemAlt: string;

  quemRealizaTitulo: string;
  organizacaoTitulo: string;
  organizacaoDescricao: string;
  comissaoTitulo: string;
  comissaoDescricao: string;
  imagemEntradaUrl: string | null;
  imagemEntradaAlt: string;
  imagemEntradaLabel: string;
  parceirosTitulo: string;
  parceiros: Parceiro[];

  historicoTitulo: string;
  historicoDescricao: string;
  trajetoriaTitulo: string;
  trajetoriaSubtitulo: string;
  trajetoriaImagemUrl: string | null;
  trajetoriaImagemAlt: string;
  edicoesCards: EdicaoCard[];
  galeriaLabel: string;
  galeriaUrl: string;
  historicoTabelaTitulo: string;
  historicoTabelaLinhas: TabelaHistorico[];
};

const fallbackContent: FemictecContent = {
  menuItemInicioLabel: "Apresentacao",
  menuItemQuemRealizaLabel: "Quem Realiza",
  menuItemHistoricoLabel: "Historico",
  tituloPrincipal: "XII FEMICTEC",
  subtituloPrincipal: "Feira Municipal de Iniciacao Cientifica e Tecnologica",

  bannerTitulo: "Banner",
  bannerDestaque: "Comunicacao",
  bannerImagemUrl: null,

  oQueTitulo: "O que e a FEMICTEC",
  oQueDescricao:
    "A FEMICTEC e uma iniciativa de promocao da educacao cientifica e tecnologica, aproximando estudantes, professores e comunidade.",
  missaoTitulo: "Nossa Missao",
  missaoDescricao:
    "Fortalecer o protagonismo estudantil, estimular pensamento critico e gerar impacto social por meio de projetos e solucoes reais.",
  missaoDestaque: "Educar, inovar e transformar.",
  impactoTitulo: "Como Impactamos",
  impactoDescricao:
    "Conectamos redes de ensino, incentivamos pesquisa aplicada e criamos oportunidades de troca entre diferentes territorios e instituicoes.",

  estandesTitulo: "Imagens dos estandes",
  estandesSubtitulo: "Com os alunos",
  estandesImagemUrl: null,
  estandesImagemAlt: "Estandes da FEMICTEC",

  quemRealizaTitulo: "Quem Realiza",
  organizacaoTitulo: "Organizacao",
  organizacaoDescricao:
    "A FEMICTEC e organizada em parceria entre o poder publico, equipes pedagogicas e coordenações territoriais.",
  comissaoTitulo: "Comissao Organizadora",
  comissaoDescricao:
    "Uma comissao multidisciplinar planeja a curadoria, a logistica e a avaliacao tecnica das atividades da feira.",
  imagemEntradaUrl: null,
  imagemEntradaAlt: "Imagem de entrada da feira",
  imagemEntradaLabel: "Comunicacao",
  parceirosTitulo: "Parceiros Institucionais",
  parceiros: [
    { nome: "Parceiro 1", logoUrl: null, siteUrl: "#" },
    { nome: "Parceiro 2", logoUrl: null, siteUrl: "#" },
    { nome: "Parceiro 3", logoUrl: null, siteUrl: "#" },
    { nome: "Parceiro 4", logoUrl: null, siteUrl: "#" },
  ],

  historicoTitulo: "Historico",
  historicoDescricao:
    "A trajetoria da FEMICTEC registra evolucao anual, ampliando participantes, projetos e impacto educacional no territorio.",
  trajetoriaTitulo: "Trajetoria",
  trajetoriaSubtitulo: "Imagens historicas da FEMICTEC",
  trajetoriaImagemUrl: null,
  trajetoriaImagemAlt: "Trajetoria da FEMICTEC",
  edicoesCards: [
    { titulo: "Imagem da edicao de 2022", subtitulo: "Comunicacao", imagemUrl: null },
    { titulo: "Imagem da edicao de 2023", subtitulo: "Comunicacao", imagemUrl: null },
    { titulo: "Imagem da edicao de 2024", subtitulo: "Comunicacao", imagemUrl: null },
    { titulo: "Imagem da edicao de 2025", subtitulo: "Comunicacao", imagemUrl: null },
  ],
  galeriaLabel: "Abrir galeria",
  galeriaUrl: "/galeria",
  historicoTabelaTitulo: "Tabela com dados historicos especificos",
  historicoTabelaLinhas: [
    { label: "Projetos apresentados", valor: "120" },
    { label: "Escolas participantes", valor: "32" },
    { label: "Municipios envolvidos", valor: "14" },
  ],
};

function pickFirstDefined(...values: unknown[]): unknown {
  for (const value of values) {
    if (value !== undefined && value !== null) return value;
  }
  return undefined;
}

function mapParceiros(items: UnknownRecord[]): Parceiro[] {
  const mapped = items
    .map((item, index) => {
      const nome = extractText(item.nome) || `Parceiro ${index + 1}`;
      const siteUrl = extractText(item.siteUrl) || "#";
      const logoUrl = resolveMediaUrl(item.logo);
      return { nome, siteUrl, logoUrl };
    })
    .filter((item) => item.nome.length > 0);

  return mapped.length ? mapped : fallbackContent.parceiros;
}

function mapEdicoes(items: UnknownRecord[]): EdicaoCard[] {
  const mapped = items
    .map((item, index) => {
      const titulo = extractText(item.titulo) || `Imagem da edicao ${index + 1}`;
      const subtitulo = extractText(item.subtitulo) || "Comunicacao";
      const imagemUrl = resolveMediaUrl(item.imagem);
      return { titulo, subtitulo, imagemUrl };
    })
    .filter((item) => item.titulo.length > 0);

  return mapped.length ? mapped : fallbackContent.edicoesCards;
}

function mapTabela(items: UnknownRecord[]): TabelaHistorico[] {
  const mapped = items
    .map((item) => {
      const label = extractText(item.label);
      const valor = extractText(item.valor);
      if (!label && !valor) return null;
      return { label: label || "Dado", valor: valor || "-" };
    })
    .filter((item): item is TabelaHistorico => item !== null);

  return mapped.length ? mapped : fallbackContent.historicoTabelaLinhas;
}

async function fetchFemictecPayload(): Promise<unknown | null> {
  const customPath = process.env.STRAPI_FEMICTEC_PATH?.trim();
  const deepPopulateQuery =
    "populate[menuInterno][populate]=*" +
    "&populate[apresentacao][populate][estandesImagem][populate]=*" +
    "&populate[apresentacao][populate][bannerImagem][populate]=*" +
    "&populate[quemRealiza][populate][imagemEntrada][populate]=*" +
    "&populate[quemRealiza][populate][parceiros][populate][logo][populate]=*" +
    "&populate[historico][populate][trajetoriaImagem][populate]=*" +
    "&populate[historico][populate][edicoesCards][populate][imagem][populate]=*" +
    "&populate[historico][populate][historicoTabelaLinhas][populate]=*";

  const endpoints = [
    ...(customPath ? [`${customPath}${customPath.includes("?") ? "&" : "?"}${deepPopulateQuery}`] : []),
    ...(customPath ? [customPath.includes("?") ? customPath : `${customPath}?populate=deep,5`] : []),
    `/api/femictec?${deepPopulateQuery}`,
    "/api/femictec?populate=deep,5",
    "/api/femictec?populate=*",
    `/api/femictecs?${deepPopulateQuery}`,
    "/api/femictecs?populate=deep,5",
    "/api/femictecs?populate=*",
    `/api/femictec-pagina?${deepPopulateQuery}`,
    "/api/femictec-pagina?populate=deep,5",
    "/api/femictec-pagina?populate=*",
    `/api/pagina-femictec?${deepPopulateQuery}`,
    "/api/pagina-femictec?populate=deep,5",
    "/api/pagina-femictec?populate=*",
    `/api/a-femictec?${deepPopulateQuery}`,
    "/api/a-femictec?populate=deep,5",
    "/api/a-femictec?populate=*",
    `/api/a-femictecs?${deepPopulateQuery}`,
    "/api/a-femictecs?populate=deep,5",
    "/api/a-femictecs?populate=*",
  ];

  for (const endpoint of endpoints) {
    const payload = await fetchStrapiJson<unknown | null>(endpoint, null);
    if (payload) return payload;
  }

  return null;
}

async function fetchFemictecStats(): Promise<FemictecStats | null> {
  const payload = await fetchStrapiJson<unknown | null>("/api/public/femictec/stats", null);
  const data = normalizeStrapiRoot<UnknownRecord>(payload);
  if (!data) return null;

  const totalProjects = Number(data.totalProjects);
  const totalSchools = Number(data.totalSchools);
  const totalParticipants = Number(data.totalParticipants);
  const totalAreas = Number(data.totalAreas);

  if (
    !Number.isFinite(totalProjects) ||
    !Number.isFinite(totalSchools) ||
    !Number.isFinite(totalParticipants) ||
    !Number.isFinite(totalAreas)
  ) {
    return null;
  }

  return {
    totalProjects: Math.max(0, totalProjects),
    totalSchools: Math.max(0, totalSchools),
    totalParticipants: Math.max(0, totalParticipants),
    totalAreas: Math.max(0, totalAreas),
  };
}

export async function getFemictecContent(): Promise<FemictecContent> {
  const payload = await fetchFemictecPayload();
  const stats = await fetchFemictecStats();
  const source = normalizeStrapiRoot<UnknownRecord>(payload);

  if (!source) return fallbackContent;

  // Cada secao pode vir de um bloco diferente no Strapi; este helper procura
  // os nomes mais provaveis e cai no objeto raiz se nenhuma variante existir.
  const menu = pickStrapiSection<UnknownRecord>(source, ["menuInterno", "menu"]);
  const apresentacao = pickStrapiSection<UnknownRecord>(source, ["apresentacao", "secaoApresentacao", "paginaApresentacao"]);
  const quemRealiza = pickStrapiSection<UnknownRecord>(source, ["quemRealiza", "secaoQuemRealiza", "paginaQuemRealiza"]);
  const historico = pickStrapiSection<UnknownRecord>(source, ["historico", "secaoHistorico", "paginaHistorico"]);

  return {
    menuItemInicioLabel: extractText(pickFirstDefined(menu.menuItemInicioLabel, source.menuItemInicioLabel)) || fallbackContent.menuItemInicioLabel,
    menuItemQuemRealizaLabel:
      extractText(pickFirstDefined(menu.menuItemQuemRealizaLabel, source.menuItemQuemRealizaLabel)) || fallbackContent.menuItemQuemRealizaLabel,
    menuItemHistoricoLabel:
      extractText(pickFirstDefined(menu.menuItemHistoricoLabel, source.menuItemHistoricoLabel)) || fallbackContent.menuItemHistoricoLabel,
    tituloPrincipal: extractText(pickFirstDefined(apresentacao.tituloPrincipal, source.tituloPrincipal)) || fallbackContent.tituloPrincipal,
    subtituloPrincipal:
      extractText(pickFirstDefined(apresentacao.subtituloPrincipal, source.subtituloPrincipal)) || fallbackContent.subtituloPrincipal,

    bannerTitulo: extractText(pickFirstDefined(apresentacao.bannerTitulo, source.bannerTitulo)) || fallbackContent.bannerTitulo,
    bannerDestaque: extractText(pickFirstDefined(apresentacao.bannerDestaque, source.bannerDestaque)) || fallbackContent.bannerDestaque,
    bannerImagemUrl: resolveMediaUrl(pickFirstDefined(apresentacao.bannerImagem, source.bannerImagem)),

    oQueTitulo: extractText(pickFirstDefined(apresentacao.oQueTitulo, source.oQueTitulo)) || fallbackContent.oQueTitulo,
    oQueDescricao: extractText(pickFirstDefined(apresentacao.oQueDescricao, source.oQueDescricao)) || fallbackContent.oQueDescricao,
    missaoTitulo: extractText(pickFirstDefined(apresentacao.missaoTitulo, source.missaoTitulo)) || fallbackContent.missaoTitulo,
    missaoDescricao: extractText(pickFirstDefined(apresentacao.missaoDescricao, source.missaoDescricao)) || fallbackContent.missaoDescricao,
    missaoDestaque: extractText(pickFirstDefined(apresentacao.missaoDestaque, source.missaoDestaque)) || fallbackContent.missaoDestaque,
    impactoTitulo: extractText(pickFirstDefined(apresentacao.impactoTitulo, source.impactoTitulo)) || fallbackContent.impactoTitulo,
    impactoDescricao: extractText(pickFirstDefined(apresentacao.impactoDescricao, source.impactoDescricao)) || fallbackContent.impactoDescricao,

    estandesTitulo: extractText(pickFirstDefined(apresentacao.estandesTitulo, source.estandesTitulo)) || fallbackContent.estandesTitulo,
    estandesSubtitulo: extractText(pickFirstDefined(apresentacao.estandesSubtitulo, source.estandesSubtitulo)) || fallbackContent.estandesSubtitulo,
    estandesImagemUrl: resolveMediaUrl(pickFirstDefined(apresentacao.estandesImagem, source.estandesImagem)),
    estandesImagemAlt:
      extractText(pickFirstDefined(apresentacao.estandesImagemAlt, source.estandesImagemAlt)) || fallbackContent.estandesImagemAlt,

    quemRealizaTitulo: extractText(pickFirstDefined(quemRealiza.quemRealizaTitulo, source.quemRealizaTitulo)) || fallbackContent.quemRealizaTitulo,
    organizacaoTitulo: extractText(pickFirstDefined(quemRealiza.organizacaoTitulo, source.organizacaoTitulo)) || fallbackContent.organizacaoTitulo,
    organizacaoDescricao:
      extractText(pickFirstDefined(quemRealiza.organizacaoDescricao, source.organizacaoDescricao)) || fallbackContent.organizacaoDescricao,
    comissaoTitulo: extractText(pickFirstDefined(quemRealiza.comissaoTitulo, source.comissaoTitulo)) || fallbackContent.comissaoTitulo,
    comissaoDescricao: extractText(pickFirstDefined(quemRealiza.comissaoDescricao, source.comissaoDescricao)) || fallbackContent.comissaoDescricao,
    imagemEntradaUrl: resolveMediaUrl(pickFirstDefined(quemRealiza.imagemEntrada, source.imagemEntrada)),
    imagemEntradaAlt:
      extractText(pickFirstDefined(quemRealiza.imagemEntradaAlt, source.imagemEntradaAlt)) || fallbackContent.imagemEntradaAlt,
    imagemEntradaLabel:
      extractText(pickFirstDefined(quemRealiza.imagemEntradaLabel, source.imagemEntradaLabel)) || fallbackContent.imagemEntradaLabel,
    parceirosTitulo: extractText(pickFirstDefined(quemRealiza.parceirosTitulo, source.parceirosTitulo)) || fallbackContent.parceirosTitulo,
    parceiros: mapParceiros(normalizeStrapiList<UnknownRecord>(pickFirstDefined(quemRealiza.parceiros, source.parceiros))),

    historicoTitulo: extractText(pickFirstDefined(historico.historicoTitulo, source.historicoTitulo)) || fallbackContent.historicoTitulo,
    historicoDescricao: extractText(pickFirstDefined(historico.historicoDescricao, source.historicoDescricao)) || fallbackContent.historicoDescricao,
    trajetoriaTitulo: extractText(pickFirstDefined(historico.trajetoriaTitulo, source.trajetoriaTitulo)) || fallbackContent.trajetoriaTitulo,
    trajetoriaSubtitulo:
      extractText(pickFirstDefined(historico.trajetoriaSubtitulo, source.trajetoriaSubtitulo)) || fallbackContent.trajetoriaSubtitulo,
    trajetoriaImagemUrl: resolveMediaUrl(pickFirstDefined(historico.trajetoriaImagem, source.trajetoriaImagem)),
    trajetoriaImagemAlt:
      extractText(pickFirstDefined(historico.trajetoriaImagemAlt, source.trajetoriaImagemAlt)) || fallbackContent.trajetoriaImagemAlt,
    edicoesCards: mapEdicoes(normalizeStrapiList<UnknownRecord>(pickFirstDefined(historico.edicoesCards, source.edicoesCards))),
    galeriaLabel: extractText(pickFirstDefined(historico.galeriaLabel, source.galeriaLabel)) || fallbackContent.galeriaLabel,
    galeriaUrl: extractText(pickFirstDefined(historico.galeriaUrl, source.galeriaUrl)) || fallbackContent.galeriaUrl,
    historicoTabelaTitulo:
      extractText(pickFirstDefined(historico.historicoTabelaTitulo, source.historicoTabelaTitulo)) || fallbackContent.historicoTabelaTitulo,
    historicoTabelaLinhas:
      stats != null
        ? [
            { label: "Projetos apresentados", valor: String(stats.totalProjects) },
            { label: "Escolas participantes", valor: String(stats.totalSchools) },
            { label: "Participantes", valor: String(stats.totalParticipants) },
            { label: "Areas", valor: String(stats.totalAreas) },
          ]
        : mapTabela(normalizeStrapiList<UnknownRecord>(pickFirstDefined(historico.historicoTabelaLinhas, source.historicoTabelaLinhas))),
  };
}

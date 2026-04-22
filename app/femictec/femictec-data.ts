import { extractText, resolveMediaUrl } from "../lib/content-utils";
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

export type FemictecContent = {
  menuItemInicioLabel: string;
  menuItemQuemRealizaLabel: string;
  menuItemHistoricoLabel: string;

  bannerTitulo: string;
  bannerDestaque: string;

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

  bannerTitulo: "Banner",
  bannerDestaque: "Comunicacao",

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
  galeriaUrl: "#",
  historicoTabelaTitulo: "Tabela com dados historicos especificos",
  historicoTabelaLinhas: [
    { label: "Projetos apresentados", valor: "120" },
    { label: "Escolas participantes", valor: "32" },
    { label: "Municipios envolvidos", valor: "14" },
  ],
};

function asRecord(value: unknown): UnknownRecord | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as UnknownRecord;
}

function normalizeItem(value: unknown): UnknownRecord | null {
  const record = asRecord(value);
  if (!record) return null;

  const attributes = asRecord(record.attributes);
  return attributes ? { ...record, ...attributes } : record;
}

function normalizeRoot(payload: unknown): UnknownRecord | null {
  const record = asRecord(payload);
  if (!record) return null;

  if (record.data !== undefined) {
    return normalizeItem(record.data);
  }

  return normalizeItem(record);
}

function toList(value: unknown): UnknownRecord[] {
  if (Array.isArray(value)) {
    return value.map(normalizeItem).filter((item): item is UnknownRecord => item !== null);
  }

  const record = asRecord(value);
  if (!record) return [];

  if (Array.isArray(record.data)) {
    return record.data.map(normalizeItem).filter((item): item is UnknownRecord => item !== null);
  }

  const single = normalizeItem(record.data);
  return single ? [single] : [];
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
  const endpoints = [
    "/api/femictec?populate=deep,5",
    "/api/femictec?populate=*",
    "/api/a-femictec?populate=deep,5",
    "/api/a-femictec?populate=*",
  ];

  for (const endpoint of endpoints) {
    const payload = await fetchStrapiJson<unknown | null>(endpoint, null);
    if (payload) return payload;
  }

  return null;
}

export async function getFemictecContent(): Promise<FemictecContent> {
  const payload = await fetchFemictecPayload();
  const source = normalizeRoot(payload);

  if (!source) return fallbackContent;

  return {
    menuItemInicioLabel: extractText(source.menuItemInicioLabel) || fallbackContent.menuItemInicioLabel,
    menuItemQuemRealizaLabel: extractText(source.menuItemQuemRealizaLabel) || fallbackContent.menuItemQuemRealizaLabel,
    menuItemHistoricoLabel: extractText(source.menuItemHistoricoLabel) || fallbackContent.menuItemHistoricoLabel,

    bannerTitulo: extractText(source.bannerTitulo) || fallbackContent.bannerTitulo,
    bannerDestaque: extractText(source.bannerDestaque) || fallbackContent.bannerDestaque,

    oQueTitulo: extractText(source.oQueTitulo) || fallbackContent.oQueTitulo,
    oQueDescricao: extractText(source.oQueDescricao) || fallbackContent.oQueDescricao,
    missaoTitulo: extractText(source.missaoTitulo) || fallbackContent.missaoTitulo,
    missaoDescricao: extractText(source.missaoDescricao) || fallbackContent.missaoDescricao,
    missaoDestaque: extractText(source.missaoDestaque) || fallbackContent.missaoDestaque,
    impactoTitulo: extractText(source.impactoTitulo) || fallbackContent.impactoTitulo,
    impactoDescricao: extractText(source.impactoDescricao) || fallbackContent.impactoDescricao,

    estandesTitulo: extractText(source.estandesTitulo) || fallbackContent.estandesTitulo,
    estandesSubtitulo: extractText(source.estandesSubtitulo) || fallbackContent.estandesSubtitulo,
    estandesImagemUrl: resolveMediaUrl(source.estandesImagem),
    estandesImagemAlt: extractText(source.estandesImagemAlt) || fallbackContent.estandesImagemAlt,

    quemRealizaTitulo: extractText(source.quemRealizaTitulo) || fallbackContent.quemRealizaTitulo,
    organizacaoTitulo: extractText(source.organizacaoTitulo) || fallbackContent.organizacaoTitulo,
    organizacaoDescricao: extractText(source.organizacaoDescricao) || fallbackContent.organizacaoDescricao,
    comissaoTitulo: extractText(source.comissaoTitulo) || fallbackContent.comissaoTitulo,
    comissaoDescricao: extractText(source.comissaoDescricao) || fallbackContent.comissaoDescricao,
    imagemEntradaUrl: resolveMediaUrl(source.imagemEntrada),
    imagemEntradaAlt: extractText(source.imagemEntradaAlt) || fallbackContent.imagemEntradaAlt,
    imagemEntradaLabel: extractText(source.imagemEntradaLabel) || fallbackContent.imagemEntradaLabel,
    parceirosTitulo: extractText(source.parceirosTitulo) || fallbackContent.parceirosTitulo,
    parceiros: mapParceiros(toList(source.parceiros)),

    historicoTitulo: extractText(source.historicoTitulo) || fallbackContent.historicoTitulo,
    historicoDescricao: extractText(source.historicoDescricao) || fallbackContent.historicoDescricao,
    trajetoriaTitulo: extractText(source.trajetoriaTitulo) || fallbackContent.trajetoriaTitulo,
    trajetoriaSubtitulo: extractText(source.trajetoriaSubtitulo) || fallbackContent.trajetoriaSubtitulo,
    trajetoriaImagemUrl: resolveMediaUrl(source.trajetoriaImagem),
    trajetoriaImagemAlt: extractText(source.trajetoriaImagemAlt) || fallbackContent.trajetoriaImagemAlt,
    edicoesCards: mapEdicoes(toList(source.edicoesCards)),
    galeriaLabel: extractText(source.galeriaLabel) || fallbackContent.galeriaLabel,
    galeriaUrl: extractText(source.galeriaUrl) || fallbackContent.galeriaUrl,
    historicoTabelaTitulo: extractText(source.historicoTabelaTitulo) || fallbackContent.historicoTabelaTitulo,
    historicoTabelaLinhas: mapTabela(toList(source.historicoTabelaLinhas)),
  };
}


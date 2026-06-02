import UnavailableState from "../components/unavailable-state";
import { getLocalizacaoContent, sanitizeCoordinates } from "./localizacao-data";

export default async function LocalizacaoPage() {
  const content = await getLocalizacaoContent();
  if (!content.isAvailable) {
    return (
      <UnavailableState
        title="Localizacao indisponivel"
        description="As informacoes de localizacao ainda nao foram publicadas no CMS ou estao temporariamente indisponiveis."
        detail="Quando houver conteudo no Strapi, o mapa e os dados do endereco serao exibidos normalmente."
        actionHref="/"
        actionLabel="Voltar para a home"
      />
    );
  }
  const coordinates = sanitizeCoordinates(content.coordenadas);
  const mapsLink = `https://www.google.com/maps?q=${coordinates}`;
  const mapsEmbed = `https://www.google.com/maps?q=${coordinates}&z=16&output=embed`;

  return (
    <section className="bg-white px-4 py-10 text-[#223d67] md:px-6 md:py-14">
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="text-center text-3xl font-black uppercase tracking-[0.04em] md:text-4xl">{content.titulo}</h1>
        <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-7 text-[#223d67]/75 md:text-base">{content.descricao}</p>
        <p className="mt-6 text-center text-sm font-bold text-[#223d67]">{content.endereco}</p>
        <div className="mt-8 overflow-hidden border border-[#223d67]/25">
          <iframe
            title="Mapa de localizacao FEMICTEC"
            src={mapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[420px] w-full"
          />
        </div>
        <div className="mt-5 text-center">
          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex bg-[#223d67] px-6 py-3 text-xs font-black uppercase tracking-[0.1em] text-white transition hover:bg-[#4085c6]"
          >
            Abrir no Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}

import EventosListClient from "./eventos-list-client";
import UnavailableState from "../components/unavailable-state";
import { getEventosDaFeira } from "./events-data";

export default async function EventosDaFeiraPage() {
  const eventos = await getEventosDaFeira();

  if (eventos.length === 0) {
    return (
      <UnavailableState
        title="Eventos indisponiveis"
        description="Nao ha eventos da feira publicados no CMS no momento."
        detail="Quando houver novas publicacoes, a lista sera preenchida automaticamente."
        actionHref="/"
        actionLabel="Voltar para a home"
      />
    );
  }

  return (
    <>
      <div className="mx-auto w-full max-w-[1320px] py-6 px-4 md:px-6">
        <h1 className="mb-10 text-center text-4xl font-light tracking-tight md:text-5xl">LISTA DE EVENTOS</h1>
        <EventosListClient eventos={eventos} />
      </div>
    </>
  );
}

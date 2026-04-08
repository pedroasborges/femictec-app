import EventosListClient from "./eventos-list-client";
import { getEventosDaFeira } from "./events-data";

export default async function EventosDaFeiraPage() {
  const eventos = await getEventosDaFeira();

  return (
    <main className="bg-[#eeeeee] py-10 text-[#909090] md:py-14">
      <div className="mx-auto w-full max-w-[1320px] px-4 md:px-6">
        <h1 className="mb-10 text-center text-4xl font-light tracking-tight md:text-5xl">LISTA DE EVENTOS</h1>
        <EventosListClient eventos={eventos} />
      </div>
    </main>
  );
}

import { getFeiraContent } from "../feira-data";

export default async function FeiraProgramacaoPage() {
  const content = await getFeiraContent({ useEventosFallback: true });

  return (
    <>
      <section className="px-4 py-8 text-center md:px-8 md:py-10">
        <h1 className="text-3xl font-black uppercase tracking-[0.04em] text-[#223d67] md:text-4xl">{content.programacaoTitulo}</h1>
      </section>

      <section className="px-4 pb-10 md:px-8 md:pb-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {content.programacaoDias.map((coluna, colunaIndex) => (
            <article key={coluna.dia + coluna.data} className="rounded-sm border border-[#223d67] bg-white p-3">
              <header className="rounded-sm bg-[#223d67] px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.1em] text-[#eeeeee]">
                {coluna.data}
              </header>
              <div className="px-2 py-3 text-center text-[#223d67]">
                <h2 className="text-lg font-black">{coluna.dia}</h2>
              </div>

              <div className="space-y-3">
                {coluna.atividades.map((atividade, atividadeIndex) => {
                  const cardColor = (colunaIndex + atividadeIndex) % 2 === 0 ? "bg-[#95c11f]" : "bg-[#4085c6]";
                  return (
                  <div key={`${coluna.dia}-${atividade.horario}-${atividade.titulo}`} className={`rounded-sm p-3 text-[#eeeeee] ${cardColor}`}>
                    <p className="text-xs font-semibold uppercase tracking-[0.08em]">{atividade.horario}</p>
                    <p className="mt-1 text-sm">{atividade.titulo}</p>
                  </div>
                )})}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

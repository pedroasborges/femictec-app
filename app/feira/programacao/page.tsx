import { getFeiraContent } from "../feira-data";

export default async function FeiraProgramacaoPage() {
  const content = await getFeiraContent();

  return (
    <>
      <section className="px-4 py-8 text-center md:px-8 md:py-10">
        <h1 className="text-3xl font-light uppercase tracking-wide text-[#8c8288] md:text-4xl">{content.programacaoTitulo}</h1>
      </section>

      <section className="px-4 pb-10 md:px-8 md:pb-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {content.programacaoDias.map((coluna) => (
            <article key={coluna.dia + coluna.data} className="rounded-sm border border-[#a79ea3] bg-[#e2dde0] p-3">
              <header className="rounded-sm bg-[#948b90] px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.1em] text-[#eeeeee]">
                {coluna.data}
              </header>
              <div className="px-2 py-3 text-center text-[#897f85]">
                <h2 className="text-lg font-normal">{coluna.dia}</h2>
              </div>

              <div className="space-y-3">
                {coluna.atividades.map((atividade) => (
                  <div key={`${coluna.dia}-${atividade.horario}-${atividade.titulo}`} className="rounded-sm bg-[#938a8f] p-3 text-[#eeeeee]">
                    <p className="text-xs font-semibold uppercase tracking-[0.08em]">{atividade.horario}</p>
                    <p className="mt-1 text-sm">{atividade.titulo}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

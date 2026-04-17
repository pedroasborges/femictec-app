import { getFeiraContent } from "../feira-data";

export default async function FeiraCronogramaPage() {
  const content = await getFeiraContent();

  return (
    <>
      <section className="px-4 py-8 text-center md:px-8 md:py-10">
        <h1 className="text-3xl font-light uppercase tracking-wide text-[#8c8288] md:text-4xl">{content.cronogramaTitulo}</h1>
        <p className="mt-3 text-sm uppercase tracking-[0.08em] text-[#8f868b] md:text-base">
          Data de realizacao da FEMICTEC: {content.dataRealizacao}
        </p>
      </section>

      <section className="px-4 pb-6 md:px-8 md:pb-8">
        <div className="overflow-hidden rounded-sm border border-[#91888d]">
          <div className="grid grid-cols-[2fr_1fr] border-b border-[#91888d] bg-[#ddd7da] text-xs font-semibold uppercase tracking-[0.1em] text-[#8a8086]">
            <span className="px-4 py-3 md:px-6">Atividade</span>
            <span className="border-l border-[#91888d] px-4 py-3 md:px-6">Data</span>
          </div>

          {content.cronogramaItens.map((item) => (
            <div key={item.atividade + item.data} className="grid grid-cols-[2fr_1fr] border-b border-[#b9b0b5] text-sm text-[#847b80] last:border-b-0 md:text-base">
              <span className="px-4 py-4 md:px-6">{item.atividade}</span>
              <span className="border-l border-[#b9b0b5] px-4 py-4 md:px-6">{item.data}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#9b9297] px-4 py-16 text-center text-[#eeeeee] md:px-8 md:py-20">
        {content.mapaImagemUrl ? (
          <img src={content.mapaImagemUrl} alt={content.mapaImagemAlt} className="mx-auto w-full max-w-4xl rounded-sm object-cover" />
        ) : (
          <div className="mx-auto max-w-3xl text-xl font-light uppercase tracking-[0.08em] md:text-3xl">Mapa da Feira (Interno)</div>
        )}
      </section>
    </>
  );
}

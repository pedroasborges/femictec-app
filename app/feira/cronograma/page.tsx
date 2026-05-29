import { getFeiraContent } from "../feira-data";

export default async function FeiraCronogramaPage() {
  const content = await getFeiraContent();

  return (
    <>
      <section className="px-4 py-8 text-center md:px-8 md:py-10">
        <h1 className="text-3xl font-black uppercase tracking-[0.04em] text-[#223d67] md:text-4xl">{content.cronogramaTitulo}</h1>
        <p className="mt-3 text-sm font-black uppercase tracking-[0.08em] text-[#95c11f] md:text-base">
          Data de realizacao da FEMICTEC: {content.dataRealizacao}
        </p>
      </section>

      <section className="px-4 pb-6 md:px-8 md:pb-8">
        <div className="mx-auto w-full max-w-4xl space-y-4">
          {content.cronogramaItens.map((item, index) => {
            const colors = ["bg-[#95c11f]", "bg-[#4085c6]", "bg-[#223d67]"] as const;
            const barColor = colors[index % colors.length];
            return (
              <div key={item.atividade + item.data} className="grid grid-cols-[1fr_auto] items-center gap-4 md:gap-6">
                <div className={`relative min-h-14 [clip-path:polygon(5%_0,95%_0,100%_50%,95%_100%,5%_100%,0_50%)] px-6 py-4 text-left text-white ${barColor}`}>
                  <p className="text-sm font-black uppercase tracking-[0.08em] md:text-base">{item.atividade}</p>
                  <p className="text-xs text-white/90 md:text-sm">{item.data}</p>
                </div>
                <span className={`h-5 w-5 rounded-full border-2 border-white shadow-[0_0_0_2px_#223d67] ${barColor}`} aria-hidden="true" />
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-4 pb-12 pt-4 md:px-8 md:pb-14">
        {content.mapaImagemUrl ? (
          <img src={content.mapaImagemUrl} alt={content.mapaImagemAlt} className="mx-auto w-full max-w-4xl border border-[#223d67]/20 object-cover" />
        ) : (
          <div className="mx-auto flex min-h-60 w-full max-w-4xl items-center justify-center border border-[#223d67]/20 bg-[#a2a2a2] px-6 text-center text-xl font-black uppercase tracking-[0.08em] text-white md:text-3xl">
            Mapa da Feira (Interno)
          </div>
        )}
      </section>
    </>
  );
}

import { getFemictecContent } from "../femictec-data";

export default async function FemictecQuemRealizaPage() {
  const content = await getFemictecContent();

  return (
    <>
      <section className="px-4 py-8 text-center md:px-8 md:py-10">
        <h1 className="text-4xl font-light uppercase tracking-wide text-[#8c8288] md:text-5xl">{content.quemRealizaTitulo}</h1>
      </section>

      <section className="grid gap-6 px-4 pb-4 md:grid-cols-[1.1fr_0.9fr] md:px-8">
        <article>
          <h2 className="text-3xl font-light uppercase tracking-wide text-[#8c8288] md:text-4xl">{content.organizacaoTitulo}</h2>
          <p className="mt-4 text-sm leading-7 text-[#8f868b] md:text-base">{content.organizacaoDescricao}</p>
        </article>

        <article className="bg-[#8f878b] p-8 text-center text-[#eeeeee]">
          {content.imagemEntradaUrl ? (
            <img src={content.imagemEntradaUrl} alt={content.imagemEntradaAlt} className="h-full w-full rounded-sm object-cover" />
          ) : (
            <>
              <p className="text-sm uppercase tracking-[0.12em]">Imagem da entrada da feira</p>
              <p className="mt-3 text-xl uppercase tracking-[0.12em] text-[#73f3c7]">{content.imagemEntradaLabel}</p>
            </>
          )}
        </article>
      </section>

      <section className="px-4 py-6 md:px-8 md:py-8">
        <h2 className="text-3xl font-light uppercase tracking-wide text-[#8c8288] md:text-4xl">{content.comissaoTitulo}</h2>
        <p className="mt-4 text-sm leading-7 text-[#8f868b] md:text-base">{content.comissaoDescricao}</p>
      </section>

      <section className="px-4 pb-10 pt-4 md:px-8 md:pb-12">
        <h2 className="text-3xl font-light uppercase tracking-wide text-[#8c8288] md:text-4xl">{content.parceirosTitulo}</h2>

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {content.parceiros.map((parceiro, index) => (
            <a
              key={`${parceiro.nome}-${index}`}
              href={parceiro.siteUrl || "#"}
              className="block border border-[#b8b2b5] bg-[#ddd7da] p-2 text-center text-[#8c8288] transition hover:bg-[#cfc8cc]"
            >
              <div className="flex h-24 items-center justify-center bg-[#8f878b] text-xs uppercase tracking-[0.1em] text-[#73f3c7]">
                {parceiro.logoUrl ? <img src={parceiro.logoUrl} alt={parceiro.nome} className="h-full w-full object-cover" /> : "Comunicacao"}
              </div>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.08em]">{parceiro.nome}</p>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}


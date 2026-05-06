import { ContatoForm } from "./contato-form";
import { getContatoPageContent } from "./contato-data";

export default async function ContatoPage() {
  const content = await getContatoPageContent();

  return (
    <section className="mx-auto w-full max-w-[1320px] px-4 py-10 md:px-6 md:py-14">
      <div className="rounded-xl bg-[#909090] p-5 text-[#eeeeee] shadow-sm md:p-10">
        <h1 className="text-center text-3xl font-light tracking-tight md:text-5xl">{content.titulo}</h1>
        <p className="mt-3 text-center text-sm uppercase tracking-[0.12em] text-[#f0f0f0] md:text-base">{content.subtitulo}</p>

        <div className="mt-8 grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
          <aside className="rounded-lg border border-[#d4d4d4] bg-[#eeeeee] p-5 text-[#909090]">
            <h2 className="text-lg font-semibold">Informacoes institucionais</h2>
            <p className="mt-3 text-sm leading-7">{content.descricao}</p>

            <div className="mt-5 space-y-2 text-sm">
              <p>
                <span className="font-semibold">Email:</span> {content.email}
              </p>
              <p>
                <span className="font-semibold">Telefone:</span> {content.telefone}
              </p>
              <p>
                <span className="font-semibold">Endereco:</span> {content.endereco}
              </p>
            </div>
          </aside>

          <div>
            <ContatoForm />
          </div>
        </div>
      </div>
    </section>
  );
}

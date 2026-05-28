import { ContatoForm } from "./contato-form";
import { getContatoPageContent } from "./contato-data";

function SocialSquare() {
  return <span className="block h-9 w-9 rounded-sm bg-[#f8eef1]" aria-hidden="true" />;
}

export default async function ContatoPage() {
  const content = await getContatoPageContent();

  return (
    <section className="bg-[#eeeeee] py-20 text-[#223d67] md:py-28">
      <div className="bg-[#223d67]">
        <div className="mx-auto grid w-full max-w-[980px] gap-8 px-4 py-10 md:grid-cols-[0.75fr_1.25fr] md:items-center md:px-6">
          <aside className="text-white">
            <div>
              <h1 className="text-base font-black uppercase tracking-[0.06em]">Ligue para nos</h1>
              <div className="mt-4 space-y-1 text-sm font-semibold text-white/90">
                <p>{content.telefone}</p>
                <p>{content.email}</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-base font-black uppercase tracking-[0.06em]">Localizacao</h2>
              <p className="mt-4 max-w-[260px] text-sm font-semibold leading-6 text-white/90">{content.endereco}</p>
              <p className="mt-2 max-w-[260px] text-sm leading-6 text-white/75">{content.descricao}</p>
            </div>

            <div className="mt-8">
              <h2 className="text-base font-black uppercase tracking-[0.06em]">Siga-nos</h2>
              <div className="mt-4 flex gap-3">
                <SocialSquare />
                <SocialSquare />
                <SocialSquare />
              </div>
            </div>
          </aside>

          <div className="md:-my-16">
            <ContatoForm institutionalEmail={content.email} />
          </div>
        </div>
      </div>
    </section>
  );
}

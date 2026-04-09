import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";
import Banner from "../components/banner";

async function getAFeira() {
  const res = await fetch("http://127.0.0.1:1337/api/a-feira?populate=*", {
    cache: "no-store",
  });

  if (!res.ok) {
    return { data: null };
  }

  return res.json();
}

type FeiraResponse = {
  data: {
    Texto?: BlocksContent;
  } | null;
};

export default async function Page() {
  const response = (await getAFeira()) as FeiraResponse;
  const conteudo = response.data?.Texto;

  return (
    <>
      <section className="bg-[#909090] px-0 py-16 text-center text-[#eeeeee] md:py-24 lg:py-0">
        <Banner />
      </section>
      <div className="mx-auto w-full max-w-[1320px] px-4 md:px-6">
        <h1 className="mb-8 text-3xl font-bold">A Feira</h1>
      
        {conteudo?.length ? (
          <div className="space-y-4 leading-7 text-slate-700">
            <BlocksRenderer content={conteudo} />
          </div>
        ) : (
          <p className="text-slate-500">Conteudo da feira nao disponivel no momento.</p>
        )}
      </div>     
    </>
  );
}

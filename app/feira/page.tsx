import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";

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
    <main className="mx-auto mt-12 min-h-screen max-w-3xl px-4">
      <h1 className="mb-8 text-3xl font-bold">A Feira</h1>

      {conteudo?.length ? (
        <div className="space-y-4 leading-7 text-slate-700">
          <BlocksRenderer content={conteudo} />
        </div>
      ) : (
        <p className="text-slate-500">Conteudo da feira nao disponivel no momento.</p>
      )}
    </main>
  );
}

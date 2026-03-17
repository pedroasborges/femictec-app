import Image from "next/image";


  // 1. Definição fora de tudo
  async function getProjetos() {
    const res = await fetch('http://127.0.0.1:1337/api/projetos', { cache: 'no-store' });
    if (!res.ok) return { data: [] };
    return res.json();
  }

  export default async function Page() {
    const response = await getProjetos();
    const projetos = response.data;
    return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
      {projetos?.map((p: any) => (
        <div key={p.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border-t-4 border-blue-600">
          <h2 className="text-xl font-semibold text-gray-800">
            {p.attributes?.Titulo || p.Titulo}
          </h2>
          <p className="text-gray-600 mt-2 text-sm uppercase tracking-wider">Projeto FEMICTEC</p>
        </div>
      ))}
    </div>
    );
  }


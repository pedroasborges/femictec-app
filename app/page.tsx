import Image from "next/image";


// 1. Função de busca de dados (Server-side)
async function getProjetos() {
  try {
    const res = await fetch('http://127.0.0.1:1337/api/projetos', { cache: 'no-store' });
    if (!res.ok) return { data: [] };
    return res.json();
  } catch (error) {
    console.error("Erro ao conectar com o Strapi:", error);
    return { data: [] };
  }
}

// 2. Componente Principal
export default async function Page() {
  const response = await getProjetos();
  const projetos = response.data;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Cabeçalho */}
        <header className="mb-12 border-b border-slate-200 pb-6">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Portal <span className="text-blue-600">FEMICTEC</span>
          </h1>
          <p className="mt-2 text-lg text-slate-600">Exposição Científica e Tecnológica</p>
        </header>

        {/* Grid de Projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projetos && projetos.length > 0 ? (
            projetos.map((p: any) => (
              <article 
                key={p.id} 
                className="group relative bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Projeto Acadêmico
                  </span>
                  <span className="text-slate-400 text-xs">#{p.id}</span>
                </div>
                
                <h2 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {p.attributes?.Titulo || p.Titulo}
                </h2>
                
                <p className="mt-3 text-slate-600 text-sm line-clamp-3">
                  {/* Espaço reservado para a descrição futura */}
                  Integração tecnológica desenvolvida para a apresentação na feira científica, conectando Strapi CMS ao Front-end Next.js.
                </p>

                <div className="mt-6 flex items-center text-blue-600 font-semibold text-sm cursor-pointer">
                  Ver detalhes
                  <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full bg-blue-50 border border-blue-200 text-blue-700 p-4 rounded-lg text-center">
              Nenhum projeto foi encontrado no banco de dados da FEMICTEC.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}


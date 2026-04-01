import Banner from "./components/banner";

async function getProjetos() {
  const res = await fetch('http://127.0.0.1:1337/api/projetos?populate=*', { cache: 'no-store' });
  if (!res.ok) return { data: [] };
  return res.json();
}

export default async function Page() {
  const responseProjetos = await getProjetos();
  const projetos = responseProjetos.data;

  return (
    <main>
      {/* Hero Section - Impacto Inicial */}
      <Banner />
      
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex justify-center">
          <div>
            <h1 className="text-3xl font-bold">Faça sua inscrição</h1>
            <div className="h-1.5 w-20 bg-primary mt-2 rounded-full m-auto"></div>
          </div>
          
        </div>
        <div className="max-w-4xl mx-auto mt-8">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis dolor nemo ea quos consectetur sunt similique quia. Officiis beatae voluptatum magnam aliquid, et earum nesciunt eligendi minima, minus nostrum voluptatibus.
          </p>
        </div>
        
      </section>
      

      {/* Seção de Projetos */}
      <section id="projetos" className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h3 className="text-3xl font-bold text-slate-900">Projetos em Destaque</h3>
            <div className="h-1.5 w-20 bg-primary mt-2 rounded-full"></div>
          </div>
          <span className="text-slate-500 font-medium">{projetos?.length || 0} Projetos Encontrados</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projetos?.map((p: any) => (

            <article key={p.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-500 group">
              {/* Espaço para Imagem (Mostratec foca muito no visual) */}
              <div className="h-52 bg-slate-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-blue-900 shadow-sm">
                  {p.attributes?.Categoria || "Ensino Fundamental"}
                </div>
              </div>

              <div className="p-8">
                <h4 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-700 transition-colors line-clamp-2">
                  {p.attributes?.Titulo || p.Titulo}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6">
                  {/* {p.attributes?.Descricao || "Este projeto investiga soluções tecnológicas e científicas para desafios do cotidiano escolar e municipal."} */}
                  {p.Descricao?.[0]?.children?.[0]?.text || "Descrição não disponível."}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Escola</span>
                    <span className="text-sm font-semibold text-slate-700">
                      {/* {p.attributes?.Escola || "Escola Municipal Exemplo"} */}
                      {/* {p.Escola?.[0]?.children?.[0]?.text || "Descrição não disponível."} */}
                      {typeof p.Escola === 'string' ? p.Escola : "Escola Municipal de Novo Hamburgo."} 
                    </span>
                  </div>
                  <button className="text-blue-600 font-bold text-sm hover:underline">Ver Projeto →</button>
                </div>
              </div>
            </article>
            
          ))}
        </div>
      </section>
    </main>
  );
}


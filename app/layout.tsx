import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        {/* Navbar Estilo Mostratec */}
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-xl">F</div>
              <span className="text-2xl font-black tracking-tight text-blue-900">FEMICTEC</span>
            </div>
            <div className="hidden md:flex gap-8 font-medium text-slate-600">
              <a href="#" className="hover:text-blue-600 transition-colors">Início</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Sobre a Feira</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Projetos</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Cronograma</a>
            </div>
            <button className="bg-blue-700 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-800 transition-all shadow-md">
              Inscrições
            </button>
          </div>
        </nav>

        {children}

        {/* Footer Institucional */}
        <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="font-bold text-white mb-2">FEMICTEC - Novo Hamburgo/RS</p>
            <p className="text-sm">Feira Municipal de Iniciação Científica e Tecnológica</p>
            <div className="mt-6 border-t border-slate-800 pt-6 text-xs">
              © 2026 - Desenvolvido pelo Governo Digital
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
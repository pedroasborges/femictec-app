import './globals.css'
import Navbar from './components/navbar'
import { Footer } from './components/footer'
//import { Inter } from 'next/font/google'

const inter = {className: 'font-sans' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-slate-50 text-slate-950`}>
        {/* Navbar Estilo Mostratec */}
        <Navbar />

        {children}

        {/* Footer Institucional */}
        <Footer />

      </body>
    </html>
  )
}

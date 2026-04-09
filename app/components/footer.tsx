export function Footer() {
  return (
    <footer id="contato" className="mt-20 bg-[#909090] py-10 text-[#eeeeee]">
      <div className="mx-auto w-full max-w-[1320px] px-4">
        <div className="grid grid-cols-1 gap-8 border-b border-[#d1d1d1] pb-8 text-center sm:grid-cols-2 lg:grid-cols-4 lg:text-left">
          <div>
            <p className="text-xs font-semibold tracking-[0.12em]">ENDERECO</p>
            <p className="mt-3 text-sm text-[#ececec]">FEMICTEC - Novo Hamburgo/RS</p>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.12em]">EMAIL E TELEFONE</p>
            <p className="mt-3 text-sm text-[#ececec]">Feira Municipal de Iniciacao Cientifica e Tecnologica</p>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.12em]">REDES SOCIAIS</p>
            <div className="mt-3 flex justify-center gap-2 lg:justify-start">
              <span className="h-8 w-8 bg-[#eeeeee]" />
              <span className="h-8 w-8 bg-[#eeeeee]" />
              <span className="h-8 w-8 bg-[#eeeeee]" />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.12em]">WHATSAPP</p>
            <p className="mt-3 text-sm text-[#ececec]">Contato institucional</p>
          </div>
        </div>

        <p className="pt-6 text-center text-xs text-[#ececec]">© 2026 - Desenvolvido pelo Governo Digital</p>
      </div>
    </footer>
  );
}

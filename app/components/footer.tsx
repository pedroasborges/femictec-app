import { fetchStrapiJson } from "../lib/strapi";

<<<<<<< HEAD
type FooterApiData = {
  Email?: string | null;
  Telefone?: string | null;
  Instagram?: string | null;
  attributes?: {
    Email?: string | null;
    Telefone?: string | null;
    Instagram?: string | null;
  };
};

type FooterApiResponse = {
  data?: FooterApiData | null;
};

function normalizeFooter(data: FooterApiData | null | undefined) {
  if (!data) {
    return {
      email: null,
      telefone: null,
      instagram: null,
    };
  }

  return {
    email: data.Email ?? data.attributes?.Email ?? null,
    telefone: data.Telefone ?? data.attributes?.Telefone ?? null,
    instagram: data.Instagram ?? data.attributes?.Instagram ?? null,
  };
}

async function getFooter() {
  return fetchStrapiJson<FooterApiResponse>("/api/footer", { data: null });
}

export async function Footer() {
  const response = await getFooter();
  const footer = normalizeFooter(response.data);
=======
type FooterAttributes = {
  Email?: string | null;
  Telefone?: string | null;
  Instagram?: string | null;
};

type FooterApiItem = FooterAttributes & {
  attributes?: FooterAttributes;
};

type FooterApiResponse = {
  data?: FooterApiItem | null;
};

async function getFooter(): Promise<FooterAttributes> {
  const response = await fetchStrapiJson<FooterApiResponse>("/api/footer", { data: null });
  const raw = response.data;

  return {
    Email: raw?.Email ?? raw?.attributes?.Email ?? null,
    Telefone: raw?.Telefone ?? raw?.attributes?.Telefone ?? null,
    Instagram: raw?.Instagram ?? raw?.attributes?.Instagram ?? null,
  };
}

function toInstagramUrl(instagram: string | null | undefined): string | null {
  if (!instagram) return null;
  const value = instagram.trim();
  if (!value) return null;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  const handle = value.startsWith("@") ? value.slice(1) : value;
  return `https://instagram.com/${handle}`;
}

function toWhatsappUrl(phone: string | null | undefined): string | null {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10) return null;
  return `https://wa.me/${digits}`;
}

export async function Footer() {
  const footer = await getFooter();
  const instagramUrl = toInstagramUrl(footer.Instagram);
  const whatsappUrl = toWhatsappUrl(footer.Telefone);
>>>>>>> e3bf3f2df416e5978ffa0dbc882560f82f0cd189

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
<<<<<<< HEAD
            <p className="mt-3 text-sm text-[#ececec]">
              {footer.email || footer.telefone
                ? [footer.email, footer.telefone].filter(Boolean).join(" | ")
                : "Feira Municipal de Iniciacao Cientifica e Tecnologica"}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.12em]">REDES SOCIAIS</p>
            {footer.instagram ? (
              <a
                href={footer.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm text-[#ececec] underline underline-offset-4"
              >
                Instagram oficial
              </a>
            ) : (
              <div className="mt-3 flex justify-center gap-2 lg:justify-start">
                <span className="h-8 w-8 bg-[#eeeeee]" />
                <span className="h-8 w-8 bg-[#eeeeee]" />
                <span className="h-8 w-8 bg-[#eeeeee]" />
              </div>
            )}
=======
            <div className="mt-3 space-y-1 text-sm text-[#ececec]">
              <p>{footer.Email ?? ""}</p>
              <p>{footer.Telefone ?? ""}</p>
            </div>
>>>>>>> e3bf3f2df416e5978ffa0dbc882560f82f0cd189
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.12em]">REDES SOCIAIS</p>
            {instagramUrl ? (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm text-[#ececec] underline underline-offset-2"
              >
                {footer.Instagram}
              </a>
            ) : (
              <p className="mt-3 text-sm text-[#ececec]">Instagram indisponivel</p>
            )}
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.12em]">WHATSAPP</p>
<<<<<<< HEAD
            <p className="mt-3 text-sm text-[#ececec]">{footer.telefone ?? "Contato institucional"}</p>
=======
            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm text-[#ececec] underline underline-offset-2"
              >
                {footer.Telefone}
              </a>
            ) : (
              <p className="mt-3 text-sm text-[#ececec]">Contato institucional</p>
            )}
>>>>>>> e3bf3f2df416e5978ffa0dbc882560f82f0cd189
          </div>
        </div>

        <p className="pt-6 text-center text-xs text-[#ececec]">© 2026 - Desenvolvido pelo Governo Digital</p>
      </div>
    </footer>
  );
}


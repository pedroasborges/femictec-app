import Image from "next/image";
import Link from "next/link";

import logoImg from "../../public/femictec.png";
import { fetchStrapiJson } from "../lib/strapi";
import { getLocalizacaoContent, sanitizeCoordinates } from "../localizacao/localizacao-data";

type FooterAttributes = {
  Email?: string | null;
  Telefone?: string | null;
  Instagram?: string | null;
  Facebook?: string | null;
  Youtube?: string | null;
  facebook?: string | null;
  youtube?: string | null;
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
    Email: raw?.Email ?? raw?.attributes?.Email ?? "femictec@novohamburgo.rs.gov.br",
    Telefone: raw?.Telefone ?? raw?.attributes?.Telefone ?? "(51) 0000-0000",
    Instagram: raw?.Instagram ?? raw?.attributes?.Instagram ?? null,
    Facebook: raw?.Facebook ?? raw?.attributes?.Facebook ?? raw?.facebook ?? raw?.attributes?.facebook ?? null,
    Youtube: raw?.Youtube ?? raw?.attributes?.Youtube ?? raw?.youtube ?? raw?.attributes?.youtube ?? null,
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

function toFacebookUrl(facebook: string | null | undefined): string | null {
  if (!facebook) return null;
  const value = facebook.trim();
  if (!value) return null;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (value.startsWith("//")) return `https:${value}`;
  if (value.startsWith("www.")) return `https://${value}`;
  if (value.includes("facebook.com")) return `https://${value.replace(/^https?:\/\//, "")}`;
  const handle = value.startsWith("@") ? value.slice(1) : value.replace(/^facebook\//i, "");
  return `https://facebook.com/${handle}`;
}

function toYoutubeUrl(youtube: string | null | undefined): string | null {
  if (!youtube) return null;
  const value = youtube.trim();
  if (!value) return null;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (value.startsWith("//")) return `https:${value}`;
  if (value.startsWith("www.")) return `https://${value}`;
  if (value.includes("youtube.com") || value.includes("youtu.be")) return `https://${value.replace(/^https?:\/\//, "")}`;
  const handle = value.startsWith("@") ? value : `@${value}`;
  return `https://youtube.com/${handle}`;
}

function toWhatsappUrl(phone: string | null | undefined): string | null {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10) return null;
  return `https://wa.me/${digits}`;
}

function MailIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function CityLogoBlock() {
  return (
    <div className="inline-flex min-w-[210px] items-center gap-3 bg-white px-3 py-2 text-[#214a90] shadow-sm">
        <Image src="/prefeituraMunicipal.png" alt="Prefeitura Municipal" width={48} height={48} />
        <span className="grid leading-none">
        <span className="text-[10px] font-black text-[#69a934]">PREFEITURA</span>
        <span className="text-[20px] font-black tracking-tight">NOVO</span>
        <span className="text-[20px] font-black tracking-tight">HAMBURGO</span>
        <span className="text-[8px] font-bold text-[#69a934]">CUIDANDO DA NOSSA GENTE</span>
      </span>
    </div>
  );
}

export async function Footer() {
  const [footer, localizacao] = await Promise.all([getFooter(), getLocalizacaoContent()]);
  const coords = sanitizeCoordinates(localizacao.coordenadas);
  const mapsLink = `https://www.google.com/maps?q=${coords}`;
  const mapsEmbed = `https://www.google.com/maps?q=${coords}&z=15&output=embed`;
  const instagramUrl = toInstagramUrl(footer.Instagram);
  const whatsappUrl = toWhatsappUrl(footer.Telefone);
  const facebookUrl = toFacebookUrl(footer.Facebook);
  const youtubeUrl = toYoutubeUrl(footer.Youtube);

  return (
    <footer id="contato" className="mt-20 border-y border-[#00b8c6] bg-[#223d67] text-white">
      <div className="mx-auto w-full max-w-[1320px] px-4 py-8 md:px-6" >
        <div className="grid grid-cols-1 gap-8 text-left sm:grid-cols-2 lg:grid-cols-[1.25fr_0.75fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="inline-flex bg-[#35406e] px-2 py-1">
              <Image src={logoImg} alt="FEMICTEC" width={170} height={48} className="h-auto w-[170px]" />
            </Link>
            <p className="mt-4 max-w-[260px] text-[12px] font-Saira uppercase leading-5 text-white">
              Feira Municipal de Iniciacao Cientifica e Tecnologica de Novo Hamburgo
            </p>

            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex max-w-[250px] text-[12px] leading-5 text-white/90 hover:text-[#95c11f]"
            >
              Localizacao
            </a>
            <p className="mt-2 max-w-[250px] text-[12px] leading-5 text-white/90">Novo Hamburgo/RS</p>
            <div className="mt-3 max-w-[260px] overflow-hidden border border-white/20">
              <iframe
                title="Mapa no rodape FEMICTEC"
                src={mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-24 w-full"
              />
            </div>
          </div>

          <div>
            <p className="text-[12px] font-Saira uppercase tracking-[0.08em]">Institucional</p>
            <nav className="mt-3 grid gap-2 text-[12px] font-Saira text-white/95">
              <Link href="/femictec" className="hover:text-[#95c11f]">
                Quem Somos
              </Link>
              <Link href="/contato" className="hover:text-[#95c11f]">
                Fale Conosco
              </Link>
              <Link href="/" className="hover:text-[#95c11f]">
                Mapa do Site
              </Link>
              <Link href="/politica-de-privacidade" className="hover:text-[#95c11f]">
                Politica de Privacidade
              </Link>
              <Link href="/" className="hover:text-[#95c11f]">
                Termo de Uso
              </Link>
            </nav>
          </div>

          <div>
            <p className="text-[12px] font-Saira uppercase tracking-[0.08em]">Contatos</p>
            <div className="mt-3 grid gap-2 text-[11px] font-Saira text-white/95">
              <a href={`mailto:${footer.Email}`} className="inline-flex items-center gap-2 hover:text-[#95c11f]">
                <MailIcon />
                {footer.Email}
              </a>
              {whatsappUrl ? (
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-[#95c11f]">
                  <Image src="ic-whatsapp.svg" alt="WhatsApp" width={20} height={20} />
                  {footer.Telefone}
                </a>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <Image src="ic-whatsapp.svg" alt="WhatsApp" width={20} height={20} />
                  {footer.Telefone}
                </span>
              )}
            </div>
            
            <p className="mt-5 text-[12px] font-Saira uppercase tracking-[0.08em]">Redes Sociais</p>
            <div className="mt-3 flex gap-2">
              {instagramUrl ? (
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Image src="ic-instagram.svg" alt="Instagram" width={20} height={20} />
                </a>
              ) : (
                <Image src="ic-instagram.svg" alt="Instagram" width={20} height={20} />
              )}

              {facebookUrl ? (
                <a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Image src="ic-facebook.svg" alt="Facebook" width={20} height={20} />
                </a>
              ) : (
                <Image src="ic-facebook.svg" alt="Facebook" width={20} height={20} />
              )}
              
              {youtubeUrl ? (
                <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <Image src="ic-youtube.svg" alt="YouTube" width={20} height={20} />
                </a>
              ) : (
                <Image src="ic-youtube.svg" alt="YouTube" width={20} height={20} />
              )}
            </div>
          </div>
          <div className="flex items-start lg:justify-end">
            <CityLogoBlock />
          </div>
        </div>
      </div>
    </footer>
  );
}

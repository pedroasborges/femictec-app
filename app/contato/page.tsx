import Link from "next/link";
import Image from "next/image";

import { ContatoForm } from "./contato-form";
import { getContatoPageContent } from "./contato-data";
import { getFooterContent } from "../lib/footer-content";
import { getLocalizacaoContent, sanitizeCoordinates } from "../localizacao/localizacao-data";

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

const bodyFontStyle = {
  fontFamily: "'Saira', sans-serif",
};

export default async function ContatoPage() {
  const [content, localizacao, footerContent] = await Promise.all([
    getContatoPageContent(),
    getLocalizacaoContent(),
    getFooterContent(),
  ]);
  const coords = sanitizeCoordinates(localizacao.coordenadas);
  const mapsLink = `https://www.google.com/maps?q=${coords}`;
  const mapsEmbed = `https://www.google.com/maps?q=${coords}&z=16&output=embed`;
  const instagramUrl = toInstagramUrl(footerContent.Instagram);
  const facebookUrl = toFacebookUrl(footerContent.Facebook);
  const youtubeUrl = toYoutubeUrl(footerContent.Youtube);

  return (
    <section className="bg-white py-20 text-[#223d67] md:py-28">
      <div className="bg-[#223d67]">
        <div className="mx-auto grid w-full max-w-[980px] gap-8 px-4 py-10 md:grid-cols-[0.75fr_1.25fr] md:items-center md:px-6">
          <aside className="text-white" style={bodyFontStyle}>
            <div>
              <h1 className="text-base font-black uppercase tracking-[0.06em]">Ligue para nos</h1>
              <div className="mt-4 space-y-1 text-sm font-semibold text-white/90">
                <p>{content.telefone}</p>
                <p>{content.email}</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-base font-black uppercase tracking-[0.06em]">Localizacao</h2>
              <p className="mt-4 max-w-[260px] text-sm font-semibold leading-6 text-white/90">{content.endereco}</p>
              <p className="mt-2 max-w-[260px] text-sm leading-6 text-white/75">{content.descricao}</p>
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex text-xs font-black uppercase tracking-[0.1em] text-[#95c11f] hover:text-white"
              >
                Ver no Google Maps
              </a>
              <div className="mt-4 overflow-hidden border border-white/20">
                <iframe
                  title="Mapa de localizacao FEMICTEC"
                  src={mapsEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-44 w-full"
                />
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-base font-black uppercase tracking-[0.06em]">Siga-nos</h2>
              <div className="mt-4 flex gap-3">
                {instagramUrl ? (
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <Image src="/ic-instagram.svg" alt="Instagram" width={20} height={20} />
                  </a>
                ) : (
                  <Image src="/ic-instagram.svg" alt="Instagram" width={20} height={20} />
                )}

                {facebookUrl ? (
                  <a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <Image src="/ic-facebook.svg" alt="Facebook" width={20} height={20} />
                  </a>
                ) : (
                  <Image src="/ic-facebook.svg" alt="Facebook" width={20} height={20} />
                )}

                {youtubeUrl ? (
                  <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                    <Image src="/ic-youtube.svg" alt="YouTube" width={20} height={20} />
                  </a>
                ) : (
                  <Image src="/ic-youtube.svg" alt="YouTube" width={20} height={20} />
                )}
              </div>
            </div>
          </aside>

          <div className="md:-my-16">
            <ContatoForm />
            <div className="mt-4 flex justify-end">
              <Link
                href="/perguntas-frequentes"
                className="inline-flex h-12 items-center justify-center rounded-[6px] border border-white/30 bg-white/10 px-6 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:bg-white/20"
              >
                Perguntas Frequentes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

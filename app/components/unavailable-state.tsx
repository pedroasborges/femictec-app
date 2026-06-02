import Link from "next/link";

type UnavailableStateProps = {
  title: string;
  description: string;
  detail?: string;
  actionLabel?: string;
  actionHref?: string;
  fullHeight?: boolean;
  compact?: boolean;
};

export default function UnavailableState({
  title,
  description,
  detail,
  actionLabel,
  actionHref,
  fullHeight = false,
  compact = false,
}: UnavailableStateProps) {
  return (
    <section className={fullHeight ? "flex min-h-[calc(100vh-120px)] items-center justify-center px-4 py-12 md:px-6" : "px-4 py-10 md:px-6 md:py-14"}>
      <div
        className={`mx-auto w-full max-w-3xl rounded-[18px] border border-[#223d67]/15 bg-[#f8fbff] px-6 py-10 text-center shadow-[0_14px_32px_rgba(34,61,103,0.08)] md:px-10 ${
          compact ? "md:py-8" : "md:py-12"
        }`}
      >
        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#95c11f]">Indisponibilidade</p>
        <h1 className="mt-3 text-2xl font-black uppercase leading-tight tracking-tight text-[#223d67] md:text-4xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#223d67]/80 md:text-base md:leading-8">{description}</p>
        {detail ? <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#223d67]/65">{detail}</p> : null}

        {actionHref && actionLabel ? (
          <div className="mt-8">
            <Link
              href={actionHref}
              className="inline-flex rounded-[6px] bg-[#223d67] px-6 py-3 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:bg-[#304a80]"
            >
              {actionLabel}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}

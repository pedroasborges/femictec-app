"use client";

import { FormEvent, useState } from "react";

type Status = {
  type: "idle" | "success" | "error";
  message: string;
};

const initialStatus: Status = { type: "idle", message: "" };

export function ContatoForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<Status>(initialStatus);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(initialStatus);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as { error?: string; protocolo?: string | number | null };

      if (!response.ok) {
        setStatus({
          type: "error",
          message: payload.error || "Nao foi possivel enviar a mensagem.",
        });
        return;
      }

      form.reset();
      setStatus({
        type: "success",
        message: payload.protocolo
          ? `Mensagem enviada com sucesso. Protocolo: ${payload.protocolo}.`
          : "Mensagem enviada com sucesso. Retornaremos em breve.",
      });
    } catch {
      setStatus({
        type: "error",
        message: "Falha de conexao ao enviar a mensagem.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-lg bg-[#eeeeee] p-5 text-[#909090] md:p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="text-sm font-medium">
          Nome
          <input
            required
            name="nome"
            type="text"
            className="mt-2 w-full rounded-md border border-[#cfcfcf] bg-white px-3 py-2 text-sm outline-none focus:border-[#909090]"
          />
        </label>
        <label className="text-sm font-medium">
          Email
          <input
            required
            name="email"
            type="email"
            className="mt-2 w-full rounded-md border border-[#cfcfcf] bg-white px-3 py-2 text-sm outline-none focus:border-[#909090]"
          />
        </label>
      </div>

      <label className="mt-4 block text-sm font-medium">
        Assunto
        <input
          required
          name="assunto"
          type="text"
          className="mt-2 w-full rounded-md border border-[#cfcfcf] bg-white px-3 py-2 text-sm outline-none focus:border-[#909090]"
        />
      </label>

      <label className="mt-4 block text-sm font-medium">
        Mensagem
        <textarea
          required
          name="mensagem"
          rows={6}
          className="mt-2 w-full rounded-md border border-[#cfcfcf] bg-white px-3 py-2 text-sm outline-none focus:border-[#909090]"
        />
      </label>

      <label className="mt-4 block text-sm font-medium">
        Arquivo (opcional)
        <input
          name="anexo"
          type="file"
          className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-[#909090] file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.1em] file:text-[#eeeeee]"
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 rounded-md bg-[#909090] px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#eeeeee] transition hover:bg-[#7f7f7f] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Enviando..." : "Protocolar mensagem"}
      </button>

      {status.type !== "idle" ? (
        <p className={`mt-4 text-sm ${status.type === "success" ? "text-green-700" : "text-red-700"}`}>{status.message}</p>
      ) : null}
    </form>
  );
}

"use client";

import { FormEvent, useState } from "react";

type Status = {
  type: "idle" | "success" | "error";
  message: string;
};

type ContactResponse = {
  error?: string;
  mode?: "sent";
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

      const payload = (await response.json()) as ContactResponse;

      if (!response.ok) {
        setStatus({
          type: "error",
          message: payload.error || "Nao foi possivel preparar a mensagem.",
        });
        return;
      }

      setStatus({
        type: "success",
        message: "Mensagem enviada com sucesso. Voce tambem recebera um email de confirmacao.",
      });

      form.reset();
    } catch {
      setStatus({
        type: "error",
        message: "Falha de conexao ao preparar a mensagem.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="bg-[#95c11f] p-6 text-white shadow-[10px_12px_0_rgba(34,61,103,0.28)] md:p-8">
      <h2 className="text-xl font-black uppercase leading-tight tracking-[0.04em] md:text-2xl">Formulario de Contato</h2>

      <div className="mt-6 grid gap-4">
        <label className="block">
          <span className="sr-only">Nome</span>
          <input
            required
            name="nome"
            type="text"
            placeholder="Nome"
            className="h-12 w-full border-0 bg-[#f8eef1] px-4 text-sm text-[#223d67] outline-none placeholder:text-[#8d8d8d] focus:ring-2 focus:ring-white"
          />
        </label>

        <label className="block">
          <span className="sr-only">Email</span>
          <input
            required
            name="email"
            type="email"
            placeholder="Email"
            className="h-12 w-full border-0 bg-[#f8eef1] px-4 text-sm text-[#223d67] outline-none placeholder:text-[#8d8d8d] focus:ring-2 focus:ring-white"
          />
        </label>

        <label className="block">
          <span className="sr-only">Assunto</span>
          <input
            required
            name="assunto"
            type="text"
            placeholder="Assunto"
            className="h-12 w-full border-0 bg-[#f8eef1] px-4 text-sm text-[#223d67] outline-none placeholder:text-[#8d8d8d] focus:ring-2 focus:ring-white"
          />
        </label>

        <label className="block">
          <span className="sr-only">Mensagem</span>
          <textarea
            required
            name="mensagem"
            rows={5}
            placeholder="Mensagem"
            className="min-h-28 w-full resize-y border-0 bg-[#f8eef1] px-4 py-3 text-sm text-[#223d67] outline-none placeholder:text-[#8d8d8d] focus:ring-2 focus:ring-white"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 h-12 min-w-40 bg-[#f8eef1] px-6 text-xs font-black uppercase tracking-[0.12em] text-[#223d67] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Enviando..." : "Enviar"}
      </button>

      {status.type !== "idle" ? (
        <p className={`mt-4 text-sm font-semibold ${status.type === "success" ? "text-white" : "text-red-900"}`}>{status.message}</p>
      ) : null}
    </form>
  );
}

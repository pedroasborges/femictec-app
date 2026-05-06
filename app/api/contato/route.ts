import { NextResponse } from "next/server";

import { STRAPI_BASE_URL } from "@/app/lib/strapi";

const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

function getAuthHeaders(): Record<string, string> {
  if (!STRAPI_TOKEN) return {};
  return { Authorization: `Bearer ${STRAPI_TOKEN}` };
}

async function uploadAttachment(file: File): Promise<number | null> {
  const uploadBody = new FormData();
  uploadBody.append("files", file, file.name);

  const uploadResponse = await fetch(`${STRAPI_BASE_URL}/api/upload`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: uploadBody,
  });

  if (!uploadResponse.ok) return null;

  const uploadPayload = (await uploadResponse.json()) as Array<{ id?: number }>;
  const firstFile = uploadPayload[0];
  return typeof firstFile?.id === "number" ? firstFile.id : null;
}

export async function POST(request: Request) {
  try {
    const data = await request.formData();

    const nome = String(data.get("nome") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const assunto = String(data.get("assunto") ?? "").trim();
    const mensagem = String(data.get("mensagem") ?? "").trim();
    const fileValue = data.get("anexo");
    const file = fileValue instanceof File && fileValue.size > 0 ? fileValue : null;

    if (!nome || !email || !assunto || !mensagem) {
      return NextResponse.json({ error: "Campos obrigatorios nao preenchidos." }, { status: 400 });
    }

    let anexoId: number | null = null;
    if (file) {
      anexoId = await uploadAttachment(file);
    }

    const createResponse = await fetch(`${STRAPI_BASE_URL}/api/mensagens-contatos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify({
        data: {
          nome,
          email,
          assunto,
          mensagem,
          ...(anexoId ? { anexo: anexoId } : {}),
        },
      }),
    });

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      return NextResponse.json(
        {
          error: "Falha ao protocolar mensagem no Strapi.",
          detail: errorText.slice(0, 220),
        },
        { status: 502 },
      );
    }

    const createdPayload = (await createResponse.json()) as {
      data?: { id?: number; documentId?: string } | null;
    };

    return NextResponse.json({
      ok: true,
      protocolo: createdPayload.data?.documentId ?? createdPayload.data?.id ?? null,
    });
  } catch {
    return NextResponse.json({ error: "Erro inesperado ao enviar mensagem." }, { status: 500 });
  }
}

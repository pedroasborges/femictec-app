import net from "node:net";
import tls from "node:tls";

import { NextResponse } from "next/server";
import { fetchStrapiJson } from "../../lib/strapi";

export const runtime = "nodejs";

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  from: string;
  user: string | null;
  pass: string | null;
  rejectUnauthorized: boolean;
};

type ContactPayload = {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
};

type ContatoNotificacaoConfig = {
  emailPrincipal: string;
  destinatariosEvento: string[];
  notificacaoAssuntoTemplate: string;
  notificacaoMensagemTemplate: string;
  confirmacaoAssuntoTemplate: string;
  confirmacaoMensagemTemplate: string;
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function cleanHeader(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function encodeHeader(value: string): string {
  return `=?UTF-8?B?${Buffer.from(cleanHeader(value), "utf8").toString("base64")}?=`;
}

function getSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST?.trim();
  const from = process.env.SMTP_FROM?.trim() || process.env.SMTP_USER?.trim();
  if (!host || !from || !isValidEmail(from)) return null;

  const port = Number(process.env.SMTP_PORT || 587);

  return {
    host,
    port: Number.isFinite(port) ? port : 587,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    from,
    user: process.env.SMTP_USER?.trim() || null,
    pass: process.env.SMTP_PASS || null,
    rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== "false",
  };
}

function normalizeEmails(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (item && typeof item === "object" ? String((item as { email?: unknown }).email ?? "").trim() : ""))
    .filter((email) => isValidEmail(email));
}

function fillTemplate(template: string, payload: ContactPayload): string {
  return template
    .replaceAll("{nome}", payload.nome)
    .replaceAll("{email}", payload.email)
    .replaceAll("{assunto}", payload.assunto)
    .replaceAll("{mensagem}", payload.mensagem);
}

async function getContatoNotificacaoConfig(): Promise<ContatoNotificacaoConfig> {
  type ContatoResponse = {
    data?: {
      email?: unknown;
      destinatariosEvento?: unknown;
      notificacaoAssuntoTemplate?: unknown;
      notificacaoMensagemTemplate?: unknown;
      confirmacaoAssuntoTemplate?: unknown;
      confirmacaoMensagemTemplate?: unknown;
      attributes?: {
        email?: unknown;
        destinatariosEvento?: unknown;
        notificacaoAssuntoTemplate?: unknown;
        notificacaoMensagemTemplate?: unknown;
        confirmacaoAssuntoTemplate?: unknown;
        confirmacaoMensagemTemplate?: unknown;
      };
    } | null;
  };

  const payload = await fetchStrapiJson<ContatoResponse>("/api/contato?populate=*", { data: null });
  const raw = payload.data;
  const source = raw?.attributes ?? raw;

  const emailPrincipal = String(source?.email ?? "").trim();
  const destinatariosEvento = normalizeEmails(source?.destinatariosEvento);

  return {
    emailPrincipal: isValidEmail(emailPrincipal) ? emailPrincipal : "femictec@novohamburgo.rs.gov.br",
    destinatariosEvento,
    notificacaoAssuntoTemplate:
      String(source?.notificacaoAssuntoTemplate ?? "").trim() || "Novo contato FEMICTEC - {assunto}",
    notificacaoMensagemTemplate:
      String(source?.notificacaoMensagemTemplate ?? "").trim() ||
      [
        "Novo contato recebido pela FEMICTEC.",
        "",
        "Nome: {nome}",
        "Email: {email}",
        "Assunto: {assunto}",
        "",
        "Mensagem:",
        "{mensagem}",
      ].join("\n"),
    confirmacaoAssuntoTemplate:
      String(source?.confirmacaoAssuntoTemplate ?? "").trim() || "Recebemos sua mensagem - FEMICTEC",
    confirmacaoMensagemTemplate:
      String(source?.confirmacaoMensagemTemplate ?? "").trim() ||
      [
        "Ola, {nome}.",
        "",
        "Recebemos sua mensagem com sucesso.",
        "Assunto: {assunto}",
        "",
        "Nossa equipe analisara o conteudo e retornara por este email quando necessario.",
        "",
        "Resumo da mensagem enviada:",
        "{mensagem}",
      ].join("\n"),
  };
}

function readSmtpResponse(socket: net.Socket | tls.TLSSocket): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    const timeout = windowlessTimeout(() => {
      cleanup();
      reject(new Error("SMTP response timeout"));
    }, 15000);

    function cleanup() {
      clearTimeout(timeout);
      socket.off("data", onData);
      socket.off("error", onError);
    }

    function onError(error: Error) {
      cleanup();
      reject(error);
    }

    function onData(chunk: Buffer | string) {
      data += chunk.toString();
      const lines = data.split(/\r?\n/).filter(Boolean);
      const lastLine = lines[lines.length - 1];

      if (lastLine && /^\d{3} /.test(lastLine)) {
        cleanup();
        resolve(data);
      }
    }

    socket.on("data", onData);
    socket.once("error", onError);
  });
}

function windowlessTimeout(callback: () => void, milliseconds: number): ReturnType<typeof setTimeout> {
  return setTimeout(callback, milliseconds);
}

function expectSmtpCode(response: string, allowedCodes: number[]) {
  const code = Number(response.slice(0, 3));
  if (!allowedCodes.includes(code)) {
    throw new Error(`Unexpected SMTP response: ${response}`);
  }
}

async function sendSmtpCommand(socket: net.Socket | tls.TLSSocket, command: string, allowedCodes: number[]) {
  socket.write(`${command}\r\n`);
  const response = await readSmtpResponse(socket);
  expectSmtpCode(response, allowedCodes);
}

function connectSocket(config: SmtpConfig): Promise<net.Socket | tls.TLSSocket> {
  return new Promise((resolve, reject) => {
    const socket = config.secure
      ? tls.connect(
          {
            host: config.host,
            port: config.port,
            servername: config.host,
            rejectUnauthorized: config.rejectUnauthorized,
          },
          () => {
            socket.off("error", onError);
            resolve(socket);
          },
        )
      : net.connect({ host: config.host, port: config.port }, () => {
          socket.off("error", onError);
          resolve(socket);
        });

    function onError(error: Error) {
      reject(error);
    }

    socket.once("error", onError);
    socket.setTimeout(15000, () => socket.destroy(new Error("SMTP socket timeout")));
  });
}

function upgradeToTls(socket: net.Socket | tls.TLSSocket, config: SmtpConfig): Promise<tls.TLSSocket> {
  return new Promise((resolve, reject) => {
    const secureSocket = tls.connect(
      {
        socket,
        servername: config.host,
        rejectUnauthorized: config.rejectUnauthorized,
      },
      () => {
        secureSocket.off("error", onError);
        resolve(secureSocket);
      },
    );

    function onError(error: Error) {
      reject(error);
    }

    secureSocket.once("error", onError);
    secureSocket.setTimeout(15000, () => secureSocket.destroy(new Error("SMTP TLS timeout")));
  });
}

function buildSmtpMessage(params: {
  from: string;
  to: string[];
  subject: string;
  text: string;
  replyTo?: string;
}): string {
  const headers = [
    `From: FEMICTEC <${params.from}>`,
    `To: ${params.to.map((email) => `<${email}>`).join(", ")}`,
    ...(params.replyTo ? [`Reply-To: <${params.replyTo}>`] : []),
    `Subject: ${encodeHeader(params.subject)}`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
  ];

  return `${headers.join("\r\n")}\r\n\r\n${params.text}`;
}

function dotStuff(message: string): string {
  return message.replace(/^\./gm, "..");
}

async function sendSmtpMail(params: {
  from: string;
  to: string[];
  subject: string;
  text: string;
  replyTo?: string;
}, config: SmtpConfig) {
  let socket = await connectSocket(config);

  try {
    expectSmtpCode(await readSmtpResponse(socket), [220]);
    await sendSmtpCommand(socket, "EHLO femictec.local", [250]);

    if (!config.secure) {
      await sendSmtpCommand(socket, "STARTTLS", [220]);
      socket = await upgradeToTls(socket, config);
      await sendSmtpCommand(socket, "EHLO femictec.local", [250]);
    }

    if (config.user && config.pass) {
      await sendSmtpCommand(socket, "AUTH LOGIN", [334]);
      await sendSmtpCommand(socket, Buffer.from(config.user, "utf8").toString("base64"), [334]);
      await sendSmtpCommand(socket, Buffer.from(config.pass, "utf8").toString("base64"), [235]);
    }

    await sendSmtpCommand(socket, `MAIL FROM:<${config.from}>`, [250]);
    for (const email of params.to) {
      await sendSmtpCommand(socket, `RCPT TO:<${email}>`, [250, 251]);
    }
    await sendSmtpCommand(socket, "DATA", [354]);

    socket.write(`${dotStuff(buildSmtpMessage(params))}\r\n.\r\n`);
    expectSmtpCode(await readSmtpResponse(socket), [250]);
    await sendSmtpCommand(socket, "QUIT", [221]);
  } finally {
    socket.end();
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const payload: ContactPayload = {
      nome: String(data.get("nome") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      assunto: String(data.get("assunto") ?? "").trim(),
      mensagem: String(data.get("mensagem") ?? "").trim(),
    };

    if (!payload.nome || !payload.email || !payload.assunto || !payload.mensagem) {
      return NextResponse.json({ error: "Campos obrigatorios nao preenchidos." }, { status: 400 });
    }

    if (!isValidEmail(payload.email)) {
      return NextResponse.json({ error: "Email de retorno invalido." }, { status: 400 });
    }

    const contatoConfig = await getContatoNotificacaoConfig();
    const fallbackDestino = (process.env.CONTACT_TO_EMAIL || "").trim();
    const destinatariosEvento = [
      ...new Set([
        ...(contatoConfig.destinatariosEvento.length ? contatoConfig.destinatariosEvento : []),
        ...(isValidEmail(fallbackDestino) ? [fallbackDestino] : []),
        contatoConfig.emailPrincipal,
      ]),
    ].filter((email) => isValidEmail(email));

    if (destinatariosEvento.length === 0) {
      return NextResponse.json({ error: "Nenhum destinatario institucional valido configurado no Strapi." }, { status: 500 });
    }

    const smtpConfig = getSmtpConfig();
    if (!smtpConfig) {
      return NextResponse.json(
        { error: "SMTP nao configurado no servidor. Defina SMTP_HOST, SMTP_FROM e credenciais para disparo automatico." },
        { status: 503 },
      );
    }

    const assuntoEvento = fillTemplate(contatoConfig.notificacaoAssuntoTemplate, payload);
    const mensagemEvento = fillTemplate(contatoConfig.notificacaoMensagemTemplate, payload);
    const assuntoConfirmacao = fillTemplate(contatoConfig.confirmacaoAssuntoTemplate, payload);
    const mensagemConfirmacao = fillTemplate(contatoConfig.confirmacaoMensagemTemplate, payload);

    await sendSmtpMail(
      {
        from: smtpConfig.from,
        to: destinatariosEvento,
        subject: assuntoEvento,
        text: mensagemEvento,
        replyTo: payload.email,
      },
      smtpConfig,
    );

    await sendSmtpMail(
      {
        from: smtpConfig.from,
        to: [payload.email],
        subject: assuntoConfirmacao,
        text: mensagemConfirmacao,
      },
      smtpConfig,
    );

    return NextResponse.json({ ok: true, mode: "sent" });
  } catch {
    return NextResponse.json({ error: "Erro inesperado ao preparar mensagem." }, { status: 500 });
  }
}

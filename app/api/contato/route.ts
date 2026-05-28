import net from "node:net";
import tls from "node:tls";

import { NextResponse } from "next/server";

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
  destinoEmail: string;
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

function buildEmailText(payload: ContactPayload): string {
  return [
    "Nova mensagem enviada pelo formulario de contato da FEMICTEC.",
    "",
    `Nome: ${payload.nome}`,
    `Email para retorno: ${payload.email}`,
    `Assunto: ${payload.assunto}`,
    "",
    "Mensagem:",
    payload.mensagem,
    "",
    "Uma copia desta mensagem foi direcionada ao email informado pelo usuario.",
  ].join("\n");
}

function buildMailtoUrl(payload: ContactPayload): string {
  const subject = `Contato FEMICTEC - ${payload.assunto}`;
  const params = new URLSearchParams({
    cc: payload.email,
    subject,
    body: buildEmailText(payload),
  });

  return `mailto:${payload.destinoEmail}?${params.toString()}`;
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

function buildSmtpMessage(payload: ContactPayload, from: string): string {
  const subject = `Contato FEMICTEC - ${payload.assunto}`;
  const text = buildEmailText(payload);
  const headers = [
    `From: FEMICTEC <${from}>`,
    `To: <${payload.destinoEmail}>`,
    `Cc: <${payload.email}>`,
    `Reply-To: <${payload.email}>`,
    `Subject: ${encodeHeader(subject)}`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
  ];

  return `${headers.join("\r\n")}\r\n\r\n${text}`;
}

function dotStuff(message: string): string {
  return message.replace(/^\./gm, "..");
}

async function sendSmtpMail(payload: ContactPayload, config: SmtpConfig) {
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
    await sendSmtpCommand(socket, `RCPT TO:<${payload.destinoEmail}>`, [250, 251]);
    await sendSmtpCommand(socket, `RCPT TO:<${payload.email}>`, [250, 251]);
    await sendSmtpCommand(socket, "DATA", [354]);

    socket.write(`${dotStuff(buildSmtpMessage(payload, config.from))}\r\n.\r\n`);
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
      destinoEmail: (
        process.env.CONTACT_TO_EMAIL ||
        String(data.get("destinoEmail") ?? "").trim() ||
        "femictec@novohamburgo.rs.gov.br"
      ).trim(),
    };

    if (!payload.nome || !payload.email || !payload.assunto || !payload.mensagem) {
      return NextResponse.json({ error: "Campos obrigatorios nao preenchidos." }, { status: 400 });
    }

    if (!isValidEmail(payload.email)) {
      return NextResponse.json({ error: "Email de retorno invalido." }, { status: 400 });
    }

    if (!isValidEmail(payload.destinoEmail)) {
      return NextResponse.json({ error: "Email institucional invalido." }, { status: 400 });
    }

    const smtpConfig = getSmtpConfig();

    if (smtpConfig) {
      try {
        await sendSmtpMail(payload, smtpConfig);
        return NextResponse.json({ ok: true, mode: "sent" });
      } catch {
        return NextResponse.json({
          ok: true,
          mode: "mailto",
          mailtoUrl: buildMailtoUrl(payload),
        });
      }
    }

    return NextResponse.json({
      ok: true,
      mode: "mailto",
      mailtoUrl: buildMailtoUrl(payload),
    });
  } catch {
    return NextResponse.json({ error: "Erro inesperado ao preparar mensagem." }, { status: 500 });
  }
}

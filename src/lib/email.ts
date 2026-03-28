import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import { transporter, defaultMailOptions } from "./nodemailer";
import type {
  SendMailOptions,
  RegistrationCompletePayload,
  VerifyEmailPayload,
  ResetPasswordPayload,
  OrderPlacedPayload,
  OrderUpdatedPayload,
} from "@/interfaces/email";

// ─── Template Loader ─────────────────────────────────────────────────────────

const TEMPLATES_DIR = path.join(process.cwd(), "src/templates/emails");

function loadTemplate(templateName: string) {
  const filePath = path.join(TEMPLATES_DIR, `${templateName}.handlebars`);
  const source = fs.readFileSync(filePath, "utf-8");
  return Handlebars.compile(source);
}

// ─── Core Send Function ───────────────────────────────────────────────────────

async function sendTemplateMail({
  to,
  subject,
  templateName,
  context,
}: SendMailOptions) {
  try {
    const template = loadTemplate(templateName);
    const html = template({ year: new Date().getFullYear(), ...context });

    const info = await transporter.sendMail({
      ...defaultMailOptions,
      to,
      subject,
      html,
    });

    console.log(`[email] Sent "${templateName}" to ${to} — id: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[email] Failed to send "${templateName}" to ${to}:`, error);
    return { success: false, error };
  }
}

// ─── Typed Send Functions ─────────────────────────────────────────────────────

export async function sendRegistrationCompleteEmail(
  to: string,
  payload: RegistrationCompletePayload
) {
  return sendTemplateMail({
    to,
    subject: "Welcome to Geenah's Stitches!",
    templateName: "registration-complete",
    context: payload,
  });
}

export async function sendVerifyEmail(to: string, payload: VerifyEmailPayload) {
  return sendTemplateMail({
    to,
    subject: "Verify your email — Geenah's Stitches",
    templateName: "verify-email",
    context: payload,
  });
}

export async function sendResetPasswordEmail(
  to: string,
  payload: ResetPasswordPayload
) {
  return sendTemplateMail({
    to,
    subject: "Reset your password — Geenah's Stitches",
    templateName: "reset-password",
    context: payload,
  });
}

export async function sendOrderPlacedEmail(
  to: string,
  payload: OrderPlacedPayload
) {
  return sendTemplateMail({
    to,
    subject: `Order Confirmed #${payload.orderNumber} — Geenah's Stitches`,
    templateName: "order-placed",
    context: payload,
  });
}

export async function sendOrderUpdatedEmail(
  to: string,
  payload: OrderUpdatedPayload
) {
  return sendTemplateMail({
    to,
    subject: `Order Update #${payload.orderNumber} — Geenah's Stitches`,
    templateName: "order-updated",
    context: payload,
  });
}

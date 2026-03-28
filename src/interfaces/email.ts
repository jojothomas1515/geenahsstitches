// ─── Email: Internal ──────────────────────────────────────────────────────────

export interface SendMailOptions {
  to: string;
  subject: string;
  templateName: string;
  context: object;
}

// ─── Email: Payloads ──────────────────────────────────────────────────────────

export interface RegistrationCompletePayload {
  name: string;
  storeUrl: string;
}

export interface VerifyEmailPayload {
  name: string;
  verificationUrl: string;
}

export interface ResetPasswordPayload {
  name: string;
  resetUrl: string;
}

export interface EmailOrderItem {
  name: string;
  quantity: number;
  price: string;
}

export interface OrderPlacedPayload {
  name: string;
  orderNumber: string;
  items: EmailOrderItem[];
  totalAmount: string;
  orderUrl: string;
}

export interface OrderUpdatedPayload {
  name: string;
  orderNumber: string;
  status: string;
  trackingNumber?: string;
  orderUrl: string;
}

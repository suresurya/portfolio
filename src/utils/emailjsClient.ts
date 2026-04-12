import emailjs from "@emailjs/browser";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export type ContactSendResult = {
  autoReplySent: boolean;
};

type ContactSendErrorCode =
  | "origin-not-allowed"
  | "service-configuration"
  | "template-configuration"
  | "network"
  | "unknown";

export class ContactSendError extends Error {
  code: ContactSendErrorCode;
  status?: number;
  details?: string;

  constructor(message: string, code: ContactSendErrorCode, status?: number, details?: string) {
    super(message);
    this.name = "ContactSendError";
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

const env = import.meta.env as Record<string, string | undefined>;

const EMAILJS_SERVICE_ID = env.VITE_EMAILJS_SERVICE_ID || "";
const EMAILJS_PUBLIC_KEY = env.VITE_EMAILJS_PUBLIC_KEY || "";
const EMAILJS_OWNER_TEMPLATE_ID =
  env.VITE_EMAILJS_OWNER_TEMPLATE_ID || "";
const EMAILJS_AUTO_REPLY_TEMPLATE_ID =
  env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID || "";
const OWNER_RECEIVE_EMAIL =
  env.VITE_OWNER_RECEIVE_EMAIL || "suresrivenkatramasurya@gmail.com";

let isEmailJsInitialized = false;

const asMessageText = (error: unknown): string => {
  if (typeof error === "string") {
    return error;
  }

  if (error && typeof error === "object") {
    const maybeMessage = (error as { text?: string; message?: string }).text ??
      (error as { text?: string; message?: string }).message;

    if (typeof maybeMessage === "string") {
      return maybeMessage;
    }
  }

  return "Unknown EmailJS error.";
};

const asStatusCode = (error: unknown): number | undefined => {
  if (error && typeof error === "object") {
    const maybeStatus = (error as { status?: number }).status;
    if (typeof maybeStatus === "number") {
      return maybeStatus;
    }
  }

  return undefined;
};

const toContactSendError = (error: unknown): ContactSendError => {
  const text = asMessageText(error);
  const status = asStatusCode(error);
  const lowerText = text.toLowerCase();

  if (lowerText.includes("origin") && lowerText.includes("not allowed")) {
    return new ContactSendError(
      "This domain is not allowed in EmailJS Allowed Origins.",
      "origin-not-allowed",
      status,
      text
    );
  }

  if (lowerText.includes("service") || lowerText.includes("public key")) {
    return new ContactSendError(
      "EmailJS service or public key configuration is invalid.",
      "service-configuration",
      status,
      text
    );
  }

  if (lowerText.includes("template")) {
    return new ContactSendError(
      "EmailJS template configuration is invalid or missing required variables.",
      "template-configuration",
      status,
      text
    );
  }

  if (lowerText.includes("network") || status === 0) {
    return new ContactSendError(
      "Network error while contacting EmailJS.",
      "network",
      status,
      text
    );
  }

  return new ContactSendError("Failed to send message via EmailJS.", "unknown", status, text);
};

export const getContactSendErrorMessage = (error: unknown): string => {
  const normalized = error instanceof ContactSendError ? error : toContactSendError(error);
  const devSuffix =
    import.meta.env.DEV && normalized.details
      ? ` (EmailJS details: ${normalized.details})`
      : "";

  if (normalized.code === "origin-not-allowed") {
    return `Failed to send message. Add ${window.location.origin} to EmailJS Allowed Origins and try again.${devSuffix}`;
  }

  if (normalized.code === "service-configuration") {
    return `Failed to send message. Verify EmailJS Service ID and Public Key.${devSuffix}`;
  }

  if (normalized.code === "template-configuration") {
    return `Failed to send message. Verify EmailJS template IDs and variables (name, email, message).${devSuffix}`;
  }

  if (normalized.code === "network") {
    return `Failed to send message due to a network issue. Try again.${devSuffix}`;
  }

  return `Failed to send message. Try again.${devSuffix}`;
};

export const sendContactMessage = async (payload: ContactPayload): Promise<ContactSendResult> => {
  if (!isEmailJsInitialized) {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    isEmailJsInitialized = true;
  }

  const ownerParams = {
    name: payload.name,
    email: payload.email,
    message: payload.message,
    from_name: payload.name,
    from_email: payload.email,
    reply_to: payload.email,
    user_name: payload.name,
    user_email: payload.email,
    user_message: payload.message,
    to_name: "Sure Surya",
    to_email: OWNER_RECEIVE_EMAIL,
    subject: `Portfolio Contact from ${payload.name}`,
    website: window.location.origin,
  };

  const autoReplyParams = {
    name: payload.name,
    email: payload.email,
    to_name: payload.name,
    to_email: payload.email,
    from_name: "Sure Surya",
    from_email: OWNER_RECEIVE_EMAIL,
    reply_to: OWNER_RECEIVE_EMAIL,
    website: window.location.origin,
  };

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_OWNER_TEMPLATE_ID, ownerParams);
  } catch (error) {
    throw toContactSendError(error);
  }

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_AUTO_REPLY_TEMPLATE_ID, autoReplyParams);

    return { autoReplySent: true };
  } catch (error) {
    const normalized = toContactSendError(error);
    console.warn("Auto-reply mail failed", {
      status: normalized.status,
      details: normalized.details,
    });
    return { autoReplySent: false };
  }
};

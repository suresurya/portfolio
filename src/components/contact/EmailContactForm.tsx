import { getContactSendErrorMessage, sendContactMessage } from "../../utils/emailjsClient";
import { toast } from "sonner";
import confetti from "canvas-confetti";

type EmailContactFormProps = {
  compact?: boolean;
};

type ContactFormFields = {
  name: string;
  email: string;
  message: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUBMIT_COOLDOWN_MS = 15000;

const initialFormFields: ContactFormFields = {
  name: "",
  email: "",
  message: "",
};

const EmailContactForm = ({ compact = false }: EmailContactFormProps) => {
  const [fields, setFields] = useState<ContactFormFields>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("contactFormDraft");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) { /* ignore */ }
      }
    }
    return initialFormFields;
  });

  useEffect(() => {
    localStorage.setItem("contactFormDraft", JSON.stringify(fields));
  }, [fields]);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormFields, string>>>({});
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [statusType, setStatusType] = useState<"idle" | "success" | "error" | "info">("idle");
  const [isSending, setIsSending] = useState(false);
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const [tickNow, setTickNow] = useState(Date.now());

  useEffect(() => {
    if (!cooldownUntil) return;

    const intervalId = window.setInterval(() => {
      setTickNow(Date.now());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [cooldownUntil]);

  const cooldownRemainingMs = useMemo(() => {
    if (!cooldownUntil) return 0;
    return Math.max(cooldownUntil - tickNow, 0);
  }, [cooldownUntil, tickNow]);

  useEffect(() => {
    if (cooldownUntil && cooldownRemainingMs === 0) {
      setCooldownUntil(null);
    }
  }, [cooldownRemainingMs, cooldownUntil]);

  const cooldownSeconds = Math.ceil(cooldownRemainingMs / 1000);
  const isCooldownActive = cooldownRemainingMs > 0;

  const validate = () => {
    const nextErrors: Partial<Record<keyof ContactFormFields, string>> = {};

    if (!fields.name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!fields.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!EMAIL_REGEX.test(fields.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!fields.message.trim()) {
      nextErrors.message = "Message is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onFieldChange = (field: keyof ContactFormFields, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setStatusMessage("");
    setStatusType("idle");
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isCooldownActive) {
      setStatusType("info");
      setStatusMessage(`Please wait ${cooldownSeconds}s before sending another message.`);
      return;
    }

    if (!validate()) {
      setStatusType("error");
      setStatusMessage("Please fix the highlighted fields.");
      return;
    }

    try {
      setIsSending(true);
      setStatusType("idle");
      setStatusMessage("");

      const result = await sendContactMessage({
        name: fields.name.trim(),
        email: fields.email.trim(),
        message: fields.message.trim(),
      });

      setFields(initialFormFields);
      localStorage.removeItem("contactFormDraft");
      if (result.autoReplySent) {
        setStatusType("success");
        setStatusMessage("Message sent successfully!");
        toast.success("Message sent successfully!");
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#ffffff", "#cccccc", "#999999"]
        });
      } else {
        setStatusType("info");
        const msg = "Message sent successfully! Auto-reply could not be delivered, but your message reached me.";
        setStatusMessage(msg);
        toast.info(msg);
      }
      setCooldownUntil(Date.now() + SUBMIT_COOLDOWN_MS);
    } catch (error) {
      setStatusType("error");
      const errorMsg = getContactSendErrorMessage(error);
      setStatusMessage(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className={compact ? "grid gap-3" : "grid gap-4 sm:grid-cols-2"}>
        <label className="space-y-1">
          <span className="text-sm text-[color:var(--color-text-subtle)]">Name</span>
          <input
            type="text"
            value={fields.name}
            onChange={(event) => onFieldChange("name", event.target.value)}
            className="w-full rounded-xl border theme-border-subtle bg-[color:var(--color-bg-elevated)] px-3 py-2 text-sm text-[color:var(--color-text-main)] outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]/60"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            placeholder="Your name"
            required
          />
          {errors.name && (
            <p id="contact-name-error" className="text-xs text-red-500">
              {errors.name}
            </p>
          )}
        </label>

        <label className="space-y-1">
          <span className="text-sm text-[color:var(--color-text-subtle)]">Email</span>
          <input
            type="email"
            value={fields.email}
            onChange={(event) => onFieldChange("email", event.target.value)}
            className="w-full rounded-xl border theme-border-subtle bg-[color:var(--color-bg-elevated)] px-3 py-2 text-sm text-[color:var(--color-text-main)] outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]/60"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            placeholder="you@example.com"
            required
          />
          {errors.email && (
            <p id="contact-email-error" className="text-xs text-red-500">
              {errors.email}
            </p>
          )}
        </label>
      </div>

      <label className="space-y-1 block">
        <span className="text-sm text-[color:var(--color-text-subtle)]">Message</span>
        <textarea
          value={fields.message}
          onChange={(event) => onFieldChange("message", event.target.value)}
          className="w-full min-h-32 rounded-xl border theme-border-subtle bg-[color:var(--color-bg-elevated)] px-3 py-2 text-sm text-[color:var(--color-text-main)] outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]/60"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          placeholder="Write your project or hiring requirement..."
          required
        />
        {errors.message && (
          <p id="contact-message-error" className="text-xs text-red-500">
            {errors.message}
          </p>
        )}
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={isSending || isCooldownActive}
          className="inline-flex items-center justify-center rounded-xl border theme-border-subtle px-4 py-2 text-sm font-medium hover:bg-[color:var(--color-accent-soft)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSending ? "Sending..." : "Send Message"}
        </button>

        {isCooldownActive && (
          <span className="text-xs text-[color:var(--color-text-subtle)]" aria-live="polite">
            You can send again in {cooldownSeconds}s.
          </span>
        )}
      </div>

      {statusMessage && (
        <p
          className={`text-sm ${
            statusType === "success"
              ? "text-green-500"
              : statusType === "error"
                ? "text-red-500"
                : "text-[color:var(--color-text-subtle)]"
          }`}
          aria-live="polite"
        >
          {statusMessage}
        </p>
      )}
    </form>
  );
};

export default EmailContactForm;

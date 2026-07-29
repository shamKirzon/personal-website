import { useState } from "react";
import { Check, Loader2, Mail, MapPin } from "lucide-react";
import { SiFacebook, SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { toast } from "sonner";
import * as z from "zod";
import axios from "axios";
import { useLanguage } from "@/i18n/LanguageContext";

const socialLinks = [
  { Icon: SiFacebook, label: "Facebook", url: "https://www.facebook.com/shammykirzon" },
  { Icon: FaLinkedin, label: "LinkedIn", url: "https://www.linkedin.com/in/shammy-kierson-suyat/" },
  { Icon: SiGithub, label: "GitHub", url: "https://github.com/shamKirzon" },
];

const MessageSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

const errorToastStyle = {
  background: "#7f1d1d",
  color: "#f5f5f5",
  border: "1px solid #991b1b",
  padding: "10px 14px",
};

const successToastStyle = {
  background: "#14532d",
  color: "#f5f5f5",
  border: "1px solid #166534",
  padding: "10px 14px",
};

const GetInTouchSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [justSent, setJustSent] = useState(false);
  const [shake, setShake] = useState(false);
  const { t } = useLanguage();

  const resetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
  };

  const triggerShake = () => {
    setShake(false);
    requestAnimationFrame(() => setShake(true));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isIncomplete = !name.trim() || !email.trim() || !message.trim();
    if (isIncomplete) {
      toast.error(t.getInTouch.toastIncompleteTitle, {
        id: "contact-form-error",
        description: t.getInTouch.toastIncompleteDesc,
        style: errorToastStyle,
      });
      triggerShake();
      return;
    }

    const result = MessageSchema.safeParse({ name, email, message });
    if (!result.success) {
      toast.error(t.getInTouch.toastInvalidTitle, {
        id: "contact-form-error",
        description: t.getInTouch.toastInvalidDesc,
        style: errorToastStyle,
      });
      triggerShake();
      return;
    }

    if (isSending) return;

    setIsSending(true);
    try {
      await axios.post(`${import.meta.env.VITE_RENDER_API_KEY}/api/message`, {
        data: { name, email, message },
      });
      toast.success(`${t.getInTouch.toastSuccessTitle}, ${name.split(" ")[0]}!`, {
        description: t.getInTouch.toastSuccessDesc,
        style: successToastStyle,
      });
      resetForm();
      setJustSent(true);
      window.setTimeout(() => setJustSent(false), 1800);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="get-in-touch" className="mx-auto max-w-[760px] px-5 sm:px-10 pt-16 pb-16">
      <p className="mb-4 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--ink-mid)]">
        {t.getInTouch.label}
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-[var(--line-subtle)] bg-[var(--panel-bg-deep)] p-5 shadow-[var(--panel-shadow)]">
          <h3 className="text-[20px] font-semibold text-[var(--ink)]">
            {t.getInTouch.connectTitle}
          </h3>

          <p className="mt-4 border-l border-[var(--line)] pl-3 text-[15px] leading-relaxed text-[var(--ink-mid)]">
            {t.getInTouch.connectIntro}
          </p>

          <div className="mt-5 flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <Mail
                size={18}
                strokeWidth={1.75}
                className="mt-0.5 shrink-0 text-[var(--ink)]"
              />
              <div>
                <p className="text-[15px] font-medium text-[var(--ink)]">
                  {t.getInTouch.emailLabel}
                </p>
                <a
                  href="mailto:shammysuyat@gmail.com"
                  className="text-[14px] text-[var(--ink-soft)] hover:text-[var(--ink)] hover:underline"
                >
                  shammysuyat@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin
                size={18}
                strokeWidth={1.75}
                className="mt-0.5 shrink-0 text-[var(--ink)]"
              />
              <div>
                <p className="text-[15px] font-medium text-[var(--ink)]">
                  {t.getInTouch.locationLabel}
                </p>
                <p className="text-[14px] text-[var(--ink-mid)]">
                  {t.getInTouch.locationValue}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 border-t border-[var(--line-hairline)] pt-5">
            <p className="mb-3 text-[14px] text-[var(--ink-mid)]">
              {t.getInTouch.socialLabel}
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map(({ Icon, label, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="text-[var(--ink)] transition-colors hover:text-[var(--ink-mid)]"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          onAnimationEnd={() => setShake(false)}
          className={`flex flex-col gap-3 rounded-xl border border-[var(--line-subtle)] bg-[var(--panel-bg-deep)] p-5 shadow-[var(--panel-shadow)] ${
            shake ? "animate-shake" : ""
          }`}
        >
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={t.getInTouch.namePlaceholder}
            className="h-11 w-full rounded-lg border border-[var(--line-subtle)] bg-[var(--surface-muted)] px-4 text-[15px] text-[var(--ink)] outline-none transition-all duration-150 placeholder:text-[var(--ink-faint)] focus:border-[var(--line-strong)] focus:shadow-[0_0_0_3px_var(--overlay-soft)]"
          />

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={t.getInTouch.emailPlaceholder}
            className="h-11 w-full rounded-lg border border-[var(--line-subtle)] bg-[var(--surface-muted)] px-4 text-[15px] text-[var(--ink)] outline-none transition-all duration-150 placeholder:text-[var(--ink-faint)] focus:border-[var(--line-strong)] focus:shadow-[0_0_0_3px_var(--overlay-soft)]"
          />

          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={t.getInTouch.messagePlaceholder}
            rows={5}
            className="w-full resize-none rounded-lg border border-[var(--line-subtle)] bg-[var(--surface-muted)] px-4 py-3 text-[15px] text-[var(--ink)] outline-none transition-all duration-150 placeholder:text-[var(--ink-faint)] focus:border-[var(--line-strong)] focus:shadow-[0_0_0_3px_var(--overlay-soft)]"
          />

          <button
            type="submit"
            disabled={isSending}
            className={`mt-auto flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg text-[15px] font-semibold transition-all duration-150 hover:scale-[1.02] hover:opacity-90 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100 ${
              justSent
                ? "bg-[#22c55e] text-white"
                : "bg-[var(--cta-bg)] text-[var(--cta-ink)]"
            }`}
          >
            {isSending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                {t.getInTouch.sendingButton}
              </>
            ) : justSent ? (
              <>
                <Check size={16} className="animate-in zoom-in duration-300" />
                {t.getInTouch.sentButton}
              </>
            ) : (
              t.getInTouch.sendButton
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default GetInTouchSection;

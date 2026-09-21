import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/site/PageHeader";

const title = "Sign In — Content Manager | DOS";
const description = "Sign in to update DOS website content.";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

const fieldClass =
  "w-full border-b border-border bg-transparent py-3 text-base outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-foreground";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) void navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      setBusy(false);
      if (error) return setMessage(error.message);
      if (!data.session) return setMessage("Check your email to confirm your account, then sign in.");
      void navigate({ to: "/admin" });
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return setMessage(error.message);
    void navigate({ to: "/admin" });
  }

  return (
    <>
      <PageHeader
        eyebrow="Content Manager"
        title={mode === "signin" ? "Sign in to manage content." : "Create your manager account."}
        intro="Only approved accounts can edit the published website."
      />
      <section className="py-16 lg:py-24">
        <div className="container-x max-w-xl">
          <form onSubmit={onSubmit} className="grid gap-8">
            <label className="block">
              <span className="eyebrow">Email</span>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={fieldClass}
                placeholder="you@dosgroup.com.bd"
              />
            </label>
            <label className="block">
              <span className="eyebrow">Password</span>
              <input
                required
                type="password"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={fieldClass}
                placeholder="••••••••"
              />
            </label>
            <div className="flex flex-wrap items-center gap-6">
              <button
                type="submit"
                disabled={busy}
                className="bg-foreground px-8 py-4 text-[0.72rem] font-semibold tracking-[0.16em] text-background uppercase transition-colors hover:bg-accent disabled:opacity-60"
              >
                {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
              </button>
              <button
                type="button"
                className="rule-link text-sm"
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              >
                {mode === "signin" ? "Create an account" : "I already have an account"}
              </button>
            </div>
            {message ? (
              <p role="status" className="text-sm text-muted-foreground">
                {message}
              </p>
            ) : null}
          </form>
        </div>
      </section>
    </>
  );
}

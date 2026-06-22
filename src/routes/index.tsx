import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "csvIQ — AI content QA, inside the cell" },
      { name: "description", content: "AI-powered grading, fact-checking, and SEO scoring as native Excel formulas. Built for teams shipping hundreds of pages." },
      { property: "og:title", content: "csvIQ — AI content QA, inside the cell" },
      { property: "og:description", content: "AI-powered grading, fact-checking, and SEO scoring as native Excel formulas." },
    ],
  }),
  component: Splash,
});

type FnId = "ASK" | "VERIFY" | "AUDIT_HTML" | "CHECK_BRAND" | "LOCAL_SCORE" | "SEO_SCORE" | "FIND_MISSING" | "FACT_CHECK" | "READABILITY" | "COMPARE" | "PAGE_SCORE";

const FUNCTIONS: { name: FnId; sig: string; desc: string; cell: string; formula: string }[] = [
  { name: "ASK",         sig: "(question, content, [...context])", desc: "Free-form Q&A about a page",            cell: "F2", formula: `=ASK("Targets emergency intent?", C2)` },
  { name: "VERIFY",      sig: "(content, sourceData)",             desc: "Per-field match vs. ground truth",      cell: "G2", formula: `=VERIFY(C2, Truth!A:B)` },
  { name: "AUDIT_HTML",  sig: "(content)",                         desc: "Grade, word count, headings, schema",   cell: "H2", formula: `=AUDIT_HTML(C2)` },
  { name: "CHECK_BRAND", sig: "(content)",                         desc: "Brand voice & compliance check",        cell: "I2", formula: `=CHECK_BRAND(C2)` },
  { name: "LOCAL_SCORE", sig: "(content)",                         desc: "0–100 local SEO signal",                cell: "J2", formula: `=LOCAL_SCORE(C2)` },
  { name: "SEO_SCORE",   sig: "(content)",                         desc: "Letter-grade SEO + sub-grades",         cell: "K2", formula: `=SEO_SCORE(C2)` },
  { name: "FIND_MISSING",sig: "(content)",                         desc: "Checklist of missing elements",         cell: "L2", formula: `=FIND_MISSING(C2)` },
  { name: "FACT_CHECK",  sig: "(content, sourceData)",             desc: "List factual inconsistencies",          cell: "M2", formula: `=FACT_CHECK(C2, Truth!A:B)` },
  { name: "READABILITY", sig: "(content)",                         desc: "Reading grade level + tone",            cell: "N2", formula: `=READABILITY(C2)` },
  { name: "COMPARE",     sig: "(content1, content2)",              desc: "Plain-language version diff",           cell: "O2", formula: `=COMPARE(C2, D2)` },
  { name: "PAGE_SCORE",  sig: "(content)",                         desc: "Single composite 0–100 score",          cell: "P2", formula: `=PAGE_SCORE(C2)` },
];

function Splash() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <Marquee />
      <FormulaShowcase />
      <LiveAudit />
      <FunctionsGrid />
      <DriftMonitor />
      <BulkSheet />
      <TwoWays />
      <Security />
      <Footer />
    </div>
  );
}

function ThemeToggle() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const prefers = typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: light)").matches;
    const isLight = stored ? stored === "light" : !!prefers;
    setLight(isLight);
    document.documentElement.classList.toggle("light", isLight);
  }, []);
  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("theme", next ? "light" : "dark");
  };
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="font-mono text-xs px-3 py-2 rounded-md border border-border hover:border-primary hover:text-primary transition-colors"
    >
      {light ? "◐ dark" : "◑ light"}
    </button>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-md bg-primary text-primary-foreground grid place-items-center font-mono font-bold text-xs">
            ⌘
          </div>
          <span className="font-mono text-sm tracking-tight">
            csv<span className="text-primary">IQ</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#functions" className="hover:text-foreground transition-colors">Functions</a>
          <a href="#install" className="hover:text-foreground transition-colors">Install</a>
          <a href="#security" className="hover:text-foreground transition-colors">Security</a>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="https://x.com/zbailey83"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs px-3 py-2 rounded-md border border-border hover:border-primary hover:text-primary transition-colors"
          >
            @zbailey83 →
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative">
      <div className="absolute inset-0 grid-bg grid-bg-fade pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--gradient-radial)" }}
      />
      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-32">
        <div className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-full border border-border bg-card/50 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-muted-foreground">v1.0 · powered by OpenRouter</span>
        </div>

        <h1 className="font-display text-[clamp(3rem,9vw,8.5rem)] leading-[0.95] text-balance">
          AI content QA,
          <br />
          <span className="italic text-primary">inside</span> the cell.
        </h1>

        <p className="mt-8 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
          Grade content, score SEO, catch brand-voice slips, and fact-check
          against your source-of-truth — all from an Excel formula. Built
          for teams shipping hundreds of pages.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href="https://github.com/redactedCHAD/csvIQ"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3.5 rounded-md font-medium hover:glow transition-all"
          >
            Get csvIQ
            <span className="font-mono text-xs opacity-60 group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <a
            href="#functions"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md border border-border hover:border-foreground transition-colors font-mono text-sm"
          >
            See the functions
          </a>
        </div>

        <div className="mt-24">
          <CellDemo />
        </div>
      </div>
    </section>
  );
}

function CellDemo() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % 4), 2200);
    return () => clearInterval(t);
  }, []);

  const rows = [
    { url: "plumbing-austin.html", score: 92, grade: "A", flag: "ok" },
    { url: "hvac-dallas.html", score: 74, grade: "B", flag: "warn" },
    { url: "roofing-houston.html", score: 48, grade: "D", flag: "fail" },
    { url: "electric-sa.html", score: 87, grade: "A−", flag: "ok" },
  ];

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden shadow-2xl">
      {/* window chrome */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/40">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-destructive/70" />
          <span className="w-3 h-3 rounded-full bg-accent/80" />
          <span className="w-3 h-3 rounded-full bg-primary/80" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">local-seo-pages.xlsx</span>
        <span className="font-mono text-xs text-muted-foreground">●  live</span>
      </div>

      {/* formula bar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-background/50">
        <span className="font-mono text-xs text-muted-foreground w-8">D2</span>
        <span className="font-mono text-sm text-primary">ƒx</span>
        <code className="font-mono text-sm flex-1 truncate">
          <span className="text-muted-foreground">=</span>
          <span className="text-foreground">PAGE_SCORE</span>
          <span className="text-muted-foreground">(</span>
          <span className="text-accent">C2</span>
          <span className="text-muted-foreground">)</span>
          <span className="cursor-blink" />
        </code>
      </div>

      {/* grid */}
      <div className="grid grid-cols-[40px_1fr_120px_100px_80px] text-sm font-mono">
        {/* header */}
        {["", "A · URL", "C · Content", "D · Score", "E · Flag"].map((h, i) => (
          <div key={i} className="px-3 py-2 border-b border-r border-border text-muted-foreground text-xs uppercase tracking-wider bg-muted/30">
            {h}
          </div>
        ))}
        {rows.map((r, i) => {
          const active = i === step;
          return (
            <div key={r.url} className="contents">
              <div className={`px-3 py-3 border-b border-r border-border text-muted-foreground ${active ? "bg-primary/5" : ""}`}>{i + 2}</div>
              <div className={`px-3 py-3 border-b border-r border-border truncate ${active ? "bg-primary/5" : ""}`}>{r.url}</div>
              <div className={`px-3 py-3 border-b border-r border-border text-muted-foreground truncate ${active ? "bg-primary/5" : ""}`}>
                &lt;html&gt;…&lt;/html&gt;
              </div>
              <div className={`px-3 py-3 border-b border-r border-border ${active ? "bg-primary/10 text-primary" : ""}`}>
                <div className="flex items-center gap-2">
                  <span className="tabular-nums">{r.score}</span>
                  <ScoreBar value={r.score} active={active} />
                </div>
              </div>
              <div className={`px-3 py-3 border-b border-border ${active ? "bg-primary/5" : ""}`}>
                <FlagPill flag={r.flag} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ScoreBar({ value, active }: { value: number; active: boolean }) {
  return (
    <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
      <div
        className={active ? "animate-score h-full" : "h-full"}
        style={{
          width: `${value}%`,
          background: value > 80 ? "var(--primary)" : value > 60 ? "var(--accent)" : "var(--destructive)",
        }}
      />
    </div>
  );
}

function FlagPill({ flag, label }: { flag: string; label?: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    ok: { label: "PASS", cls: "bg-primary/15 text-primary" },
    warn: { label: "WARN", cls: "bg-accent/15 text-accent" },
    fail: { label: "FAIL", cls: "bg-destructive/15 text-destructive" },
  };
  const f = map[flag] ?? map.ok;
  return <span className={`px-2 py-1 rounded text-[10px] font-semibold ${f.cls}`}>{label ?? f.label}</span>;
}

function Marquee() {
  const items = ["=ASK(…)", "=PAGE_SCORE(…)", "=VERIFY(…)", "=SEO_SCORE(…)", "=FACT_CHECK(…)", "=AUDIT_HTML(…)", "=CHECK_BRAND(…)", "=LOCAL_SCORE(…)"];
  return (
    <section className="border-y border-border bg-card/30 py-6 overflow-hidden">
      <div className="flex gap-12 animate-[scroll_30s_linear_infinite] whitespace-nowrap font-mono text-2xl md:text-4xl text-muted-foreground/60">
        {[...items, ...items, ...items].map((x, i) => (
          <span key={i} className="flex items-center gap-12">
            {x}
            <span className="text-primary/40">/</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes scroll { to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}

function FormulaShowcase() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-32">
      <div className="grid md:grid-cols-12 gap-12 items-start">
        <div className="md:col-span-5 md:sticky md:top-24">
          <p className="font-mono text-xs text-primary uppercase tracking-widest mb-6">/ how it works</p>
          <h2 className="font-display text-5xl md:text-6xl leading-[1.05] text-balance">
            One formula.
            <br />
            <span className="italic text-muted-foreground">Hundreds</span> of pages,
            audited.
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            Point csvIQ at any OpenRouter model, drop a formula in a cell,
            and drag-fill the entire column. The editorial review you used
            to do by hand — now a recalculation.
          </p>
        </div>

        <div className="md:col-span-7 space-y-6">
          <FormulaCard
            label="Free-form Q&A"
            code={`=ASK("Does this page adequately target emergency plumbing intent?", C2)`}
            out="Yes — the H1, intent line, and FAQ all reference 24/7 emergency service. Missing: explicit response-time SLA."
          />
          <FormulaCard
            label="Ground-truth verification"
            code={`=VERIFY(A2, Config!A1:B3)`}
            out="phone: MATCH · address: MISMATCH (expected 1200 Main, found 1220 Main) · hours: MATCH"
          />
          <FormulaCard
            label="Composite scoring"
            code={`=PAGE_SCORE(A2)`}
            out="87"
            isNumber
          />
        </div>
      </div>
    </section>
  );
}

function FormulaCard({ label, code, out, isNumber }: { label: string; code: string; out: string; isNumber?: boolean }) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 transition-colors">
      <div className="px-5 py-3 border-b border-border flex items-center justify-between">
        <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
        <span className="font-mono text-xs text-primary">ƒx</span>
      </div>
      <div className="px-5 py-4 border-b border-border bg-background/40">
        <code className="font-mono text-sm md:text-base break-all">{code}</code>
      </div>
      <div className="px-5 py-4 flex items-start gap-3">
        <span className="font-mono text-xs text-primary mt-1">→</span>
        {isNumber ? (
          <span className="font-display text-5xl text-primary tabular-nums">{out}</span>
        ) : (
          <p className="text-muted-foreground leading-relaxed">{out}</p>
        )}
      </div>
    </div>
  );
}

function FunctionsGrid() {
  const [active, setActive] = useState<FnId>("PAGE_SCORE");
  const fn = FUNCTIONS.find((f) => f.name === active)!;

  return (
    <section id="functions" className="border-t border-border bg-card/20 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 py-32">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <p className="font-mono text-xs text-primary uppercase tracking-widest mb-6">/ the library</p>
            <h2 className="font-display text-5xl md:text-6xl leading-[1.05] text-balance">
              Eleven functions.
              <br />
              <span className="italic">Click</span> one to evaluate.
            </h2>
          </div>
          <p className="font-mono text-xs text-muted-foreground max-w-xs">
            Every function returns a value you can sort, filter, conditional-format, and chart.
          </p>
        </div>

        <div className="grid lg:grid-cols-[340px_1fr] gap-6">
          {/* Function list (looks like a column from a sheet) */}
          <div className="rounded-xl border border-border bg-card overflow-hidden h-fit">
            <div className="px-4 py-2.5 border-b border-border bg-muted/40 flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground">A · function</span>
              <span className="font-mono text-xs text-muted-foreground">{FUNCTIONS.length} rows</span>
            </div>
            <ul className="font-mono text-sm">
              {FUNCTIONS.map((f, i) => {
                const isActive = f.name === active;
                return (
                  <li key={f.name}>
                    <button
                      onClick={() => setActive(f.name)}
                      className={`w-full grid grid-cols-[40px_1fr_auto] items-center text-left border-b border-border last:border-b-0 transition-colors ${
                        isActive ? "bg-primary/10" : "hover:bg-muted/40"
                      }`}
                    >
                      <span className={`px-3 py-3 border-r border-border text-xs ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                        {i + 2}
                      </span>
                      <span className={`px-3 py-3 truncate ${isActive ? "text-primary font-semibold" : ""}`}>
                        {f.name}
                      </span>
                      <span className={`px-3 text-xs ${isActive ? "text-primary" : "text-muted-foreground/60"}`}>
                        {isActive ? "▸" : "ƒx"}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Live evaluation panel — looks like a real sheet */}
          <div className="rounded-xl border border-border bg-card overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/40">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-destructive/70" />
                <span className="w-3 h-3 rounded-full bg-accent/80" />
                <span className="w-3 h-3 rounded-full bg-primary/80" />
              </div>
              <span className="font-mono text-xs text-muted-foreground">{fn.name.toLowerCase()}-demo.xlsx</span>
              <span className="font-mono text-xs text-primary">●  evaluated</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-background/40">
              <span className="font-mono text-xs text-muted-foreground w-8">{fn.cell}</span>
              <span className="font-mono text-sm text-primary">ƒx</span>
              <code key={fn.name} className="font-mono text-sm flex-1 truncate animate-fade-in">
                {fn.formula}
                <span className="cursor-blink" />
              </code>
            </div>
            <div key={fn.name} className="p-6 md:p-8 animate-fade-in">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">{fn.desc}</p>
              <FunctionOutput name={fn.name} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FunctionOutput({ name }: { name: FnId }) {
  switch (name) {
    case "ASK":
      return (
        <div className="border-l-2 border-primary pl-4">
          <p className="text-foreground leading-relaxed">
            Yes — the H1, intent line, and FAQ all reference 24/7 emergency service.
            <span className="text-muted-foreground"> Missing: explicit response-time SLA and a phone CTA above the fold.</span>
          </p>
        </div>
      );
    case "VERIFY":
      return (
        <ul className="space-y-2 font-mono text-sm">
          {[
            ["phone", "MATCH", "ok"],
            ["address", "MISMATCH", "fail", "expected 1200 Main · found 1220 Main"],
            ["hours", "MATCH", "ok"],
            ["service_area", "MATCH", "ok"],
          ].map(([k, v, s, note]) => (
            <li key={k} className="flex items-center gap-3 border-b border-border pb-2">
              <span className="text-muted-foreground w-28">{k}</span>
              <FlagPill flag={s as string} label={v as string} />
              {note && <span className="text-xs text-muted-foreground">{note}</span>}
            </li>
          ))}
        </ul>
      );
    case "AUDIT_HTML":
      return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            ["grade", "B+"],
            ["words", "1,247"],
            ["H1 / H2", "1 / 6"],
            ["schema", "✓ LocalBiz"],
            ["meta desc", "✓ 156c"],
            ["FAQ", "4 items"],
            ["images", "8 (3 no alt)"],
            ["links", "12 int · 3 ext"],
          ].map(([k, v]) => (
            <div key={k} className="bg-background border border-border rounded-md p-3">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">{k}</div>
              <div className="text-lg font-mono mt-1">{v}</div>
            </div>
          ))}
        </div>
      );
    case "CHECK_BRAND":
      return (
        <div className="space-y-4">
          {[
            ["tone match", 88, "primary"],
            ["forbidden terms", 100, "primary"],
            ["claims compliance", 62, "accent"],
          ].map(([k, v, c]) => (
            <div key={k as string}>
              <div className="flex justify-between font-mono text-xs mb-1">
                <span className="text-muted-foreground">{k}</span>
                <span className="text-foreground">{v}%</span>
              </div>
              <div className="h-1.5 bg-border rounded-full overflow-hidden">
                <div className="h-full" style={{ width: `${v}%`, background: `var(--${c})` }} />
              </div>
            </div>
          ))}
          <p className="font-mono text-xs text-accent border-l-2 border-accent pl-3 mt-4">
            ⚠ "guaranteed results" — violates legal claim policy
          </p>
        </div>
      );
    case "LOCAL_SCORE":
      return (
        <div className="flex items-center gap-8">
          <div className="font-display text-7xl text-primary tabular-nums">82</div>
          <div className="flex-1 space-y-2">
            {[
              ["NAP consistency", 95],
              ["geo modifiers", 78],
              ["service area", 88],
              ["reviews mention", 64],
            ].map(([k, v]) => (
              <div key={k as string} className="flex items-center gap-3">
                <span className="font-mono text-xs text-muted-foreground w-32">{k}</span>
                <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${v}%` }} />
                </div>
                <span className="font-mono text-xs tabular-nums w-8 text-right">{v}</span>
              </div>
            ))}
          </div>
        </div>
      );
    case "SEO_SCORE":
      return (
        <div className="flex items-center gap-8">
          <div className="font-display text-7xl text-primary">A−</div>
          <div className="grid grid-cols-2 gap-2 flex-1 font-mono text-sm">
            {[["title", "A"], ["meta", "B+"], ["headings", "A"], ["internal links", "B"], ["images", "C"], ["schema", "A"]].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-border pb-1">
                <span className="text-muted-foreground">{k}</span>
                <span className="text-foreground">{v}</span>
              </div>
            ))}
          </div>
        </div>
      );
    case "FIND_MISSING":
      return (
        <ul className="space-y-2 font-mono text-sm">
          {[
            ["meta description", true],
            ["H1 tag", true],
            ["LocalBusiness schema", false],
            ["FAQ section", false],
            ["phone CTA above fold", false],
            ["service-area page links", true],
            ["customer reviews block", false],
          ].map(([k, ok]) => (
            <li key={k as string} className="flex items-center gap-3">
              <span className={ok ? "text-primary" : "text-destructive"}>{ok ? "✓" : "✗"}</span>
              <span className={ok ? "text-muted-foreground line-through" : "text-foreground"}>{k}</span>
            </li>
          ))}
        </ul>
      );
    case "FACT_CHECK":
      return (
        <ul className="space-y-3">
          {[
            ["Hours stated as 24/7, source says Mon–Sat 7a–9p", "high"],
            ["Years in business: page says 25, source says 18", "high"],
            ["Service area lists Round Rock; not in source list", "med"],
          ].map(([msg, sev]) => (
            <li key={msg as string} className="flex items-start gap-3 border border-border rounded-md p-3 bg-background">
              <span className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded mt-0.5 ${sev === "high" ? "bg-destructive/15 text-destructive" : "bg-accent/15 text-accent"}`}>
                {sev}
              </span>
              <span className="text-sm">{msg}</span>
            </li>
          ))}
        </ul>
      );
    case "READABILITY":
      return (
        <div className="space-y-6">
          <div>
            <div className="flex justify-between font-mono text-xs text-muted-foreground mb-2">
              <span>elementary</span><span>college</span>
            </div>
            <div className="relative h-2 bg-border rounded-full">
              <div className="absolute inset-y-0 left-0 bg-primary rounded-full" style={{ width: "62%" }} />
              <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-foreground border-2 border-background" style={{ left: "calc(62% - 6px)" }} />
            </div>
            <div className="mt-2 font-mono text-sm">Grade 8 · plain-English</div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {["confident", "informative", "slightly salesy", "warm"].map((t) => (
              <span key={t} className="font-mono text-xs px-2.5 py-1 rounded-full border border-border bg-background">{t}</span>
            ))}
          </div>
        </div>
      );
    case "COMPARE":
      return (
        <div className="font-mono text-sm space-y-1">
          {[
            ["+", "Added a 24/7 emergency phone CTA in the hero", "primary"],
            ["−", "Removed mention of 'free estimates' (legal: ok)", "destructive"],
            ["~", "Tightened H1 from 14 → 9 words", "accent"],
            ["+", "Added FAQ with 4 questions targeting near-me intent", "primary"],
            ["~", "Schema upgraded LocalBusiness → Plumber", "accent"],
          ].map(([sym, txt, c], i) => (
            <div key={i} className="flex gap-3 border-b border-border py-1.5">
              <span style={{ color: `var(--${c})` }} className="w-4">{sym}</span>
              <span className="text-foreground/80">{txt}</span>
            </div>
          ))}
        </div>
      );
    case "PAGE_SCORE":
      return (
        <div className="flex items-center gap-10">
          <div className="relative w-36 h-36">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="44" fill="none" stroke="var(--color-border)" strokeWidth="6" />
              <circle cx="50" cy="50" r="44" fill="none" stroke="var(--color-primary)" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 44}`} strokeDashoffset={`${2 * Math.PI * 44 * (1 - 0.87)}`} />
            </svg>
            <div className="absolute inset-0 grid place-items-center font-display text-5xl text-primary tabular-nums">87</div>
          </div>
          <div className="flex-1 font-mono text-sm space-y-2">
            <div className="flex justify-between border-b border-border pb-1"><span className="text-muted-foreground">seo</span><span>A−</span></div>
            <div className="flex justify-between border-b border-border pb-1"><span className="text-muted-foreground">local</span><span>82</span></div>
            <div className="flex justify-between border-b border-border pb-1"><span className="text-muted-foreground">brand</span><span>88</span></div>
            <div className="flex justify-between border-b border-border pb-1"><span className="text-muted-foreground">facts</span><span className="text-destructive">3 issues</span></div>
          </div>
        </div>
      );
  }
}

function TwoWays() {
  const options = [
    {
      tag: "/vba",
      title: "Quick start",
      sub: "Paste 2 macros into a workbook",
      bullets: [
        "Trying it out, individuals, small teams",
        "=ASK(...), =AUDIT_HTML(...) as VBA UDFs",
        "Bulk HTML generation included",
      ],
      cta: "Start in 60 seconds",
    },
    {
      tag: "/addin",
      title: "Office Add-in",
      sub: "Host files over HTTPS + sideload a manifest",
      bullets: [
        "Teams running this at scale",
        "=QA.ASK(...), =QA.AUDIT_HTML(...) with autocomplete",
        "Dynamic-array spill + caching",
      ],
      cta: "Deploy to a team",
      featured: true,
    },
  ];

  return (
    <section id="install" className="max-w-7xl mx-auto px-6 py-32">
      <div className="mb-16">
        <p className="font-mono text-xs text-primary uppercase tracking-widest mb-6">/ two ways in</p>
        <h2 className="font-display text-5xl md:text-6xl leading-[1.05] text-balance max-w-3xl">
          Try it today.
          <span className="italic text-muted-foreground"> Scale</span> it tomorrow.
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {options.map((o) => (
          <div
            key={o.tag}
            className={`relative rounded-xl border p-8 md:p-10 flex flex-col ${
              o.featured ? "border-primary bg-primary/[0.03] glow" : "border-border bg-card"
            }`}
          >
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-sm text-primary">{o.tag}</span>
              {o.featured && (
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary border border-primary/40 px-2 py-1 rounded">
                  for teams
                </span>
              )}
            </div>
            <h3 className="font-display text-4xl mb-2">{o.title}</h3>
            <p className="text-muted-foreground mb-8">{o.sub}</p>
            <ul className="space-y-3 mb-10 flex-1">
              {o.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm">
                  <span className="text-primary mt-1 font-mono">+</span>
                  <span className="text-foreground/80">{b}</span>
                </li>
              ))}
            </ul>
            <a
              href={`https://github.com/redactedCHAD/csvIQ/tree/main${o.tag}`}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center justify-between px-5 py-3 rounded-md font-mono text-sm transition-all ${
                o.featured
                  ? "bg-primary text-primary-foreground hover:opacity-90"
                  : "border border-border hover:border-foreground"
              }`}
            >
              {o.cta}
              <span>→</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

function Security() {
  return (
    <section id="security" className="border-t border-border bg-card/20">
      <div className="max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7">
          <p className="font-mono text-xs text-accent uppercase tracking-widest mb-6">/ security</p>
          <h2 className="font-display text-5xl md:text-6xl leading-[1.05] text-balance">
            Your API key
            <br />
            <span className="italic">never</span> touches source.
          </h2>
          <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed max-w-xl">
            <p>
              <span className="font-mono text-foreground">VBA</span> — the key lives in a named
              range (<code className="font-mono text-primary">OpenRouterAPIKey</code>) on a cell
              in your local workbook. Never typed into macro source.
            </p>
            <p>
              <span className="font-mono text-foreground">Add-in</span> — the key lives in
              <code className="font-mono text-primary"> OfficeRuntime.storage</code> on your
              machine, entered once via the taskpane. Never in manifest.xml or any .js file.
            </p>
          </div>
        </div>
        <div className="md:col-span-5">
          <div className="rounded-xl border border-border bg-background p-6 font-mono text-sm space-y-3">
            <div className="flex items-center gap-2 text-muted-foreground text-xs pb-3 border-b border-border">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>local-machine · gitignored</span>
            </div>
            <div><span className="text-muted-foreground">→</span> <span className="text-primary">ls</span> .</div>
            <div className="pl-4 text-foreground/70">vba/  addin/  README.md</div>
            <div><span className="text-muted-foreground">→</span> <span className="text-primary">grep</span> -r "sk-or-" .</div>
            <div className="pl-4 text-primary">(no matches)</div>
            <div><span className="text-muted-foreground">→</span> <span className="cursor-blink" /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="font-display text-[clamp(3rem,12vw,11rem)] leading-none text-balance">
          ship <span className="italic text-primary">faster</span>.
        </div>
        <div className="mt-16 flex flex-wrap items-end justify-between gap-6 pt-8 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary text-primary-foreground grid place-items-center font-mono font-bold text-xs">⌘</div>
            <span className="font-mono text-sm">csv<span className="text-primary">IQ</span></span>
          </div>
          <div className="font-mono text-xs text-muted-foreground">
            Open source · MIT · Powered by OpenRouter
          </div>
          <div className="flex items-center gap-5 font-mono text-xs">
            <a
              href="https://x.com/zbailey83"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors"
            >
              x.com/zbailey83 →
            </a>
            <a
              href="https://github.com/redactedCHAD/csvIQ"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              github →
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function BulkSheet() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 1400);
    return () => clearInterval(t);
  }, []);

  const cities = ["Austin", "Dallas", "Houston", "San Antonio", "Fort Worth", "El Paso", "Arlington", "Plano", "Frisco", "Lubbock", "Waco", "Tyler"];
  const services = ["Plumbing", "HVAC", "Roofing", "Electrical", "Lawn Care", "Pest Control"];

  const rows = cities.map((city, i) => {
    const service = services[(i + tick) % services.length];
    const base = (i * 13 + tick * 7) % 100;
    const score = 35 + (base % 60);
    const facts = (i + tick) % 4;
    const brand = 60 + ((i * 9 + tick * 3) % 40);
    const seo = ["A", "A−", "B+", "B", "C+", "C"][(i + tick) % 6];
    return { city, service, score, facts, brand, seo };
  });

  return (
    <section className="border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 py-32">
        <div className="grid md:grid-cols-12 gap-12 items-start mb-12">
          <div className="md:col-span-6">
            <p className="font-mono text-xs text-primary uppercase tracking-widest mb-6">/ at scale</p>
            <h2 className="font-display text-5xl md:text-6xl leading-[1.05] text-balance">
              Drag-fill the column.
              <br />
              <span className="italic text-muted-foreground">Audit</span> a thousand pages.
            </h2>
          </div>
          <div className="md:col-span-6 md:pt-4">
            <p className="text-muted-foreground text-lg leading-relaxed">
              One workbook. One row per service × city. Stack csvIQ formulas
              across columns — then sort by score, filter for failures, and
              ship fixes by Friday.
            </p>
            <div className="mt-6 flex gap-3 font-mono text-xs flex-wrap">
              <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">{rows.length} pages</span>
              <span className="px-3 py-1.5 rounded-full bg-card border border-border text-muted-foreground">5 columns</span>
              <span className="px-3 py-1.5 rounded-full bg-card border border-border text-muted-foreground">~12s recalc</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/40">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-destructive/70" />
              <span className="w-3 h-3 rounded-full bg-accent/80" />
              <span className="w-3 h-3 rounded-full bg-primary/80" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">tx-local-seo.xlsx · Sheet1</span>
            <span className="font-mono text-xs text-primary flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              recalculating
            </span>
          </div>

          <div className="overflow-x-auto">
            <div className="grid grid-cols-[40px_1.2fr_1fr_180px_100px_160px_70px] font-mono text-sm min-w-[820px]">
              {["", "A · city", "B · service", "C · =PAGE_SCORE", "D · =SEO_SCORE", "E · =CHECK_BRAND", "F · facts"].map((h, i) => (
                <div key={i} className="px-3 py-2 border-b border-r border-border last:border-r-0 text-muted-foreground text-xs uppercase tracking-wider bg-muted/30">
                  {h}
                </div>
              ))}
              {rows.map((r, i) => (
                <div key={r.city} className="contents">
                  <div className="px-3 py-2.5 border-b border-r border-border text-muted-foreground text-xs">{i + 2}</div>
                  <div className="px-3 py-2.5 border-b border-r border-border truncate">{r.city}</div>
                  <div className="px-3 py-2.5 border-b border-r border-border text-muted-foreground truncate">{r.service}</div>
                  <div className="px-3 py-2.5 border-b border-r border-border">
                    <div className="flex items-center gap-2">
                      <span className={`tabular-nums w-7 ${r.score > 80 ? "text-primary" : r.score > 60 ? "text-accent" : "text-destructive"}`}>{r.score}</span>
                      <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full transition-all duration-700"
                          style={{ width: `${r.score}%`, background: r.score > 80 ? "var(--primary)" : r.score > 60 ? "var(--accent)" : "var(--destructive)" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-2.5 border-b border-r border-border">
                    <span className={r.seo.startsWith("A") ? "text-primary" : r.seo.startsWith("B") ? "text-foreground" : "text-accent"}>{r.seo}</span>
                  </div>
                  <div className="px-3 py-2.5 border-b border-r border-border">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
                        <div className="h-full bg-primary transition-all duration-700" style={{ width: `${r.brand}%` }} />
                      </div>
                      <span className="tabular-nums text-xs text-muted-foreground w-7 text-right">{r.brand}</span>
                    </div>
                  </div>
                  <div className="px-3 py-2.5 border-b border-border">
                    {r.facts === 0 ? (
                      <span className="text-primary">✓</span>
                    ) : (
                      <span className="text-destructive font-semibold">{r.facts}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-muted/30 font-mono text-xs text-muted-foreground">
            <span>Sheet1 · Sheet2 · Truth</span>
            <span>Ready · {rows.filter((r) => r.score < 60).length} need review</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────── LIVE AUDIT ─────────────────────────

type Scenario = {
  id: string;
  tab: string;
  filename: string;
  before: { title: string; body: string[]; meta?: string };
  after: { title: string; body: string[]; meta?: string };
  before_scores: { page: number; read: number; brand: number; seo: string };
  after_scores: { page: number; read: number; brand: number; seo: string };
  missing: { label: string; fixed: boolean }[];
  facts: { claim: string; truth: string; fixed_claim: string }[];
};

const SCENARIOS: Scenario[] = [
  {
    id: "local",
    tab: "Local SEO page",
    filename: "plumbing-austin.html",
    before: {
      title: "Plumbing Services",
      meta: "We do plumbing.",
      body: [
        "We offer plumbing services in the area.",
        "Call us anytime for help with your pipes.",
        "We have been in business for many years.",
      ],
    },
    after: {
      title: "24/7 Emergency Plumber in Austin, TX | Same-Day Service",
      meta: "Licensed Austin plumbers since 2008. Free estimates, upfront pricing, 1-hour response on emergencies. Serving all of Travis County.",
      body: [
        "Need a plumber in Austin right now? Our licensed team responds within 60 minutes, 24/7, across Travis County.",
        "Upfront flat-rate pricing on drain cleaning, water heaters, leak detection, and repiping — no surprise fees.",
        "Family-owned since 2008. 4.9★ across 1,200+ Google reviews. Fully bonded and insured (TX-MPL #41209).",
      ],
    },
    before_scores: { page: 38, read: 52, brand: 41, seo: "D" },
    after_scores: { page: 94, read: 88, brand: 96, seo: "A" },
    missing: [
      { label: "City + service in <title>", fixed: true },
      { label: "Phone number / CTA", fixed: true },
      { label: "License # (TX-MPL)", fixed: true },
      { label: "Service area schema", fixed: true },
      { label: "Hours of operation", fixed: true },
    ],
    facts: [
      { claim: "in business for many years", truth: "Founded 2008", fixed_claim: "Family-owned since 2008" },
    ],
  },
  {
    id: "product",
    tab: "Product description",
    filename: "kettle-pro-v3.html",
    before: {
      title: "Electric Kettle",
      body: [
        "This is a really good electric kettle.",
        "It boils water fast and is made of metal.",
        "Holds about a liter and has a light.",
      ],
    },
    after: {
      title: "KettlePro V3 — 1.7L Stainless Steel Electric Kettle, 1500W",
      body: [
        "Boils 1L in 3 minutes with a 1500W concealed element and stay-cool double-wall 304 stainless body.",
        "Six precise temperature presets (160°/175°/185°/195°/200°/212°F) for green, oolong, black, French press, and pour-over.",
        "Cordless 360° base, auto shut-off, boil-dry protection. 2-year warranty. UL listed.",
      ],
    },
    before_scores: { page: 44, read: 61, brand: 50, seo: "C" },
    after_scores: { page: 91, read: 84, brand: 92, seo: "A−" },
    missing: [
      { label: "Capacity (1.7L)", fixed: true },
      { label: "Wattage (1500W)", fixed: true },
      { label: "Material spec (304 SS)", fixed: true },
      { label: "Safety certification (UL)", fixed: true },
      { label: "Warranty terms", fixed: true },
    ],
    facts: [
      { claim: "about a liter", truth: "Spec: 1.7L", fixed_claim: "1.7L capacity" },
      { claim: "made of metal", truth: "Spec: 304 stainless", fixed_claim: "304 stainless steel" },
    ],
  },
  {
    id: "faq",
    tab: "FAQ entry",
    filename: "shipping-faq.html",
    before: {
      title: "Shipping",
      body: [
        "We ship pretty fast.",
        "Costs depend on where you live.",
        "International might take a while.",
      ],
    },
    after: {
      title: "Shipping & Delivery FAQ — Rates, Times & Tracking",
      body: [
        "US orders ship same-day if placed before 2pm CT (Mon–Fri). Standard arrives in 3–5 business days; Express in 1–2.",
        "Free standard shipping on orders over $50. Express is $12 flat. Rates by region in the calculator above.",
        "International: 7–14 business days to 40+ countries via DHL. Duties calculated at checkout — no surprise fees.",
      ],
    },
    before_scores: { page: 31, read: 70, brand: 48, seo: "D+" },
    after_scores: { page: 89, read: 91, brand: 90, seo: "A−" },
    missing: [
      { label: "Concrete delivery windows", fixed: true },
      { label: "Cutoff time for same-day", fixed: true },
      { label: "Price thresholds", fixed: true },
      { label: "Carrier name", fixed: true },
      { label: "FAQ schema markup", fixed: true },
    ],
    facts: [
      { claim: "ship pretty fast", truth: "SLA: same-day before 2pm CT", fixed_claim: "same-day if placed before 2pm CT" },
      { claim: "International might take a while", truth: "SLA: 7–14 business days", fixed_claim: "7–14 business days to 40+ countries" },
    ],
  },
];

function LiveAudit() {
  const [active, setActive] = useState(0);
  const [fixed, setFixed] = useState(false);
  const [evalStep, setEvalStep] = useState(0);
  const s = SCENARIOS[active];

  // re-run "evaluation" whenever scenario or fix state changes
  useEffect(() => {
    setEvalStep(0);
    const t = setInterval(() => setEvalStep((x) => (x >= 4 ? 4 : x + 1)), 320);
    return () => clearInterval(t);
  }, [active, fixed]);

  const view = fixed ? s.after : s.before;
  const scores = fixed ? s.after_scores : s.before_scores;
  const cells = [
    { id: "D2", fn: "PAGE_SCORE", value: scores.page, kind: "score" as const },
    { id: "E2", fn: "READABILITY", value: scores.read, kind: "score" as const },
    { id: "F2", fn: "CHECK_BRAND", value: scores.brand, kind: "score" as const },
    { id: "G2", fn: "SEO_SCORE", value: scores.seo, kind: "grade" as const },
  ];

  return (
    <section id="demo" className="border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 py-32">
        <div className="grid md:grid-cols-12 gap-12 items-end mb-12">
          <div className="md:col-span-7">
            <p className="font-mono text-xs text-primary uppercase tracking-widest mb-6">/ live audit</p>
            <h2 className="font-display text-5xl md:text-6xl leading-[1.05] text-balance">
              Pick a page.
              <br />
              Watch <span className="italic text-muted-foreground">the cells think.</span>
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-muted-foreground text-lg leading-relaxed">
              Same 4 formulas, three different content types. Hit{" "}
              <span className="text-primary font-mono">Apply fixes</span> and the
              draft rewrites itself — every score, fact-check, and missing-element
              flag recalculates in place.
            </p>
          </div>
        </div>

        {/* scenario tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {SCENARIOS.map((sc, i) => (
            <button
              key={sc.id}
              onClick={() => {
                setActive(i);
                setFixed(false);
              }}
              className={`px-4 py-2 rounded-md font-mono text-xs uppercase tracking-wider border transition-colors ${
                i === active
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:text-foreground"
              }`}
            >
              {sc.tab}
            </button>
          ))}
          <div className="flex-1" />
          <button
            onClick={() => setFixed((f) => !f)}
            className={`px-5 py-2 rounded-md font-mono text-xs uppercase tracking-wider border transition-all ${
              fixed
                ? "bg-card text-muted-foreground border-border"
                : "bg-primary text-primary-foreground border-primary glow"
            }`}
          >
            {fixed ? "↺ Reset draft" : "▶ Apply fixes →"}
          </button>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6">
          {/* LEFT: editor / content */}
          <div className="rounded-xl border border-border bg-card overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/40">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-destructive/70" />
                <span className="w-3 h-3 rounded-full bg-accent/80" />
                <span className="w-3 h-3 rounded-full bg-primary/80" />
              </div>
              <span className="font-mono text-xs text-muted-foreground">{s.filename}</span>
              <span className={`font-mono text-xs ${fixed ? "text-primary" : "text-accent"}`}>
                {fixed ? "✓ rewritten" : "○ draft"}
              </span>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed">
              <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">&lt;title&gt;</div>
              <div
                className={`mb-5 transition-all duration-500 ${
                  fixed ? "text-primary" : "text-foreground"
                }`}
              >
                {view.title}
              </div>
              {view.meta !== undefined && (
                <>
                  <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
                    &lt;meta description&gt;
                  </div>
                  <div className="mb-5 text-muted-foreground italic">{view.meta}</div>
                </>
              )}
              <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">&lt;body&gt;</div>
              <div className="space-y-2">
                {view.body.map((p, i) => {
                  const fact = !fixed && s.facts.find((f) => p.includes(f.claim));
                  return (
                    <p key={i} className="text-foreground/90">
                      {fact ? (
                        <>
                          {p.split(fact.claim)[0]}
                          <span className="bg-destructive/20 text-destructive line-through decoration-destructive/60 px-1 rounded">
                            {fact.claim}
                          </span>
                          {p.split(fact.claim)[1]}
                        </>
                      ) : (
                        p
                      )}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: formula stack */}
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card overflow-hidden shadow-2xl">
              <div className="px-4 py-2.5 border-b border-border bg-muted/40 flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground">audit-output · 4 cells</span>
                <span className="font-mono text-xs text-primary flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  evaluating
                </span>
              </div>
              <div className="divide-y divide-border">
                {cells.map((c, i) => {
                  const ready = evalStep > i;
                  return (
                    <div key={c.id} className="px-4 py-4 flex items-center gap-4 font-mono text-sm">
                      <span className="text-muted-foreground text-xs w-8">{c.id}</span>
                      <code className="text-xs flex-1 truncate">
                        <span className="text-muted-foreground">=</span>
                        <span className="text-foreground">{c.fn}</span>
                        <span className="text-muted-foreground">(</span>
                        <span className="text-accent">C2</span>
                        <span className="text-muted-foreground">)</span>
                      </code>
                      <div className="w-44 flex items-center justify-end gap-2">
                        {!ready ? (
                          <span className="text-muted-foreground text-xs italic">…</span>
                        ) : c.kind === "score" ? (
                          <>
                            <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                              <div
                                className="h-full transition-all duration-700"
                                style={{
                                  width: `${c.value as number}%`,
                                  background:
                                    (c.value as number) > 80
                                      ? "var(--primary)"
                                      : (c.value as number) > 60
                                      ? "var(--accent)"
                                      : "var(--destructive)",
                                }}
                              />
                            </div>
                            <span
                              className={`tabular-nums w-8 text-right ${
                                (c.value as number) > 80
                                  ? "text-primary"
                                  : (c.value as number) > 60
                                  ? "text-accent"
                                  : "text-destructive"
                              }`}
                            >
                              {c.value}
                            </span>
                          </>
                        ) : (
                          <span
                            className={`px-2.5 py-1 rounded text-xs font-semibold ${
                              String(c.value).startsWith("A")
                                ? "bg-primary/15 text-primary"
                                : String(c.value).startsWith("B")
                                ? "bg-accent/15 text-accent"
                                : "bg-destructive/15 text-destructive"
                            }`}
                          >
                            {c.value}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* FIND_MISSING checklist */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="px-4 py-2.5 border-b border-border bg-muted/40 flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground">
                  H2 · =FIND_MISSING(C2)
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {fixed ? `0 of ${s.missing.length}` : `${s.missing.length} of ${s.missing.length}`}
                </span>
              </div>
              <div className="p-4 grid grid-cols-2 gap-2 font-mono text-xs">
                {s.missing.map((m) => (
                  <div
                    key={m.label}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded transition-colors ${
                      fixed ? "text-primary" : "text-destructive"
                    }`}
                  >
                    <span className="w-4">{fixed ? "✓" : "✗"}</span>
                    <span className={fixed ? "line-through opacity-70" : ""}>{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FACT_CHECK */}
            {s.facts.length > 0 && (
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="px-4 py-2.5 border-b border-border bg-muted/40 flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">
                    I2 · =FACT_CHECK(C2, Truth!A:B)
                  </span>
                  <span
                    className={`font-mono text-xs ${
                      fixed ? "text-primary" : "text-destructive"
                    }`}
                  >
                    {fixed ? "0 issues" : `${s.facts.length} issue${s.facts.length > 1 ? "s" : ""}`}
                  </span>
                </div>
                <div className="divide-y divide-border">
                  {s.facts.map((f, i) => (
                    <div key={i} className="px-4 py-3 font-mono text-xs space-y-1">
                      <div className="flex items-start gap-2">
                        <span className="text-muted-foreground uppercase tracking-wider w-12 shrink-0">claim</span>
                        {fixed ? (
                          <span className="text-primary">{f.fixed_claim}</span>
                        ) : (
                          <span className="text-destructive line-through decoration-destructive/60">
                            "{f.claim}"
                          </span>
                        )}
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-muted-foreground uppercase tracking-wider w-12 shrink-0">truth</span>
                        <span className="text-foreground/80">{f.truth}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────── DRIFT MONITOR ─────────────────────────

function DriftMonitor() {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT((x) => x + 1), 1100);
    return () => clearInterval(id);
  }, []);

  // 24 ticks of synthetic drift, three pages
  const pages = [
    { name: "/pricing", base: 96, vol: 4 },
    { name: "/about", base: 88, vol: 7 },
    { name: "/blog/refund-policy", base: 72, vol: 18 },
  ];

  const series = pages.map((p, pi) => {
    const pts = Array.from({ length: 24 }, (_, i) => {
      const x = (i + t * 0.4 + pi * 3) * 0.6;
      const noise = Math.sin(x) * (p.vol * 0.5) + Math.cos(x * 1.7) * (p.vol * 0.4);
      const drift = pi === 2 ? -Math.min(i, 18) * 1.4 : 0; // blog page degrades
      return Math.max(20, Math.min(100, p.base + noise + drift));
    });
    return { ...p, pts, current: Math.round(pts[pts.length - 1]) };
  });

  const W = 600;
  const H = 140;

  const path = (pts: number[]) =>
    pts
      .map((v, i) => {
        const x = (i / (pts.length - 1)) * W;
        const y = H - (v / 100) * H;
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");

  const color = (v: number) =>
    v > 80 ? "var(--primary)" : v > 60 ? "var(--accent)" : "var(--destructive)";

  return (
    <section className="border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 py-32">
        <div className="grid md:grid-cols-12 gap-12 items-end mb-12">
          <div className="md:col-span-7">
            <p className="font-mono text-xs text-primary uppercase tracking-widest mb-6">/ drift monitor</p>
            <h2 className="font-display text-5xl md:text-6xl leading-[1.05] text-balance">
              When the source <span className="italic text-muted-foreground">moves,</span>
              <br />
              the cell knows.
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-muted-foreground text-lg leading-relaxed">
              Schedule the workbook. Every recalc, csvIQ re-reads the page,
              re-runs <span className="font-mono text-foreground">VERIFY</span> against your
              source-of-truth sheet, and pages you when a score crosses your line.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-[2fr_1fr]">
            {/* chart */}
            <div className="p-6 border-b lg:border-b-0 lg:border-r border-border">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                  PAGE_SCORE · last 24 recalcs
                </span>
                <span className="font-mono text-xs text-primary flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  tick {t}
                </span>
              </div>
              <svg viewBox={`0 0 ${W} ${H + 20}`} className="w-full h-48">
                {/* grid lines */}
                {[20, 40, 60, 80].map((y) => (
                  <line
                    key={y}
                    x1={0}
                    x2={W}
                    y1={H - (y / 100) * H}
                    y2={H - (y / 100) * H}
                    stroke="var(--border)"
                    strokeDasharray="2 4"
                  />
                ))}
                {/* threshold */}
                <line
                  x1={0}
                  x2={W}
                  y1={H - 0.6 * H}
                  y2={H - 0.6 * H}
                  stroke="var(--destructive)"
                  strokeDasharray="4 4"
                  opacity={0.5}
                />
                <text x={4} y={H - 0.6 * H - 4} fontSize="9" fill="var(--destructive)" fontFamily="monospace">
                  alert &lt; 60
                </text>
                {series.map((p) => (
                  <g key={p.name}>
                    <path d={path(p.pts)} fill="none" stroke={color(p.current)} strokeWidth={1.5} opacity={0.9} />
                    <circle
                      cx={W}
                      cy={H - (p.pts[p.pts.length - 1] / 100) * H}
                      r={3}
                      fill={color(p.current)}
                    />
                  </g>
                ))}
              </svg>
            </div>

            {/* live readout */}
            <div className="p-6 font-mono text-sm">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
                live readout
              </div>
              <div className="space-y-4">
                {series.map((p) => {
                  const prev = Math.round(p.pts[p.pts.length - 6] ?? p.current);
                  const delta = p.current - prev;
                  return (
                    <div key={p.name} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="truncate text-foreground">{p.name}</span>
                        <span className="tabular-nums" style={{ color: color(p.current) }}>
                          {p.current}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          Δ 5min{" "}
                          <span className={delta < 0 ? "text-destructive" : "text-primary"}>
                            {delta > 0 ? "+" : ""}
                            {delta}
                          </span>
                        </span>
                        {p.current < 60 ? (
                          <span className="px-1.5 py-0.5 rounded bg-destructive/15 text-destructive text-[10px]">
                            ALERT
                          </span>
                        ) : p.current < 80 ? (
                          <span className="px-1.5 py-0.5 rounded bg-accent/15 text-accent text-[10px]">WATCH</span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded bg-primary/15 text-primary text-[10px]">OK</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-border text-xs text-muted-foreground">
                <div className="mb-2 uppercase tracking-wider">trigger</div>
                <code className="block text-[11px] text-foreground/80 leading-relaxed">
                  =IF(<span className="text-foreground">PAGE_SCORE</span>(A2)&lt;60,
                  <br />
                  &nbsp;&nbsp;<span className="text-primary">NOTIFY</span>("#content-alerts",A1),
                  <br />
                  &nbsp;&nbsp;"")
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

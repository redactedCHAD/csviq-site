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

const FUNCTIONS = [
  { name: "ASK", sig: "(question, content, [...context])", desc: "Free-form Q&A about a page" },
  { name: "VERIFY", sig: "(content, sourceData)", desc: "Per-field match vs. ground truth" },
  { name: "AUDIT_HTML", sig: "(content)", desc: "Grade, word count, headings, schema" },
  { name: "CHECK_BRAND", sig: "(content)", desc: "Brand voice & compliance check" },
  { name: "LOCAL_SCORE", sig: "(content)", desc: "0–100 local SEO signal" },
  { name: "SEO_SCORE", sig: "(content)", desc: "Letter-grade SEO + sub-grades" },
  { name: "FIND_MISSING", sig: "(content)", desc: "Checklist of missing elements" },
  { name: "FACT_CHECK", sig: "(content, sourceData)", desc: "List factual inconsistencies" },
  { name: "READABILITY", sig: "(content)", desc: "Reading grade level + tone" },
  { name: "COMPARE", sig: "(content1, content2)", desc: "Plain-language version diff" },
  { name: "PAGE_SCORE", sig: "(content)", desc: "Single composite 0–100 score" },
];

function Splash() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <Marquee />
      <FormulaShowcase />
      <FunctionsGrid />
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

function FlagPill({ flag }: { flag: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    ok: { label: "PASS", cls: "bg-primary/15 text-primary" },
    warn: { label: "WARN", cls: "bg-accent/15 text-accent" },
    fail: { label: "FAIL", cls: "bg-destructive/15 text-destructive" },
  };
  const f = map[flag];
  return <span className={`px-2 py-1 rounded text-[10px] font-semibold ${f.cls}`}>{f.label}</span>;
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
  return (
    <section id="functions" className="border-t border-border bg-card/20">
      <div className="max-w-7xl mx-auto px-6 py-32">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <p className="font-mono text-xs text-primary uppercase tracking-widest mb-6">/ the library</p>
            <h2 className="font-display text-5xl md:text-6xl leading-[1.05] text-balance">
              Eleven functions.
              <br />
              <span className="italic">Zero</span> editorial bottleneck.
            </h2>
          </div>
          <p className="font-mono text-xs text-muted-foreground max-w-xs">
            Every function returns a value you can sort, filter, conditional-format, and chart.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-xl overflow-hidden border border-border">
          {FUNCTIONS.map((fn, i) => (
            <div
              key={fn.name}
              className="bg-card p-6 hover:bg-muted/40 transition-colors group"
            >
              <div className="flex items-baseline justify-between mb-4">
                <span className="font-mono text-xs text-muted-foreground">/{String(i + 1).padStart(2, "0")}</span>
                <span className="font-mono text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">ƒx</span>
              </div>
              <h3 className="font-mono font-semibold text-lg text-primary">{fn.name}</h3>
              <p className="font-mono text-xs text-muted-foreground mt-1 break-all">{fn.sig}</p>
              <p className="mt-4 text-sm text-foreground/80 leading-relaxed">{fn.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
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

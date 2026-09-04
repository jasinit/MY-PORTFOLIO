import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
  useMotionTemplate,
  type MotionValue,
} from "motion/react";
import { ArrowUpRight, ArrowDown } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const img = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

const NAV = [
  { label: "Home", id: "home" },
  { label: "Approach", id: "approach" },
  { label: "Work", id: "work" },
  { label: "Playground", id: "playground" },
  { label: "About", id: "about" },
];

const STEPS = [
  { n: "01", word: "Listen", body: "Understanding people, problems, and the context behind them.", color: "var(--pop-lime)" },
  { n: "02", word: "Explore", body: "Researching possibilities, asking questions, and identifying opportunities.", color: "var(--pop-sky)" },
  { n: "03", word: "Focus", body: "Turning complexity into clear product decisions.", color: "var(--pop-coral)" },
  { n: "04", word: "Design", body: "Creating thoughtful, accessible, and intuitive experiences.", color: "var(--pop-violet)" },
  { n: "05", word: "Refine", body: "Testing, learning, iterating, and improving.", color: "var(--pop-pink)" },
];

const PROJECTS = [
  {
    title: "Zenya",
    desc: "A cross-platform investment experience designed to make investing feel approachable and human.",
    role: "Product Design · Prototyping",
    year: "2025",
    tags: ["Fintech", "iOS", "Design System"],
    color: "#9b7bff",
    image: "1620641788421-7a1c342ea42e",
    metric: "2.4×",
    metricLabel: "Weekly activation",
    overview:
      "Zenya wanted investing to feel less like a spreadsheet and more like a decision anyone could feel confident making. New users understood the pitch but stalled before building a first useful portfolio.",
    challenge:
      "The onboarding read as a wall of financial forms. People bounced before reaching their first meaningful moment: a plan that actually felt like theirs.",
    solution:
      "I rebuilt activation as a guided, one-decision-at-a-time plan with progressive disclosure, plain language, and a live forecast that paid off the effort before setup even finished.",
    outcome:
      "Weekly activation grew 2.4× and support tickets about ‘where do I start’ effectively disappeared.",
    gallery: ["1620641788421-7a1c342ea42e", "1659469377768-4f42f2f091c5"],
  },
  {
    title: "Nkwado",
    desc: "A trustless marketplace connecting buyers, sellers, and businesses across a single commerce layer.",
    role: "UX · Visual Design",
    year: "2025",
    tags: ["Marketplace", "Web", "Brand"],
    color: "#5ad1ff",
    image: "1659469377768-4f42f2f091c5",
    metric: "+31%",
    metricLabel: "Completed transactions",
    overview:
      "Nkwado connects buyers and sellers who have no reason to trust each other yet. The product had to make safety legible without drowning people in policy.",
    challenge:
      "Trust signals were buried and inconsistent, so both sides hesitated at the exact moments money changed hands.",
    solution:
      "I designed a shared trust layer with clear states for escrow, verification, and dispute, plus a calmer visual system that let listings breathe and made the next safe action obvious.",
    outcome:
      "Completed transactions rose 31% and seller onboarding drop-off fell by nearly a third.",
    gallery: ["1659469377768-4f42f2f091c5", "1654198340681-a2e0fc449f1b"],
  },
  {
    title: "Villam Hub",
    desc: "An AgriTech platform focused on hydroponics, farming solutions, and sustainability.",
    role: "Product Design · Frontend",
    year: "2024",
    tags: ["AgriTech", "Platform", "Systems"],
    color: "#e8ff59",
    image: "1655841439659-0afc60676b70",
    metric: "4",
    metricLabel: "Months to market",
    overview:
      "Villam Hub had to make sustainable farming tools, training, and marketplace access feel simple for real growers, not agronomists.",
    challenge:
      "The domain was technical and the audience wasn't. Every screen risked becoming a manual instead of a next step.",
    solution:
      "I built the platform around three plain jobs (understand services, learn a method, reach the market) and shipped an approachable component system I could take straight into frontend.",
    outcome:
      "The team moved from concept to a live, coherent platform in four months.",
    gallery: ["1655841439659-0afc60676b70", "1620641788421-7a1c342ea42e"],
  },
  {
    title: "Good Governance Hub",
    desc: "A digital learning platform making governance education more accessible and genuinely engaging.",
    role: "Experience Design",
    year: "2024",
    tags: ["EdTech", "Web", "Content"],
    color: "#ff8fd6",
    image: "1654198340681-a2e0fc449f1b",
    metric: "+58%",
    metricLabel: "Return visits",
    overview:
      "A rich archive of governance content had no obvious reason for people to come back after a single visit.",
    challenge:
      "The material was valuable but passive: a library, not a path. Readers finished one piece and left.",
    solution:
      "I turned it into an active journey: saved threads, intentional recommendations, and a slower, more legible reading surface built on a system that's simple to keep alive.",
    outcome:
      "Return visits climbed 58% and average session depth roughly doubled.",
    gallery: ["1654198340681-a2e0fc449f1b", "1709377058964-929af7f2d02f"],
  },
  {
    title: "FocusFlow",
    desc: "A productivity experience designed to help people focus and work with real intention.",
    role: "Product · Interaction",
    year: "2023",
    tags: ["Productivity", "App", "Motion"],
    color: "#ff5c4d",
    image: "1710438399422-2fca27686bcd",
    metric: "−22%",
    metricLabel: "Task-switching",
    overview:
      "FocusFlow set out to help people protect attention in a world engineered to fragment it.",
    challenge:
      "Most focus tools add friction and guilt. The product needed to feel like a calm ally, not a stern timer.",
    solution:
      "I designed intention-first sessions, gentle motion that signals state without nagging, and a review that celebrates what got done instead of what didn't.",
    outcome:
      "Measured task-switching dropped 22% across a four-week pilot.",
    gallery: ["1710438399422-2fca27686bcd", "1655841439659-0afc60676b70"],
  },
];

const INTERESTS = ["Design systems", "Internet culture", "Books", "Cats", "Pop culture", "Building things"];

const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------ */
/*  Custom cursor                                                      */
/* ------------------------------------------------------------------ */

function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 34, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 380, damping: 34, mass: 0.6 });
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as HTMLElement;
      setActive(!!t.closest("[data-cursor='hover']"));
    };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block" aria-hidden>
      <motion.div
        className="fixed left-0 top-0 rounded-full border border-accent"
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
      >
        <motion.div
          className="rounded-full border border-accent"
          animate={{ width: active ? 56 : 30, height: active ? 56 : 30, opacity: active ? 1 : 0.7 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          style={{ translateX: "-50%", translateY: "-50%" }}
        />
      </motion.div>
      <motion.div
        className="fixed left-0 top-0 size-1.5 rounded-full bg-accent"
        style={{ x, y, translateX: "-50%", translateY: "-50%", opacity: visible ? 1 : 0 }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating navigation                                                */
/* ------------------------------------------------------------------ */

function FloatingNav() {
  const [active, setActive] = useState("home");
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY.current && y > 400);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className="fixed inset-x-0 top-4 z-[9000] flex justify-center px-4 md:top-6"
    >
      <div className="flex w-full max-w-6xl items-center justify-center gap-3 sm:justify-between">
        <button
          onClick={() => go("home")}
          data-cursor="hover"
          className="hidden font-script text-3xl leading-none text-foreground transition-colors hover:text-accent sm:block md:text-4xl"
        >
          Jasmine
        </button>

        <nav className="flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full border border-border bg-card/70 p-1 backdrop-blur-xl [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-1 [&::-webkit-scrollbar]:hidden">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              data-cursor="hover"
              className="relative shrink-0 whitespace-nowrap rounded-full px-2.5 py-1.5 text-[11px] font-medium tracking-tight transition-colors sm:px-4 sm:py-2 sm:text-[13px]"
            >
              {active === n.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-foreground"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className={`relative z-10 ${active === n.id ? "text-background" : "text-muted-foreground hover:text-foreground"}`}>
                {n.label}
              </span>
            </button>
          ))}
        </nav>

        <a
          href="mailto:favourndodo@gmail.com"
          data-cursor="hover"
          className="hidden rounded-full border border-border px-4 py-2.5 font-mono text-[11px] tracking-tight text-muted-foreground transition-colors hover:border-accent hover:text-accent lg:inline-block"
        >
          favourndodo@gmail.com
        </a>
      </div>
    </motion.header>
  );
}

/* ------------------------------------------------------------------ */
/*  Magnetic wrapper                                                   */
/* ------------------------------------------------------------------ */

function Magnetic({ children, strength = 0.4, className = "" }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18 });
  const sy = useSpring(y, { stiffness: 260, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    if (reduceMotion() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={reset} style={{ x: sx, y: sy }} className={className}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

const HERO_LINES = [
  ["Building", "digital"],
  ["experiences", "that"],
  ["make", "people", "stop,"],
  ["think,", "and", "feel."],
];

const HERO_WORD_COUNT = HERO_LINES.reduce((n, line) => n + line.length, 0);

/* Each word fades + lifts on its own staggered slice of the scroll,
   spread across the full scroll range so the heading resolves exactly
   as the hero leaves the viewport. */
function HeroWord({
  word,
  index,
  total,
  progress,
  accent,
}: {
  word: string;
  index: number;
  total: number;
  progress: import("motion/react").MotionValue<number>;
  accent: boolean;
}) {
  const start = (index / total) * 0.85;
  const end = start + 0.15;
  const opacity = useTransform(progress, [start, end], [1, 0]);
  const y = useTransform(progress, [start, end], [0, -60]);
  return (
    <motion.span style={{ opacity, y }} className="mr-[0.22em] inline-block">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ delay: 0.35 + index * 0.06, type: "spring", stiffness: 200, damping: 24 }}
        className={`inline-block ${accent ? "text-accent" : ""}`}
      >
        {word}
      </motion.span>
    </motion.span>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const indicatorOpacity = useTransform(scrollYProgress, [0.6, 1], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set((e.clientX - r.width / 2) / r.width);
    my.set((e.clientY - r.height / 2) / r.height);
  };

  let wordIndex = 0;

  return (
    <section id="home" ref={ref} onMouseMove={onMove} style={{ position: "relative" }} className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pt-24">
      <FloatingBlobs mx={smx} my={smy} />

      <motion.div style={{ y: yText }} className="relative z-10 mx-auto max-w-6xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground"
        >
          Product Designer · Available for 2026
        </motion.p>

        <h1 className="display-xl text-[clamp(2.9rem,10.5vw,10rem)] leading-[1.05] text-foreground">
          {HERO_LINES.map((line, li) => (
            <span key={li} className="block overflow-hidden py-[0.06em]">
              <span className="inline-block">
                {line.map((word) => {
                  const i = wordIndex++;
                  return (
                    <HeroWord
                      key={word + i}
                      word={word}
                      index={i}
                      total={HERO_WORD_COUNT}
                      progress={scrollYProgress}
                      accent={word.startsWith("feel")}
                    />
                  );
                })}
              </span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mx-auto mt-10 max-w-md text-balance text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          I design products, brands, and experiences for people, not just screens.
        </motion.p>
      </motion.div>

      <motion.div style={{ opacity: indicatorOpacity }} className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
            <ArrowDown size={16} />
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}

function FloatingBlobs({ mx, my }: { mx: MotionValue<number>; my: MotionValue<number> }) {
  const t1x = useTransform(mx, (v) => v * -60);
  const t1y = useTransform(my, (v) => v * -60);
  const t2x = useTransform(mx, (v) => v * 90);
  const t2y = useTransform(my, (v) => v * 90);
  const t3x = useTransform(mx, (v) => v * 40);
  const t3y = useTransform(my, (v) => v * -40);

  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      <motion.div style={{ x: t1x, y: t1y }} className="absolute left-[8%] top-[22%] size-40 rounded-full bg-pop-violet/20 blur-3xl md:size-72" />
      <motion.div style={{ x: t2x, y: t2y }} className="absolute right-[10%] top-[28%] size-40 rounded-full bg-accent/10 blur-3xl md:size-72" />
      <motion.div style={{ x: t3x, y: t3y }} className="absolute bottom-[14%] left-[40%] size-36 rounded-full bg-pop-sky/15 blur-3xl md:size-64" />

      <motion.div style={{ x: t2x, y: t2y }} className="absolute right-[14%] top-[24%] hidden md:block">
        <div className="size-3 rounded-full bg-accent" />
      </motion.div>
      <motion.div style={{ x: t1x, y: t1y }} className="absolute left-[16%] bottom-[26%] hidden font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:block">
        ✦ ux · ui · systems
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Approach: scroll-driven process words                             */
/* ------------------------------------------------------------------ */

/* One process word, continuously scrubbed across its slice of the
   pinned section: it enters from below, crosses dead-centre, and exits
   upward; all driven directly by scroll position, never by time. */
function ProcessWord({
  step,
  i,
  total,
  progress,
}: {
  step: (typeof STEPS)[number];
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = i / total;
  const center = (i + 0.5) / total;
  const end = (i + 1) / total;
  const isFirst = i === 0;
  const isLast = i === total - 1;

  // First word starts already centred; last word holds at centre on exit,
  // so the section never opens or closes on an empty frame.
  const y = useTransform(progress, [start, center, end], [isFirst ? 0 : 360, 0, isLast ? 0 : -360]);
  const opacity = useTransform(progress, [start, center, end], [isFirst ? 1 : 0, 1, isLast ? 1 : 0]);
  const scale = useTransform(progress, [start, center, end], [isFirst ? 1 : 0.7, 1, isLast ? 1 : 1.14]);
  const blurN = useTransform(progress, [start, center, end], [isFirst ? 0 : 20, 0, isLast ? 0 : 16]);
  const filter = useMotionTemplate`blur(${blurN}px)`;

  const glowOpacity = useTransform(progress, [start, center, end], [0, 0.18, 0]);
  const bodyOpacity = useTransform(progress, [start, center - 0.04, center + 0.04, end], [0, 1, 1, 0]);
  const bodyY = useTransform(progress, [start, center, end], [50, 0, -50]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-5">
      <motion.div
        style={{ background: step.color, opacity: glowOpacity }}
        className="pointer-events-none absolute left-[8%] top-[24%] size-24 rounded-full blur-2xl md:size-56"
        aria-hidden
      />
      <motion.h2
        style={{ y, opacity, scale, filter, color: step.color, willChange: "transform, opacity, filter" }}
        className="display-xl text-center text-[clamp(3.5rem,20vw,17rem)] leading-none"
      >
        {step.word}
      </motion.h2>
      <motion.p
        style={{ y: bodyY, opacity: bodyOpacity }}
        className="mt-4 max-w-md text-center text-balance text-base leading-relaxed text-muted-foreground md:text-lg"
      >
        {step.body}
      </motion.p>
    </div>
  );
}

function Approach() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [index, setIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(STEPS.length - 1, Math.floor(v * STEPS.length));
    setIndex(i);
  });

  const barWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="approach" ref={ref} style={{ height: `${STEPS.length * 100}vh`, position: "relative" }} className="relative">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* progress bar */}
        <div className="absolute left-0 top-0 h-1 w-full bg-border/40">
          <motion.div style={{ width: barWidth }} className="h-full bg-accent" />
        </div>

        <div className="absolute left-5 top-24 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground md:left-10">
          The Approach
        </div>
        <div className="absolute right-5 top-24 font-mono text-[11px] tracking-[0.3em] text-muted-foreground md:right-10">
          {STEPS[index].n} / 05
        </div>

        {STEPS.map((step, i) => (
          <ProcessWord key={step.word} step={step} i={i} total={STEPS.length} progress={scrollYProgress} />
        ))}

        {/* step ticks */}
        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-2">
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              className="h-1 rounded-full transition-all duration-300"
              style={{ width: i === index ? 40 : 16, background: i === index ? s.color : "rgba(244,242,238,0.2)" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Selected work                                                      */
/* ------------------------------------------------------------------ */

function Work() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, { stiffness: 180, damping: 22 });
  const spy = useSpring(py, { stiffness: 180, damping: 22 });

  const onMove = (e: React.MouseEvent) => {
    px.set(e.clientX);
    py.set(e.clientY);
  };

  return (
    <section id="work" onMouseMove={onMove} className="relative border-t border-border px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
          <h2 className="display-xl text-[clamp(2.6rem,9vw,8rem)] leading-[0.98]">
            Selected<br />Work
          </h2>
          <p className="max-w-xs pb-3 text-sm leading-relaxed text-muted-foreground">
            Five products where research, craft, and a clear point of view came together.
          </p>
        </div>

        <div className="border-t border-border">
          {PROJECTS.map((p, i) => (
            <motion.button
              key={p.title}
              type="button"
              onClick={() => setSelected(i)}
              data-cursor="hover"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.05 }}
              className="group relative flex w-full flex-col gap-3 border-b border-border py-7 text-left transition-colors md:flex-row md:items-center md:justify-between md:py-9"
            >
              <div className="flex items-baseline gap-4 md:gap-8">
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                <h3
                  className="font-display text-4xl uppercase leading-none tracking-tight transition-all duration-300 group-hover:translate-x-2 md:text-7xl"
                  style={{ color: hovered === i ? p.color : undefined }}
                >
                  {p.title}
                </h3>
              </div>

              <div className="ml-8 flex flex-col gap-3 md:ml-0 md:max-w-md md:flex-row md:items-center md:justify-end md:gap-6">
                {/* mobile inline preview */}
                <div className="h-40 w-full overflow-hidden rounded-xl bg-muted md:hidden">
                  <img src={img(p.image, 800)} alt={`${p.title} preview`} className="size-full object-cover" loading="lazy" />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground md:hidden">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 font-mono text-[11px] text-muted-foreground">
                  <span className="hidden md:inline">{p.role}</span>
                  <span>{p.year}</span>
                  <span className="inline-flex items-center gap-1 whitespace-nowrap transition-colors group-hover:text-foreground" style={{ color: hovered === i ? p.color : undefined }}>
                    Case study
                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* desktop cursor-following preview */}
      <AnimatePresence>
        {hovered !== null && selected === null && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 240, damping: 24 }}
            style={{ x: spx, y: spy, translateX: "-50%", translateY: "-50%" }}
            className="pointer-events-none fixed left-0 top-0 z-50 hidden aspect-[4/3] w-[26rem] overflow-hidden rounded-2xl md:block"
          >
            <img src={img(PROJECTS[hovered].image, 900)} alt="" className="size-full object-cover" />
            <div className="absolute inset-0 mix-blend-overlay" style={{ background: PROJECTS[hovered].color, opacity: 0.35 }} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selected !== null && (
          <CaseStudy
            project={PROJECTS[selected]}
            index={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Case study view                                                    */
/* ------------------------------------------------------------------ */

function CaseStudy({ project, index, onClose }: { project: (typeof PROJECTS)[number]; index: number; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9500] overflow-y-auto bg-background/95 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      <motion.article
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 28 }}
        className="mx-auto min-h-full max-w-5xl px-5 pb-28 pt-24 md:px-8"
      >
        {/* close */}
        <div className="fixed right-4 top-4 z-10 md:right-8 md:top-8">
          <button
            onClick={onClose}
            data-cursor="hover"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground backdrop-blur transition-colors hover:border-accent hover:text-accent"
          >
            Close <span className="text-base leading-none">×</span>
          </button>
        </div>

        {/* header */}
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          Case study 0{index + 1}
        </p>
        <h2 className="display-xl mt-4 text-[clamp(3rem,13vw,10rem)] leading-[0.98]" style={{ color: project.color }}>
          {project.title}
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground md:text-xl">
          {project.overview}
        </p>

        {/* meta */}
        <div className="mt-10 grid grid-cols-2 gap-6 border-y border-border py-8 md:grid-cols-4">
          <Meta label="Role" value={project.role} />
          <Meta label="Year" value={project.year} />
          <Meta label="Focus" value={project.tags.join(", ")} />
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Impact</p>
            <p className="mt-2 font-display text-4xl leading-none" style={{ color: project.color }}>{project.metric}</p>
            <p className="mt-1 text-xs text-muted-foreground">{project.metricLabel}</p>
          </div>
        </div>

        {/* hero image */}
        <div className="mt-10 aspect-[16/9] overflow-hidden rounded-2xl bg-muted">
          <img src={img(project.gallery[0], 1600)} alt={`${project.title} key visual`} className="size-full object-cover" />
        </div>

        {/* narrative */}
        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <Block title="The challenge" body={project.challenge} />
          <Block title="What I did" body={project.solution} />
        </div>

        {/* second image */}
        <div className="mt-12 aspect-[16/10] overflow-hidden rounded-2xl bg-muted">
          <img src={img(project.gallery[1], 1400)} alt={`${project.title} detail`} className="size-full object-cover" />
        </div>

        {/* outcome */}
        <div className="mt-14 rounded-2xl border border-border p-8 md:p-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">The outcome</p>
          <p className="mt-5 max-w-3xl text-balance font-display text-3xl uppercase leading-tight tracking-tight md:text-5xl">
            {project.outcome}
          </p>
        </div>

        <button
          onClick={onClose}
          data-cursor="hover"
          className="mt-14 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to all work
        </button>
      </motion.article>
    </motion.div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-sm leading-snug text-foreground">{value}</p>
    </div>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="font-display text-xl uppercase tracking-tight text-foreground">{title}</h3>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sticker wall                                                       */
/* ------------------------------------------------------------------ */

type Sticker = { c: string; x: string; y: string; r: number; depth: number; kind?: "shape" };
const STICKERS: Sticker[] = [
  { c: "✳", x: "8%", y: "18%", r: -12, depth: 40 },
  { c: "design ≠ decoration", x: "20%", y: "62%", r: 6, depth: 20 },
  { c: "◑", x: "70%", y: "20%", r: 0, depth: 60, kind: "shape" },
  { c: "ship it 🚀", x: "78%", y: "66%", r: -8, depth: 30 },
  { c: "✦", x: "44%", y: "12%", r: 14, depth: 50 },
  { c: "prototype → learn", x: "58%", y: "78%", r: -5, depth: 25 },
  { c: "❤", x: "14%", y: "80%", r: 10, depth: 45 },
  { c: "pixels + people", x: "82%", y: "40%", r: 8, depth: 35 },
  { c: "▲", x: "34%", y: "82%", r: -18, depth: 55, kind: "shape" },
  { c: "🐱", x: "62%", y: "44%", r: -6, depth: 28 },
];
const STICKER_COLORS = ["var(--pop-lime)", "var(--pop-coral)", "var(--pop-violet)", "var(--pop-sky)", "var(--pop-pink)"];

function StickerWall() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 50, damping: 18 });
  const smy = useSpring(my, { stiffness: 50, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) / r.width);
    my.set((e.clientY - r.top - r.height / 2) / r.height);
  };

  return (
    <section onMouseMove={onMove} className="relative min-h-[80vh] overflow-hidden border-t border-border px-5 py-24">
      {STICKERS.map((s, i) => (
        <ParallaxSticker key={i} s={s} i={i} mx={smx} my={smy} />
      ))}
      <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center text-center">
        <p className="text-balance font-display text-2xl uppercase leading-tight tracking-tight text-foreground md:text-4xl">
          Design is serious work.<br />
          <span className="text-muted-foreground">I just don't think the process always has to look serious.</span>
        </p>
      </div>
    </section>
  );
}

function ParallaxSticker({ s, i, mx, my }: { s: Sticker; i: number; mx: MotionValue<number>; my: MotionValue<number> }) {
  const x = useTransform(mx, (v) => v * s.depth);
  const y = useTransform(my, (v) => v * s.depth);
  const color = STICKER_COLORS[i % STICKER_COLORS.length];

  if (s.kind === "shape") {
    return (
      <motion.div
        style={{ x, y, left: s.x, top: s.y, rotate: s.r, color }}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4 + i * 0.3, ease: "easeInOut" }}
        className="pointer-events-none absolute z-0 text-5xl md:text-7xl"
        aria-hidden
      >
        {s.c}
      </motion.div>
    );
  }

  const isText = s.c.length > 2;
  return (
    <motion.div
      style={{ x, y, left: s.x, top: s.y, rotate: s.r }}
      animate={{ y: [0, -8, 0] }}
      transition={{ repeat: Infinity, duration: 5 + i * 0.25, ease: "easeInOut" }}
      className="pointer-events-none absolute z-0"
      aria-hidden
    >
      {isText ? (
        <span
          className="inline-block rounded-full border px-3 py-1.5 font-mono text-[11px] tracking-tight backdrop-blur-sm"
          style={{ borderColor: color, color }}
        >
          {s.c}
        </span>
      ) : (
        <span className="text-4xl md:text-6xl" style={{ color }}>{s.c}</span>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  About                                                              */
/* ------------------------------------------------------------------ */

function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section id="about" ref={ref} style={{ position: "relative" }} className="relative min-h-screen overflow-hidden border-t border-border">
      <motion.div style={{ scale }} className="absolute inset-0 z-0">
        <img
          src={img("1709377058964-929af7f2d02f", 1600)}
          alt="Abstract flowing texture"
          className="size-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 z-10 bg-background/80" />

      <div className="relative z-20 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-5 py-32">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="display-xl max-w-4xl text-[clamp(2.4rem,7vw,6rem)] leading-[1.02]"
        >
          Connection is my goal.<br />
          <span className="text-accent">Good design</span> is how I get there.
        </motion.h2>

        <div className="mt-14 grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            <p className="text-foreground">
              I'm Jasmine, a Product Designer who enjoys turning complicated ideas into experiences that feel simple, useful, and human.
            </p>
            <p>
              My background in engineering taught me how to think in systems. Design taught me how to think about people. Now I use both to build better products across product thinking, UX, visual design, brand storytelling, and systems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Off the clock</p>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((it) => (
                <span key={it} className="rounded-full border border-border bg-card/60 px-3.5 py-2 text-sm text-foreground backdrop-blur">
                  {it}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact                                                            */
/* ------------------------------------------------------------------ */

const LINKS = [
  { label: "Email", href: "mailto:favourndodo@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/favour-jasmine-ndodo-9206a5274" },
  { label: "GitHub", href: "https://github.com/jasinit" },
  { label: "Dribbble", href: "https://dribbble.com/favour-ndodo" },
  { label: "X", href: "https://x.com/jasvsdesign" },
];

function Contact() {
  return (
    <section id="contact" className="relative border-t border-border px-5 py-28 md:py-40">
      <div className="mx-auto max-w-6xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground"
        >
          Got something interesting?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="display-xl mx-auto max-w-5xl text-[clamp(2.6rem,9vw,9rem)] leading-[1.0]"
        >
          Let's make something people will <span className="text-accent">actually</span> want to use.
        </motion.h2>

        <div className="mt-16 flex justify-center">
          <Magnetic strength={0.5}>
            <a
              href="mailto:favourndodo@gmail.com"
              data-cursor="hover"
              className="inline-flex items-center gap-3 rounded-full bg-accent px-8 py-5 text-lg font-medium text-accent-foreground transition-transform"
            >
              favourndodo@gmail.com
              <ArrowUpRight size={22} />
            </a>
          </Magnetic>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-border pt-10">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              data-cursor="hover"
              className="group inline-flex items-center gap-1.5 font-mono text-sm uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
              <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ))}
        </div>

        <p className="mt-16 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          © 2026 Jasmine Ndodo. Designed & built with intention.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Playground: a freeform, draggable digital studio wall              */
/* ------------------------------------------------------------------ */

const PLAY_FILTERS = ["All", "Branding", "Social", "Campaigns", "Graphic Design", "Art Direction", "Experiments"] as const;

const PIECES = [
  {
    id: "sirenco",
    name: "Sirenco",
    kind: "Social Campaign",
    cat: "Social",
    year: "2025",
    role: "Art Direction · Social",
    color: "#ff8fd6",
    desc: "A summer launch campaign for a coastal beverage brand, built as a cohesive social system spanning feed posts, stories, and out-of-home.",
    image: "1620641788421-7a1c342ea42e",
    home: { left: 5, top: 4, rot: -6, w: 320 },
    assets: ["1620641788421-7a1c342ea42e", "1659469377768-4f42f2f091c5", "1654198340681-a2e0fc449f1b", "1710438399422-2fca27686bcd", "1655841439659-0afc60676b70"],
  },
  {
    id: "kanso",
    name: "Kanso",
    kind: "Brand Identity",
    cat: "Branding",
    year: "2025",
    role: "Brand Design · Systems",
    color: "#9b7bff",
    desc: "A calm, considered identity for a Japanese-inspired homeware studio, with logotype, palette, and a flexible layout system.",
    image: "1659469377768-4f42f2f091c5",
    home: { left: 58, top: 3, rot: 5, w: 340 },
    assets: ["1659469377768-4f42f2f091c5", "1655841439659-0afc60676b70", "1709377058964-929af7f2d02f", "1620641788421-7a1c342ea42e"],
  },
  {
    id: "bloomfest",
    name: "Bloom Fest",
    kind: "Event Branding",
    cat: "Campaigns",
    year: "2024",
    role: "Art Direction · Print",
    color: "#e8ff59",
    desc: "Identity and campaign for an independent spring music festival, spanning posters, wayfinding, merch, and a bold typographic key art.",
    image: "1654198340681-a2e0fc449f1b",
    home: { left: 33, top: 20, rot: -3, w: 300 },
    assets: ["1654198340681-a2e0fc449f1b", "1710438399422-2fca27686bcd", "1620641788421-7a1c342ea42e", "1659469377768-4f42f2f091c5", "1655841439659-0afc60676b70"],
  },
  {
    id: "novatype",
    name: "Nova",
    kind: "Type Specimen",
    cat: "Graphic Design",
    year: "2024",
    role: "Typography · Editorial",
    color: "#5ad1ff",
    desc: "A specimen and micro-site for an experimental variable display face, exploring how far one letterform can stretch.",
    image: "1655841439659-0afc60676b70",
    home: { left: 1, top: 44, rot: 4, w: 270 },
    assets: ["1655841439659-0afc60676b70", "1709377058964-929af7f2d02f", "1654198340681-a2e0fc449f1b"],
  },
  {
    id: "halcyon",
    name: "Halcyon",
    kind: "Art Direction",
    cat: "Art Direction",
    year: "2025",
    role: "Art Direction · Photography",
    color: "#ff5c4d",
    desc: "Art direction for an editorial fashion story: mood, styling references, and a restrained, filmic grade.",
    image: "1709377058964-929af7f2d02f",
    home: { left: 69, top: 38, rot: -7, w: 320 },
    assets: ["1709377058964-929af7f2d02f", "1620641788421-7a1c342ea42e", "1654198340681-a2e0fc449f1b", "1710438399422-2fca27686bcd"],
  },
  {
    id: "fauna",
    name: "Fauna",
    kind: "Illustration",
    cat: "Experiments",
    year: "2023",
    role: "Illustration",
    color: "#9b7bff",
    desc: "A personal illustration series exploring imagined creatures, a place to play with texture and colour with no brief attached.",
    image: "1710438399422-2fca27686bcd",
    home: { left: 43, top: 50, rot: 6, w: 240 },
    assets: ["1710438399422-2fca27686bcd", "1655841439659-0afc60676b70", "1659469377768-4f42f2f091c5"],
  },
  {
    id: "risonights",
    name: "Riso Nights",
    kind: "Poster Series",
    cat: "Graphic Design",
    year: "2024",
    role: "Graphic Design · Print",
    color: "#ff8fd6",
    desc: "A run of two-colour risograph posters for a local club night: grain, overprint, and happy accidents.",
    image: "1620641788421-7a1c342ea42e",
    home: { left: 19, top: 63, rot: -4, w: 280 },
    assets: ["1620641788421-7a1c342ea42e", "1654198340681-a2e0fc449f1b", "1709377058964-929af7f2d02f", "1655841439659-0afc60676b70"],
  },
  {
    id: "orbit",
    name: "Orbit",
    kind: "Logo Suite",
    cat: "Branding",
    year: "2023",
    role: "Brand Design · Logos",
    color: "#5ad1ff",
    desc: "A family of marks for a space-weather startup: one system, many orbits, scaling from favicon to signage.",
    image: "1659469377768-4f42f2f091c5",
    home: { left: 65, top: 65, rot: 8, w: 230 },
    assets: ["1659469377768-4f42f2f091c5", "1655841439659-0afc60676b70", "1620641788421-7a1c342ea42e"],
  },
  {
    id: "static",
    name: "Static",
    kind: "Visual Experiment",
    cat: "Experiments",
    year: "2025",
    role: "Motion · Code",
    color: "#e8ff59",
    desc: "A generative type experiment that feeds a single word through noise fields until it almost, but never quite, breaks.",
    image: "1654198340681-a2e0fc449f1b",
    home: { left: 47, top: 78, rot: -5, w: 260 },
    assets: ["1654198340681-a2e0fc449f1b", "1710438399422-2fca27686bcd", "1709377058964-929af7f2d02f"],
  },
  {
    id: "mono",
    name: "Mono",
    kind: "Editorial",
    cat: "Graphic Design",
    year: "2024",
    role: "Editorial · Layout",
    color: "#f4f2ee",
    desc: "A black-and-white zine on quiet design: a study in grids, margins, and letting the page breathe.",
    image: "1655841439659-0afc60676b70",
    home: { left: 3, top: 79, rot: 3, w: 250 },
    assets: ["1655841439659-0afc60676b70", "1659469377768-4f42f2f091c5", "1620641788421-7a1c342ea42e", "1654198340681-a2e0fc449f1b"],
  },
  {
    id: "lumen",
    name: "Lumen",
    kind: "Brand Campaign",
    cat: "Campaigns",
    year: "2025",
    role: "Art Direction · Campaign",
    color: "#5ad1ff",
    desc: "A launch campaign for a smart-lighting brand: key art, motion bumpers, and a full social rollout.",
    image: "1709377058964-929af7f2d02f",
    home: { left: 79, top: 14, rot: -9, w: 210 },
    assets: ["1709377058964-929af7f2d02f", "1620641788421-7a1c342ea42e", "1710438399422-2fca27686bcd", "1655841439659-0afc60676b70", "1659469377768-4f42f2f091c5"],
  },
] as const;

type Piece = (typeof PIECES)[number];

/* Re-flow visible pieces into a loose, curated 3-column arrangement. */
function curatedSlot(i: number, _n: number) {
  const cols = 3;
  const col = i % cols;
  const row = Math.floor(i / cols);
  const left = 6 + col * 30 + (((i * 13) % 7) - 3);
  const top = 4 + row * 27 + ((i * 7) % 6);
  const rot = (i % 2 === 0 ? 1 : -1) * (2 + (i % 4));
  return { left, top, rot };
}

function PlaygroundPiece({
  item,
  pos,
  shown,
  constraints,
  onOpen,
  onInfo,
}: {
  item: Piece;
  pos: { left: number; top: number; rot: number };
  shown: boolean;
  constraints: React.RefObject<HTMLDivElement>;
  onOpen: () => void;
  onInfo: (info: { name: string; kind: string; year: string } | null) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const dragged = useRef(false);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rX = useSpring(tiltX, { stiffness: 150, damping: 15 });
  const rY = useSpring(tiltY, { stiffness: 150, damping: 15 });

  const onMove = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    tiltY.set(px * 16); // rotate toward cursor horizontally
    tiltX.set(-py * 16);
    onInfo({ name: item.name, kind: item.kind, year: item.year });
  };

  return (
    <motion.div
      className="absolute"
      style={{
        width: `clamp(150px, ${(item.home.w / 8).toFixed(1)}vw, ${item.home.w}px)`,
        zIndex: hovered ? 50 : shown ? 10 : 0,
      }}
      initial={false}
      animate={{
        left: `${pos.left}%`,
        top: `${pos.top}%`,
        rotate: pos.rot,
        opacity: shown ? 1 : 0,
        scale: shown ? 1 : 0.4,
      }}
      transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.8 }}
    >
      <motion.div
        drag={shown}
        dragConstraints={constraints}
        dragMomentum
        dragElastic={0.16}
        onDragStart={() => (dragged.current = true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          tiltX.set(0);
          tiltY.set(0);
          onInfo(null);
        }}
        onMouseMove={onMove}
        onClick={() => {
          if (!dragged.current) onOpen();
          dragged.current = false;
        }}
        whileHover={{ scale: 1.07, y: -12, boxShadow: "0 34px 70px rgba(0,0,0,0.55)" }}
        whileTap={{ scale: 1.12 }}
        data-cursor="hover"
        style={{ rotateX: rX, rotateY: rY, transformPerspective: 900 }}
        className="group relative cursor-grab overflow-hidden rounded-xl border border-border bg-card shadow-lg active:cursor-grabbing"
      >
        <img
          src={img(item.image, 700)}
          alt={item.name}
          draggable={false}
          className="pointer-events-none block w-full select-none"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div>
            <p className="font-display text-lg leading-none" style={{ color: item.color }}>
              {item.name}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/70">{item.kind}</p>
          </div>
          <span className="font-mono text-[10px] text-white/70">{item.year}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function PlaygroundView({ item, onClose }: { item: Piece; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const isCampaign = item.cat === "Campaigns" || item.cat === "Social";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9500] overflow-y-auto bg-background"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/85 px-5 py-4 backdrop-blur md:px-10">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          Playground / {item.cat}
        </span>
        <button
          type="button"
          onClick={onClose}
          data-cursor="hover"
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-xs uppercase tracking-widest text-foreground transition-colors hover:bg-card"
        >
          Close <span aria-hidden>✕</span>
        </button>
      </div>

      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.05, duration: 0.5 }}
        className="mx-auto max-w-6xl px-5 py-16 md:px-10 md:py-24"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">{item.kind}</p>
        <h2
          className="display-xl mt-5 text-[clamp(3rem,13vw,11rem)] leading-[0.9]"
          style={{ color: item.color }}
        >
          {item.name}
        </h2>

        <div className="mt-10 grid gap-8 border-y border-border py-8 md:grid-cols-[1.6fr_1fr]">
          <p className="text-balance text-lg leading-relaxed text-foreground md:text-xl">{item.desc}</p>
          <dl className="grid grid-cols-2 gap-6 self-start font-mono text-xs uppercase tracking-widest">
            <div>
              <dt className="text-muted-foreground">Category</dt>
              <dd className="mt-1 text-foreground">{item.cat}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Year</dt>
              <dd className="mt-1 text-foreground">{item.year}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-muted-foreground">Role</dt>
              <dd className="mt-1 text-foreground">{item.role}</dd>
            </div>
          </dl>
        </div>

        {isCampaign && (
          <p className="mt-14 max-w-2xl font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            The campaign: feed posts, stories, key art & supporting assets
          </p>
        )}

        {/* Visual archive: varied sizes for a curated, non-uniform layout. */}
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-6 md:gap-6">
          {item.assets.map((a, i) => {
            const span =
              i === 0
                ? "col-span-2 md:col-span-4"
                : i % 3 === 0
                ? "col-span-2 md:col-span-4"
                : "col-span-1 md:col-span-2";
            return (
              <motion.div
                key={a + i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.05 }}
                className={`${span} overflow-hidden rounded-xl border border-border bg-card`}
              >
                <img
                  src={img(a, 1200)}
                  alt={`${item.name} asset ${i + 1}`}
                  className="block aspect-[4/3] w-full object-cover"
                />
              </motion.div>
            );
          })}
        </div>

        <div className="mt-20 flex justify-center">
          <button
            type="button"
            onClick={onClose}
            data-cursor="hover"
            className="rounded-full border border-border px-8 py-4 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to the wall
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Playground() {
  const [filter, setFilter] = useState<(typeof PLAY_FILTERS)[number]>("All");
  const [openId, setOpenId] = useState<string | null>(null);
  const [info, setInfo] = useState<{ name: string; kind: string; year: string } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const lx = useSpring(mx, { stiffness: 350, damping: 32 });
  const ly = useSpring(my, { stiffness: 350, damping: 32 });
  const onSectionMove = (e: React.MouseEvent) => {
    mx.set(e.clientX);
    my.set(e.clientY);
  };

  // Freeform drag wall is a desktop delight; phones get a clean tap grid.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const visible = PIECES.filter((p) => filter === "All" || p.cat === filter);
  const openItem = PIECES.find((p) => p.id === openId) ?? null;

  return (
    <section
      id="playground"
      onMouseMove={onSectionMove}
      className="relative overflow-hidden border-t border-border px-5 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">✦ Off-brief</p>
            <h2 className="display-xl mt-4 text-[clamp(3rem,14vw,13rem)] leading-[0.86]">
              Play<span className="text-accent">ground</span>
            </h2>
          </div>
          <p className="max-w-xs pb-3 text-sm leading-relaxed text-muted-foreground">
            A collection of things I made because I wanted to. Grab a piece, throw it around, open it up.
          </p>
        </div>

        {/* Floating filters (scrollable on small screens so they never overflow) */}
        <div className="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
          {PLAY_FILTERS.map((f) => {
            const active = f === filter;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                data-cursor="hover"
                className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors ${
                  active
                    ? "border-transparent bg-foreground text-background"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>

      {isMobile ? (
        /* Mobile: an animated tap grid that reflows on filter change */
        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.button
                layout
                key={p.id}
                type="button"
                onClick={() => setOpenId(p.id)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 220, damping: 26 }}
                className="relative overflow-hidden rounded-xl border border-border bg-card text-left"
              >
                <img src={img(p.image, 600)} alt={p.name} className="block aspect-[4/5] w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-3">
                  <p className="font-display text-base leading-none" style={{ color: p.color }}>
                    {p.name}
                  </p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-white/70">
                    {p.kind} · {p.year}
                  </p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        /* Desktop: the freeform, draggable wall */
        <div
          ref={canvasRef}
          className="relative mx-auto mt-12 h-[1000px] max-w-6xl md:h-[840px]"
        >
          {/* Decorative floating fragments */}
          <span className="pointer-events-none absolute right-[4%] top-[6%] hidden -rotate-12 font-script text-4xl text-accent/70 md:block">
            made with love
          </span>
          <span className="pointer-events-none absolute left-[30%] bottom-[4%] hidden rotate-6 font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground md:block">
            ✦ drag me around
          </span>

          {PIECES.map((p) => {
            const idx = visible.findIndex((v) => v.id === p.id);
            const shown = idx !== -1;
            const pos = filter === "All" ? p.home : shown ? curatedSlot(idx, visible.length) : p.home;
            return (
              <PlaygroundPiece
                key={p.id}
                item={p}
                pos={pos}
                shown={shown}
                constraints={canvasRef}
                onOpen={() => setOpenId(p.id)}
                onInfo={setInfo}
              />
            );
          })}
        </div>
      )}

      {/* Cursor-following info card */}
      <motion.div
        style={{ x: lx, y: ly }}
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden md:block"
        aria-hidden
      >
        <AnimatePresence>
          {info && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="ml-5 mt-5 rounded-lg border border-border bg-card/90 px-4 py-3 backdrop-blur"
            >
              <p className="font-display text-xl leading-none text-foreground">{info.name}</p>
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {info.kind} · {info.year}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {openItem && <PlaygroundView item={openItem} onClose={() => setOpenId(null)} />}
      </AnimatePresence>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */

export default function App() {
  return (
    <main className="cursor-none-fine grain relative min-h-screen bg-background text-foreground">
      <CustomCursor />
      <FloatingNav />
      <Hero />
      <Approach />
      <Work />
      <Playground />
      <StickerWall />
      <About />
      <Contact />
    </main>
  );
}

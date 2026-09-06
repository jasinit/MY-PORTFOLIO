import { useEffect, useRef, useState, Fragment } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
  useMotionTemplate,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { ArrowUpRight, ArrowDown, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import resumePdf from "../imports/Favour+Ndodo.pdf";
import villamCover from "../imports/6shots_so.png";
import praizzCouture from "../imports/176shots_so.png";
import sirenLogo from "../imports/sirenco playground/Siren Co.jpg";
import sirenOne from "../imports/sirenco playground/Siren(1).png";
import sirenAyra from "../imports/sirenco playground/Ayra 2.png";
import sirenWallpaper from "../imports/sirenco playground/Siren Wallpaper 1.png";
import sirenGalentines from "../imports/sirenco playground/Sirenco galentines 8.png";
import s0549 from "../imports/sirenco playground/0549F490-2E89-4D21-A119-82037EB38B50.jpg";
import s2b from "../imports/sirenco playground/2(1).png";
import s2 from "../imports/sirenco playground/2.png";
import s5 from "../imports/sirenco playground/5.jpg";
import s9 from "../imports/sirenco playground/9.jpg";
import sBook10 from "../imports/sirenco playground/Book (10).png";
import sBook7 from "../imports/sirenco playground/Book (7).png";
import sDark3 from "../imports/sirenco playground/Dark 3.png";
import sQueer from "../imports/sirenco playground/Exploring the intersection between queerness and feminism.jpg";
import sFlyer4 from "../imports/sirenco playground/flyer (4).png";
import sHappyIWD from "../imports/sirenco playground/HAPPYIWD.jpg";
import s1023 from "../imports/sirenco playground/IMG_1023.png";
import s1374 from "../imports/sirenco playground/IMG_1374.png";
import s3108 from "../imports/sirenco playground/IMG_3108.png";
import sIndependence from "../imports/sirenco playground/independence day.jpg";
import sLight from "../imports/sirenco playground/Light.png";
import sLight1 from "../imports/sirenco playground/Light1.png";
import sNatasha from "../imports/sirenco playground/natasha march.png";
import sRelaunch from "../imports/sirenco playground/relaunch anniversary 2.jpg";
import sWordsearch from "../imports/sirenco playground/siren wordsearch_20241031_150349_0000.png";
import herbodeOne from "../imports/herbode/1.png";
import herbodeCover from "../imports/herbode/Cover (1).png";
import herbodeIWD from "../imports/herbode/IWD Herbode Design.zip - 1.png";
import herbodeWaves from "../imports/herbode/THE FIRST FOUR MAJOR WAVES OF FEMINISM.png.png";
import herbode3 from "../imports/herbode/3 (1).png";
import herbode6 from "../imports/herbode/6.png";
import herbodeCoverBig from "../imports/herbode/Cover  (1).png";
import herbodeCoverAlt from "../imports/herbode/Cover .png";
import herbodeScience1 from "../imports/herbode/Herbode International day for women and girls in science.zip - 1.png";
import herbodeScience3 from "../imports/herbode/Herbode International day for women and girls in science.zip - 3.png";
import herbodeInfographic from "../imports/herbode/Infographic Instagram Carousel.zip - 1.png";
import herbodeWaves2 from "../imports/herbode/THE FIRST FOUR MAJOR WAVES OF FEMINISM.zip - 2.png";
import herbodeWaves5 from "../imports/herbode/THE FIRST FOUR MAJOR WAVES OF FEMINISM.zip - 5.png";
import herbodeWaves6 from "../imports/herbode/THE FIRST FOUR MAJOR WAVES OF FEMINISM.zip - 6.png";
import tbfbJpeg from "../imports/tbfb/3698AC2E-98D1-4F83-BC11-9B8A726323DA.jpeg";
import tbfb2C4B from "../imports/tbfb/2C4BA841-10E6-42BF-B006-FE74B57BFDD4.png";
import tbfb3BC1 from "../imports/tbfb/3BC1F788-D453-4B57-95F2-A4D17792825C.png";
import tbfb626B from "../imports/tbfb/626B2943-C0BD-4B43-AE55-EBC1EEF285AA.png";
import tbfb789A from "../imports/tbfb/789A6859-3CC8-4358-9F8A-B3675DFF52A5.png";
import tbfb8E15 from "../imports/tbfb/8E15B712-2A67-4ACA-8951-B6073D93DF23.png";
import tbfbB5C1 from "../imports/tbfb/B5C11AD4-69E0-4784-893B-8A6A79233D35.png";
import tbfbC1BF from "../imports/tbfb/C1BFEC82-8291-48E3-B469-DD8A64EFA46A.png";
import tbfbC40B from "../imports/tbfb/C40BBB5A-9891-4415-9009-36637D594575.png";
import tbfbFA09 from "../imports/tbfb/FA09C83B-ACBB-4EC3-B4B8-27FF77A7790B.png";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

/* Unsplash IDs become full URLs; local asset URLs pass through as-is. */
const img = (src: string, w = 1400) =>
  src.startsWith("http") || src.startsWith("/")
    ? src
    : `https://images.unsplash.com/photo-${src}?w=${w}&q=80&auto=format&fit=crop`;

const NAV = [
  { label: "Home", id: "home" },
  { label: "Work", id: "work" },
  { label: "Playground", id: "playground" },
  { label: "About", id: "about" },
];

const STEPS = [
  { n: "01", word: "Listen", body: "Understand the people before designing for them.", color: "var(--pop-lime)" },
  { n: "02", word: "Question", body: "Challenge assumptions. Find the real problem.", color: "var(--pop-sky)" },
  {
    n: "03",
    word: "Design",
    body: "Turn complexity into something people can actually use.",
    color: "var(--pop-coral)",
  },
  { n: "04", word: "Build", body: "Make it real. Test it. Break it. Improve it.", color: "var(--pop-violet)" },
  { n: "05", word: "Care", body: "Accessibility isn't an afterthought.", color: "var(--pop-pink)" },
];

type CaseStudySection = {
  title: string;
  body: string;
  flow?: string[];
  steps?: string[];
};

type CaseStudyData = {
  opening?: string[];
  intro: string;
  liveUrl?: string;
  meta: { role: string; focus: string; year: string };
  sections: CaseStudySection[];
};

const PROJECTS = [
  {
    title: "Nkwado",
    desc: "A mobile-first marketplace built around negotiation, proximity, logistics, and trust.",
    role: "Product Design · Seller Experience",
    year: "2026",
    tags: ["Marketplace", "Mobile", "Systems"],
    color: "var(--proj-sky)",
    image: "1659469377768-4f42f2f091c5",
    gallery: ["1659469377768-4f42f2f091c5", "1654198340681-a2e0fc449f1b"],
    caseStudy: {
      intro:
        "I designed the seller experience for Nkwado, a mobile-first marketplace built around negotiation, proximity, logistics, and trust.",
      liveUrl: "https://www.nkwado.com",
      meta: {
        role: "Product Designer",
        focus: "Product Design · Seller Experience · UX · Systems",
        year: "2026",
      },
      sections: [
        {
          title: "The Problem",
          body: "Sellers needed more than a place to list products. They needed to negotiate, manage orders, coordinate delivery, and build trust without losing the flexibility of how they already sell.",
        },
        {
          title: "My Role",
          body: "I designed the seller experience end to end: storefronts, product listing, negotiation, orders, and fulfillment, while keeping the buyer and logistics experiences connected.",
        },
        {
          title: "The Experience",
          body: "Each part connects. What a seller does affects the buyer, and the logistics behind every order.",
          flow: ["Storefront", "Products", "Negotiation", "Orders", "Fulfillment", "Reputation"],
        },
        {
          title: "The Design Challenge",
          body: "Negotiation. Price isn't fixed, so the product had to turn back-and-forth haggling into a clear, traceable flow without turning it into a form.",
          steps: ["Buyer makes an offer", "Seller responds", "Price is agreed", "Cart updates", "Payment"],
        },
        {
          title: "The Solution",
          body: "One shared system across roles: clear states for every order, plain language, and flows designed for small screens first. Commerce that feels like a conversation, not a checkout.",
        },
        {
          title: "The Result",
          body: "A seller experience that makes a complicated system feel clear, flexible, and manageable on mobile.",
        },
        {
          title: "Reflection",
          body: "The best systems work when every role sees the same truth, and the interface gets out of the way.",
        },
      ] as CaseStudySection[],
    } as CaseStudyData,
  },
  {
    title: "Zenya",
    desc: "A fintech investment app redesign focused on making investing feel clearer, simpler, and more approachable.",
    role: "Product Design · Design Systems",
    year: "2026",
    tags: ["Fintech", "App", "Accessibility"],
    color: "var(--proj-violet)",
    image: "1620641788421-7a1c342ea42e",
    gallery: ["1620641788421-7a1c342ea42e", "1659469377768-4f42f2f091c5"],
    caseStudy: {
      opening: ["Investing shouldn't feel like learning a new language."],
      intro:
        "Zenya is a fintech investment app redesign focused on making investing clearer, simpler, and more approachable.",
      meta: {
        role: "Product Designer",
        focus: "Product Design · UX/UI · Design Systems · Accessibility",
        year: "2026",
      },
      sections: [
        {
          title: "The Problem",
          body: "Financial products drown people in unfamiliar terms, dense flows, and information overload. The redesign aimed to make investing easier to understand and easier to navigate.",
        },
        {
          title: "My Role",
          body: "I worked across the product experience — onboarding, core investment flows, localization, accessibility, and the design system.",
        },
        {
          title: "The Experience",
          body: "Every step should feel intentional: users always know what they're doing and what happens next.",
          flow: ["Onboard", "Explore", "Invest", "Track"],
        },
        {
          title: "The Design Challenge",
          body: "Making a complex product feel simple — without hiding the details people need to trust it with their money.",
        },
        {
          title: "The Solution",
          body: "Progressive disclosure, plain language, and clearer hierarchy. Accessibility is part of the system — contrast, typography, RTL layouts, and language support — not bolted on at the end.",
        },
        {
          title: "The Result",
          body: "A cleaner investment experience that feels simple without feeling simplistic.",
        },
        {
          title: "Reflection",
          body: "Accessibility isn't a feature you add — it's a decision you make on every screen.",
        },
      ] as CaseStudySection[],
    } as CaseStudyData,
  },
  {
    title: "Good Governance Hub",
    desc: "A digital learning platform making governance education more accessible and genuinely engaging.",
    role: "UX Research · UX Design",
    year: "2025",
    tags: ["EdTech", "Web", "Content"],
    color: "var(--proj-pink)",
    image: "1654198340681-a2e0fc449f1b",
    gallery: ["1654198340681-a2e0fc449f1b", "1709377058964-929af7f2d02f"],
    caseStudy: {
      opening: ["What if learning about governance didn't feel like reading a government document?"],
      intro:
        "Good Governance Hub is an educational platform making governance learning accessible, structured, and engaging.",
      meta: {
        role: "Product Designer",
        focus: "UX Research · UX Design · Information Architecture",
        year: "2025",
      },
      sections: [
        {
          title: "The Problem",
          body: "Governance content is complex, information-heavy, and hard to navigate. Learners needed a way to discover courses, track progress, and engage without feeling overwhelmed.",
        },
        {
          title: "My Role",
          body: "UX research and experience design — turning user needs and complex content structures into a clearer learning experience.",
        },
        {
          title: "The Experience",
          body: "Structured around one question: where am I, what comes next, and why does it matter?",
          flow: ["Discover", "Learn", "Track", "Complete"],
        },
        {
          title: "The Design Challenge",
          body: "Reducing cognitive load. Presenting the right thing at the right time, instead of everything at once.",
        },
        {
          title: "The Solution",
          body: "Clear information hierarchy, progressive disclosure, and straightforward navigation — informed by research with real learners.",
        },
        {
          title: "The Result",
          body: "A learning experience that makes governance education feel less intimidating and more approachable.",
        },
        {
          title: "Reflection",
          body: "Complex doesn't have to feel complicated — clarity is a design decision.",
        },
      ] as CaseStudySection[],
    } as CaseStudyData,
  },
  {
    title: "Villam Hub",
    desc: "An agri-tech platform connecting people with hydroponic farming, farm services, and tree planting.",
    role: "Product & Brand Design",
    year: "2025",
    tags: ["AgriTech", "Platform", "Brand"],
    color: "var(--proj-lime)",
    image: villamCover,
    gallery: [villamCover, "1620641788421-7a1c342ea42e"],
    caseStudy: {
      intro:
        "Villam Hub is an agri-tech platform connecting people with hydroponic farming, farm services, and tree planting — making sustainable agriculture easier to join.",
      meta: {
        role: "Product Designer",
        focus: "Product Design · UX/UI · Brand Design",
        year: "2025",
      },
      sections: [
        {
          title: "The Problem",
          body: "Sustainable agriculture can feel technical and out of reach. Villam Hub needed to make it approachable — without losing credibility with people who know the land.",
        },
        {
          title: "My Role",
          body: "Product and brand: shaping the visual identity and translating the concept into a digital experience.",
        },
        {
          title: "The Experience",
          body: "From interest to action — simple, approachable, and clear.",
          flow: ["Discover", "Choose", "Get Started", "Grow"],
        },
        {
          title: "The Design Challenge",
          body: "An identity that feels earthy, modern, and optimistic — without falling into agricultural clichés.",
        },
        {
          title: "The Solution",
          body: "Colours, type, and interface designed to connect technology with nature — one system from the first landing page to the last growing tip.",
        },
        {
          title: "The Result",
          body: "A digital experience that positions agriculture as something people can participate in, not just observe.",
        },
        {
          title: "Reflection",
          body: "When brand and product speak the same language, trust comes built in.",
        },
      ] as CaseStudySection[],
    } as CaseStudyData,
  },
  {
    title: "FocusFlow",
    desc: "A productivity landing page designed to help people focus and work with real intention.",
    role: "Product · Interaction",
    year: "2025",
    tags: ["Productivity", "Web", "Motion"],
    color: "var(--proj-coral)",
    image: "1710438399422-2fca27686bcd",
    gallery: ["1710438399422-2fca27686bcd", "1655841439659-0afc60676b70"],
    caseStudy: {
      intro:
        "FocusFlow is a productivity landing page designed to help people organize their tasks, focus on what matters, and make progress without the overwhelm.",
      meta: {
        role: "Product Designer",
        focus: "Product Design · Interaction Design · UX/UI",
        year: "2025",
      },
      sections: [
        {
          title: "The Problem",
          body: "Productivity tools often add more to manage instead of helping you get things done. FocusFlow needed to feel calm and intentional — with enough structure to stay on track.",
        },
        {
          title: "My Role",
          body: "Product experience and interaction design — from information architecture and flows to the interface itself.",
        },
        {
          title: "The Experience",
          body: "The experience centres the next action, not everything on your plate.",
          flow: ["Capture", "Prioritize", "Focus", "Complete"],
        },
        {
          title: "The Design Challenge",
          body: "Designing focus. Reducing visual noise so the interface stays quiet when it needs to.",
        },
        {
          title: "The Solution",
          body: "Clear hierarchy, intentional spacing, and considered interaction states — motion that signals, never nags.",
        },
        {
          title: "The Result",
          body: "A productivity experience built around a simple idea: less managing, more doing.",
        },
        {
          title: "Reflection",
          body: "Good interface design is often invisible — calm is a feature.",
        },
      ] as CaseStudySection[],
    } as CaseStudyData,
  },
];

const INTERESTS = ["Design systems", "Internet culture", "Books", "Cats", "Pop culture", "Building things"];

const NOW_ITEMS = [
  "Building accessible products",
  "Learning motion systems",
  "Reading about typography",
  "Listening to amapiano",
  "Collecting fonts",
  "Watering plants, digitally",
  "Listening to BTS",
  "Retail therapy",
  "Gisting with my friends",
  "Collaborating with AI",
];

const reduceMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------ */
/*  Motion preference: OS setting + an on-site override.               */
/* ------------------------------------------------------------------ */

const MOTION_KEY = "jasmine-motion";

const getStoredMotion = () => {
  try {
    return localStorage.getItem(MOTION_KEY) === "reduced";
  } catch {
    return false;
  }
};

const setStoredMotion = (reduced: boolean) => {
  try {
    localStorage.setItem(MOTION_KEY, reduced ? "reduced" : "full");
  } catch {
    /* private mode */
  }
  document.documentElement.classList.toggle("reduce-motion", reduced);
  window.dispatchEvent(new Event("jasmine-motion-changed"));
};

/* Respects prefers-reduced-motion AND the on-site toggle. */
function useSiteReducedMotion() {
  const osReduce = useReducedMotion();
  const [forced, setForced] = useState(getStoredMotion);

  useEffect(() => {
    const sync = () => setForced(getStoredMotion());
    window.addEventListener("jasmine-motion-changed", sync);
    return () => window.removeEventListener("jasmine-motion-changed", sync);
  }, []);

  return forced || !!osReduce;
}

/* ------------------------------------------------------------------ */
/*  Custom cursor                                                      */
/* ------------------------------------------------------------------ */

function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 34, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 380, damping: 34, mass: 0.6 });
  const [mode, setMode] = useState<"hover" | "drag" | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as HTMLElement;
      if (t.closest("[data-cursor='drag']")) setMode("drag");
      else if (t.closest("[data-cursor='hover']")) setMode("hover");
      else setMode(null);
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

  const ringSize = mode === "drag" ? 72 : mode === "hover" ? 52 : 34;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block" aria-hidden>
      {/* Orbiting ring: springs to the pointer, slowly rotates with a comet dot */}
      <motion.div className="fixed left-0 top-0" style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}>
        <motion.div
          className={`relative rounded-full border ${mode === "drag" ? "border-accent bg-accent/10" : "border-accent"}`}
          animate={{ width: ringSize, height: ringSize }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          style={{ translateX: "-50%", translateY: "-50%" }}
        >
          <motion.span
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: mode === "drag" ? 1.6 : 7, ease: "linear" }}
          >
            <span className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
          </motion.span>
        </motion.div>
      </motion.div>
      {/* Spinning star core */}
      <motion.div
        className="fixed left-0 top-0 text-accent"
        style={{ x, y, translateX: "-50%", translateY: "-50%", opacity: visible ? 1 : 0 }}
      >
        <motion.span
          className={`block leading-none ${mode === "drag" ? "text-[15px]" : "text-[11px]"}`}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 9, ease: "linear" }}
        >
          ✦
        </motion.span>
      </motion.div>
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
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
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
              className="relative shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-[11px] font-medium tracking-tight transition-colors sm:px-4 sm:text-[13px]"
            >
              {active === n.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-foreground"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span
                className={`relative z-10 ${active === n.id ? "text-background" : "text-muted-foreground hover:text-foreground"}`}
              >
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

function Magnetic({
  children,
  strength = 0.4,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
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
  const reset = () => {
    x.set(0);
    y.set(0);
  };

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

/* Words rise from a mask on load, staggered left to right. */
function HeroWord({ word, index, accent, reduce }: { word: string; index: number; accent: boolean; reduce: boolean }) {
  if (reduce) {
    return <span className={`mr-[0.22em] inline-block ${accent ? "text-accent" : ""}`}>{word}</span>;
  }

  return (
    <span className="mr-[0.22em] inline-block">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ delay: 0.35 + index * 0.06, type: "spring", stiffness: 200, damping: 24 }}
        className={`inline-block ${accent ? "text-accent" : ""}`}
      >
        {word}
      </motion.span>
    </span>
  );
}

/* Each line drifts at its own gentle speed while scrolling, so the
   headline gets depth instead of word-by-word chaos. */
function HeroLine({
  li,
  progress,
  reduce,
  children,
}: {
  li: number;
  progress: import("motion/react").MotionValue<number>;
  reduce: boolean;
  children: React.ReactNode;
}) {
  const speeds = [16, 30, 44, 58];
  const y = useTransform(progress, [0, 1], [0, -speeds[li]]);
  return (
    <motion.span style={{ y: reduce ? 0 : y }} className="block overflow-hidden py-[0.06em]">
      {children}
    </motion.span>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useSiteReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);
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
    <section
      id="home"
      ref={ref}
      onMouseMove={onMove}
      style={{ position: "relative" }}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pt-20 md:pt-24"
    >
      <FloatingBlobs mx={smx} my={smy} />

      <motion.div
        style={{ y: reduce ? 0 : yText, opacity }}
        className="relative z-10 mx-auto w-full max-w-6xl text-center"
      >
        <motion.p
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mb-6 max-w-md text-balance font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-muted-foreground sm:tracking-[0.35em]"
        >
          Your friendly neighborhood Product Engineer
        </motion.p>

        <h1 className="display-xl text-[clamp(2.9rem,10.5vw,10rem)] leading-[1.05] text-foreground">
          {HERO_LINES.map((line, li) => (
            <HeroLine key={li} li={li} progress={scrollYProgress} reduce={reduce}>
              <span className="inline-block">
                {line.map((word) => {
                  const i = wordIndex++;
                  return (
                    <HeroWord key={word + i} word={word} index={i} accent={word.startsWith("feel")} reduce={reduce} />
                  );
                })}
              </span>
            </HeroLine>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduce ? 0.1 : 1.1 }}
          className="mx-auto mt-6 max-w-md text-balance text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          I design and build digital products that are useful, accessible, and built to last.
        </motion.p>

        <motion.div
          style={{ opacity: reduce ? 1 : indicatorOpacity }}
          className="mt-10 flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <motion.span animate={reduce ? undefined : { y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
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
      <motion.div
        style={{ x: t1x, y: t1y }}
        className="absolute left-[8%] top-[22%] size-40 rounded-full bg-pop-violet/20 blur-3xl md:size-72"
      />
      <motion.div
        style={{ x: t2x, y: t2y }}
        className="absolute right-[10%] top-[28%] size-40 rounded-full bg-accent/10 blur-3xl md:size-72"
      />
      <motion.div
        style={{ x: t3x, y: t3y }}
        className="absolute bottom-[14%] left-[40%] size-36 rounded-full bg-pop-sky/15 blur-3xl md:size-64"
      />

      <motion.div style={{ x: t2x, y: t2y }} className="absolute right-[14%] top-[24%] hidden md:block">
        <div className="size-3 rounded-full bg-accent" />
      </motion.div>
      <motion.div
        style={{ x: t1x, y: t1y }}
        className="absolute left-[16%] bottom-[26%] hidden font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:block"
      >
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
  const reduce = useSiteReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [index, setIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(STEPS.length - 1, Math.floor(v * STEPS.length));
    setIndex(i);
  });

  const barWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Reduced motion: skip the 500vh pinned scrub and show a static list.
  if (reduce) {
    return (
      <section id="approach" className="relative border-t border-border px-5 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="mb-16 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            The Approach
          </p>
          <div className="space-y-20">
            {STEPS.map((step) => (
              <div key={step.word} className="flex flex-col items-center text-center">
                <span className="font-mono text-[11px] tracking-[0.3em] text-muted-foreground">{step.n} / 05</span>
                <h2
                  className="display-xl mt-4 text-[clamp(3rem,14vw,10rem)] leading-none"
                  style={{ color: step.color }}
                >
                  {step.word}
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="approach"
      ref={ref}
      style={{ height: `${STEPS.length * 100}vh`, position: "relative" }}
      className="relative"
    >
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
              style={{ width: i === index ? 40 : 16, background: i === index ? s.color : "var(--tick-idle)" }}
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
            Selected
            <br />
            Work
          </h2>
          <p className="max-w-xs pb-3 text-sm leading-relaxed text-muted-foreground">
            Real products. Real problems. Real people.
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
              className={`group relative flex w-full flex-col gap-3 border-b border-border py-7 text-left transition-colors md:flex-row md:items-center md:justify-between ${
                i < 2 ? "md:py-12" : "md:py-9"
              }`}
            >
              <div className="flex items-baseline gap-4 md:gap-8">
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                <h3
                  className={`font-display uppercase leading-none tracking-tight transition-all duration-300 group-hover:translate-x-2 ${
                    i < 2 ? "text-5xl md:text-7xl lg:text-8xl" : "text-4xl md:text-6xl lg:text-7xl"
                  }`}
                  style={{ color: hovered === i ? p.color : undefined }}
                >
                  {p.title}
                </h3>
              </div>

              <div className="ml-8 flex flex-col gap-3 md:ml-0 md:max-w-md md:flex-row md:items-center md:justify-end md:gap-6">
                {/* mobile inline preview */}
                <div className="h-40 w-full overflow-hidden rounded-xl bg-muted md:hidden">
                  <img
                    src={img(p.image, 800)}
                    alt={`${p.title} preview`}
                    className="size-full object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground md:hidden">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 font-mono text-[11px] text-muted-foreground">
                  <span className="hidden md:inline">{p.role}</span>
                  <span>{p.year}</span>
                  <span
                    className="inline-flex items-center gap-1 whitespace-nowrap transition-colors group-hover:text-foreground"
                    style={{ color: hovered === i ? p.color : undefined }}
                  >
                    Case study
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
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
            <div
              className="absolute inset-0 mix-blend-overlay"
              style={{ background: PROJECTS[hovered].color, opacity: 0.35 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selected !== null && (
          <CaseStudy
            project={PROJECTS[selected]}
            index={selected}
            onClose={() => setSelected(null)}
            onNavigate={(dir) => setSelected((selected + dir + PROJECTS.length) % PROJECTS.length)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Case study view                                                    */
/* ------------------------------------------------------------------ */

/* Modal behaviour: move focus in, trap Tab, make the page inert, and
   restore focus to the trigger when the modal unmounts. */
function useModalFocus(ref: React.RefObject<HTMLDivElement>) {
  const restore = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    restore.current = document.activeElement as HTMLElement | null;
    const main = document.querySelector("main");
    main?.setAttribute("inert", "");

    const focusables = () =>
      Array.from(el.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));

    (focusables()[0] ?? el).focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const nodes = focusables();
      if (nodes.length === 0) {
        e.preventDefault();
        return;
      }
      const firstEl = nodes[0];
      const lastEl = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    el.addEventListener("keydown", onKey);
    return () => {
      el.removeEventListener("keydown", onKey);
      main?.removeAttribute("inert");
      restore.current?.focus();
    };
  }, [ref]);
}

function CaseStudy({
  project,
  index,
  onClose,
  onNavigate,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
  onClose: () => void;
  onNavigate: (dir: 1 | -1) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useSiteReducedMotion();
  useModalFocus(ref);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const cs = project.caseStudy;

  return createPortal(
    <motion.div
      ref={ref}
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
        initial={reduce ? { opacity: 0 } : { y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={reduce ? { opacity: 0 } : { y: 30, opacity: 0 }}
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
        <h2 className="display-xl mt-4 text-[clamp(2.4rem,7vw,6.5rem)] leading-[0.98]" style={{ color: project.color }}>
          {project.title}
        </h2>

        {cs.opening && (
          <div className="mt-8 space-y-1">
            {cs.opening.map((line, li) => (
              <p
                key={line}
                className={`font-display text-[clamp(1.4rem,3vw,2.6rem)] uppercase leading-[1.05] tracking-tight ${
                  li === cs.opening!.length - 1 ? "text-accent" : "text-foreground"
                }`}
              >
                {line}
              </p>
            ))}
          </div>
        )}

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">{cs.intro}</p>

        {cs.liveUrl && (
          <a
            href={cs.liveUrl}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 font-mono text-xs uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            View live site
            <ArrowUpRight size={16} />
          </a>
        )}

        {/* meta */}
        <div className="mt-10 grid grid-cols-2 gap-6 border-y border-border py-8 md:grid-cols-3">
          <Meta label="Role" value={cs.meta.role} />
          <Meta label="Focus" value={cs.meta.focus} />
          <Meta label="Year" value={cs.meta.year} />
        </div>

        {/* hero image */}
        <div className="mt-10 aspect-[16/9] overflow-hidden rounded-2xl bg-muted">
          <img
            src={img(project.gallery[0], 1600)}
            alt={`${project.title} key visual`}
            className="size-full object-cover"
          />
        </div>

        {/* sections */}
        <div className="mt-16 space-y-20">
          {cs.sections.map((section, si) => (
            <div key={section.title}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                {section.title}
              </h3>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-foreground md:text-2xl">{section.body}</p>

              {section.flow && (
                <div className="mt-8 flex flex-wrap items-center gap-2">
                  {section.flow.map((f, i) => (
                    <Fragment key={f}>
                      {i > 0 && <ArrowRight size={14} className="shrink-0 text-muted-foreground" aria-hidden />}
                      <span className="rounded-full border border-border bg-card px-3.5 py-2 font-mono text-[11px] uppercase tracking-widest text-foreground">
                        {f}
                      </span>
                    </Fragment>
                  ))}
                </div>
              )}

              {section.steps && (
                <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                  {section.steps.map((s, i) => (
                    <li key={s} className="rounded-xl border border-border p-4">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-accent">0{i + 1}</span>
                      <p className="mt-2 text-sm leading-snug text-foreground">{s}</p>
                    </li>
                  ))}
                </ol>
              )}

              {si === 4 && (
                <div className="mt-10 aspect-[16/10] overflow-hidden rounded-2xl bg-muted">
                  <img
                    src={img(project.gallery[1], 1400)}
                    alt={`${project.title} detail`}
                    className="size-full object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onClose}
            data-cursor="hover"
            className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to all work
          </button>

          <div className="flex items-center gap-3 font-mono text-sm uppercase tracking-wider">
            <button
              onClick={() => onNavigate(-1)}
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-muted-foreground transition-colors hover:border-accent hover:text-accent"
            >
              ← {PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length].title}
            </button>
            <button
              onClick={() => onNavigate(1)}
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-muted-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {PROJECTS[(index + 1) % PROJECTS.length].title} →
            </button>
          </div>
        </div>
      </motion.article>
    </motion.div>,
    document.body,
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
const STICKER_COLORS = [
  "var(--pop-lime)",
  "var(--pop-coral)",
  "var(--pop-violet)",
  "var(--pop-sky)",
  "var(--pop-pink)",
];

function StickerWall() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 50, damping: 18 });
  const smy = useSpring(my, { stiffness: 50, damping: 18 });
  const [burst, setBurst] = useState<number | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set((e.clientX - r.left - r.width / 2) / r.width);
    my.set((e.clientY - r.top - r.height / 2) / r.height);
  };

  const onTap = (i: number) => {
    setBurst(i);
    window.setTimeout(() => setBurst((b) => (b === i ? null : b)), 650);
  };

  return (
    <section onMouseMove={onMove} className="relative min-h-[80vh] overflow-hidden border-t border-border px-5 py-24">
      {STICKERS.map((s, i) => (
        <ParallaxSticker key={i} s={s} i={i} mx={smx} my={smy} burst={burst === i} onTap={() => onTap(i)} />
      ))}
      <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center text-center">
        <p className="text-balance font-display text-2xl uppercase leading-tight tracking-tight text-foreground md:text-4xl">
          Design is serious work.
          <br />
          <span className="text-muted-foreground">I just don't think the process always has to look serious.</span>
        </p>
      </div>
    </section>
  );
}

function ParallaxSticker({
  s,
  i,
  mx,
  my,
  burst,
  onTap,
}: {
  s: Sticker;
  i: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  burst: boolean;
  onTap: () => void;
}) {
  const reduce = useSiteReducedMotion();
  const x = useTransform(mx, (v) => v * s.depth);
  const y = useTransform(my, (v) => v * s.depth);
  const color = STICKER_COLORS[i % STICKER_COLORS.length];

  if (s.kind === "shape") {
    return (
      <motion.div
        style={{ x: reduce ? 0 : x, y: reduce ? 0 : y, left: s.x, top: s.y, rotate: s.r, color }}
        animate={reduce ? undefined : { y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4 + i * 0.3, ease: "easeInOut" }}
        className="absolute z-0 cursor-pointer text-5xl md:text-7xl"
        onClick={onTap}
        data-cursor="hover"
        aria-hidden
      >
        <motion.span
          className="inline-block"
          animate={burst ? { rotate: [0, 360], scale: [1, 1.6, 1] } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {s.c}
        </motion.span>
      </motion.div>
    );
  }

  const isText = s.c.length > 2;
  return (
    <motion.div
      style={{ x: reduce ? 0 : x, y: reduce ? 0 : y, left: s.x, top: s.y, rotate: s.r }}
      animate={reduce ? undefined : { y: [0, -8, 0] }}
      transition={{ repeat: Infinity, duration: 5 + i * 0.25, ease: "easeInOut" }}
      className="absolute z-0 cursor-pointer"
      onClick={onTap}
      data-cursor="hover"
      aria-hidden
    >
      <motion.span
        className="inline-block"
        animate={burst ? { rotate: [0, 360], scale: [1, 1.5, 1] } : { rotate: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {isText ? (
          <span
            className="inline-block rounded-full border px-3 py-1.5 font-mono text-[11px] tracking-tight backdrop-blur-sm"
            style={{ borderColor: color, color }}
          >
            {s.c}
          </span>
        ) : (
          <span className="text-4xl md:text-6xl" style={{ color }}>
            {s.c}
          </span>
        )}
      </motion.span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  About                                                              */
/* ------------------------------------------------------------------ */

function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useSiteReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section
      id="about"
      ref={ref}
      style={{ position: "relative" }}
      className="relative min-h-screen overflow-hidden border-t border-border"
    >
      <motion.div style={{ scale: reduce ? 1 : scale }} className="absolute inset-0 z-0">
        <img
          src={img("1709377058964-929af7f2d02f", 1600)}
          alt="Abstract flowing texture"
          className="size-full object-cover"
          loading="lazy"
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
          Connection is my goal.
          <br />
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
              I'm Jasmine — a Product Engineer. My background in engineering taught me how to think in systems. Design
              taught me how to think about people. Frontend training showed me the whole picture.
            </p>
            <p>
              Now I sit somewhere between design and engineering, building products that are useful, accessible, and
              built to last.
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
                <span
                  key={it}
                  className="rounded-full border border-border bg-card/60 px-3.5 py-2 text-sm text-foreground backdrop-blur"
                >
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

const LINKS: { label: string; href: string }[] = [
  { label: "Email", href: "mailto:favourndodo@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/favour-jasmine-ndodo-9206a5274" },
  { label: "GitHub", href: "https://github.com/jasinit" },
  { label: "Dribbble", href: "https://dribbble.com/favour-ndodo" },
  { label: "X", href: "https://x.com/jasvsdesign" },
];

function MotionToggle() {
  const [reduced, setReduced] = useState(getStoredMotion);

  return (
    <button
      type="button"
      onClick={() => {
        const next = !reduced;
        setReduced(next);
        setStoredMotion(next);
      }}
      data-cursor="hover"
      aria-pressed={reduced}
      className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:border-accent hover:text-accent"
    >
      {reduced ? "✦ Motion: reduced" : "✦ Motion: full"}
    </button>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative border-t border-border py-28 md:py-40">
      {/* "Currently" ticker */}
      <div className="mb-24 overflow-hidden border-y border-border py-4" aria-hidden>
        <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          {[0, 1].map((half) => (
            <span key={half} className="flex items-center gap-10">
              {NOW_ITEMS.map((item) => (
                <span key={half + item} className="flex items-center gap-10">
                  <span>{item}</span>
                  <span className="text-accent">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 text-center">
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

        <div className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
          <Magnetic strength={0.35}>
            <a
              href={resumePdf}
              download
              data-cursor="hover"
              className="inline-flex items-center gap-3 rounded-full border border-border px-8 py-5 text-lg font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Download résumé
              <ArrowDown size={22} />
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
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4">
          <MotionToggle />
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Built with React · Vite · Motion · Tailwind — designed for keyboard, screen readers & humans
          </p>
        </div>

        <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          © 2026 Jasmine Ndodo. Designed & built with intention.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Playground: a freeform, draggable digital studio wall              */
/* ------------------------------------------------------------------ */

const PLAY_FILTERS = ["All", "Branding", "Social Media", "AI Builds"] as const;

const PIECES = [
  {
    id: "sirenco",
    name: "Sirenco",
    kind: "Brand & Social",
    cat: "Branding",
    year: "2022–2025",
    role: "Lead Brand Designer · Creative Director",
    color: "var(--piece-pink)",
    desc: "Brand identity, campaign, and social direction for Sirenco, spanning logos, key art, and a full social system.",
    image: sirenOne,
    home: { left: 5, top: 4, rot: -6, w: 320 },
    assets: [
      sirenLogo,
      sirenOne,
      sirenAyra,
      sirenWallpaper,
      sirenGalentines,
      s0549,
      s2b,
      s2,
      s5,
      s9,
      sBook10,
      sBook7,
      sDark3,
      sQueer,
      sFlyer4,
      sHappyIWD,
      s1023,
      s1374,
      s3108,
      sIndependence,
      sLight,
      sLight1,
      sNatasha,
      sRelaunch,
      sWordsearch,
    ],
  },
  {
    id: "herbode",
    name: "Herbode",
    kind: "Brand & Campaign",
    cat: "Branding",
    year: "2024–2025",
    role: "Lead Brand Designer · Creative Director",
    color: "var(--piece-lime)",
    desc: "Brand identity and campaign direction for Herbode, from logotype and palette to key visuals and rollout.",
    image: herbodeCover,
    home: { left: 18, top: 33, rot: -5, w: 300 },
    assets: [
      herbodeOne,
      herbodeCover,
      herbodeIWD,
      herbodeWaves,
      herbode3,
      herbode6,
      herbodeCoverBig,
      herbodeCoverAlt,
      herbodeScience1,
      herbodeScience3,
      herbodeInfographic,
      herbodeWaves2,
      herbodeWaves5,
      herbodeWaves6,
    ],
  },
  {
    id: "giaftech",
    name: "Giaftech",
    kind: "Social Campaign",
    cat: "Social Media",
    year: "2025",
    role: "Brand Design · Social",
    color: "var(--piece-violet)",
    desc: "Brand and social media design for Giaftech. A bold, confident presence across platforms, with a focus on clarity and consistency.",
    image: "1659469377768-4f42f2f091c5",
    home: { left: 52, top: 26, rot: 6, w: 280 },
    assets: [
      "1659469377768-4f42f2f091c5",
      "1620641788421-7a1c342ea42e",
      "1709377058964-929af7f2d02f",
      "1655841439659-0afc60676b70",
    ],
  },
  {
    id: "tbfb",
    name: "TBFB",
    kind: "Brand & Social",
    cat: "Social Media",
    year: "2024",
    role: "Brand Design · Social",
    color: "var(--piece-coral)",
    desc: "Brand and social design for TBFB,The Bitter Feminit Brand, a bold fashion brand translating a bold brand voice into consistent social presence.",
    image: tbfbJpeg,
    home: { left: 36, top: 72, rot: -3, w: 260 },
    assets: [tbfbJpeg, tbfb2C4B, tbfb3BC1, tbfb626B, tbfb789A, tbfb8E15, tbfbB5C1, tbfbC1BF, tbfbC40B, tbfbFA09],
  },
  {
    id: "cip",
    name: "CIP",
    kind: "Social Campaign",
    cat: "Social Media",
    year: "2023–2024",
    role: "Brand Design · Social",
    color: "var(--piece-sky)",
    desc: "Brand and social media design for Conversations In Pyjamas Podcast, crafting a refined, confident presence across platforms.",
    image: "1709377058964-929af7f2d02f",
    home: { left: 8, top: 62, rot: 7, w: 250 },
    assets: ["1709377058964-929af7f2d02f", "1654198340681-a2e0fc449f1b", "1620641788421-7a1c342ea42e"],
  },
  {
    id: "afyher",
    name: "Afyher",
    kind: "Brand Identity",
    cat: "Branding",
    year: "2026",
    role: "Solo Creative · Brand Designer",
    color: "var(--piece-pink)",
    desc: "Brand identity for Afyher, a women's health focused online community that teaches and informs women about themselves.",
    image: "1655841439659-0afc60676b70",
    home: { left: 60, top: 52, rot: -4, w: 270 },
    assets: ["1655841439659-0afc60676b70", "1654198340681-a2e0fc449f1b", "1659469377768-4f42f2f091c5"],
  },
  {
    id: "praizz-couture",
    name: "Praizz Couture",
    kind: "Brand Identity",
    cat: "Branding",
    year: "2025",
    role: "Brand Design · Systems",
    color: "var(--piece-violet)",
    desc: "A fashion brand identity for Praizz Couture, spanning logotype, palette, and a flexible visual system.",
    image: praizzCouture,
    home: { left: 58, top: 3, rot: 5, w: 340 },
    assets: [praizzCouture, "1655841439659-0afc60676b70", "1709377058964-929af7f2d02f", "1620641788421-7a1c342ea42e"],
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
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen();
          }
        }}
        onFocus={() => setHovered(true)}
        onBlur={() => {
          setHovered(false);
          tiltX.set(0);
          tiltY.set(0);
          onInfo(null);
        }}
        whileHover={{ scale: 1.07, y: -12, boxShadow: "0 34px 70px rgba(0,0,0,0.55)" }}
        whileTap={{ scale: 1.12 }}
        whileFocus={{ scale: 1.07, y: -12, boxShadow: "0 34px 70px rgba(0,0,0,0.55)" }}
        data-cursor="drag"
        role="button"
        tabIndex={0}
        aria-label={`Open ${item.name} — ${item.kind}`}
        style={{ rotateX: rX, rotateY: rY, transformPerspective: 900 }}
        className="group relative cursor-grab overflow-hidden rounded-xl border border-border bg-card shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-ring active:cursor-grabbing"
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
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useSiteReducedMotion();
  useModalFocus(ref);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const isCampaign = item.cat === "Social Media";

  return createPortal(
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9500] overflow-y-auto bg-background"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.name} project detail`}
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
        initial={reduce ? { opacity: 0 } : { y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.05, duration: 0.5 }}
        className="mx-auto max-w-6xl px-5 py-16 md:px-10 md:py-24"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">{item.kind}</p>
        <h2 className="display-xl mt-5 text-[clamp(3rem,13vw,11rem)] leading-[0.9]" style={{ color: item.color }}>
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
                <img src={img(a, 1200)} alt={`${item.name} asset ${i + 1}`} className="block w-full" />
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
    </motion.div>,
    document.body,
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

  // Keep the cursor-following info card inside the viewport.
  const [viewport, setViewport] = useState({ w: 1200, h: 800 });
  useEffect(() => {
    const sync = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);
  const infoX = useTransform(lx, (v) => Math.min(Math.max(v, 12), viewport.w - 250));
  const infoY = useTransform(ly, (v) => Math.min(Math.max(v, 12), viewport.h - 120));

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

  // "Make a mess": scatter the wall; "Put it back": restore the layout.
  const [messy, setMessy] = useState(false);
  const messRef = useRef<Record<string, { left: number; top: number; rot: number }>>({});

  const makeMess = () => {
    const next: Record<string, { left: number; top: number; rot: number }> = {};
    PIECES.forEach((p) => {
      next[p.id] = {
        left: 2 + Math.random() * 68,
        top: 4 + Math.random() * 66,
        rot: Math.round((Math.random() * 30 - 15) * 10) / 10,
      };
    });
    messRef.current = next;
    setMessy(true);
  };
  const putItBack = () => setMessy(false);

  // Scribble: draw directly on the wall.
  const [scribble, setScribble] = useState(false);
  const [strokes, setStrokes] = useState<{ pts: [number, number][] }[]>([]);
  const drawing = useRef(false);
  const wallRef = useRef<HTMLDivElement>(null);

  const toLocal = (e: React.PointerEvent) => {
    const r = (wallRef.current ?? canvasRef.current)!.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top] as [number, number];
  };

  const onScribbleDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!scribble) return;
    drawing.current = true;
    setStrokes((s) => [...s, { pts: [toLocal(e)] }]);
  };
  const onScribbleMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!scribble || !drawing.current) return;
    const p = toLocal(e);
    setStrokes((s) => {
      const next = [...s];
      const last = next[next.length - 1];
      if (!last) return s;
      last.pts = [...last.pts, p];
      return next;
    });
  };
  const onScribbleUp = () => {
    drawing.current = false;
  };

  // Cursor trail: springs chained behind the pointer while on the wall.
  const trail1 = useSpring(mx, { stiffness: 260, damping: 26 });
  const trail2 = useSpring(trail1, { stiffness: 200, damping: 28 });
  const trail3 = useSpring(trail2, { stiffness: 150, damping: 30 });
  const trail4 = useSpring(trail3, { stiffness: 110, damping: 32 });

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
          <p className="pb-3 text-sm leading-relaxed text-muted-foreground">
            <span className="md:hidden">
              A collection of things I made because I wanted to. Tap a piece, take a peek.
            </span>
            <span className="hidden md:inline md:whitespace-nowrap">
              A collection of things I made because I wanted to. Grab a piece, throw it around, open it up.
            </span>
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
          <button
            type="button"
            onClick={messy ? putItBack : makeMess}
            data-cursor="hover"
            className="ml-auto hidden shrink-0 whitespace-nowrap rounded-full border border-border px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:border-accent hover:text-accent md:inline-flex"
          >
            {messy ? "✕ Put it back" : "✦ Make a mess"}
          </button>
          <button
            type="button"
            onClick={() => setScribble((s) => !s)}
            data-cursor="hover"
            aria-pressed={scribble}
            className={`hidden shrink-0 whitespace-nowrap rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors md:inline-flex ${
              scribble
                ? "border-transparent bg-accent text-accent-foreground"
                : "border-border text-muted-foreground hover:border-accent hover:text-accent"
            }`}
          >
            {scribble ? "✎ Scribbling…" : "✎ Scribble"}
          </button>
          {strokes.length > 0 && (
            <button
              type="button"
              onClick={() => setStrokes([])}
              data-cursor="hover"
              className="hidden shrink-0 whitespace-nowrap rounded-full border border-border px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:border-accent hover:text-accent md:inline-flex"
            >
              Clear
            </button>
          )}
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
        <div ref={canvasRef} className="relative mx-auto mt-12 h-[1000px] max-w-6xl md:h-[840px]">
          {/* Decorative floating fragments */}
          <span className="pointer-events-none absolute right-[4%] top-[6%] hidden -rotate-12 font-script text-4xl text-accent/70 md:block">
            made with love
          </span>
          <span className="pointer-events-none absolute left-[30%] bottom-[4%] hidden rotate-6 font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground md:block">
            ✦ drag me around
          </span>

          {/* Cursor trail */}
          {!isMobile &&
            [trail1, trail2, trail3, trail4].map((t, i) => (
              <motion.span
                key={i}
                className="pointer-events-none absolute left-0 top-0 z-[45] hidden size-2 rounded-full bg-accent md:block"
                style={{ x: t, y: t, translateX: "-50%", translateY: "-50%", opacity: 0.5 - i * 0.1 }}
                aria-hidden
              />
            ))}

          <div ref={wallRef} className={`absolute inset-0 ${scribble ? "pointer-events-auto" : "pointer-events-none"}`}>
            <svg
              className={`absolute inset-0 size-full ${scribble ? "cursor-crosshair" : ""}`}
              onPointerDown={onScribbleDown}
              onPointerMove={onScribbleMove}
              onPointerUp={onScribbleUp}
              onPointerLeave={onScribbleUp}
            >
              {strokes.map((s, i) => (
                <polyline
                  key={i}
                  points={s.pts.map((p) => p.join(",")).join(" ")}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.9"
                />
              ))}
            </svg>
          </div>

          <div className={scribble ? "pointer-events-none" : ""}>
            {PIECES.map((p) => {
              const idx = visible.findIndex((v) => v.id === p.id);
              const shown = idx !== -1;
              const pos =
                messy && messRef.current[p.id]
                  ? messRef.current[p.id]
                  : filter === "All"
                    ? p.home
                    : shown
                      ? curatedSlot(idx, visible.length)
                      : p.home;
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
        </div>
      )}

      {/* Cursor-following info card */}
      <motion.div
        style={{ x: infoX, y: infoY }}
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

const CONFETTI_COLORS = ["#e8ff59", "#9b7bff", "#5ad1ff", "#ff8fd6", "#ff5c4d"];

function useEasterEggs() {
  useEffect(() => {
    const KONAMI = [
      "arrowup",
      "arrowup",
      "arrowdown",
      "arrowdown",
      "arrowleft",
      "arrowright",
      "arrowleft",
      "arrowright",
      "b",
      "a",
    ];
    let konamiIdx = 0;
    let buffer = "";

    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key.toLowerCase();

      // Konami code → confetti
      if (k === KONAMI[konamiIdx]) {
        konamiIdx += 1;
        if (konamiIdx === KONAMI.length) {
          konamiIdx = 0;
          confetti({ particleCount: 180, spread: 90, origin: { y: 0.25 }, colors: CONFETTI_COLORS });
        }
      } else {
        konamiIdx = k === KONAMI[0] ? 1 : 0;
      }

      // Typing "hire me" → scroll to contact
      buffer = (buffer + k).slice(-20);
      if (buffer.endsWith("hireme") || buffer.endsWith("hire me")) {
        buffer = "";
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}

export default function App() {
  useEasterEggs();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:rounded-full focus:border focus:border-border focus:bg-card focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-foreground"
      >
        Skip to content
      </a>
      <main id="main" className="cursor-none-fine grain relative min-h-screen bg-background text-foreground">
        <CustomCursor />
        <FloatingNav />
        <Hero />
        <Work />
        <Approach />
        <Playground />
        <StickerWall />
        <About />
        <Contact />
      </main>
    </>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Poppins, Geist, Syne } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-poppins",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

// Crisp "Pop" Sound (Base64)
const POP_SOUND =
  "data:audio/wav;base64,UklGRl9vT1dXRXF1eAAAAABAAgAAABAAIAABAAgAZGF0YTbvT1cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAIAAAACA/wAAAAAAAAAAAA==";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [showLogos, setShowLogos] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isLoading]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      setShowLogos(scrollY < 100);

      if (scrollY < windowHeight * 9) {
        setActiveSection("home");
      } else if (scrollY < windowHeight * 14) {
        setActiveSection("society");
      } else if (scrollY < windowHeight * 16) {
        setActiveSection("team");
      } else {
        setActiveSection("contact");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`${poppins.variable} ${geist.variable} ${syne.variable} bg-[#fbfdff] text-[#0C0A0E] font-body selection:bg-[#88C9F7] selection:text-[#0C0A0E]`}
    >
      <style>{`::-webkit-scrollbar { display: none; } body { scrollbar-width: none; -ms-overflow-style: none; }`}</style>
      <div
        className={`fixed inset-0 z-[100] bg-[#fbfdff] transition-all duration-500 ease-in-out ${isLoading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ transitionDelay: isLoading ? "0ms" : "800ms" }}
      />

      <div
        className={`fixed z-[101] flex items-center justify-center transition-all duration-1000 ease-in-out ${isLoading ? "animate-pulse" : ""} ${isLoading ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 opacity-100" : `top-8 left-8 w-24 h-24 ${showLogos ? "opacity-100" : "opacity-0 -translate-y-4 pointer-events-none"}`}`}
      >
        <div className="relative w-full h-full">
          <Image
            src="/ieee_logo.png"
            alt="IEEE Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <Header isLoading={isLoading} activeSection={activeSection} />

      <main className="relative w-full">
        <HeroSection />
        <VerticalVisionSection />
        <SocietyScrollRevealSection />
        <TeamSection />
        <ContactSection />
      </main>
    </div>
  );
}

/* =========================================================================
   HERO SECTION
   ========================================================================= */
function HeroSection() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const windowHeight = window.innerHeight;
      const { top } = containerRef.current.getBoundingClientRect();
      const scrolled = -top;
      const rawProgress = scrolled / (windowHeight * 0.8);
      setProgress(Math.max(0, Math.min(1, rawProgress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="relative h-[200vh] z-0">
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#fbfdff] flex items-center justify-center">
        <div className="absolute top-14 left-0 w-full h-[90vh] mt-10 z-0 pointer-events-none">
          <div className="relative w-full h-full">
            <Image
              src="/fot_bg.jpeg"
              alt="Faculty of Technology Sketch"
              fill
              className="object-cover object-top opacity-60 mix-blend-multiply"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fbfdff]" />
        </div>

        <div className="relative z-10 text-center">
          <h1
            className="font-serif font-bold tracking-tight text-[#001439] leading-none"
            style={{
              fontSize: "clamp(8rem, 25vw, 30rem)",
              opacity: progress,
              transform: `translateY(${(1 - progress) * 150}px) scale(${0.9 + progress * 0.1})`,
              filter: `blur(${(1 - progress) * 30}px)`,
            }}
          >
            IEEE
          </h1>
          <p
            className="text-[#001439]/60 font-medium tracking-[0.2em] uppercase mt-4"
            style={{
              opacity: Math.max(0, (progress - 0.3) * 1.5),
              transform: `translateY(${(1 - progress) * 80}px)`,
              fontSize: "clamp(1rem, 2vw, 1.5rem)",
            }}
          >
            Faculty of Technology
          </p>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   VERTICAL VISION SECTION
   ========================================================================= */
function VerticalVisionSection() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const wrapperRefs = useRef([]);

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [textWidth, setTextWidth] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(
      "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3",
    );
    audioRef.current.volume = 0.2;
  }, []);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  useEffect(() => {
    const measure = () => {
      if (textRef.current) {
        setTextWidth(textRef.current.scrollWidth);
        setWindowWidth(window.innerWidth);
      }
    };
    measure();
    const timeout = setTimeout(measure, 500);
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(timeout);
    };
  }, []);

  const cards = [
    {
      text: "Technical Excellence",
      description:
        "To ensure every member moves beyond the syllabus, gaining hands-on proficiency in emerging technologies and engineering fundamentals.",
      at: 0.08,
      speed: 1.6,
      lane: 0,
      color: "#57A0D3", // Adjusted: Softer Royal Blue (Closer to the set)
    },
    {
      text: "Innovation Mindset",
      description:
        "To foster a culture where curiosity leads to creation, encouraging members to contribute to the global body of knowledge.",
      at: 0.42,
      speed: 1.45,
      lane: 2,
      color: "#0EA5E9", // Vivid Sky Blue
    },
    {
      text: "Networking & Collaboration",
      description:
        "To break the silos of the campus by connecting members with the broader IEEE global network and other student branches.",
      at: 0.74,
      speed: 1.3,
      lane: 1,
      color: "#6366F1", // Indigo Blue
    },
    {
      text: "Humanitarian Responsibility",
      description:
        "To remind engineers of their duty to society by using technology to assist underserved communities.",
      at: 1.0,
      speed: 1.15,
      lane: 3,
      color: "#38BDF8", // Light Blue
    },
    {
      text: "Collaborative Development",
      description:
        'To shift the mindset from "consuming technology" to "contributing to it,".',
      at: 1.55,
      speed: 1.35,
      lane: 1,
      color: "#3B82F6", // KEPT: Cool Steel Blue
    },
  ];

  const LANES = ["19%", "32%", "60%", "68.9%"];

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current || !textRef.current || textWidth === 0) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scroll = -rect.top;
      const maxScroll = rect.height - window.innerHeight;
      const currentProgress = Math.min(Math.max(scroll / maxScroll, 0), 1);

      const cameraTravel = textWidth - windowWidth;
      const cameraX = cameraTravel * currentProgress;

      textRef.current.style.transform = `translate(${-cameraX}px, -50%)`;

      cards.forEach((card, i) => {
        const wrapper = wrapperRefs.current[i];
        if (wrapper) {
          const screenX = card.at * cameraTravel - cameraX * card.speed;
          wrapper.style.transform = `translateX(${screenX}px)`;
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [textWidth, windowWidth, hoveredIndex]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[720vh] z-20"
      style={{
        background: "linear-gradient(180deg, #010814 0%, #020F24 100%)",
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0">
          <h2
            ref={textRef}
            className="absolute font-black whitespace-nowrap"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(6rem, 18vw, 20rem)",
              top: "50%",
              color: "#DCE6F2",
              willChange: "transform",
            }}
          >
            Iterate.  Innovate.  Inspire.
          </h2>

          {cards.map((card, i) => {
            const isHovered = hoveredIndex === i;

            return (
              <div
                key={i}
                ref={(el) => (wrapperRefs.current[i] = el)}
                className="absolute"
                style={{
                  top: LANES[card.lane],
                  zIndex: isHovered ? 50 : 10,
                  willChange: "transform",
                }}
              >
                <div
                  onMouseEnter={() => {
                    setHoveredIndex(i);
                    playSound();
                  }}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="rounded-3xl cursor-default overflow-hidden relative group"
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontWeight: 600,
                    background: card.color,
                    color: "#F2F6FB",
                    width: "420px",
                    padding: "1.6rem 2.6rem",
                    boxShadow: isHovered
                      ? `0 40px 80px rgba(0,0,0,0.5), 0 0 40px ${card.color}88`
                      : `0 32px 72px rgba(0,0,0,0.55), 0 0 40px ${card.color}88, 0 0 80px ${card.color}44, inset 0 0 22px ${card.color}55`,
                    transition:
                      "box-shadow 0.4s ease, height 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
                    height: isHovered ? "220px" : "80px",
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div
                      style={{
                        fontSize: "1.2rem",
                        width: "85%",
                        lineHeight: "1.1",
                      }}
                    >
                      {card.text}
                    </div>
                    <div
                      className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 transition-transform duration-500"
                      style={{
                        transform: isHovered
                          ? "rotate(135deg)"
                          : "rotate(0deg)",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: "0.95rem",
                      lineHeight: 1.5,
                      marginTop: "1rem",
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered
                        ? "translateY(0)"
                        : "translateY(20px)",
                      transition:
                        "opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s",
                      pointerEvents: isHovered ? "auto" : "none",
                    }}
                  >
                    {card.description}
                    <Link href="/events">
                      <div className="mt-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider opacity-80">
                        Learn More
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   SOCIETY SECTION
   ========================================================================= */
const SOCIETIES = [
  {
    title: "Computer Society",
    icon: "computer",
    bg: "#EBF4FD",
    textDark: true,
    accentColor: "#3B82C4",
    roles: [
      { title: "Chair", name: "TBD" },
      { title: "Vice Chair", name: "TBD" },
      { title: "Technical Lead", name: "TBD" },
      { title: "Outreach Lead", name: "TBD" },
    ],
  },
  {
    title: "Power & Energy",
    icon: "power",
    bg: "#0A1E3D",
    textDark: false,
    accentColor: "#5B9BD5",
    roles: [
      { title: "Chair", name: "TBD" },
      { title: "Vice Chair", name: "TBD" },
      { title: "Technical Lead", name: "TBD" },
      { title: "Outreach Lead", name: "TBD" },
    ],
  },
  {
    title: "Robotics & Automation",
    icon: "robotics",
    bg: "#F0F0F2",
    textDark: true,
    accentColor: "#6B7280",
    roles: [
      { title: "Chair", name: "TBD" },
      { title: "Vice Chair", name: "TBD" },
      { title: "Technical Lead", name: "TBD" },
      { title: "Outreach Lead", name: "TBD" },
    ],
  },
];

function SocietyIcon({ type, color }) {
  const props = {
    width: 72,
    height: 72,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  if (type === "computer") {
    return (
      <svg {...props}>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <circle cx="7" cy="8.5" r="0.8" fill={color} stroke="none" />
        <circle cx="9.2" cy="8.5" r="0.8" fill={color} stroke="none" />
        <circle cx="11.4" cy="8.5" r="0.8" fill={color} stroke="none" />
      </svg>
    );
  }
  if (type === "power") {
    return (
      <svg {...props}>
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v6m0 6v6M4.2 4.2l4.3 4.3m7 7l4.3 4.3M1 12h6m6 0h6M4.2 19.8l4.3-4.3m7-7l4.3-4.3" />
    </svg>
  );
}

function SocietyScrollRevealSection() {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const scrolled = -top;
      const maxScroll = height - windowH;
      setScrollProgress(Math.min(Math.max(scrolled / maxScroll, 0), 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeIndex = Math.min(Math.floor(scrollProgress * 3), 2);
  const phaseStart = activeIndex / 3;
  const phaseSize = 1 / 3;
  const subProgress = Math.min(
    Math.max((scrollProgress - phaseStart) / phaseSize, 0),
    1,
  );
  const activeSociety = SOCIETIES[activeIndex];
  const isDark = !activeSociety.textDark;

  return (
    <div
      id="society-section"
      ref={sectionRef}
      className="relative z-30"
      style={{ height: "500vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {SOCIETIES.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              backgroundColor: s.bg,
              opacity: i === activeIndex ? 1 : 0,
              transition: "opacity 600ms cubic-bezier(0.4, 0, 0.2, 1)",
              zIndex: 0,
            }}
          />
        ))}

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
            backgroundSize: "256px 256px",
            zIndex: 1,
            opacity: 0.6,
          }}
        />

        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ zIndex: 2 }}
        >
          <div
            className="absolute top-12 left-0 w-full text-center"
            style={{ zIndex: 3 }}
          >
            <p
              className="text-xs uppercase tracking-[0.4em] font-semibold"
              style={{
                color: isDark
                  ? "rgba(255,255,255,0.45)"
                  : "rgba(10,10,10,0.40)",
                transition: "color 600ms ease",
              }}
            >
              Our Societies
            </p>
          </div>

          <LeftRoles
            society={activeSociety}
            subProgress={subProgress}
            isDark={isDark}
            activeIndex={activeIndex}
          />

          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block"
            style={{
              width: 1,
              height: "50vh",
              background: isDark
                ? "linear-gradient(180deg, transparent, rgba(255,255,255,0.15), transparent)"
                : "linear-gradient(180deg, transparent, rgba(0,0,0,0.10), transparent)",
              transition: "background 600ms ease",
            }}
          />

          <RightWheel activeIndex={activeIndex} isDark={isDark} />
        </div>
      </div>
    </div>
  );
}

function LeftRoles({ society, subProgress, isDark, activeIndex }) {
  const THRESHOLDS = [0.12, 0.3, 0.48, 0.66];
  const primaryText = isDark ? "#ffffff" : "#0C0A0E";
  const mutedText = isDark ? "rgba(255,255,255,0.50)" : "rgba(12,10,14,0.45)";
  const cardBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const cardBorder = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)";
  const cardHoverBg = isDark ? "rgba(255,255,255,0.11)" : "rgba(0,0,0,0.075)";
  const accentColor = society.accentColor;

  return (
    <div
      className="absolute flex flex-col justify-center hidden md:flex"
      style={{
        left: "6vw",
        width: "40vw",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      <p
        className="text-xs uppercase tracking-[0.35em] font-bold mb-6"
        style={{
          color: accentColor,
          opacity: subProgress > 0.05 ? 1 : 0,
          transform: subProgress > 0.05 ? "translateY(0)" : "translateY(12px)",
          transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        Roles
      </p>

      <div className="flex flex-col gap-3">
        {society.roles.map((role, i) => {
          const visible = subProgress >= THRESHOLDS[i];
          return (
            <RoleCard
              key={`${activeIndex}-${i}`}
              role={role}
              visible={visible}
              primaryText={primaryText}
              mutedText={mutedText}
              cardBg={cardBg}
              cardBorder={cardBorder}
              cardHoverBg={cardHoverBg}
              accentColor={accentColor}
            />
          );
        })}
      </div>
    </div>
  );
}

function RoleCard({
  role,
  visible,
  primaryText,
  mutedText,
  cardBg,
  cardBorder,
  cardHoverBg,
  accentColor,
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative cursor-default"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) translateX(0)"
          : "translateY(28px) translateX(-16px)",
        transition:
          "opacity 0.55s cubic-bezier(0.4,0,0.2,1), transform 0.55s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <div
        className="relative rounded-xl overflow-hidden"
        style={{
          padding: "14px 20px",
          backgroundColor: hovered ? cardHoverBg : cardBg,
          border: `1px solid ${cardBorder}`,
          transition: "background-color 0.3s ease",
        }}
      >
        <div
          className="absolute left-0 top-0 bottom-0"
          style={{
            width: hovered ? 3 : 0,
            backgroundColor: accentColor,
            transition:
              "width 0.35s cubic-bezier(0.4,0,0.2,1), borderRadius: 0 4px 4px 0",
          }}
        />

        <div className="flex items-center justify-between">
          <div>
            <p
              className="text-[9px] font-bold uppercase tracking-[0.28em]"
              style={{ color: mutedText }}
            >
              {role.title}
            </p>
            <p
              className="text-[16px] font-semibold mt-0.5"
              style={{ color: primaryText, fontFamily: "var(--font-syne)" }}
            >
              {role.name}
            </p>
          </div>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke={accentColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateX(0)" : "translateX(-6px)",
              transition: "all 0.3s ease",
            }}
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   RIGHT WHEEL SECTION - PERFECTLY CENTERED & MULTILINE
   ========================================================================= */
function RightWheel({ activeIndex, isDark }) {
  return (
    <div
      // 1. Container occupies the full height (h-screen) of the viewport
      // 2. On Desktop, it sits strictly on the right half (md:w-1/2 right-0)
      // 3. Flexbox aligns children to the dead center (items-center justify-center)
      className="absolute top-0 right-0 h-screen w-full md:w-1/2 flex items-center justify-center pointer-events-none z-20 overflow-hidden"
    >
      {SOCIETIES.map((s, i) => {
        // Calculate offset: 0 for active, negative for previous, positive for next
        const diff = i - activeIndex;
        const isActive = diff === 0;

        // Animation logic:
        // Active: Center (0px), Opacity 1
        // Inactive: Pushed up/down (150px), Opacity 0
        const translateY = diff * 150;

        return (
          <div
            key={i}
            className="absolute w-full px-4 md:px-12 flex flex-col items-center justify-center transition-all duration-700 cubic-bezier(0.2, 0.8, 0.2, 1)"
            style={{
              opacity: isActive ? 1 : 0,
              transform: `translateY(${translateY}px) scale(${isActive ? 1 : 0.9})`,
              // Hide inactive items from screen readers/interaction
              visibility: isActive ? "visible" : "hidden",
            }}
          >
            {/* ICON SECTION */}
            <div className="mb-6 relative">
              {isActive && (
                <div
                  className="absolute inset-0 blur-3xl opacity-40 scale-150"
                  style={{ backgroundColor: s.accentColor }}
                />
              )}
              <div className="relative z-10 drop-shadow-2xl">
                <SocietyIcon
                  type={s.icon}
                  color={isActive ? s.accentColor : isDark ? "white" : "black"}
                />
              </div>
            </div>

            {/* TEXT SECTION - Multiline Friendly */}
            <div className="text-center relative z-10 w-full">
              <h2
                className="font-black tracking-tighter leading-[0.9] break-words"
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "clamp(2.0rem, 4.6vw, 4rem)", // Responsive sizing
                  color: isDark ? "#ffffff" : "#0C0A0E",
                  maxWidth: "100%", // Ensures it doesn't overflow container
                  margin: "0 auto",
                  textShadow: isActive ? `0 0 30px ${s.accentColor}40` : "none",
                }}
              >
                {s.title}
              </h2>

              {/* Decorative Underline */}
              <div
                className="mt-6 mx-auto rounded-full transition-all duration-700 delay-100"
                style={{
                  height: 6,
                  width: isActive ? 80 : 0,
                  backgroundColor: s.accentColor,
                  boxShadow: `0 0 20px ${s.accentColor}`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* =========================================================================
   TEAM SECTION
   ========================================================================= */
function TeamSection() {
  const sectionRef = useRef(null);
  const [hoveredMember, setHoveredMember] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const audioRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    audioRef.current = new Audio(
      "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3",
    );
    audioRef.current.volume = 0.3;
  }, []);

  const playHoverSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  const THEME_COLOR = "#D1E8FF";
  const GAP = 20;
  const BASE_WIDTH = 260;
  const EXPANDED_WIDTH = 420;
  const SHRINK_WIDTH = 206;

  const teamMembers = [
    {
      id: 1,
      name: "Aayush Chauhan",
      position: "Branch Chair",
      quote: "Engineering leadership by design, not by default.",
      year: "3",
      branch: "ECE",
      image: "/aayush.jpeg",
    },
    {
      id: 2,
      name: "Shubhika Sinha",
      position: "Vice Chair",
      quote: "Designing systems that think and scale.",
      year: "3",
      branch: "CSE",
      image: "/shubhika.jpeg",
    },
    {
      id: 3,
      name: "Ronit Jaiswal",
      position: "Vice Chair",
      quote: "With great power comes great responsibility and zero excuses.",
      year: "3",
      branch: "CSE",
      image: "/ronit.jpeg",
    },
    {
      id: 4,
      name: "Rewant Bhriguvanshi",
      position: "Secretary",
      quote: "Quietly building things that work.",
      year: "3",
      branch: "ECE",
      image: "/rewant.jpeg",
    },
    {
      id: 5,
      name: "Nikhil Yadav",
      position: "Joint Secretary",
      quote: "Empowering minds to innovate and lead.",
      year: "3",
      branch: "ECE",
      image: "/nikhil.jpeg",
    },
    {
      id: 6,
      name: "Divyanshu Jha",
      position: "Director of Nominations",
      quote: "This is now. Now is all there is.",
      year: "3",
      branch: "CSE",
      image: "/divyanshu.jpeg",
    },
    {
      id: 7,
      name: "Supriya Ningthoujam",
      position: "Director of Nominations",
      quote: "Precision with a pinch of chaos.",
      year: "2",
      branch: "EE",
      image: "/supriya.jpeg",
    },
    {
      id: 8,
      name: "Deepali Talreja",
      position: "Director of Social Activities",
      quote: "A little mischief, a lot of heart.",
      year: "3",
      branch: "CSE",
      image: "/deepali.jpeg",
    },
    {
      id: 9,
      name: "Dihika Panwar",
      position: "Director of Social Activities",
      quote: "Keeping the community connected.",
      year: "3",
      branch: "ECE",
      image: "/dihika.jpeg",
    },
    {
      id: 10,
      name: "Lavanya Arora",
      position: "Director of Social Activities",
      quote: "Building bridges and breaking ice.",
      year: "3",
      branch: "EE",
      image: "/lavanya.jpeg",
    },
    {
      id: 11,
      name: "Rishabh Jaiswal",
      position: "Director of Technical Activities",
      quote: "Igniting innovation.",
      year: "2",
      branch: "CSE",
      image: "/rishabh.jpeg",
    },
    {
      id: 12,
      name: "Shreyas Singh",
      position: "Director of Technical Activities",
      quote: "If it exists, I’ll build it.",
      year: "3",
      branch: "ECE",
      image: "/shreyas.jpeg",
    },
    {
      id: 13,
      name: "Ayush Kaushik",
      position: "Director of Student Activities",
      quote: "Sadak se uthakar star bana dunga.",
      year: "3",
      branch: "ECE",
      image:
      "/ayush.jpeg",
    },
    {
      id: 14,
      name: "Akanksha Ratan",
      position: "Director of Student Activities",
      quote: "Nothing works without connections.",
      year: "2",
      branch: "EE",
      image: "/akansha.jpeg",
    },
    {
      id: 15,
      name: "Raghav Aggarwal",
      position: "Director of Membership",
      quote: "Break → Panic → Google → Repeat.",
      year: "3",
      branch: "ECE",
      image: "/raghav.jpeg",
    },
    {
      id: 16,
      name: "Ansh Dev Yadav",
      position: "Director of Membership",
      quote: "Always learning, always smiling.",
      year: "3",
      branch: "ECE",
      image: "/ansh.jpeg",
    },
    {
      id: 17,
      name: "Hardeep",
      position: "Director of Membership",
      quote: "More than just the basics.",
      year: "3",
      branch: "EE",
      image:
      "/hardeep.jpeg",
    },
    {
      id: 18,
      name: "Aditya Chauhan",
      position: "Director of Website",
      quote: "Prompt hi to h.",
      year: "3",
      branch: "CSE",
      image: "/aditya.jpeg",
    },
    {
      id: 19,
      name: "Krishnendra Singh",
      position: "Vice Chair",
      quote: "DID NOT SEND A PHOTO.",
      year: "3",
      branch: "ECE",
      image:
      "/lazy.jpeg",
    },
    {
      id: 20,
      name: "Ansh Gupta",
      position: "Treasurer",
      quote: "DID NOT SEND A PHOTO.",
      year: "3",
      branch: "ECE",
      image:
      "/lazy.jpeg",
    },
    {
      id: 21,
      name: "Arpit Garg",
      position: "Joint Treasurer",
      quote: "DID NOT SEND A PHOTO.",
      year: "3",
      branch: "ECE",
      image:
      "/lazy.jpeg",
    },
  ];
  
  const convertToRoman = (num) => {
    const romanNumerals = { 1: "I", 2: "II", 3: "III", 4: "IV" };
    return romanNumerals[num] || num;
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, teamMembers.length]);

  const handleMouseEnter = (id) => {
    setHoveredMember(id);
    setIsAutoPlaying(false);
    playHoverSound();
  };

  const handleMouseLeave = () => {
    setHoveredMember(null);
    setIsAutoPlaying(true);
  };

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(
      (prev) => (prev - 1 + teamMembers.length) % teamMembers.length,
    );
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.max(
        0,
        Math.min(1, (-top + windowHeight * 0.5) / height),
      );
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine which cards are currently visible to render (BUFFER ZONE: -1 to +4)
  const getVisibleCards = () => {
    const cards = [];
    for (let i = -1; i <= 4; i++) {
      const index =
        (currentIndex + i + teamMembers.length) % teamMembers.length;
      cards.push({
        member: teamMembers[index],
        offset: i,
        index: index,
      });
    }
    return cards;
  };

  const visibleCards = getVisibleCards();
  const anyHovered = hoveredMember !== null;

  return (
    <div
      id="team-section"
      ref={sectionRef}
      className="relative z-40 bg-[#0a0a0a]"
      style={{ height: "150vh" }}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
            style={{
              background:
                "radial-gradient(circle, #D1E8FF 0%, transparent 70%)",
              top: "10%",
              left: "20%",
              transform: `translate(${scrollProgress * 50}px, ${scrollProgress * 30}px)`,
            }}
          />
          <div
            className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-20"
            style={{
              background:
                "radial-gradient(circle, #3B82C4 0%, transparent 70%)",
              bottom: "20%",
              right: "15%",
              transform: `translate(-${scrollProgress * 40}px, -${scrollProgress * 20}px)`,
            }}
          />
        </div>

        {/* Header Section */}
        <div className="relative pt-16 pb-8 px-8 lg:px-16 flex-shrink-0">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex items-center justify-between gap-8">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-2 font-medium">
                  The People Behind IEEE
                </p>
                <h2
                  className="font-black text-white tracking-tight leading-[0.9]"
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontSize: "clamp(3rem, 8vw, 6rem)",
                  }}
                >
                  Our Team
                </h2>
              </div>
              <div className="flex gap-8">
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-3xl font-black text-white"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    21
                  </span>
                  <span className="text-white/60 text-xs uppercase tracking-wider">
                    Members
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-3xl font-black text-white"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    3
                  </span>
                  <span className="text-white/60 text-xs uppercase tracking-wider">
                    Branches
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-3xl font-black text-white"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    1
                  </span>
                  <span className="text-white/60 text-xs uppercase tracking-wider">
                    Goal
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Section - FIXED WIDTH 4-CARD ACCORDION */}
        <div className="relative flex-1 px-8 lg:px-16 pb-16 overflow-hidden flex items-center">
          <div className="max-w-[1400px] mx-auto w-full h-full flex items-center justify-center relative perspective-1000">
            <button
              onClick={goToPrevious}
              className="absolute left-4 z-50 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:-translate-x-1 transition-transform duration-300"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 z-50 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-x-1 transition-transform duration-300"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* Container defining the track */}
            <div
              className="relative h-[480px]"
              style={{
                width: `${BASE_WIDTH * 4 + GAP * 3}px`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {visibleCards.map(({ member, offset }) => {
                const isHovered = hoveredMember === member.id;

                let width = BASE_WIDTH;
                if (anyHovered) {
                  width = isHovered ? EXPANDED_WIDTH : SHRINK_WIDTH;
                }

                let leftAccumulator = 0;
                const bufferCard = visibleCards[0];
                const bufferWidth = anyHovered
                  ? hoveredMember === bufferCard.member.id
                    ? EXPANDED_WIDTH
                    : SHRINK_WIDTH
                  : BASE_WIDTH;

                const myIndexInVisible = visibleCards.findIndex(
                  (vc) => vc.member.id === member.id,
                );

                for (let j = 0; j < myIndexInVisible; j++) {
                  const neighbor = visibleCards[j];
                  const neighborHovered = hoveredMember === neighbor.member.id;
                  const neighborWidth = anyHovered
                    ? neighborHovered
                      ? EXPANDED_WIDTH
                      : SHRINK_WIDTH
                    : BASE_WIDTH;
                  leftAccumulator += neighborWidth + GAP;
                }

                const finalLeft = leftAccumulator - (bufferWidth + GAP);

                const isVisibleOnScreen = offset >= 0 && offset <= 3;
                const opacity = isVisibleOnScreen
                  ? anyHovered && !isHovered
                    ? 0.4
                    : 1
                  : 0;
                const zIndex = isHovered ? 50 : 10;
                const pointerEvents = isVisibleOnScreen ? "auto" : "none";

                return (
                  <div
                    key={member.id}
                    className="absolute top-0 bottom-0"
                    style={{
                      left: `${finalLeft}px`,
                      width: `${width}px`,
                      zIndex,
                      opacity,
                      pointerEvents,
                      transition: "all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)",
                    }}
                    onMouseEnter={() => handleMouseEnter(member.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div
                      className="relative w-full h-full overflow-hidden cursor-pointer"
                      style={{
                        borderRadius: isHovered ? "32px" : "120px",
                        transition:
                          "border-radius 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)",
                        boxShadow: isHovered
                          ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                          : "none",
                      }}
                    >
                      <div className="relative w-full h-full">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          style={{
                            filter: isHovered
                              ? "grayscale(0%)"
                              : "grayscale(100%)",
                            transform: isHovered ? "scale(1.05)" : "scale(1)",
                            transition: "all 0.7s ease",
                            objectPosition: "center 25%", // FIX: Ensures faces aren't cropped
                          }}
                        />

                        <div
                          className="absolute inset-0"
                          style={{
                            background: `linear-gradient(180deg, transparent 0%, rgba(209, 232, 255, 0.1) 50%, rgba(10, 25, 47, 0.8) 100%)`,
                            opacity: isHovered ? 1 : 0.6,
                            transition: "all 0.5s ease",
                          }}
                        />

                        <div
                          className="absolute inset-0"
                          style={{
                            border: `3px solid ${THEME_COLOR}`,
                            borderRadius: isHovered ? "32px" : "120px",
                            opacity: isHovered ? 1 : 0,
                            transition: "all 0.5s ease",
                          }}
                        />
                      </div>

                      <div className="absolute inset-0 flex flex-col justify-end p-6">
                        <div
                          className="mb-4"
                          style={{
                            opacity: isHovered ? 1 : 0,
                            transform: isHovered
                              ? "translateY(0)"
                              : "translateY(20px)",
                            transition: "all 0.5s ease",
                          }}
                        >
                          <div
                            className="inline-block px-3 py-1.5 rounded-full backdrop-blur-md"
                            style={{
                              backgroundColor: `${THEME_COLOR}30`,
                              border: `1px solid ${THEME_COLOR}60`,
                            }}
                          >
                            <span className="text-xs font-bold uppercase tracking-wider text-white">
                              {convertToRoman(parseInt(member.year))} •{" "}
                              {member.branch}
                            </span>
                          </div>
                        </div>

                        <h3
                          className="text-white font-bold mb-2 leading-tight"
                          style={{
                            fontFamily: "var(--font-syne)",
                            fontSize: isHovered ? "1.75rem" : "1.5rem",
                            transition: "all 0.5s ease",
                            textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                          }}
                        >
                          {member.name}
                        </h3>

                        <p className="text-white/90 text-sm font-medium mb-3 leading-snug">
                          {member.position}
                        </p>

                        <p
                          className="text-white/85 text-xs italic leading-relaxed overflow-hidden"
                          style={{
                            maxHeight: isHovered ? "60px" : "0",
                            opacity: isHovered ? 1 : 0,
                            transition: "all 0.5s ease",
                          }}
                        >
                          "{member.quote}"
                        </p>

                        <div
                          className="mt-3 h-0.5 rounded-full"
                          style={{
                            backgroundColor: THEME_COLOR,
                            width: isHovered ? "100%" : "40%",
                            boxShadow: isHovered
                              ? `0 0 12px ${THEME_COLOR}`
                              : "none",
                            transition: "all 0.5s ease",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   HEADER
   ========================================================================= */
function Header({ isLoading, activeSection }) {
  const [showFot, setShowFot] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowFot(window.scrollY < 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (section) => {
    if (section === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (section === "society") {
      const el = document.querySelector("#society-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else if (section === "team") {
      const el = document.querySelector("#team-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else if (section === "contact") {
      const el = document.querySelector("#contact-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-1000 delay-200 ${isLoading ? "-translate-y-32 opacity-0" : "translate-y-0 opacity-100"}`}
      >
        <div className="flex items-center gap-1 p-1.5 bg-[#001439] text-white backdrop-blur-md border border-white/10 shadow-2xl rounded-full">
          <div className="flex items-center gap-1 text-sm font-medium">
            <button
              onClick={() => scrollToSection("home")}
              className={`px-6 py-2.5 rounded-full transition-all ${
                activeSection === "home"
                  ? "bg-white text-[#001439]"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("society")}
              className={`px-6 py-2.5 rounded-full transition-all ${
                activeSection === "society"
                  ? "bg-white text-[#001439]"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              Society
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className={`px-6 py-2.5 rounded-full transition-all ${
                activeSection === "team"
                  ? "bg-white text-[#001439]"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              Team
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`px-6 py-2.5 rounded-full transition-all ${
                activeSection === "contact"
                  ? "bg-white text-[#001439]"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              Contact Us
            </button>
          </div>
          <div className="w-px h-4 bg-white/10 mx-1"></div>
          <Link
            href="/events"
            className={`px-6 py-2.5 rounded-full transition-all ${
              activeSection === "events"
                ? "bg-white text-[#001439]"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            Events
          </Link>
        </div>
      </nav>

      <div
        className={`fixed right-2 top-1 z-50 transition-all duration-500 ${!isLoading && showFot ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
      >
        <div className="relative w-80 h-40">
          <Image
            src="/fot_logo.png"
            alt="FOT Logo"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </>
  );
}

/* =========================================================================
   CONTACT SECTION
   ========================================================================= */
function ContactSection() {
  return (
    <section
      id="contact-section"
      className="relative z-50 bg-[#fbfdff] text-[#001439] min-h-screen flex flex-col justify-center items-center overflow-hidden border-t border-black/5"
    >
      {/* Background Ambience Blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#D1E8FF]/60 rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#E1E5FF]/60 rounded-full blur-[140px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10 px-8 lg:px-16 py-20 items-center">
        {/* Left Side: Typography & Socials */}
        <div className="flex flex-col justify-center space-y-10 lg:col-span-7 min-w-0">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.4em] font-bold text-[#001439]/50">
              Get In Touch
            </p>
            {/* Adjusted responsive text scaling and added break-words to prevent overlap */}
            <h2
              className="text-5xl sm:text-6xl md:text-[4.5rem] xl:text-[5.5rem] font-black text-[#001439] leading-[1.05] tracking-tight break-words"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              The first <br className="hidden md:block" />
              society
              <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#001439] to-[#3B82C4]">
                of FoT.
              </span>
            </h2>
          </div>

          <div className="flex gap-4 sm:gap-5 pt-6">
            <a
              href="mailto:ieee@fot.du.ac.in"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center hover:-translate-y-1.5 transition-all duration-300 shadow-[0_8px_20px_rgb(0,0,0,0.06)] border border-black/5 hover:shadow-[0_15px_30px_rgb(234,67,53,0.2)] shrink-0"
              aria-label="Email"
            >
              <svg
                width="24"
                height="24"
                className="sm:w-[26px] sm:h-[26px]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#EA4335"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/company/ieee-faculty-of-technology-university-of-delhi/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center hover:-translate-y-1.5 transition-all duration-300 shadow-[0_8px_20px_rgb(0,0,0,0.06)] border border-black/5 hover:shadow-[0_15px_30px_rgb(10,102,194,0.2)] shrink-0"
              aria-label="LinkedIn"
            >
              <svg
                width="24"
                height="24"
                className="sm:w-[26px] sm:h-[26px]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0A66C2"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center hover:-translate-y-1.5 transition-all duration-300 shadow-[0_8px_20px_rgb(0,0,0,0.06)] border border-black/5 hover:shadow-[0_15px_30px_rgb(225,48,108,0.2)] shrink-0"
              aria-label="Instagram"
            >
              <svg
                width="24"
                height="24"
                className="sm:w-[26px] sm:h-[26px]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#E1306C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Side: Glassmorphic Info Card */}
        <div className="flex flex-col justify-center lg:col-span-5">
          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_35px_60px_-15px_rgba(0,20,57,0.15)] rounded-[2.5rem] p-8 md:p-10 lg:p-12 space-y-10 relative overflow-hidden group">
            {/* Hover subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Address Block */}
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4 text-[#001439]/50">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <h3 className="text-sm uppercase tracking-widest font-bold">
                  Visit Us
                </h3>
              </div>
              <p
                className="text-lg md:text-xl font-medium text-[#001439] leading-relaxed"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Faculty of Technology <br />
                Maharishi Kanad Bhawan <br />
                University of Delhi, Delhi-110007 <br />
                India.
              </p>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-[#001439]/10 to-transparent relative z-10"></div>

            {/* Email Block */}
            <div className="relative z-10 flex flex-col items-start">
              <div className="flex items-center gap-3 mb-4 text-[#001439]/50">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <h3 className="text-sm uppercase tracking-widest font-bold">
                  Email Us
                </h3>
              </div>
              <a
                href="mailto:ieee@fot.du.ac.in"
                className="inline-block text-lg md:text-xl font-semibold text-[#001439] hover:text-[#3B82C4] transition-colors duration-300 break-all"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                ieee@fot.du.ac.in
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Absolute Footer */}
      <div
        className="absolute bottom-6 w-full text-center text-[#001439]/40 text-sm font-medium z-10 px-4"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        © {new Date().getFullYear()} IEEE Faculty of Technology. All rights
        reserved.
      </div>
    </section>
  );
}

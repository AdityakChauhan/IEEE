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
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoading]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      setShowLogos(scrollY < 100);

      if (scrollY < windowHeight * 7.5) setActiveSection("home");
      else if (scrollY < windowHeight * 11.5) setActiveSection("society");
      else setActiveSection("team");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`${poppins.variable} ${geist.variable} bg-[#fbfdff] text-[#0C0A0E] font-body selection:bg-[#88C9F7] selection:text-[#0C0A0E]`}
    >
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
      </main>
    </div>
  );
}

/* =========================================================================
   HERO SECTION (UNCHANGED)
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
   VERTICAL VISION SECTION (CORRECTED)
   ========================================================================= */
function VerticalVisionSection() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    if (textRef.current) setTextWidth(textRef.current.scrollWidth);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scroll = -rect.top;
      const maxScroll = rect.height - window.innerHeight;
      setProgress(Math.min(Math.max(scroll / maxScroll, 0), 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cameraTravel = textWidth - window.innerWidth;
  const cameraX = cameraTravel * progress;
  const LANES = ["30%", "42%", "60%", "72%"];

  const cards = [
    {
      text: "Relational, not just a ledger",
      at: 0.18,
      speed: 0.9,
      lane: 0,
      color: "#6FAEDB",
    },
    {
      text: "Modular, not monolithic",
      at: 0.35,
      speed: 1.05,
      lane: 1,
      color: "#7FB9E6",
    },
    {
      text: "Composable architecture",
      at: 0.52,
      speed: 0.95,
      lane: 2,
      color: "#8FC4F0",
    },
    {
      text: "Designed for real-world systems",
      at: 0.85,
      speed: 1.1,
      lane: 3,
      color: "#9FD0FB",
    },
    {
      text: "Built for scale",
      at: 1.12,
      speed: 1.05,
      lane: 2,
      color: "#6faedb",
    },
  ];

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
              transform: `translate(${-cameraX}px, -50%)`,
            }}
          >
            Building interoperable systems for the real world
          </h2>

          {cards.map((card, i) => {
            const screenX = card.at * cameraTravel - cameraX * card.speed;
            return (
              <div
                key={i}
                className="absolute rounded-3xl"
                style={{
                  fontFamily: "var(--font-syne)",
                  fontWeight: 600,
                  fontSize: "1.2rem",
                  padding: "1.6rem 2.6rem",
                  background: card.color,
                  color: "#F2F6FB",
                  top: LANES[card.lane],
                  transform: `translateX(${screenX}px)`,
                 boxShadow: `
  0 32px 72px rgba(0,0,0,0.55),
  0 0 40px ${card.color}88,
  0 0 80px ${card.color}44,
  inset 0 0 22px ${card.color}55
`
,
                  transition: "box-shadow 0.4s ease",
                }}
              >
                {card.text}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   SOCIETY + TEAM SECTIONS (UNCHANGED BELOW)
   ========================================================================= */

// SocietyScrollRevealSection, SocietyPillar, TeamSection, ChromiaText, Header
// remain exactly the same as in your provided file

/* =========================================================================
   COMPONENT: HORIZONTAL VISION SECTION
   ========================================================================= */
function HorizontalVisionSection() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const scrollDistance = -top;
      const maxScroll = height - windowHeight;

      const threshold = maxScroll * 0.15;
      const animationDistance = scrollDistance - threshold;

      let p = animationDistance / (maxScroll - threshold);
      p = Math.min(Math.max(p, 0), 1);
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[600vh] z-20"
      style={{
        background:
          "linear-gradient(180deg, #fbfdff 0%, #001439 10%, #0C0A0E 50%, #17111B 100%)",
      }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div
          className="flex items-center gap-32 px-20 will-change-transform"
          style={{ transform: `translateX(-${progress * 70}%)` }}
        >
          <div className="shrink-0">
            <h2 className="font-display text-7xl font-black text-white/15 uppercase tracking-[0.3em]">
              Our Vision
            </h2>
          </div>

          <div className="shrink-0 flex items-center whitespace-nowrap">
            <div
              className="font-display leading-none font-black tracking-tight"
              style={{ fontSize: "clamp(8rem, 16vh, 18rem)" }}
            >
              this is a random lorem text to test how our scrolling etc is
              working
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   COMPONENT: SOCIETY SCROLL REVEAL
   ========================================================================= */
function SocietyScrollRevealSection() {
  const sectionRef = useRef(null);
  const [revealIndex, setRevealIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const { top } = sectionRef.current.getBoundingClientRect();
      const scrolledIn = -top;

      if (scrolledIn < 100) setRevealIndex(0);
      else if (scrolledIn < 600) setRevealIndex(1);
      else if (scrolledIn < 1100) setRevealIndex(2);
      else if (scrolledIn < 1600) setRevealIndex(3);
      else if (scrolledIn < 2100) setRevealIndex(4);
      else setRevealIndex(5);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="society-section"
      ref={sectionRef}
      className="relative h-[400vh] z-30 bg-gradient-to-b from-[#0a0a0a] via-[#151515] to-[#1a1a1a] text-white rounded-t-[4rem] -mt-24 shadow-[0_-60px_120px_rgba(0,0,0,0.9)]"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute w-[800px] h-[800px] rounded-full blur-[150px] bg-white/5 top-1/4 left-1/4" />
        <div className="absolute w-[600px] h-[600px] rounded-full blur-[120px] bg-white/5 bottom-1/4 right-1/4" />
      </div>

      <div className="sticky top-0 h-screen w-full flex flex-col pt-16 pb-4 px-6 lg:px-16 justify-center">
        <div className="text-center mb-8 shrink-0">
          <p className="text-sm uppercase tracking-[0.4em] text-white/40 mb-2 font-medium">
            Our Societies
          </p>
          <h2 className="font-display text-5xl lg:text-7xl font-black mb-4 text-white tracking-tight leading-[0.9]">
            The Pillars
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto" />
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SocietyPillar
            title="Computer Society"
            revealIndex={revealIndex}
            icon="computer"
            roles={[
              { title: "Chair", name: "Alex Richardson" },
              { title: "Vice Chair", name: "Sarah Chen" },
              { title: "Technical Lead", name: "David Kim" },
              { title: "Outreach Lead", name: "Emma Watson" },
            ]}
          />

          <SocietyPillar
            title="Power & Energy"
            revealIndex={revealIndex}
            icon="power"
            roles={[
              { title: "Chair", name: "Alex Richardson" },
              { title: "Vice Chair", name: "Sarah Chen" },
              { title: "Technical Lead", name: "David Kim" },
              { title: "Outreach Lead", name: "Emma Watson" },
            ]}
          />

          <SocietyPillar
            title="Robotics & Auto"
            revealIndex={revealIndex}
            icon="robotics"
            roles={[
              { title: "Chair", name: "Alex Richardson" },
              { title: "Vice Chair", name: "Sarah Chen" },
              { title: "Technical Lead", name: "David Kim" },
              { title: "Outreach Lead", name: "Emma Watson" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function SocietyPillar({ title, revealIndex, icon, roles }) {
  const getIcon = (type) => {
    const iconProps = "stroke-current stroke-[1.5] w-14 h-14";
    if (type === "computer") {
      return (
        <svg className={iconProps} viewBox="0 0 24 24" fill="none">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
          <circle cx="7" cy="8" r="0.5" fill="currentColor" />
          <circle cx="9" cy="8" r="0.5" fill="currentColor" />
          <circle cx="11" cy="8" r="0.5" fill="currentColor" />
        </svg>
      );
    } else if (type === "power") {
      return (
        <svg className={iconProps} viewBox="0 0 24 24" fill="none">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );
    } else {
      return (
        <svg className={iconProps} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v6m0 6v6M4.2 4.2l4.3 4.3m7 7l4.3 4.3M1 12h6m6 0h6M4.2 19.8l4.3-4.3m7-7l4.3-4.3" />
        </svg>
      );
    }
  };

  return (
    <div
      className="flex flex-col"
      style={{
        opacity: revealIndex >= 1 ? 1 : 0,
        transform: revealIndex >= 1 ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div className="relative bg-[#0F0F0F]/80 backdrop-blur-xl rounded-3xl border border-white/5 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

        <div className="relative p-6 pb-4 flex flex-col items-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-white/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-white/10 transition-colors duration-700" />
          <div className="relative mb-4 text-white/80 group-hover:text-white transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-105 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            {getIcon(icon)}
          </div>
          <h3
            className="text-xl font-bold text-center text-white tracking-wide"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {title}
          </h3>
          <div className="w-8 h-0.5 bg-white/20 mt-4 rounded-full" />
        </div>

        <div className="p-4 pt-2 space-y-3">
          {roles.map((role, i) => {
            const isVisible = revealIndex >= i + 2;
            return (
              <div
                key={i}
                className="relative group/role perspective-1000"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateX(0)" : "translateX(-10px)",
                  transition: `all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) ${i * 0.1}s`,
                }}
              >
                <div className="relative overflow-hidden rounded-xl p-3 border border-white/5 bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 cursor-default group-hover/role:translate-x-1">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-transparent opacity-0 group-hover/role:opacity-100 transition-opacity duration-500" />
                  <div className="flex items-center justify-between relative z-10 pl-2">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/40 font-syne group-hover/role:text-white/60 transition-colors">
                        {role.title}
                      </span>
                      <span className="text-[15px] font-medium text-white/90 group-hover/role:text-white transition-colors">
                        {role.name}
                      </span>
                    </div>
                    <div className="pr-2 opacity-0 -translate-x-2 group-hover/role:opacity-100 group-hover/role:translate-x-0 transition-all duration-300">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="text-white/70"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   COMPONENT: TEAM SECTION 
   ========================================================================= */
function TeamSection() {
  const sectionRef = useRef(null);
  const [hoveredMember, setHoveredMember] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const teamMembers = [
    {
      id: 1,
      name: "Alex Richardson",
      position: "Chief Executive Officer",
      quote: "Leading innovation with vision",
      year: "III",
      branch: "CSE",
      color: "#FF87A6",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop",
    },
    {
      id: 2,
      name: "Sarah Chen",
      position: "VP Engineering",
      quote: "Building the future",
      year: "II",
      branch: "ECE",
      color: "#88C9F7",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop",
    },
    {
      id: 3,
      name: "David Kim",
      position: "Chief Technology Officer",
      quote: "Innovation drives progress",
      year: "IV",
      branch: "CSE",
      color: "#CC91F0",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop",
    },
    {
      id: 4,
      name: "Emma Wilson",
      position: "Head of Design",
      quote: "Design with purpose",
      year: "II",
      branch: "MEC",
      color: "#FF9100",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=800&fit=crop",
    },
    {
      id: 5,
      name: "Michael Torres",
      position: "Product Lead",
      quote: "User-centric solutions",
      year: "III",
      branch: "CSE",
      color: "#FF87A6",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop",
    },
    {
      id: 6,
      name: "Jessica Lee",
      position: "Senior Developer",
      quote: "Code that matters",
      year: "I",
      branch: "ECE",
      color: "#88C9F7",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=800&fit=crop",
    },
    {
      id: 7,
      name: "Robert Anderson",
      position: "Operations Manager",
      quote: "Excellence in execution",
      year: "IV",
      branch: "CSE",
      color: "#CC91F0",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=800&fit=crop",
    },
    {
      id: 8,
      name: "Lisa Zhang",
      position: "Marketing Director",
      quote: "Connecting people together",
      year: "II",
      branch: "MEC",
      color: "#FF9100",
      image:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=800&fit=crop",
    },
    {
      id: 9,
      name: "James Brown",
      position: "Research Lead",
      quote: "Advancing knowledge",
      year: "III",
      branch: "ECE",
      color: "#FF87A6",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop",
    },
    {
      id: 10,
      name: "Rachel Green",
      position: "Community Manager",
      quote: "Growing together",
      year: "I",
      branch: "CSE",
      color: "#88C9F7",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=800&fit=crop",
    },
    {
      id: 11,
      name: "Christopher Lee",
      position: "Senior Architect",
      quote: "Building scalable systems",
      year: "IV",
      branch: "MEC",
      color: "#CC91F0",
      image:
        "https://images.unsplash.com/photo-1557862921-37829c790f19?w=600&h=800&fit=crop",
    },
    {
      id: 12,
      name: "Nicole Martinez",
      position: "UX Researcher",
      quote: "User insights drive design",
      year: "II",
      branch: "ECE",
      color: "#FF9100",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=800&fit=crop",
    },
    {
      id: 13,
      name: "Daniel Park",
      position: "Data Scientist",
      quote: "Insights from data",
      year: "III",
      branch: "CSE",
      color: "#FF87A6",
      image:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&h=800&fit=crop",
    },
    {
      id: 14,
      name: "Victoria Schmidt",
      position: "Security Lead",
      quote: "Protecting what matters",
      year: "I",
      branch: "MEC",
      color: "#88C9F7",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop",
    },
    {
      id: 15,
      name: "Andrew Johnson",
      position: "DevOps Engineer",
      quote: "Infrastructure for success",
      year: "IV",
      branch: "ECE",
      color: "#CC91F0",
      image:
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&h=800&fit=crop",
    },
    {
      id: 16,
      name: "Sophia Garcia",
      position: "Content Lead",
      quote: "Stories that inspire",
      year: "II",
      branch: "CSE",
      color: "#FF9100",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=800&fit=crop",
    },
    {
      id: 17,
      name: "Marcus Thompson",
      position: "Strategy Director",
      quote: "Visioning the future",
      year: "III",
      branch: "MEC",
      color: "#FF87A6",
      image:
        "https://images.unsplash.com/photo-1463453091185-61582044d556?w=600&h=800&fit=crop",
    },
    {
      id: 18,
      name: "Olivia White",
      position: "HR Manager",
      quote: "Empowering talent",
      year: "I",
      branch: "ECE",
      color: "#88C9F7",
      image:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=600&h=800&fit=crop",
    },
    {
      id: 19,
      name: "Kevin Davis",
      position: "Quality Assurance Lead",
      quote: "Quality never compromised",
      year: "IV",
      branch: "CSE",
      color: "#CC91F0",
      image:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&h=800&fit=crop",
    },
    {
      id: 20,
      name: "Rebecca Miller",
      position: "Finance Director",
      quote: "Responsible growth",
      year: "II",
      branch: "MEC",
      color: "#FF9100",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=800&fit=crop",
    },
    {
      id: 21,
      name: "Thomas Harris",
      position: "Partnerships Lead",
      quote: "Building bridges",
      year: "III",
      branch: "ECE",
      color: "#FF87A6",
      image:
        "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&h=800&fit=crop",
    },
  ];

  const convertToRoman = (num) => {
    const romanNumerals = { 1: "I", 2: "II", 3: "III", 4: "IV" };
    return romanNumerals[num] || num;
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

  return (
    <div
      id="team-section"
      ref={sectionRef}
      // Fixed: Removed undefined className and used standard class string
      className={`relative z-40 bg-[#0a0a0a] ${syne.variable}`}
      style={{ minHeight: "100vh" }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
          style={{
            background: "radial-gradient(circle, #FF87A6 0%, transparent 70%)",
            top: "10%",
            left: "20%",
            transform: `translate(${scrollProgress * 50}px, ${scrollProgress * 30}px)`,
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-20"
          style={{
            background: "radial-gradient(circle, #88C9F7 0%, transparent 70%)",
            bottom: "20%",
            right: "15%",
            transform: `translate(-${scrollProgress * 40}px, -${scrollProgress * 20}px)`,
          }}
        />
      </div>

      <div className="relative pt-32 pb-20 px-8 lg:px-16">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-8">
            <div className="flex-1">
              <p className="text-sm uppercase tracking-[0.3em] text-white/40 mb-4 font-medium">
                The People Behind IEEE
              </p>
              <h2
                className="font-black text-white tracking-tight leading-[0.9] mb-6"
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "clamp(4rem, 10vw, 10rem)",
                }}
              >
                Our Team
              </h2>
              <div className="flex gap-8 flex-wrap">
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-5xl font-black text-white"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    21
                  </span>
                  <span className="text-white/60 text-sm uppercase tracking-wider">
                    Members
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-5xl font-black text-white"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    3
                  </span>
                  <span className="text-white/60 text-sm uppercase tracking-wider">
                    Branches
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-5xl font-black text-white"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    1
                  </span>
                  <span className="text-white/60 text-sm uppercase tracking-wider">
                    Vision
                  </span>
                </div>
              </div>
            </div>
            <div className="text-left lg:text-right">
              <p className="text-white/60 text-lg max-w-md leading-relaxed">
                A collective of passionate individuals driving innovation and
                excellence across Computer Science, Electronics, and Mechanical
                Engineering
              </p>
            </div>
          </div>

          <div className="relative h-px bg-gradient-to-r from-white/20 via-white/5 to-transparent mt-12">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/40" />
            <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/30" />
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white/20" />
          </div>
        </div>
      </div>

      <div className="relative px-8 lg:px-16 pb-32">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className="relative overflow-hidden rounded-2xl group cursor-pointer aspect-[3/4]"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`,
                }}
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div className="relative w-full h-full">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    style={{
                      filter:
                        hoveredMember === member.id
                          ? "grayscale(0%) brightness(1.1)"
                          : "grayscale(100%) brightness(0.85)",
                    }}
                  />
                  <div
                    className="absolute inset-0 transition-all duration-500"
                    style={{
                      background: `linear-gradient(180deg, rgba(0,0,0,0.1) 0%, ${member.color}20 40%, ${member.color}90 100%)`,
                      opacity: hoveredMember === member.id ? 1 : 0.8,
                    }}
                  />
                  <div
                    className="absolute inset-0 transition-all duration-500"
                    style={{
                      border: `2px solid ${member.color}`,
                      opacity: hoveredMember === member.id ? 1 : 0,
                      boxShadow:
                        hoveredMember === member.id
                          ? `0 0 30px ${member.color}40`
                          : "none",
                    }}
                  />
                  <div
                    className="absolute top-0 right-0 transition-all duration-500"
                    style={{
                      width: hoveredMember === member.id ? "60px" : "0px",
                      height: hoveredMember === member.id ? "60px" : "0px",
                      background: `linear-gradient(135deg, ${member.color}40 0%, transparent 100%)`,
                    }}
                  />
                  <div className="absolute inset-0 p-5 flex flex-col justify-between">
                    <div className="flex justify-end">
                      <div
                        className="px-3 py-1.5 rounded-full backdrop-blur-md border transition-all duration-300"
                        style={{
                          backgroundColor: `${member.color}30`,
                          borderColor: `${member.color}60`,
                          transform:
                            hoveredMember === member.id
                              ? "translateY(0) scale(1.05)"
                              : "translateY(-10px) scale(0.9)",
                          opacity: hoveredMember === member.id ? 1 : 0.7,
                        }}
                      >
                        <span
                          className="text-xs font-bold uppercase tracking-wider"
                          style={{
                            color:
                              hoveredMember === member.id
                                ? "#fff"
                                : member.color,
                          }}
                        >
                          {convertToRoman(parseInt(member.year))} •{" "}
                          {member.branch}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div
                        className="transform transition-all duration-500"
                        style={{
                          transform:
                            hoveredMember === member.id
                              ? "translateY(0)"
                              : "translateY(10px)",
                        }}
                      >
                        <h3
                          className="text-white font-bold mb-1.5 leading-tight text-xl"
                          style={{ fontFamily: "var(--font-syne)" }}
                        >
                          {member.name}
                        </h3>
                        <p className="text-white/90 text-xs font-medium mb-2.5 leading-snug">
                          {member.position}
                        </p>
                        <p
                          className="text-white/85 text-xs italic transition-all duration-500 overflow-hidden leading-relaxed"
                          style={{
                            maxHeight:
                              hoveredMember === member.id ? "60px" : "0",
                            opacity: hoveredMember === member.id ? 1 : 0,
                          }}
                        >
                          "{member.quote}"
                        </p>
                      </div>
                      <div
                        className="mt-3 h-0.5 rounded-full transition-all duration-500"
                        style={{
                          backgroundColor: member.color,
                          width: hoveredMember === member.id ? "100%" : "0%",
                          boxShadow:
                            hoveredMember === member.id
                              ? `0 0 10px ${member.color}`
                              : "none",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Replaced styled-jsx with a standard style block to avoid class name mismatches */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `,
        }}
      />
    </div>
  );
}

function ChromiaText({ text, color = "cyan" }) {
  const mainColor = color === "cyan" ? "#88C9F7" : "#CC91F0";
  const echoColor =
    color === "cyan" ? "rgba(136, 201, 247, 0.3)" : "rgba(204, 145, 240, 0.3)";

  return (
    <span className="chromia-text-wrapper inline-block">
      <span className="chromia-text-main" style={{ color: mainColor }}>
        {text}
      </span>
      <span
        className="chromia-text-echo"
        style={{
          WebkitTextStroke: `1px ${echoColor}`,
          color: "transparent",
        }}
      >
        {text}
      </span>
    </span>
  );
}

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
      const societySection = document.querySelector("#society-section");
      if (societySection) {
        societySection.scrollIntoView({ behavior: "smooth" });
      }
    } else if (section === "team") {
      const teamSection = document.querySelector("#team-section");
      if (teamSection) {
        teamSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Capsule Nav - Centered */}
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

      {/* FOT Logo - TOP RIGHT (Image Only, Larger Size) */}
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

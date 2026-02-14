"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Poppins, Syne } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

// --- DATA SOURCE ---
const ALL_MEMBERS = [
    { name: "Aayush Chauhan", role: "Chair", img: "/aayush.jpeg" },
    { name: "Shubhika Sinha", role: "Vice Chair", img: "/shubhika.jpeg" },
    { name: "Ronit Jaiswal", role: "Vice Chair", img: "/ronit.jpeg" },
    { name: "Krishnendra S.", role: "Vice Chair", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=800&fit=crop" },
    { name: "Rewant B.", role: "Secretary", img: "/rewant.jpeg" },
    { name: "Nikhil Yadav", role: "Joint Sec", img: "/nikhil.jpeg" },
    { name: "Ansh Gupta", role: "Treasurer", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop" },
    { name: "Arpit Garg", role: "Joint Treas.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop" },
    { name: "Dihika Panwar", role: "Director", img: "/dihika.jpeg" },
    { name: "Lavanya Arora", role: "Director", img: "/lavanya.jpeg" },
    { name: "Deepali Talreja", role: "Director", img: "/deepali.jpeg" },
    { name: "Rishabh Jaiswal", role: "Tech Dir", img: "/rishabh.jpeg" },
    { name: "Shreyas Singh", role: "Tech Dir", img: "/shreyas.jpeg" },
    { name: "Ayush Kaushik", role: "Student Dir", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop" },
    { name: "Akanksha Ratan", role: "Student Dir", img: "/akansha.jpeg" },
    { name: "Raghav Aggarwal", role: "Membership", img: "/raghav.jpeg" },
    { name: "Ansh Dev Yadav", role: "Membership", img: "/ansh.jpeg" },
    { name: "Hardeep", role: "Membership", img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&h=800&fit=crop" },
    { name: "Supriya N.", role: "Nominations", img: "/supriya.jpeg" },
    { name: "Divyanshu Jha", role: "Nominations", img: "/divyanshu.jpeg" },
    { name: "Aditya Chauhan", role: "Website", img: "/aditya.jpeg" }
];

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 cubic-bezier(0.2, 0.8, 0.2, 1) transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} ${className}`} 
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function MobileHome() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isMenuOpen || showTeamModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen, showTeamModal]);

  const scrollTo = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  };

  const navItems = ['home', 'vision', 'society', 'team', 'contact'];

  return (
    <div className={`${poppins.variable} ${syne.variable} bg-[#fbfdff] text-[#0C0A0E] font-body overflow-x-hidden w-full min-h-screen`}>
      
      {/* LOADER */}
      <div className={`fixed inset-0 z-[100] bg-[#fbfdff] flex items-center justify-center transition-all duration-500 ${isLoading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="relative w-24 h-24 animate-pulse">
          <Image src="/ieee_logo.png" alt="IEEE Logo" fill className="object-contain" priority />
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-4 pointer-events-none">
        <div className="flex justify-between items-center pointer-events-auto">
          <div className={`flex items-center gap-3 transition-all duration-500 ${isMenuOpen || showTeamModal ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"}`}>
             <div className="p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-white/20 flex items-center gap-3 pr-4">
                 <div className="relative w-8 h-8">
                    <Image src="/ieee_logo.png" alt="IEEE Logo" fill className="object-contain" />
                </div>
                <div className="w-px h-4 bg-black/10"></div>
                <div className="relative w-14 h-7">
                    <Image src="/fot_logo.png" alt="FOT Logo" fill className="object-contain" />
                </div>
             </div>
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`w-12 h-12 rounded-full flex flex-col justify-center items-center gap-1.5 shadow-lg transition-all duration-500 ${isMenuOpen ? "bg-white text-black rotate-90" : "bg-white/90 backdrop-blur-md border border-white/40 text-[#001439]"}`}
          >
            <span className={`block h-0.5 rounded-full bg-current transition-all duration-300 ${isMenuOpen ? "w-6 absolute rotate-45" : "w-5"}`} />
            <span className={`block h-0.5 rounded-full bg-current transition-all duration-300 ${isMenuOpen ? "w-6 absolute -rotate-45" : "w-5"}`} />
            <span className={`block h-0.5 rounded-full bg-current transition-all duration-300 ${isMenuOpen ? "opacity-0" : "w-3 ml-2"}`} />
          </button>
        </div>
      </nav>

      {/* MENU OVERLAY - REDUCED FONT SIZES TO PREVENT CUTOFF */}
      <div className={`fixed inset-0 z-[90] bg-[#020617] transition-all duration-700 cubic-bezier(0.7, 0, 0.3, 1) ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} 
           style={{ clipPath: isMenuOpen ? "circle(150% at 90% 5%)" : "circle(0% at 90% 5%)" }}>
         
         <div className="h-full w-full flex flex-col justify-center px-10 relative overflow-hidden">
            <div className="absolute top-[-10%] right-[-20%] w-[300px] h-[300px] rounded-full bg-blue-600/20 blur-[100px] pointer-events-none" />
            
            <div className="flex flex-col gap-6 max-w-full">
                {navItems.map((item, i) => (
                    <button 
                        key={item}
                        onClick={() => scrollTo(item)}
                        className="group flex items-center gap-4 text-left transition-all duration-500"
                        style={{ 
                            transform: isMenuOpen ? "translateY(0)" : "translateY(40px)",
                            opacity: isMenuOpen ? 1 : 0,
                            transitionDelay: `${100 + (i * 50)}ms`
                        }}
                    >
                        <span className="text-[3.5vw] font-mono text-white/30 pt-2 shrink-0">0{i + 1}</span>
                        {/* More aggressive clamp and tight tracking to ensure fit */}
                        <span className="text-[clamp(1.8rem,9vw,4rem)] font-black text-white uppercase tracking-tight group-hover:text-[#3B82C4] transition-colors whitespace-nowrap" style={{ fontFamily: "var(--font-syne)" }}>
                            {item}
                        </span>
                    </button>
                ))}
                
                <div className="mt-8 pt-8 border-t border-white/10 w-full">
                    <Link 
                        href="/events"
                        className="inline-flex items-center gap-4 px-8 py-4 bg-[#3B82C4] text-white rounded-full transition-all duration-500 hover:bg-blue-500 active:scale-95 shadow-xl shadow-blue-600/20"
                        style={{ 
                            transform: isMenuOpen ? "translateY(0)" : "translateY(20px)",
                            opacity: isMenuOpen ? 1 : 0,
                            transitionDelay: "450ms"
                        }}
                    >
                        <span className="text-base font-bold uppercase tracking-widest whitespace-nowrap" style={{ fontFamily: "var(--font-syne)" }}>
                            Explore Events
                        </span>
                        <span className="text-xl font-bold shrink-0">→</span>
                    </Link>
                </div>
            </div>
         </div>
      </div>

      <TeamGridModal isOpen={showTeamModal} onClose={() => setShowTeamModal(false)} />

      <main className={`transition-opacity duration-1000 flex flex-col ${isLoading ? "opacity-0" : "opacity-100"}`}>
        <MobileHero id="home" />
        <div className="-mt-10 relative z-10"><MobileVision id="vision" /></div>
        <div className="-mt-12 relative z-20"><MobileSociety id="society" /></div>
        <div className="-mt-12 relative z-30"><MobileTeam id="team" onOpenModal={() => setShowTeamModal(true)} /></div>
        <div className="-mt-12 relative z-40"><MobileContact id="contact" /></div>
      </main>
    </div>
  );
}

// --- REMAINING SUB SECTIONS ---

function MobileHero({ id }) {
  return (
    <section id={id} className="relative min-h-[105vh] flex flex-col justify-center px-6 pt-32 pb-40 overflow-hidden bg-[#fbfdff]">
      <div className="absolute inset-0 z-0">
        <Image src="/fot_bg.jpeg" alt="Background" fill className="object-cover opacity-10 mix-blend-multiply" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#fbfdff] via-transparent to-[#fbfdff]" />
      </div>
      <div className="relative z-10 space-y-6">
        <Reveal delay={100}><p className="text-[#3B82C4] font-bold tracking-[0.25em] text-xs uppercase">Welcome to</p></Reveal>
        <Reveal delay={200}><h1 className="text-[clamp(3.5rem,18vw,8rem)] leading-[0.85] font-black text-[#001439] tracking-tighter" style={{ fontFamily: "var(--font-syne)" }}>IEEE</h1></Reveal>
        <Reveal delay={300}><h2 className="text-3xl font-bold text-[#001439]/90" style={{ fontFamily: "var(--font-syne)" }}>Faculty of<br />Technology</h2></Reveal>
        <Reveal delay={400}><p className="text-[#001439]/70 text-lg leading-relaxed max-w-[85%] pt-2">Innovating for tomorrow, building systems that scale, and fostering a community of engineers.</p></Reveal>
        <Reveal delay={500}><div className="pt-8 flex gap-4"><button onClick={() => document.getElementById('vision').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-[#001439] text-white rounded-full font-bold uppercase tracking-wider text-xs shadow-xl active:scale-95 transition-transform">Start Exploring</button></div></Reveal>
      </div>
    </section>
  );
}

function MobileVision({ id }) {
  const visions = [
    { title: "Relational", desc: "Modeling complex data relationships.", color: "#6FAEDB" },
    { title: "Modular", desc: "Independent components, fully interoperable.", color: "#7FB9E6" },
    { title: "Composable", desc: "Build complex systems from reusable modules.", color: "#8FC4F0" },
    { title: "Real-world", desc: "Bridging theory and production environments.", color: "#9FD0FB" },
    { title: "Scalable", desc: "Engineered for global growth.", color: "#6faedb" },
  ];
  return (
    <section id={id} className="relative px-6 pt-16 pb-32 bg-white rounded-t-[3rem] shadow-[0_-25px_50px_rgba(0,0,0,0.05)] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white to-[#f0f7ff]/50" />
      <div className="absolute top-12 right-[-10%] pointer-events-none opacity-[0.04] z-0"><h2 className="text-[12rem] font-black text-[#001439] leading-none" style={{ fontFamily: "var(--font-syne)" }}>VISION</h2></div>
      <div className="relative z-10">
        <Reveal><div className="mb-12"><p className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-2">Core Values</p><h2 className="text-4xl font-black text-[#001439]" style={{ fontFamily: "var(--font-syne)" }}>Our Vision</h2></div></Reveal>
        <div className="space-y-8">
            {visions.map((v, i) => (
            <Reveal key={i} delay={i * 100}>
                <div className="group relative pl-8 border-l-2 border-dashed border-blue-100 pb-2">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: v.color }} />
                    <h3 className="text-xl font-bold text-[#001439] mb-1" style={{ fontFamily: "var(--font-syne)" }}>{v.title}</h3>
                    <p className="text-[#001439]/60 text-sm leading-relaxed">{v.desc}</p>
                </div>
            </Reveal>
            ))}
        </div>
      </div>
    </section>
  );
}

function MobileSociety({ id }) {
  const [openCardIndex, setOpenCardIndex] = useState(null);
  const toggleCard = (index) => setOpenCardIndex(openCardIndex === index ? null : index);
  const societies = [
    { title: "Computer Society", icon: "computer", color: "#3B82C4", bg: "#EBF4FD", desc: "Advancing theory, practice, and application of computer science.", roles: [{ title: "Chair", name: "Alex Richardson" }, { title: "Vice Chair", name: "Sarah Chen" }, { title: "Tech Lead", name: "David Kim" }, { title: "Outreach", name: "Emma Watson" }] },
    { title: "Power & Energy", icon: "power", color: "#5B9BD5", bg: "#eef7ff", desc: "Leading the future of power and energy innovation.", roles: [{ title: "Chair", name: "Alex Richardson" }, { title: "Vice Chair", name: "Sarah Chen" }, { title: "Tech Lead", name: "David Kim" }, { title: "Outreach", name: "Emma Watson" }] },
    { title: "Robotics & Auto", icon: "robotics", color: "#6B7280", bg: "#F3F4F6", desc: "Fostering development of robotics for humanity.", roles: [{ title: "Chair", name: "Alex Richardson" }, { title: "Vice Chair", name: "Sarah Chen" }, { title: "Tech Lead", name: "David Kim" }, { title: "Outreach", name: "Emma Watson" }] },
  ];
  return (
    <section id={id} className="pt-24 pb-32 bg-[#f8fafc] rounded-t-[3rem] shadow-[0_-25px_50px_rgba(0,0,0,0.05)] relative overflow-hidden">
      <Reveal><div className="px-6 mb-10 relative z-10"><p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">Communities</p><h2 className="text-4xl font-black text-[#001439]" style={{ fontFamily: "var(--font-syne)" }}>Societies</h2></div></Reveal>
      <div className="px-6 flex flex-col gap-6 relative z-10">
        {societies.map((s, i) => {
          const isOpen = openCardIndex === i;
          return (
            <Reveal key={i} delay={i * 100}>
                <div onClick={() => toggleCard(i)} className="w-full bg-white rounded-[2rem] p-8 border border-black/5 shadow-sm active:scale-[0.98] transition-transform duration-300 cursor-pointer">
                    <div className="flex justify-between items-start mb-6"><div className="w-14 h-14"><SocietyIcon type={s.icon} color={s.color} /></div><div className={`p-2 rounded-full bg-black/5 text-black/60 transition-transform duration-500 ${isOpen ? "rotate-180 bg-black/10" : ""}`}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg></div></div>
                    <h3 className="text-2xl font-bold mb-3 text-[#001439]" style={{ fontFamily: "var(--font-syne)" }}>{s.title}</h3>
                    <p className="text-[#001439]/60 leading-relaxed font-medium text-sm mb-4">{s.desc}</p>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}><div className="w-full h-px bg-gray-100 my-6" /><div className="grid grid-cols-2 gap-y-4 gap-x-2">{s.roles.map((role, idx) => (<div key={idx} className="flex flex-col"><span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{role.title}</span><span className="text-sm font-semibold text-[#001439]" style={{ fontFamily: "var(--font-syne)" }}>{role.name}</span></div>))}</div></div>
                    <div className={`w-full h-1 rounded-full bg-gray-100 overflow-hidden mt-6 transition-all duration-500 ${isOpen ? "opacity-0" : "opacity-100"}`}><div className="h-full w-1/3 rounded-full" style={{ backgroundColor: s.color }}></div></div>
                </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function MobileTeam({ id, onOpenModal }) {
  const randomPreview = useMemo(() => [...ALL_MEMBERS].sort(() => 0.5 - Math.random()).slice(0, 6), []);
  return (
    <section id={id} className="pt-24 pb-32 bg-[#0a0a0a] text-white rounded-t-[3rem] shadow-[0_-25px_50px_rgba(0,0,0,0.2)] relative z-10">
      <Reveal><div className="px-6 mb-10"><h2 className="text-4xl font-black" style={{ fontFamily: "var(--font-syne)" }}>The Team</h2><p className="text-white/50 text-sm mt-2">The minds behind the magic.</p></div></Reveal>
      <div className="px-6 grid grid-cols-2 gap-4 mb-8">
        {randomPreview.map((t, i) => (
          <Reveal key={i} delay={i * 50}><div className="bg-white/5 rounded-2xl p-4 flex flex-col items-center gap-3 border border-white/5"><div className="w-20 h-20 rounded-full p-0.5 relative overflow-hidden bg-gradient-to-b from-white/20 to-transparent"><div className="w-full h-full rounded-full relative overflow-hidden bg-gray-800"><img src={t.img} alt={t.name} className="object-cover w-full h-full" /></div></div><div className="text-center"><p className="text-sm font-bold text-white leading-tight">{t.name.split(" ")[0]}</p><p className="text-white/50 text-[10px] uppercase tracking-wider mt-1">{t.role}</p></div></div></Reveal>
        ))}
      </div>
      <Reveal delay={200}><div className="px-6"><button onClick={onOpenModal} className="w-full py-4 rounded-xl bg-[#3B82C4] text-white font-bold uppercase tracking-widest text-xs shadow-lg active:scale-95 transition-transform">Meet Everyone</button></div></Reveal>
    </section>
  );
}

function MobileContact({ id }) {
  return (
    <section id={id} className="px-6 pt-24 pb-12 bg-[#fbfdff] rounded-t-[3rem] shadow-[0_-25px_50px_rgba(0,0,0,0.1)] relative z-20">
       <Reveal><h2 className="text-[clamp(2.5rem,11.5vw,5.5rem)] font-black text-[#001439] mb-8 leading-[0.9]" style={{ fontFamily: "var(--font-syne)" }}>Let's <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82C4] to-blue-600">Build.</span></h2></Reveal>
       <Reveal delay={200}>
        <div className="bg-white rounded-[2rem] p-8 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] border border-blue-50/50 space-y-8">
            <div><p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-2">Visit</p><p className="text-[#001439] font-medium text-lg">Faculty of Technology<br/>University of Delhi</p></div>
            <div className="w-full h-px bg-gray-100" />
            <div><p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-2">Email</p><a href="mailto:ieee@fot.du.ac.in" className="text-lg font-bold text-[#001439] break-all">ieee@fot.du.ac.in</a></div>
            <div className="flex gap-3 pt-2">
                <SocialBtn link="https://www.linkedin.com/company/ieee-faculty-of-technology-university-of-delhi/" icon={<LinkedinIcon />} />
                <SocialBtn link="https://instagram.com" icon={<InstagramIcon />} />
                <SocialBtn link="mailto:ieee@fot.du.ac.in" icon={<MailIcon />} />
            </div>
        </div>
       </Reveal>
       <div className="mt-12 text-center text-[#001439]/30 text-xs font-bold uppercase tracking-widest pb-8">© {new Date().getFullYear()} IEEE FOT</div>
    </section>
  );
}

function TeamGridModal({ isOpen, onClose }) {
    return (
        <div className={`fixed inset-0 z-[110] bg-[#001439] transition-all duration-500 flex flex-col ${isOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-10"}`}>
            <div className="flex-shrink-0 px-6 py-6 flex justify-between items-center bg-[#001439] z-10 border-b border-white/5">
                <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>All Members</h2>
                <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-6 pb-20"><div className="grid grid-cols-2 gap-4">{ALL_MEMBERS.map((t, i) => (<div key={i} className="bg-white/5 rounded-2xl p-4 flex flex-col items-center gap-3 border border-white/5"><div className="w-20 h-20 rounded-full overflow-hidden bg-gray-800 border-2 border-white/10"><img src={t.img} alt={t.name} className="w-full h-full object-cover" /></div><div className="text-center"><p className="text-white text-sm font-bold leading-tight">{t.name}</p><p className="text-white/50 text-[10px] uppercase tracking-wider mt-1">{t.role}</p></div></div>))}</div></div>
        </div>
    )
}

function SocialBtn({ icon, link }) {
    const isMail = link.startsWith("mailto:");
    return (<a href={link} target={isMail ? undefined : "_blank"} rel={isMail ? undefined : "noopener noreferrer"} className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-[#001439] hover:bg-blue-50 hover:scale-105 active:scale-95 transition-all border border-black/5">{icon}</a>)
}

function SocietyIcon({ type, color }) {
  const props = { width: "100%", height: "100%", viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" };
  if (type === "computer") return <svg {...props}><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /><circle cx="7" cy="8.5" r="0.8" fill={color} stroke="none" /><circle cx="9.2" cy="8.5" r="0.8" fill={color} stroke="none" /><circle cx="11.4" cy="8.5" r="0.8" fill={color} stroke="none" /></svg>;
  if (type === "power") return <svg {...props}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>;
  return <svg {...props}><circle cx="12" cy="12" r="3" /><path d="M12 1v6m0 6v6M4.2 4.2l4.3 4.3m7 7l4.3 4.3M1 12h6m6 0h6M4.2 19.8l4.3-4.3m7-7l4.3-4.3" /></svg>;
}

const LinkedinIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;
const InstagramIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
const MailIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
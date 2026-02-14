"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Poppins, Syne } from "next/font/google";
import { useEffect, useRef, useState } from 'react';

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-poppins" });
const syne = Syne({ subsets: ["latin"], weight: ["400", "700", "800"], variable: "--font-syne" });

// --- DATA SOURCE ---
const eventsData = {
  'tech-summit': {
    title: 'IEEE TECH SUMMIT',
    category: 'CONFERENCE',
    date: 'OCTOBER 2025',
    deliverables: 'TECH CONFERENCE',
    organizer: 'IEEE STUDENT BRANCH',
    role: 'LEAD ORGANIZER',
    services: 'EVENT PLANNING',
    heroImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop',
    overview: {
      headline: 'Inspiring the next generation of tech leaders.',
      description: [
        'The IEEE Tech Summit aims to create a platform where technology enthusiasts, industry leaders, and students converge to explore the latest advancements.',
        'Structured around keynote speeches and workshops, we utilized modern event management techniques to ensure seamless execution.'
      ]
    },
    images: ['https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop']
  },
  'ai-workshop': {
    title: 'AI WORKSHOP',
    category: 'WORKSHOP',
    date: 'NOVEMBER 2025',
    deliverables: 'HANDS-ON TRAINING',
    organizer: 'IEEE CS CHAPTER',
    role: 'WORKSHOP LEAD',
    services: 'CURRICULUM DESIGN',
    heroImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop',
    overview: {
      headline: 'Demystifying AI through practical experience.',
      description: [
        'Designed to make AI accessible to students at all skill levels. From foundational concepts to advanced machine learning techniques.',
        'We structured the curriculum using project-based learning, ensuring every participant left with tangible AI projects.'
      ]
    },
    images: ['https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop']
  },
  'hackathon': {
    title: 'HACK ODISHA 4.0',
    category: 'HACKATHON',
    date: 'DECEMBER 2025',
    deliverables: '48-HOUR HACKATHON',
    organizer: 'IEEE & TECH PARTNERS',
    role: 'EVENT DIRECTOR',
    services: 'LOGISTICS',
    heroImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2000&auto=format&fit=crop',
    overview: {
      headline: 'Building innovative solutions for real-world challenges.',
      description: [
        'Hack Odisha 4.0 brought together 500+ developers for an intensive 48-hour coding marathon tackling healthcare and smart cities.',
        'The event featured mentorship from industry experts and fostered a collaborative environment for cross-functional teams.'
      ]
    },
    images: ['https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2000&auto=format&fit=crop']
  },
  'robotics': {
    title: 'ROBOTICS EXPO',
    category: 'EXHIBITION',
    date: 'JANUARY 2026',
    deliverables: 'ROBOTICS SHOWCASE',
    organizer: 'IEEE RAS CHAPTER',
    role: 'CURATOR',
    services: 'DEMONSTRATIONS',
    heroImage: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=2000&auto=format&fit=crop',
    overview: {
      headline: 'Showcasing the future of automation.',
      description: [
        'Presented cutting-edge developments from industrial automation to humanoid robots with live interactive exhibits.',
        'We curated exhibits that highlighted both theoretical foundations and practical applications.'
      ]
    },
    images: ['https://images.unsplash.com/photo-1563207153-f403bf289096?q=80&w=2000&auto=format&fit=crop']
  },
  'cyber-security': {
    title: 'CYBERSEC SUMMIT',
    category: 'CONFERENCE',
    date: 'FEBRUARY 2026',
    deliverables: 'SECURITY CONFERENCE',
    organizer: 'IEEE COMPUTER SOC.',
    role: 'PROGRAM CHAIR',
    services: 'SPEAKER OPS',
    heroImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop',
    overview: {
      headline: 'Addressing critical security challenges.',
      description: [
        'Convened security professionals to discuss emerging threats, defensive strategies, and digital security futures.',
        'Balanced technical depth with practical applicability through Capture The Flag competitions.'
      ]
    },
    images: ['https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop']
  },
  'iot-expo': {
    title: 'IOT EXPO 2026',
    category: 'EXHIBITION',
    date: 'MARCH 2026',
    deliverables: 'IOT SHOWCASE',
    organizer: 'IEEE IOT INITIATIVE',
    role: 'TECHNICAL LEAD',
    services: 'INTEGRATION',
    heroImage: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2000&auto=format&fit=crop',
    overview: {
      headline: 'Exploring the interconnected future.',
      description: [
        'Showcased how connected devices transform industries from healthcare to agriculture via edge computing.',
        'Designed interactive demos highlighting practical IoT benefits while addressing security and scalability.'
      ]
    },
    images: ['https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop']
  },
};

// --- ANIMATION COMPONENTS ---

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`} 
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// --- MAIN COMPONENT ---

export default function MobileEventDetail() {
  const params = useParams();
  const event = eventsData[params.id];
  const [scrollProgress, setScrollProgress] = useState(0);

  // Parallax & Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;
      setScrollProgress(scroll);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Next Event Logic
  const eventKeys = Object.keys(eventsData);
  const currentIndex = eventKeys.indexOf(params.id);
  const nextIndex = (currentIndex + 1) % eventKeys.length;
  const nextEventId = eventKeys[nextIndex];
  const nextEvent = eventsData[nextEventId];

  if (!event) return <div className="min-h-screen flex items-center justify-center bg-white text-black">Event Not Found</div>;

  return (
    <div className={`${poppins.variable} ${syne.variable} min-h-screen bg-white text-[#0C0A0E] font-body selection:bg-[#001439] selection:text-white overflow-x-hidden`}>
      
      {/* 1. Header (Dynamic Transparency) */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-5 flex justify-between items-center bg-white/80 backdrop-blur-xl border-b border-black/5 transition-all duration-300">
        <Link 
            href="/events" 
            className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-500 hover:text-black transition-colors"
        >
          <span className="text-lg">←</span> Back
        </Link>
        
        {/* Gallery Shortcut Button - External Drive Placeholder */}
        <Link 
            href="#" // Placeholder for external drive link
            className="px-4 py-2 bg-[#001439] text-white text-[10px] font-bold tracking-widest uppercase rounded-full shadow-lg active:scale-95 transition-transform"
        >
            Gallery
        </Link>
      </nav>

      {/* 2. Hero Section with Parallax */}
      <div className="relative w-full h-[65vh] overflow-hidden">
        <div className="absolute inset-0" style={{ transform: `scale(${1 + scrollProgress * 0.5})`, transition: 'transform 0.1s linear' }}>
            <Image 
            src={event.heroImage} 
            alt={event.title} 
            fill 
            className="object-cover"
            priority
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
        
        {/* Title Overlay - Fixed Overflow with break-words and responsive text */}
        <div className="absolute bottom-0 left-0 px-6 pb-12 w-full max-w-full">
            <Reveal>
                <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-widest uppercase rounded-full mb-4">
                    {event.category} • {event.date}
                </div>
                {/* Responsive Text Size: text-[10vw] allows text to scale with screen width */}
                <h1 className="text-[10vw] leading-[0.9] font-black text-white drop-shadow-lg break-words hyphens-auto" style={{ fontFamily: "var(--font-syne)" }}>
                    {event.title}
                </h1>
            </Reveal>
        </div>
      </div>

      <div className="px-6 py-12 space-y-16 -mt-6 bg-white rounded-t-[2.5rem] relative z-10">
        
        {/* 3. Meta Data Grid */}
        <Reveal delay={100}>
            <div className="grid grid-cols-2 gap-y-8 gap-x-6 border-b border-gray-100 pb-12">
                <InfoBlock label="Organizer" value={event.organizer} />
                <InfoBlock label="Role" value={event.role} />
                <InfoBlock label="Deliverables" value={event.deliverables} />
                <InfoBlock label="Services" value={event.services} />
            </div>
        </Reveal>

        {/* 4. Overview */}
        <Reveal delay={200}>
            <div className="space-y-6">
                <p className="text-xs font-bold tracking-widest text-blue-500 uppercase">The Challenge</p>
                <h2 className="text-3xl font-bold leading-tight text-[#001439]" style={{ fontFamily: "var(--font-syne)" }}>
                    {event.overview.headline}
                </h2>
                <div className="text-gray-600 text-lg leading-relaxed space-y-6 font-light">
                    {event.overview.description.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </div>
            </div>
        </Reveal>

        {/* 5. Gallery Images */}
        <div className="space-y-6">
             {event.images.map((img, i) => (
                 <Reveal key={i} delay={i * 100}>
                    <div className="w-full aspect-[4/3] relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/5">
                        <Image src={img} alt="Gallery" fill className="object-cover" />
                    </div>
                 </Reveal>
             ))}
        </div>

        {/* 6. Next Event CTA - Fixed Overflow */}
        <div className="pt-8 border-t border-gray-100">
            <Reveal>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Up Next</p>
                <Link href={`/events/${nextEventId}`} className="block group bg-gray-50 rounded-[2rem] p-8 hover:bg-[#001439] transition-colors duration-500">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500 bg-blue-50 px-2 py-1 rounded group-hover:bg-white/10 group-hover:text-white transition-colors">
                            {nextEvent.category}
                        </span>
                        <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:border-white/20 group-hover:text-white">
                            →
                        </div>
                    </div>
                    {/* Added break-words to prevent overflow on long titles */}
                    <h3 className="text-3xl font-black text-[#001439] group-hover:text-white transition-colors break-words" style={{ fontFamily: "var(--font-syne)" }}>
                        {nextEvent.title}
                    </h3>
                </Link>
            </Reveal>
        </div>

        <div className="pb-8 text-center">
             <p className="text-[#001439]/20 text-[10px] font-bold uppercase tracking-widest">IEEE Faculty of Technology</p>
        </div>
      </div>
    </div>
  );
}

function InfoBlock({ label, value }) {
    return (
        <div className="flex flex-col gap-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
            <p className="text-sm font-bold text-[#001439] leading-snug break-words">{value}</p>
        </div>
    )
}
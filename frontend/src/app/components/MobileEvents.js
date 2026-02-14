"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Poppins, Syne } from "next/font/google";

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600"], 
  variable: "--font-poppins" 
});

const syne = Syne({ 
  subsets: ["latin"], 
  weight: ["400", "700", "800"], 
  variable: "--font-syne" 
});

// Data Source
const EVENTS = [
  {
    id: 'tech-summit',
    category: 'Conference',
    title: 'IEEE TECH SUMMIT',
    date: 'OCT 2025',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 'ai-workshop',
    category: 'Workshop',
    title: 'AI WORKSHOP',
    date: 'NOV 2025',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 'hackathon',
    category: 'Competition',
    title: 'HACK ODISHA 4.0',
    date: 'DEC 2025',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 'robotics',
    category: 'Exhibition',
    title: 'ROBOTICS EXPO',
    date: 'JAN 2026',
    image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 'cyber-security',
    category: 'Summit',
    title: 'CYBERSEC SUMMIT',
    date: 'FEB 2026',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 'iot-expo',
    category: 'Showcase',
    title: 'IOT EXPO 2026',
    date: 'MAR 2026',
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2000&auto=format&fit=crop',
  },
];

// Reusable Reveal Animation
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
      className={`transition-all duration-700 ease-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`} 
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function MobileEvents() {
  return (
    <div className={`${poppins.variable} ${syne.variable} min-h-screen bg-[#fbfdff] text-[#0C0A0E] font-body pb-24 overflow-x-hidden`}>
      
      {/* 1. Header Navigation - FIXED: No Gallery Button */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 bg-[#fbfdff]/90 backdrop-blur-md border-b border-black/5 flex items-center transition-all duration-300">
        <Link 
          href="/" 
          className="flex items-center gap-2 group p-2 -ml-2 active:opacity-60 transition-opacity"
        >
          <div className="w-8 h-8 rounded-full bg-white border border-black/10 flex items-center justify-center shadow-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </div>
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 group-hover:text-black transition-colors">
            Home
          </span>
        </Link>
      </nav>

      {/* 2. Main Content */}
      <main className="px-6 pt-32">
        <Reveal>
          <div className="mb-12 relative">
            {/* Decorative Background Blob */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full blur-[80px] opacity-60 pointer-events-none" />
            
            <p className="text-xs font-bold tracking-widest text-blue-500 uppercase mb-3 relative z-10">Our Activities</p>
            {/* FIXED: Font size reduced to 13vw to prevent cutoff */}
            <h1 className="text-[13vw] font-black text-[#001439] leading-[0.85] tracking-tight relative z-10" style={{ fontFamily: "var(--font-syne)" }}>
              EVENTS
            </h1>
            <p className="mt-4 text-[#001439]/60 text-sm leading-relaxed max-w-[80%]">
                Explore the latest workshops, summits, and hackathons organized by our student branch.
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col gap-12">
          {EVENTS.map((event, i) => (
            <Reveal key={event.id} delay={i * 50}>
              <Link href={`/events/${event.id}`} className="block group">
                <div className="relative w-full bg-white rounded-[2.5rem] p-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-white transition-transform duration-300 active:scale-[0.98]">
                    
                    {/* Image Container */}
                    <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden">
                        <Image 
                            src={event.image} 
                            alt={event.title} 
                            fill 
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            priority={i < 2}
                        />
                        {/* Gradient for Text Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#001439]/60 via-transparent to-transparent opacity-40" />
                        
                        {/* Floating Date Badge */}
                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                            <p className="text-[10px] font-bold tracking-widest text-[#001439]">{event.date}</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-3 pt-5 pb-3">
                        <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2">
                            {event.category}
                        </p>
                        
                        <div className="flex justify-between items-end gap-4">
                            <h2 
                                className="text-2xl font-bold text-[#001439] leading-[1] max-w-[80%]" 
                                style={{ fontFamily: "var(--font-syne)" }}
                            >
                                {event.title}
                            </h2>
                            
                            {/* Action Button */}
                            <div className="w-10 h-10 rounded-full bg-[#001439] text-white flex items-center justify-center shrink-0 shadow-lg group-active:scale-90 transition-transform">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="-rotate-45">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </main>

      {/* Footer Element */}
      <div className="mt-24 text-center">
        <div className="w-12 h-1 bg-black/5 mx-auto rounded-full mb-4" />
        <p className="text-[#001439]/30 text-xs font-bold uppercase tracking-widest">End of List</p>
      </div>
    </div>
  );
}
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
  announcement: {
    title: "IEEE Student Branch Announcement",
    category: "CEREMONY",
    dateTime: "JAN 12, 2026",
    venue: "Room 214, M.K. Bhawan",
    status: "COMPLETED",
    heroImage: "/ieeeStudentBranchAnnouncement/Hero.jpeg",
    // ADDED GALLERY LINK HERE
    galleryLink: "https://drive.google.com/drive/u/7/folders/1OHN7ayH0AL8rcPEdYVU3j5_uqE2WlKZ_",
    overview: {
      headline:
        "OFFICIAL LAUNCH OF THE IEEE STUDENT BRANCH AND LEADERSHIP TEAM.",
      description: [
        "The IEEE Student Branch was formally announced in a distinguished ceremony attended by faculty members, students, and academic leaders. The event marked an important milestone in fostering a culture of innovation, collaboration, and professional growth.",
        "The announcement was led by Dr. Vanita Jain, Dr. Sangeeta Yadav, Prof. A.K. Tandon and Prof. G.S. Chilana. The ceremony highlighted the vision, responsibilities, and goals of the newly formed leadership team.",
      ],
    },
    images: [
      "/ieeeStudentBranchAnnouncement/img1.jpeg",
      "/ieeeStudentBranchAnnouncement/img2.jpeg",
    ],
  },
  icebreaker1: {
    title: "Icebreaker Session - 1",
    category: "SESSION",
    dateTime: "Jan 22, 2026",
    venue: "Room 313, M.K. Bhawan",
    status: "COMPLETED",
    heroImage: "/icebreaker1/Hero.jpeg",
    // ADDED GALLERY LINK HERE
    galleryLink: "https://drive.google.com/drive/u/7/folders/1YKFeasdOlGp4d6au2hLrpSe4TyGmhVS9",
    overview: {
      headline:
        "BUILDING BRIDGES: AN INTERACTIVE ICE BREAKER FOR ECE-A FRESHERS.",
      description: [
        "Led by IEEE branch position bearers Shreyas Singh, Ayush Chauhan, and Deepali, this interactive session was dedicated to welcoming the first-year ECE-A students. The event aimed to dissolve the initial hesitation of college life.",
        "The session provided a platform for freshers to interact freely with their seniors and learn about the vibrant culture of the IEEE Student Branch. We established a foundation for mentorship, collaboration, and lasting connections.",
      ],
    },
    images: ["/icebreaker1/img1.jpeg", "/icebreaker1/img2.jpeg"],
  },
  icebreaker2: {
    title: "Icebreaker Session - 2",
    category: "SESSION",
    dateTime: "Jan 27, 2026",
    venue: "ROOM 314, M.K. Bhawan",
    status: "COMPLETED",
    heroImage: "/icebreaker1/Hero.jpeg",
    // ADDED GALLERY LINK HERE
    galleryLink: "https://drive.google.com/drive/u/7/folders/1GX9ajAAaUDm7551TfXPGw_dpwFqDKD-4",
    overview: {
      headline:
        "CONNECTING CAMPUS: ICE BREAKER SESSION 2 FOR ECE-B & EE FRESHERS.",
      description: [
        "This second installment of our ice breaker series brought together first-year students from ECE-B and EE for an energetic session led by Ayush Chauhan, Shubhika Sinha, and Raghav Agarwall.",
        "Beyond just introductions, the session served as a gateway to the IEEE community. Seniors shared their experiences and insights, helping the freshers navigate their new academic landscape while encouraging them to engage with technical societies.",
      ],
    },
    images: ["/icebreaker1/img1.jpeg", "/icebreaker1/img2.jpeg"],
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
        
        {/* Gallery Shortcut Button - UPDATED */}
        <Link 
            href={event.galleryLink || "#"} 
            target={event.galleryLink ? "_blank" : "_self"}
            rel="noopener noreferrer"
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
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 px-6 pb-12 w-full max-w-full">
            <Reveal>
                <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-widest uppercase rounded-full mb-4">
                    {event.category}
                </div>
                {/* Responsive Text Size */}
                <h1 className="text-[10vw] leading-[0.9] font-black text-white drop-shadow-lg break-words hyphens-auto" style={{ fontFamily: "var(--font-syne)" }}>
                    {event.title}
                </h1>
            </Reveal>
        </div>
      </div>

      <div className="px-6 py-12 space-y-16 -mt-6 bg-white rounded-t-[2.5rem] relative z-10">
        
        {/* 3. Meta Data Grid - UPDATED to match new data structure */}
        <Reveal delay={100}>
            <div className="grid grid-cols-2 gap-y-8 gap-x-6 border-b border-gray-100 pb-12">
                <InfoBlock label="Date & Time" value={event.dateTime} />
                <InfoBlock label="Venue" value={event.venue} />
                <InfoBlock label="Category" value={event.category} />
                <InfoBlock label="Status" value={event.status} />
            </div>
        </Reveal>

        {/* 4. Overview */}
        <Reveal delay={200}>
            <div className="space-y-6">
                <p className="text-xs font-bold tracking-widest text-blue-500 uppercase">The Highlights</p>
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

        {/* 6. Next Event CTA */}
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
            <p className="text-sm font-bold text-[#001439] leading-snug break-words uppercase">{value}</p>
        </div>
    )
}
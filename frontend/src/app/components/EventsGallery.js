'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

const events = [
  {
    id: 'tech-summit',
    title: 'IEEE TECH SUMMIT',
    date: 'OCTOBER 2025',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 'ai-workshop',
    title: 'AI WORKSHOP',
    date: 'NOVEMBER 2025',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 'hackathon',
    title: 'HACK ODISHA 4.0',
    date: 'DECEMBER 2025',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 'robotics',
    title: 'ROBOTICS EXPO',
    date: 'JANUARY 2026',
    image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 'cyber-security',
    title: 'CYBERSEC SUMMIT',
    date: 'FEBRUARY 2026',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 'iot-expo',
    title: 'IOT EXPO 2026',
    date: 'MARCH 2026',
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2000&auto=format&fit=crop',
  },
]

export default function EventsGallery() {
  const eventsTrackRef = useRef(null)
  const heroRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!eventsTrackRef.current || !heroRef.current || !containerRef.current) return

      const scrollTop = window.scrollY
      const heroHeight = heroRef.current.offsetHeight
      const containerHeight = containerRef.current.offsetHeight
      const viewportHeight = window.innerHeight
      const viewportWidth = window.innerWidth
      
      const distanceScrolled = Math.max(0, scrollTop - heroHeight)
      const maxScrollableHeight = containerHeight - viewportHeight

      // scrollWidth will now accurately capture:
      // Padding Left + All Cards + All Margins + Spacer Div
      const totalTrackWidth = eventsTrackRef.current.scrollWidth
      
      // Subtract viewportWidth to align the right edge of Spacer with right edge of screen
      const maxTranslate = totalTrackWidth - viewportWidth

      const scrollPercentage = Math.min(1, Math.max(0, distanceScrolled / maxScrollableHeight))
      const translate = scrollPercentage * maxTranslate

      eventsTrackRef.current.style.transform = `translateX(-${translate}px)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    // Small timeout ensures layout is fully painted before calculating width
    setTimeout(handleScroll, 100)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <div className="bg-white">
      <style jsx global>{`
        ::-webkit-scrollbar { display: none; }
        html, body { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <Link 
        href="/" 
        className="fixed top-8 left-8 md:top-12 md:left-12 z-50 group flex items-center gap-2"
      >
        <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-gray-500 group-hover:text-black transition-colors duration-300">
          [ Back ]
        </span>
      </Link>

      <div ref={heroRef} className="min-h-screen flex items-center justify-center relative">
        <div className="text-center">
          <h1 className="text-[15vw] md:text-[12vw] font-bold uppercase tracking-tight text-black" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif' }}>
            Events
          </h1>
          <p className="text-sm md:text-base uppercase tracking-[0.3em] text-gray-600 mt-8">
            [ {events.length} Featured Events ]
          </p>
          <div className="mt-16 animate-bounce">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Scroll Down</p>
            <svg className="w-6 h-6 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="min-h-[400vh] relative">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="absolute top-8 md:top-12 left-1/2 transform -translate-x-1/2 z-10">
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-gray-500">
              [ Gallery ]
            </p>
          </div>

          <div className="w-full">
            <div 
              ref={eventsTrackRef}
              // 1. REMOVED "gap-[5vw]" - we handle spacing via margins now
              // 2. Padding Left is kept to create the starting space
              className="flex pl-12 md:pl-16 will-change-transform"
            >
              {events.map((event, index) => (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  // 3. Added mr-[5vw] to create space AFTER each card
                  // 4. Added last:mr-0 to REMOVE space after the very last card
                  className="group relative block flex-shrink-0 mr-[5vw] last:mr-0"
                  style={{ width: '50vw' }}
                >
                  <div className="relative w-full aspect-[21/9] overflow-hidden bg-gray-100">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-75"
                      priority={index < 3}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="relative w-[50%] aspect-[21/9] shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-500">
                        <Image
                          src={event.image}
                          alt={`${event.title} preview`}
                          fill
                          className="object-cover border border-white/20"
                        />
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 w-2 h-2 md:w-3 md:h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="flex justify-between items-end mt-4 px-1">
                    <h2 className="text-lg md:text-xl font-bold uppercase tracking-tight text-black">
                      {event.title}
                    </h2>
                    <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-gray-500">
                      {event.date}
                    </p>
                  </div>
                </Link>
              ))}

              {/* 5. SPACER DIV
                  Since we removed the gap and the last card has mr-0,
                  this div sits flush against the last card.
                  Its width (w-12 / w-16) EXACTLY matches the padding-left (pl-12 / pl-16).
              */}
              <div className="shrink-0 w-12 md:w-16" aria-hidden="true" />
            
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
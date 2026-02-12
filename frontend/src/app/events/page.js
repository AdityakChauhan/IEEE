'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

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

  // We only need 2 sets for a clean loop if the logic works correctly,
  // but 3 ensures safety on ultra-wide screens.
  const loopedEvents = [...events, ...events, ...events]

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const heroHeight = heroRef.current ? heroRef.current.offsetHeight : 0
      
      // Calculate how far we have scrolled past the hero
      const distanceScrolled = Math.max(0, scrollTop - heroHeight)

      if (eventsTrackRef.current) {
        // 1. Get the total width of the track currently rendered
        const totalTrackWidth = eventsTrackRef.current.scrollWidth
        
        // 2. Determine the width of ONE SINGLE SET of events.
        // Since we have 3 copies in loopedEvents, we divide by 3.
        const singleSetWidth = totalTrackWidth / 3

        // 3. The Infinite Loop Math:
        // We use the modulo operator (%) to wrap the scroll.
        // As you scroll down, 'val' increases. 
        // When 'val' hits 'singleSetWidth', it resets to 0 instantly.
        // Because Copy #2 is exactly where Copy #1 started, the jump is invisible.
        
        // Adjust "1.5" to change scroll speed relative to vertical scroll
        const speed = 1.5 
        const translate = (distanceScrolled * speed) % singleSetWidth

        eventsTrackRef.current.style.transform = `translateX(-${translate}px)`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Recalculate on resize to ensure widths are correct
    window.addEventListener('resize', handleScroll)
    
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <div className="bg-white">
      {/* Hero Section */}
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

      {/* Scroll Track Container 
        Increased height to 500vh to give plenty of room to "loop" through the items multiple times 
      */}
      <div className="min-h-[500vh] relative">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          
          {/* Label */}
          <div className="absolute top-8 md:top-12 left-1/2 transform -translate-x-1/2 z-10">
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-gray-500">
              [ Gallery ]
            </p>
          </div>

          <div className="w-full overflow-hidden">
            <div 
              ref={eventsTrackRef}
              // Changed gap to a relative unit (5vw) for better responsiveness
              // This makes the gap gracefull increase on larger screens
              className="flex gap-[5vw] px-12 md:px-16 will-change-transform"
            >
              {loopedEvents.map((event, index) => (
                <Link
                  key={`${event.id}-${index}`}
                  href={`/events/${event.id}`}
                  className="group relative block flex-shrink-0"
                  // Changed width to 60vw for "Wider" look
                  style={{ width: '50vw' }}
                >
                  {/* Image Container 
                    Changed aspect ratio from [16/10] to [21/9] (approx 2.33)
                    This makes the images "less tall" and more cinematic
                  */}
                  <div className="relative w-full aspect-[21/9] overflow-hidden bg-gray-100">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-75"
                      priority={index < 3}
                    />

                    {/* Hover Overlay */}
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
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
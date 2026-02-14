'use client'
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const EventsGallery = dynamic(() => import('../components/EventsGallery')); // Your original file
const MobileEvents = dynamic(() => import('../components/MobileEvents')); // The new file

export default function Page() {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (isMobile === null) return null; // Or a loader
  return isMobile ? <MobileEvents /> : <EventsGallery />;
}
'use client'
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const EventDetail = dynamic(() => import('../../components/EventDetail')); // Your original file
const MobileEventDetail = dynamic(() => import('../../components/MobileEventsDetail.js')); // The new file

export default function Page() {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (isMobile === null) return null;
  return isMobile ? <MobileEventDetail /> : <EventDetail />;
}
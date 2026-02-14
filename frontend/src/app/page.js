"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// 1. Dynamically import the components
// "loading" is what the user sees while the correct file is being fetched (optional)
const DesktopHome = dynamic(() => import("./components/DesktopHome"), {
  loading: () => <div className="h-screen w-full bg-[#fbfdff]" />,
});

const MobileHome = dynamic(() => import("./components/MobileHome"), {
  loading: () => <div className="h-screen w-full bg-[#fbfdff]" />,
});

export default function Page() {
  // 2. Set initial state to null so we don't render the wrong one first
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    // 3. Check screen size on the client side
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Run immediately
    checkScreen();

    // Add listener for resizing (e.g., rotating tablet)
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // 4. While we are determining the screen size, show nothing (or a loader)
  if (isMobile === null) {
    return <div className="h-screen w-full bg-[#fbfdff]" />;
  }

  // 5. Render ONLY the file that matches the device
  return isMobile ? <MobileHome /> : <DesktopHome />;
}
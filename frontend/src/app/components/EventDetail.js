// app/events/[id]/page.js
"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

// --- UPDATED DATA STRUCTURE ---
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
        "The announcement was led by Dr. Vanita Jain, Dr. Sangeeta Yadav, Prof. A.K. Tandon and Prof. G.S. Chilana. The ceremony highlighted the vision, responsibilities, and goals of the newly formed leadership team, setting the foundation for impactful technical initiatives.",
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
        "Led by IEEE branch position bearers Shreyas Singh, Ayush Chauhan, and Deepali along with other members, this interactive session was dedicated to welcoming the first-year ECE-A students. The event aimed to dissolve the initial hesitation of college life and foster a sense of belonging within the department.",
        "The session provided a platform for freshers to interact freely with their seniors and learn about the vibrant culture of the IEEE Student Branch. Through engaging activities and open dialogue, we established a foundation for mentorship, collaboration, and lasting connections.",
      ],
    },
    images: ["/icebreaker1/img1.jpeg", "/icebreaker1/img2.jpeg"],
  },
  icebreaker2: {
    title: "Icebreaker Session - 2",
    category: "Session",
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
        "This second installment of our ice breaker series brought together first-year students from ECE-B and EE for an energetic session led by Ayush Chauhan, Shubhika Sinha, and Akanksha Ratan and other members. The focus was on creating a relaxed environment where students could step out of their comfort zones.",
        "Beyond just introductions, the session served as a gateway to the IEEE community. Seniors shared their experiences and insights, helping the freshers navigate their new academic landscape while encouraging them to engage with technical societies early in their college journey.",
      ],
    },
    images: [
      "/icebreaker1/img1.jpeg", 
      "/icebreaker1/img2.jpeg"
    ],
  },
};

export default function EventDetail() {
  const params = useParams();
  const event = eventsData[params.id];

  // Logic: Calculate next event for the bottom navigation
  const eventKeys = Object.keys(eventsData);
  const currentIndex = eventKeys.indexOf(params.id);
  const nextIndex = (currentIndex + 1) % eventKeys.length;
  const nextEventId = eventKeys[nextIndex];
  const nextEvent = eventsData[nextEventId];

  // Fallback if event not found
  if (!event) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
          <Link
            href="/events"
            className="text-sm uppercase tracking-widest underline"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-black selection:bg-black selection:text-white">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 w-full px-6 md:px-12 lg:px-20 py-8 flex justify-between items-center z-50 bg-[#FAFAFA]/80 backdrop-blur-sm">
        
        {/* --- UPDATED GALLERY LINK --- */}
        <Link
          href={event.galleryLink || "#"} // Fallback to # if no link exists
          target={event.galleryLink ? "_blank" : "_self"} // Open in new tab
          rel="noopener noreferrer" // Security best practice for new tabs
          className="text-xs font-bold tracking-[0.2em] uppercase hover:underline underline-offset-4 transition-all border-2 px-4 py-3 border-black"
        >
          Gallery
        </Link>

        <Link
          href="/events" 
          className="text-xs font-bold tracking-[0.2em] uppercase bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors border-2 border-black"
        >
          Close
        </Link>
      </nav>

      <main className="pt-32 px-6 md:px-12 lg:px-20 pb-32">
        <div className="max-w-[1400px] mx-auto">
          {/* Header Section */}
          <header className="mb-20">
            <h1 className="text-[12vw] md:text-[9vw] lg:text-[7rem] leading-[0.85] font-bold uppercase tracking-tighter mb-16 break-words">
              {event.title}
            </h1>

            {/* --- EVENT META GRID --- */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t-2 border-black pt-8 text-xs uppercase tracking-[0.15em] font-medium">
              {/* 1. CATEGORY */}
              <div>
                <span className="block text-gray-500 mb-3">[ CATEGORY ]</span>
                <p className="text-black font-bold">
                  {event.category || "Event"}
                </p>
              </div>

              {/* 2. DATE  */}
              <div>
                <span className="block text-gray-500 mb-3">[ DATE ]</span>
                <p className="text-black font-bold">{event.dateTime}</p>
              </div>

              {/* 3. VENUE */}
              <div>
                <span className="block text-gray-500 mb-3">[ VENUE ]</span>
                <p className="text-black font-bold">{event.venue || "TBA"}</p>
              </div>

              {/* 4. STATUS */}
              <div>
                <span className="block text-gray-500 mb-3">[ STATUS ]</span>
                <p className="text-black font-bold text-blue-600">
                  {event.status || "Upcoming"}
                </p>
              </div>
            </div>
          </header>

          {/* Hero Image */}
          <section className="w-full aspect-video md:aspect-[21/9] relative overflow-hidden mb-32 bg-gray-100">
            <Image
              src={event.heroImage}
              alt="Hero Background"
              fill
              className="object-cover"
              priority
            />
          </section>

          {/* Overview Section */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32 border-t-2 border-black pt-12">
            <div className="md:col-span-3">
              <span className="text-xs uppercase tracking-[0.2em] font-bold">
                [ ABOUT EVENT ]
              </span>
            </div>

            <div className="md:col-span-9">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase leading-[1.1] mb-12 max-w-3xl">
                {event.overview.headline}
              </h2>

              <div className="space-y-6 text-base md:text-lg leading-relaxed text-gray-700 max-w-3xl">
                {event.overview.description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </section>

          {/* Additional Images */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
            {event.images.map((image, index) => (
              <div
                key={index}
                className="relative w-full aspect-[3/2] overflow-hidden bg-gray-100"
              >
                <Image
                  src={image}
                  alt={`${event.title} highlight ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            ))}
          </section>

          {/* Next Event CTA */}
          <section className="border-t-2 border-black pt-16">
            <Link href={`/events/${nextEventId}`} className="group block">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4 group-hover:text-blue-600 transition-colors">
                    [ NEXT EVENT ]
                  </p>
                  <h3 className="text-4xl md:text-6xl font-bold uppercase leading-none group-hover:text-gray-600 transition-colors">
                    {nextEvent?.title || "View All Events"}
                  </h3>
                </div>

                {/* Arrow Icon */}
                <div className="w-12 h-12 md:w-16 md:h-16 border border-black rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300 shrink-0">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}
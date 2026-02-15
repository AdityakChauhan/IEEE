// app/events/[id]/page.js
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'

// Event data
const eventsData = {
  'tech-summit': {
    title: 'IEEE TECH SUMMIT',
    category: 'CONFERENCE',
    date: 'OCTOBER 2025',
    deliverables: 'TECH CONFERENCE',
    organizer: 'IEEE STUDENT BRANCH',
    role: 'LEAD ORGANIZER',
    services: 'EVENT PLANNING / COORDINATION',
    heroImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop',
    overview: {
      headline: 'BRINGING TOGETHER TECH LEADERS AND INNOVATORS FOR A DAY OF INSPIRATION AND LEARNING.',
      description: [
        'The IEEE Tech Summit aims to create a platform where technology enthusiasts, industry leaders, and students converge to explore the latest advancements in engineering and computer science. We wanted to create an engaging experience that provided attendees with actionable insights and networking opportunities.',
        'The event was structured around keynote speeches, panel discussions, and hands-on workshops. We utilized modern event management techniques to ensure seamless execution and maximum attendee engagement throughout the day.'
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2000&auto=format&fit=crop'
    ]
  },
  'ai-workshop': {
    title: 'AI WORKSHOP',
    category: 'WORKSHOP',
    date: 'NOVEMBER 2025',
    deliverables: 'HANDS-ON TRAINING',
    organizer: 'IEEE CS CHAPTER',
    role: 'WORKSHOP COORDINATOR',
    services: 'CURRICULUM DESIGN / FACILITATION',
    heroImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop',
    overview: {
      headline: 'DEMYSTIFYING ARTIFICIAL INTELLIGENCE THROUGH PRACTICAL, HANDS-ON LEARNING EXPERIENCES.',
      description: [
        'This workshop series was designed to make AI accessible to students at all skill levels. From foundational concepts to advanced machine learning techniques, participants gained practical experience building real AI applications.',
        'We structured the curriculum using project-based learning, ensuring every participant left with tangible AI projects they could showcase. The workshop emphasized ethical AI development and real-world applications across various industries.'
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop'
    ]
  },
  'hackathon': {
    title: 'HACK ODISHA 4.0',
    category: 'HACKATHON',
    date: 'DECEMBER 2025',
    deliverables: '48-HOUR HACKATHON',
    organizer: 'IEEE & TECH PARTNERS',
    role: 'EVENT DIRECTOR',
    services: 'LOGISTICS / JUDGING / MENTORSHIP',
    heroImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2000&auto=format&fit=crop',
    overview: {
      headline: 'EMPOWERING DEVELOPERS TO BUILD INNOVATIVE SOLUTIONS FOR REAL-WORLD CHALLENGES.',
      description: [
        'Hack Odisha 4.0 brought together 500+ developers, designers, and innovators for an intensive 48-hour coding marathon. Participants tackled challenges in healthcare, education, sustainability, and smart cities, creating impactful prototypes.',
        'The event featured mentorship from industry experts, technical workshops, and a robust judging process. We fostered a collaborative environment that encouraged cross-functional teams to push the boundaries of innovation.'
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2000&auto=format&fit=crop'
    ]
  },
  'robotics': {
    title: 'ROBOTICS EXPO',
    category: 'EXHIBITION',
    date: 'JANUARY 2026',
    deliverables: 'ROBOTICS SHOWCASE',
    organizer: 'IEEE RAS CHAPTER',
    role: 'EXHIBITION CURATOR',
    services: 'CURATION / DEMONSTRATIONS',
    heroImage: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=2000&auto=format&fit=crop',
    overview: {
      headline: 'SHOWCASING THE FUTURE OF ROBOTICS AND AUTOMATION TECHNOLOGY.',
      description: [
        'The Robotics Expo presented cutting-edge developments in robotics, from industrial automation to humanoid robots. Attendees experienced live demonstrations, interactive exhibits, and insights from robotics pioneers.',
        'We curated exhibits that highlighted both theoretical foundations and practical applications, making complex robotics concepts accessible to diverse audiences while inspiring the next generation of robotics engineers.'
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563207153-f403bf289096?q=80&w=2000&auto=format&fit=crop'
    ]
  },
  'cyber-security': {
    title: 'CYBERSEC SUMMIT',
    category: 'CONFERENCE',
    date: 'FEBRUARY 2026',
    deliverables: 'SECURITY CONFERENCE',
    organizer: 'IEEE COMPUTER SOCIETY',
    role: 'PROGRAM CHAIR',
    services: 'SPEAKER COORDINATION / CONTENT',
    heroImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop',
    overview: {
      headline: 'ADDRESSING CRITICAL CYBERSECURITY CHALLENGES IN AN INCREASINGLY CONNECTED WORLD.',
      description: [
        'The CyberSec Summit convened security professionals, researchers, and students to discuss emerging threats, defensive strategies, and the future of digital security. Sessions covered everything from ethical hacking to enterprise security architecture.',
        'Our program balanced technical depth with practical applicability, ensuring attendees gained both theoretical knowledge and hands-on security skills through live demonstrations and capture-the-flag competitions.'
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop'
    ]
  },
  'iot-expo': {
    title: 'IOT EXPO 2026',
    category: 'EXHIBITION',
    date: 'MARCH 2026',
    deliverables: 'IOT SHOWCASE',
    organizer: 'IEEE IOT INITIATIVE',
    role: 'TECHNICAL LEAD',
    services: 'DEMOS / INTEGRATION / SUPPORT',
    heroImage: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2000&auto=format&fit=crop',
    overview: {
      headline: 'EXPLORING THE INTERCONNECTED FUTURE THROUGH INTERNET OF THINGS INNOVATIONS.',
      description: [
        'IoT Expo 2026 showcased how connected devices are transforming industries from healthcare to agriculture. Attendees explored smart home systems, industrial IoT applications, and emerging edge computing solutions.',
        'We designed interactive demonstrations that highlighted the practical benefits of IoT while addressing security, scalability, and interoperability challenges facing the ecosystem.'
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop'
    ]
  },
}

export default function EventDetail() {
  const params = useParams()
  const event = eventsData[params.id]

  // --- LOGIC FIX: CALCULATE NEXT EVENT ---
  const eventKeys = Object.keys(eventsData)
  const currentIndex = eventKeys.indexOf(params.id)
  
  // Calculate next index, wrap around to 0 if at the end
  const nextIndex = (currentIndex + 1) % eventKeys.length
  const nextEventId = eventKeys[nextIndex]
  const nextEvent = eventsData[nextEventId]

  // Fallback if event not found
  if (!event) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
          <Link href="/events" className="text-sm uppercase tracking-widest underline">
            Back to Events
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-black selection:bg-black selection:text-white">
      
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 w-full px-6 md:px-12 lg:px-20 py-8 flex justify-between items-center z-50 bg-[#FAFAFA]/80 backdrop-blur-sm">
        <Link 
          href="#" //this would take us to the gallery page 
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
            <h1 className="text-[15vw] md:text-[12vw] lg:text-[9rem] leading-[0.85] font-bold uppercase tracking-tighter mb-16">
              {event.title}
            </h1>

            {/* Meta Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t-2 border-black pt-8 text-xs uppercase tracking-[0.15em] font-medium">
              <div>
                <span className="block text-gray-500 mb-3">[ DELIVERABLES ]</span>
                <p className="text-black font-bold">{event.deliverables}</p>
              </div>
              <div>
                <span className="block text-gray-500 mb-3">[ ORGANIZER ]</span>
                <p className="text-black font-bold">{event.organizer}</p>
              </div>
              <div>
                <span className="block text-gray-500 mb-3">[ ROLE ]</span>
                <p className="text-black font-bold">{event.role}</p>
              </div>
              <div>
                <span className="block text-gray-500 mb-3">[ SERVICES ]</span>
                <p className="text-black font-bold">{event.services}</p>
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
            />
          </section>

          {/* Overview Section */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32 border-t-2 border-black pt-12">
            <div className="md:col-span-3">
              <span className="text-xs uppercase tracking-[0.2em] font-bold">[ OVERVIEW ]</span>
            </div>

            <div className="md:col-span-9">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase leading-[1.1] mb-12 max-w-3xl">
                {event.overview.headline}
              </h2>
              
              <div className="space-y-6 text-base md:text-lg leading-relaxed text-gray-700 max-w-3xl">
                {event.overview.description.map((paragraph, index) => (
                  <p key={index}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </section>

          {/* Additional Images */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
            {event.images.map((image, index) => (
              <div key={index} className="relative w-full aspect-[3/2] overflow-hidden bg-gray-100">
                <Image
                  src={image}
                  alt={`${event.title} image ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            ))}
          </section>

          {/* FIXED: Dynamic Next Event CTA */}
          <section className="border-t-2 border-black pt-16">
            <Link 
              href={`/events/${nextEventId}`}
              className="group block"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4 group-hover:text-blue-600 transition-colors">
                    [ NEXT EVENT ]
                  </p>
                  <h3 className="text-4xl md:text-6xl font-bold uppercase leading-none group-hover:text-gray-600 transition-colors">
                    {nextEvent?.title || 'Next Project'}
                  </h3>
                </div>
                
                {/* Arrow Icon */}
                <div className="w-12 h-12 md:w-16 md:h-16 border border-black rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </Link>
          </section>

        </div>
      </main>
    </div>
  )
}
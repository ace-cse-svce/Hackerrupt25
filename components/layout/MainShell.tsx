"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import SocialLinks from "@/components/layout/SocialLinks";



export default function MainShell({
  children,
  enableScrollNav = false,
  sectionRefs = {},
}: {
  children: React.ReactNode;
  enableScrollNav?: boolean;
  sectionRefs?: Record<string, React.RefObject<HTMLElement>>;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

const isActive = (id: string) => {
  // 🔹 HOME PAGE → scroll-based highlighting
  if (pathname === "/") {
    return activeSection === id;
  }

  // 🔹 ROUTE PAGES → route-based highlighting ONLY
  if (pathname === "/problem-statements") return id === "domains";
  if (pathname === "/faq") return id === "faq";
  if (pathname === "/gallery") return id === "gallery";
  if (pathname === "/contact") return id === "contact";

  return false;
};



  /* =======================
     SCROLL LOGIC (HOME ONLY)
     ======================= */
  useEffect(() => {
    if (!enableScrollNav) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      Object.entries(sectionRefs).forEach(([name, ref]) => {
        if (!ref?.current) return;
        const { offsetTop, offsetHeight } = ref.current;
        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(name);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [enableScrollNav, sectionRefs]);

  const handleNavClick = (id: string) => {
  setMenuOpen(false);

  // HOME SECTION LINKS
  const homeSections = ["home", "prizepool", "about", "timeline", "sponsors"];

  if (homeSections.includes(id)) {
    if (pathname === "/") {
      // already on home → scroll
      scrollToSection(id);
    } else {
      // go to home & scroll
      router.push(`/#${id}`);
    }
    return;
  }

  // ROUTE PAGES
  switch (id) {
    case "domains":
      router.push("/problem-statements");
      break;
    case "faq":
      router.push("/faq");
      break;
    case "gallery":
      router.push("/gallery");
      break;
    case "contact":
      router.push("/contact");
      break;
    default:
      router.push("/");
  }
};

  const scrollToSection = (id: string) => {
    if (!enableScrollNav) return;
    sectionRefs[id]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setMenuOpen(false);
  };

  /* =======================
     CANVAS (UNCHANGED)
     ======================= */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let width: number, height: number, particles: any[], animationFrameId: number;

    const mouse = { x: null as any, y: null as any, radius: 150 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);

    class Particle {
      x: number; y: number; dx: number; dy: number; size: number;
      baseAlpha: number; pulseSpeed: number; pulseOffset: number;
      constructor(x: number, y: number, dx: number, dy: number, size: number) {
        this.x = x; this.y = y; this.dx = dx; this.dy = dy; this.size = size;
        this.baseAlpha = 0.2 + Math.random() * 0.4;
        this.pulseSpeed = Math.random() * 0.02 + 0.005;
        this.pulseOffset = Math.random() * Math.PI * 2;
      }
      draw() {
        const a =
          this.baseAlpha +
          Math.sin(Date.now() * this.pulseSpeed + this.pulseOffset) *
            (this.baseAlpha * 0.5);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(5,255,161,${a})`;
        ctx.fill();
      }
      update() {
        if (this.x < 0 || this.x > width) this.dx *= -1;
        if (this.y < 0 || this.y > height) this.dy *= -1;
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
      }
    }

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles = [];
      const count = Math.floor((width * height) / 9000);
      for (let i = 0; i < count; i++) {
        particles.push(
          new Particle(
            Math.random() * width,
            Math.random() * height,
            (Math.random() - 0.5) * 0.6,
            (Math.random() - 0.5) * 0.6,
            Math.random() * 2 + 1
          )
        );
      }
    };

    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = dx * dx + dy * dy;
          if (dist < (width / 7) * (height / 7)) {
            let opacity = 1 - dist / 20000;
            ctx.strokeStyle = `rgba(5,255,161,${opacity * 0.5})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => p.update());
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    init(); animate();
    window.addEventListener("resize", init);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div className="bg-black min-h-screen text-white overflow-hidden relative">
      {/* Background */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-80" />
      <div className="fixed inset-x-0 top-0 h-1/2 bg-gradient-to-b from-green-900/50 to-transparent z-0" />

      {/* HEADER — EXACT COPY */}
      <header className="fixed top-0 left-0 w-full z-50">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-md border-b border-white/10 h-14 md:h-20"></div>

        <div className="relative z-10 max-w-[1600px] mx-auto flex justify-between items-center h-14 md:h-20 px-4 sm:px-8">
          {/* Logos */}
          <div className="flex items-center gap-3 md:gap-6">
            <img src="/svce.png" className="h-6 sm:h-7 md:h-12 w-auto object-contain" />
            <img src="/ace logo.png" className="h-6 sm:h-7 md:h-12 w-auto object-contain" />
            <div className="h-8 w-[2px] bg-green-500"></div>
            <div className="flex flex-col items-center w-auto md:max-w-[110px] text-center gap-1 md:gap-[2px]">
  <span className="text-[6.5px] sm:text-[8.5px] uppercase tracking-widest leading-tight">
    Title Sponsored By
  </span>
  <img src="/logo1.png" className="h-8 md:h-8 bg-white p-1 rounded" />
</div>

          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8">
            {[
              ["home", "Home"],
              ["domains", "Problem Statements"],
              ["faq", "FAQ"],
              ["gallery", "Gallery"],
              ["contact", "Contact Us"],
            ].map(([id, label]) => (
              <button
  key={id}
  onClick={() => handleNavClick(id)}
  className={`px-2 lg:px-3 py-1.5 rounded-md 
    text-[11px] lg:text-sm font-bold uppercase tracking-wider
    transition-all duration-300
    ${
      isActive(id)
        ? "bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.5)] scale-105"
        : "text-gray-300 hover:bg-white/10 hover:text-green-400"
    }`}
>
  {label}
</button>

            ))}
          </nav>

          {/* Mobile Toggle */}
          <button
  className="md:hidden flex flex-col space-y-1.5 p-2"
  onClick={() => setMenuOpen((prev) => !prev)}
  aria-label="Toggle navigation"
>
  <span className={`block w-6 h-0.5 bg-green-400 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
  <span className={`block w-6 h-0.5 bg-green-400 transition-all ${menuOpen ? "opacity-0" : ""}`} />
  <span className={`block w-6 h-0.5 bg-green-400 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
</button>


        </div>
      </header>
        {/* Mobile Nav */}
        {menuOpen && (
  <div className="md:hidden fixed top-[3.5rem] left-0 w-full bg-black/95 backdrop-blur-md z-40 border-t border-white/10">

    {[
      ["home", "Home"],
      ["domains", "Problem Statements"],
      ["faq", "FAQ"],
      ["gallery", "Gallery"],
      ["contact", "Contact Us"],
    ].map(([id, label]) => (
      <button
  key={id}
  onClick={() => handleNavClick(id)}
  className={`block w-full text-left px-6 py-4 text-sm font-bold uppercase tracking-wider transition-all
    ${isActive(id)
      ? "bg-green-500 text-black"
      : "text-gray-300 hover:bg-white/10 hover:text-green-400"
    }`}
>
  {label}
</button>

    ))}
  </div>
)}


      {/* Social Links (EXACT) */}
            
        <SocialLinks />
      <main className="relative z-10 pt-20">
        {children}
      </main>
    </div>
  );
}
